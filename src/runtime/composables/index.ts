import { inject, readonly, toRefs } from 'vue'
import { elementsContextKey } from '../utils/keys'

export function useElementsContext(hook = 'calls useElementsContext()') {
  const ctx = inject(elementsContextKey, { stripe: null, elements: null })
  if (!ctx)
    throw new Error(`Could not find Elements context; You need to wrap the part of your app that ${hook} in an <Elements> provider.`)

  return toRefs(ctx)
}

export function useElements() {
  const { elements } = useElementsContext('calls useElements()')
  return readonly(elements)
}

export function useStripe() {
  const { stripe } = useElementsContext('calls useStripe()')
  return readonly(stripe)
}
