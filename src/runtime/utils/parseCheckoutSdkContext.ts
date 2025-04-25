import type { Ref } from 'vue'
import type { CheckoutSdkContextValue } from './keys'

export function parseCheckoutSdkContext(ctx: Ref<CheckoutSdkContextValue> | null, useCase: string): Ref<CheckoutSdkContextValue> {
  if (!ctx)
    throw new Error(`Could not find CheckoutProvider context; You need to wrap the part of your app that ${useCase} in an <CheckoutProvider> provider.`)
  return ctx
}
