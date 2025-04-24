import type * as stripeJs from '@stripe/stripe-js'
import type { PropType, Ref } from 'vue'
import type { UnknownOptions } from '../utils/extractAllowedOptionsUpdates'
import { computed, defineComponent, Fragment, h, onMounted, provide, reactive, ref, toRefs, watch } from 'vue'
import { extractAllowedOptionsUpdates } from '../utils/extractAllowedOptionsUpdates'
import { elementsContextKey } from '../utils/keys'
import { parseStripeProp } from '../utils/parseStripeProp'
import { usePrevious } from '../utils/usePrevious'

export interface ElementsContextValue {
  elements: stripeJs.StripeElements | null
  stripe: stripeJs.Stripe | null
}

export function parseElementsContext(ctx: ElementsContextValue | null, useCase: string): ElementsContextValue {
  if (!ctx) {
    throw new Error(
      `Could not find Elements context; You need to wrap the part of your app that ${useCase} in an <Elements> provider.`,
    )
  }

  return ctx
}

const Elements = defineComponent({
  name: 'Elements',
  props: {
    /**
     * A [Stripe object](https://stripe.com/docs/js/initializing) or a `Promise` resolving to a `Stripe` object.
     * The easiest way to initialize a `Stripe` object is with the the [Stripe.js wrapper module](https://github.com/stripe/stripe-js/blob/master/README.md#readme).
     * Once this prop has been set, it can not be changed.
     *
     * You can also pass in `null` or a `Promise` resolving to `null` if you are performing an initial server-side render or when generating a static site.
     */
    stripe: {
      type: [Object, Promise] as PropType<PromiseLike<stripeJs.Stripe | null> | stripeJs.Stripe | null>,
      default: null,
    },
    /**
     * Optional [Elements configuration options](https://stripe.com/docs/js/elements_object/create).
     * Once the stripe prop has been set, these options cannot be changed.
     */
    options: {
      type: Object as PropType<stripeJs.StripeElementsOptions>,
      default: () => ({}),
    },
  },
  async setup(props, ctx) {
    const { stripe: rawStripeProp, options } = toRefs(props) as { stripe: Ref<unknown>, options: Ref<UnknownOptions> }
    const isMounted = ref(false)

    onMounted(() => {
      isMounted.value = true
    })

    const parsed = computed(() => parseStripeProp(rawStripeProp.value))

    const context = reactive({
      stripe: parsed.value.tag === 'sync' ? parsed.value.stripe : null,
      elements: parsed.value.tag === 'sync' ? parsed.value.stripe.elements(options.value) : null,
    })

    function safeSetContext(stripe: stripeJs.Stripe) {
      // no-op if we already have a stripe instance (https://github.com/stripe/react-stripe-js/issues/296)
      if (context.stripe)
        return context

      context.stripe = stripe
      context.elements = stripe.elements(options.value)
    }

    // For an async stripePromise, store it in context once resolved
    if (parsed.value.tag === 'async' && !context.stripe) {
      parsed.value.stripePromise.then((stripe) => {
        if (stripe && isMounted.value) {
          // Only update Elements context if the component is still mounted
          // and stripe is not null. We allow stripe to be null to make
          // handling SSR easier.
          safeSetContext(stripe)
        }
      })
    }
    else if (parsed.value.tag === 'sync' && !context.stripe) {
      // Or, handle a sync stripe instance going from null -> populated
      safeSetContext(parsed.value.stripe)
    }

    // Warn on changes to stripe prop
    const prevStripe = usePrevious(rawStripeProp)
    watch([prevStripe, rawStripeProp], () => {
      if (prevStripe.value !== null && prevStripe.value !== rawStripeProp.value) {
        console.warn('Unsupported prop change on Elements: You cannot change the `stripe` prop after setting it.')
      }
    })

    // Apply updates to elements when options prop has relevant changes
    const prevOptions = usePrevious(options)
    watch([options, prevOptions, () => context.elements], () => {
      if (!context.elements)
        return

      const updates = extractAllowedOptionsUpdates(options.value, prevOptions.value, ['clientSecret', 'fonts'])

      if (updates)
        context.elements.update(updates)
    })

    provide(elementsContextKey, context)
    // provide(checkoutSdkContextKey, null as any)

    return () => h(Fragment, ctx.slots.default?.(context))
  },
})

export default Elements
