import type { AddressElementComponent, AffirmMessageElementComponent, AfterpayClearpayMessageElementComponent, AuBankAccountElementComponent, CardCvcElementComponent, CardElementComponent, CardExpiryElementComponent, CardNumberElementComponent, CurrencySelectorElementComponent, EpsBankElementComponent, ExpressCheckoutElementComponent, FpxBankElementComponent, IbanElementComponent, IdealBankElementComponent, LinkAuthenticationElementComponent, P24BankElementComponent, PaymentElementComponent, PaymentMethodMessagingElementComponent, PaymentRequestButtonElementComponent, ShippingAddressElementComponent } from '../types'
import createElementComponent from './createElementComponent'

/**
 * Requires beta access:
 * Contact [Stripe support](https://support.stripe.com/) for more information.
 *
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */
export const AuBankAccountElement: AuBankAccountElementComponent = createElementComponent('auBankAccount')

/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */
export const CardElement: CardElementComponent = createElementComponent('card')

/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */
export const CardNumberElement: CardNumberElementComponent = createElementComponent('cardNumber')

/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */
export const CardExpiryElement: CardExpiryElementComponent = createElementComponent('cardExpiry')

/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */
export const CardCvcElement: CardCvcElementComponent = createElementComponent('cardCvc')

/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */
export const FpxBankElement: FpxBankElementComponent = createElementComponent('fpxBank')

/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */
export const IbanElement: IbanElementComponent = createElementComponent('iban')

/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */
export const IdealBankElement: IdealBankElementComponent = createElementComponent('idealBank')

/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */
export const P24BankElement: P24BankElementComponent = createElementComponent('p24Bank')

/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */
export const EpsBankElement: EpsBankElementComponent = createElementComponent('epsBank')

/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */
export const PaymentElement: PaymentElementComponent = createElementComponent('payment')

/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */
export const ExpressCheckoutElement: ExpressCheckoutElementComponent = createElementComponent('expressCheckout')

/**
 * Requires beta access:
 * Contact [Stripe support](https://support.stripe.com/) for more information.
 */
export const CurrencySelectorElement: CurrencySelectorElementComponent = createElementComponent('currencySelector')

/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */
export const PaymentRequestButtonElement: PaymentRequestButtonElementComponent = createElementComponent('paymentRequestButton')

/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */
export const LinkAuthenticationElement: LinkAuthenticationElementComponent = createElementComponent('linkAuthentication')

/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */
export const AddressElement: AddressElementComponent = createElementComponent('address')

/**
 * @deprecated
 * Use `AddressElement` instead.
 *
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */
export const ShippingAddressElement: ShippingAddressElementComponent = createElementComponent('shippingAddress')

/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */
export const PaymentMethodMessagingElement: PaymentMethodMessagingElementComponent = createElementComponent('paymentMethodMessaging')

/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */
export const AffirmMessageElement: AffirmMessageElementComponent = createElementComponent('affirmMessage')

/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */
export const AfterpayClearpayMessageElement: AfterpayClearpayMessageElementComponent = createElementComponent('afterpayClearpayMessage')
