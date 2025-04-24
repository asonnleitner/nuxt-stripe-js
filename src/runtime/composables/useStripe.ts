import { useElementsOrCheckoutSdkContextWithUseCase } from './useCheckout'

export function useStripe() {
  const { stripe } = useElementsOrCheckoutSdkContextWithUseCase('calls useStripe()')
  return stripe
}
