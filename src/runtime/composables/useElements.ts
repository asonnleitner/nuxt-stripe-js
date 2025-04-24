import type * as stripeJs from '@stripe/stripe-js'
import type { ElementsContextValue } from '../components/Elements'
import { inject } from 'vue'
import { parseElementsContext } from '../components/Elements'
import { elementsContextKey } from '../utils/keys'

export function useElementsContextWithUseCase(useCaseMessage: string): ElementsContextValue {
  const ctx = inject(elementsContextKey, null)
  return parseElementsContext(ctx, useCaseMessage)
}

/**
 * @docs https://stripe.com/docs/stripe-js/react#useelements-hook
 */
export function useElements(): stripeJs.StripeElements | null {
  const { elements } = useElementsContextWithUseCase('calls useElements()')
  return elements
}
