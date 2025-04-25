<script setup lang="ts">
import type * as stripeJs from '@stripe/stripe-js'
import type { Ref } from 'vue'
import type { UnknownOptions } from '../utils/extractAllowedOptionsUpdates'
import { computed, onMounted, provide, reactive, ref, toRefs, watch } from 'vue'
import { extractAllowedOptionsUpdates } from '../utils/extractAllowedOptionsUpdates'
import { elementsContextKey } from '../utils/keys'
import { parseStripeProp } from '../utils/parseStripeProp'
import { usePrevious } from '../utils/usePrevious'

const props = defineProps<{
  stripe: PromiseLike<stripeJs.Stripe | null> | stripeJs.Stripe | null
  options?: stripeJs.StripeElementsOptions
}>()

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
watch([() => parsed.value, () => context.stripe, options], () => {
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
watch([options, prevOptions, () => context.elements], () => {
  if (!context.elements)
    return

  const updates = extractAllowedOptionsUpdates(options.value, prevOptions.value, ['clientSecret', 'fonts'])

  if (updates)
    context.elements.update(updates)
})

const computedContext = computed(() => ({
  stripe: context.stripe,
  elements: context.elements,
}))

provide(elementsContextKey, computedContext)
</script>

<template>
  <slot v-bind="context" />
</template>
