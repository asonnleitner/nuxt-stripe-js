<script setup lang="ts">
import type * as stripeJs from '@stripe/stripe-js'
import type { Ref } from 'vue'
import type { CheckoutSdkContextValue } from '../utils/keys'
import { computed, onMounted, provide, reactive, ref, toRefs, watch } from 'vue'
import { extractCheckoutContextValue } from '../utils/extractCheckoutContextValue'
import { isEqual } from '../utils/isEqual'
import { checkoutContextKey, checkoutSdkContextKey } from '../utils/keys'
import { parseStripeProp } from '../utils/parseStripeProp'
import { usePrevious } from '../utils/usePrevious'

const props = defineProps<{
  /**
   * A [Stripe object](https://stripe.com/docs/js/initializing) or a `Promise` resolving to a `Stripe` object.
   * The easiest way to initialize a `Stripe` object is with the the [Stripe.js wrapper module](https://github.com/stripe/stripe-js/blob/master/README.md#readme).
   * Once this prop has been set, it can not be changed.
   *
   * You can also pass in `null` or a `Promise` resolving to `null` if you are performing an initial server-side render or when generating a static site.
   */
  stripe: PromiseLike<stripeJs.Stripe | null> | stripeJs.Stripe | null

  /**
   * Optional [Elements configuration options](https://stripe.com/docs/js/elements_object/create).
   * Once the stripe prop has been set, these options cannot be changed.
   */
  options?: stripeJs.StripeCheckoutOptions
}>()

const INVALID_STRIPE_ERROR = 'Invalid prop `stripe` supplied to `CheckoutProvider`. We recommend using the `loadStripe` utility from `@stripe/stripe-js`. See https://stripe.com/docs/stripe-js/react#elements-props-stripe for details.'

const { stripe: rawStripeProp, options } = toRefs(props) as { stripe: Ref<unknown>, options: Ref<stripeJs.StripeCheckoutOptions> }
const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
})

const parsed = computed(() => parseStripeProp(rawStripeProp.value, INVALID_STRIPE_ERROR))

const context = reactive<CheckoutSdkContextValue>({
  stripe: parsed.value.tag === 'sync' ? parsed.value.stripe : null,
  checkoutSdk: null,
})

// State used to trigger a re-render when sdk.session is updated
const session = ref<stripeJs.StripeCheckoutSession | null>(null)

function safeSetContext(stripe: stripeJs.Stripe, checkoutSdk: stripeJs.StripeCheckout) {
  // no-op if we already have a stripe instance (https://github.com/stripe/react-stripe-js/issues/296)
  if (context.stripe && context.checkoutSdk)
    return context

  context.stripe = stripe
  context.checkoutSdk = checkoutSdk
}

// Ref used to avoid calling initCheckout multiple times when options changes
const initCheckoutCalledRef = ref(false)

watch([() => parsed.value, () => context.stripe, options, isMounted], () => {
// For an async stripePromise, store it in context once resolved
  if (parsed.value.tag === 'async' && !context.stripe) {
    parsed.value.stripePromise.then((stripe) => {
      if (stripe && isMounted.value && !initCheckoutCalledRef.value) {
      // Only update context if the component is still mounted
      // and stripe is not null. We allow stripe to be null to make
      // handling SSR easier.
        initCheckoutCalledRef.value = true
        stripe.initCheckout(options.value).then((checkoutSdk) => {
          if (checkoutSdk) {
            safeSetContext(stripe, checkoutSdk)
            checkoutSdk.on('change', (checkoutSession) => {
              session.value = checkoutSession
            })
          }
        })
      }
    })
  }
  else if (parsed.value.tag === 'sync' && parsed.value.stripe && !initCheckoutCalledRef.value) {
    initCheckoutCalledRef.value = true
    const stripe = parsed.value.stripe
    stripe.initCheckout(options.value).then((checkoutSdk) => {
      if (checkoutSdk) {
        safeSetContext(stripe, checkoutSdk)
        checkoutSdk.on('change', (checkoutSession) => {
          session.value = checkoutSession
        })
      }
    })
  }
}, { immediate: true })

// Warn on changes to stripe prop
const prevStripe = usePrevious(rawStripeProp)
watch([prevStripe, rawStripeProp], () => {
  if (prevStripe.value !== null && prevStripe.value !== rawStripeProp.value) {
    console.warn('Unsupported prop change on Elements: You cannot change the `stripe` prop after setting it.')
  }
})

// Apply updates to elements when options prop has relevant changes
const prevOptions = usePrevious(options)
watch([options, prevOptions, () => context.checkoutSdk], () => {
  if (!context.checkoutSdk)
    return

  const previousAppearance = prevOptions.value?.elementsOptions?.appearance
  const currentAppearance = options.value?.elementsOptions?.appearance

  if (currentAppearance && !isEqual(currentAppearance, previousAppearance)) {
    context.checkoutSdk.changeAppearance(currentAppearance)
  }
})

const checkoutContextValue = computed(() => extractCheckoutContextValue(context.checkoutSdk, session.value))

const computedContext = computed(() => ({
  stripe: context.stripe,
  checkoutSdk: context.checkoutSdk,
}))

provide(checkoutSdkContextKey, computedContext)
provide(checkoutContextKey, checkoutContextValue)
</script>

<template>
  <slot v-bind="context" />
</template>
