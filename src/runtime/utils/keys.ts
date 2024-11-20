import type * as stripeJs from '@stripe/stripe-js'
import type { InjectionKey } from 'vue'

type StripeCheckoutActions = Omit<Omit<stripeJs.StripeCheckout, 'session'>, 'on'>

export interface CheckoutContextValue extends StripeCheckoutActions, stripeJs.StripeCheckoutSession {}

export interface ElementsContextValue {
  elements: stripeJs.StripeElements | null
  stripe: stripeJs.Stripe | null
}

export const elementsContextKey: InjectionKey<ElementsContextValue> = Symbol('elementsContextKey')

export interface CheckoutSdkContextValue {
  checkoutSdk: stripeJs.StripeCheckout | null
  stripe: stripeJs.Stripe | null
}

export const checkoutSdkContextKey: InjectionKey<CheckoutSdkContextValue> = Symbol('checkoutSdkContextKey')
export const checkoutContextKey: InjectionKey<CheckoutContextValue> = Symbol('checkoutContextKey')
