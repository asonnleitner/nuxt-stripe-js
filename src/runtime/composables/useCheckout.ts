import type { Ref } from 'vue'
import type { CheckoutContextValue, CheckoutSdkContextValue, ElementsContextValue } from '../utils/keys'
import { inject } from 'vue'
import { checkoutContextKey, checkoutSdkContextKey, elementsContextKey } from '../utils/keys'
import { parseCheckoutSdkContext } from '../utils/parseCheckoutSdkContext'
import { parseElementsContext } from '../utils/parseElementsContext'

export function useCheckoutSdkContextWithUseCase(useCaseString: string): Readonly<Ref<CheckoutSdkContextValue>> {
  const ctx = inject(checkoutSdkContextKey, null)
  return parseCheckoutSdkContext(ctx, useCaseString)
}

export function useElementsOrCheckoutSdkContextWithUseCase(useCaseString: string): Readonly<Ref<CheckoutSdkContextValue | ElementsContextValue>> {
  const checkoutSdkContext = inject(checkoutSdkContextKey, null)
  const elementsContext = inject(elementsContextKey, null)

  if (checkoutSdkContext?.value && elementsContext?.value)
    throw new Error(`You cannot wrap the part of your app that ${useCaseString} in both <CheckoutProvider> and <Elements> providers.`)

  if (checkoutSdkContext?.value)
    return parseCheckoutSdkContext(checkoutSdkContext, useCaseString)

  return parseElementsContext(elementsContext, useCaseString)
}

export function useCheckout(): Readonly<Ref<CheckoutContextValue | null>> {
  // ensure it's in CheckoutProvider
  useCheckoutSdkContextWithUseCase('calls useCheckout()')
  const ctx = inject(checkoutContextKey, null)
  if (!ctx)
    throw new Error('Could not find Checkout Context; You need to wrap the part of your app that calls useCheckout() in an <CheckoutProvider> provider.')
  return ctx
}
