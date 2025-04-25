import type * as stripeJs from '@stripe/stripe-js'

export function extractCheckoutContextValue(checkoutSdk: stripeJs.StripeCheckout | null, sessionState: stripeJs.StripeCheckoutSession | null): CheckoutContextValue | null {
  if (!checkoutSdk) {
    return null
  }

  const { on: _on, session: _session, ...actions } = checkoutSdk
  if (!sessionState) {
    return { ...actions, ...checkoutSdk.session() }
  }

  return { ...actions, ...sessionState }
}
