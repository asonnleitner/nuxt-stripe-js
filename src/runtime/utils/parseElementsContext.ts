import type { Ref } from 'vue'
import type { ElementsContextValue } from './keys'

export function parseElementsContext(ctx: Ref<ElementsContextValue> | null, useCase: string): Ref<ElementsContextValue> {
  if (!ctx)
    throw new Error(`Could not find Elements context; You need to wrap the part of your app that ${useCase} in an <Elements> provider.`)
  return ctx
}
