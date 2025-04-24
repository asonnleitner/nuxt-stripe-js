import type { ElementsContextValue } from '../components/Elements'
import type { CheckoutContextValue, CheckoutSdkContextValue } from '../utils/keys'
import { inject } from 'vue'
import { parseCheckoutSdkContext } from '../components/CheckoutProvider'
import { parseElementsContext } from '../components/Elements'
import { checkoutContextKey, checkoutSdkContextKey, elementsContextKey } from '../utils/keys'

export function useCheckoutSdkContextWithUseCase(useCaseString: string): CheckoutSdkContextValue {
  const ctx = inject(checkoutSdkContextKey, null)
  return parseCheckoutSdkContext(ctx, useCaseString)
}

export function useElementsOrCheckoutSdkContextWithUseCase(useCaseString: string): CheckoutSdkContextValue | ElementsContextValue {
  const checkoutSdkContext = inject(checkoutSdkContextKey, null)
  const elementsContext = inject(elementsContextKey, null)

  if (checkoutSdkContext && elementsContext)
    throw new Error(`You cannot wrap the part of your app that ${useCaseString} in both <CheckoutProvider> and <Elements> providers.`)

  if (checkoutSdkContext)
    return parseCheckoutSdkContext(checkoutSdkContext, useCaseString)

  return parseElementsContext(elementsContext, useCaseString)
}

export function useCheckout(): CheckoutContextValue {
  // ensure it's in CheckoutProvider
  useCheckoutSdkContextWithUseCase('calls useCheckout()')
  const ctx = inject(checkoutContextKey, null)
  if (!ctx)
    throw new Error('Could not find Checkout Context; You need to wrap the part of your app that calls useCheckout() in an <CheckoutProvider> provider.')
  return ctx
}
