import type * as stripeJs from '@stripe/stripe-js'
import type { Ref } from 'vue'
import { computed } from 'vue'
import { useElementsOrCheckoutSdkContextWithUseCase } from './useCheckout'

export function useStripe(): Readonly<Ref<stripeJs.Stripe | null>> {
  const context = useElementsOrCheckoutSdkContextWithUseCase('calls useStripe()')
  return computed(() => context.value.stripe)
}
