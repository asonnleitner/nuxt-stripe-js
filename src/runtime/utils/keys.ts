import type * as stripeJs from '@stripe/stripe-js'
import type { InjectionKey, Ref } from 'vue'

type StripeCheckoutActions = Omit<Omit<stripeJs.StripeCheckout, 'session'>, 'on'>

export interface CheckoutContextValue extends StripeCheckoutActions, stripeJs.StripeCheckoutSession {}

export interface ElementsContextValue {
  elements: stripeJs.StripeElements | null
  stripe: stripeJs.Stripe | null
}

export const elementsContextKey: InjectionKey<Ref<ElementsContextValue>> = Symbol('elementsContextKey')

export interface CheckoutSdkContextValue {
  checkoutSdk: stripeJs.StripeCheckout | null
  stripe: stripeJs.Stripe | null
}

export const checkoutSdkContextKey: InjectionKey<Ref<CheckoutSdkContextValue>> = Symbol('checkoutSdkContextKey')
export const checkoutContextKey: InjectionKey<Ref<CheckoutContextValue | null>> = Symbol('checkoutContextKey')
