import type * as stripeJs from '@stripe/stripe-js'
import type { Ref } from 'vue'
import type { ElementsContextValue } from '../utils/keys'
import { computed, inject } from 'vue'
import { elementsContextKey } from '../utils/keys'
import { parseElementsContext } from '../utils/parseElementsContext'

export function useElementsContextWithUseCase(useCaseMessage: string): Ref<ElementsContextValue> {
  const ctx = inject(elementsContextKey, null)
  return parseElementsContext(ctx, useCaseMessage)
}

/**
 * @docs https://stripe.com/docs/stripe-js/react#useelements-hook
 */
export function useElements(): Readonly<Ref<stripeJs.StripeElements | null>> {
  const context = useElementsContextWithUseCase('calls useElements()')
  return computed(() => context.value.elements)
}
