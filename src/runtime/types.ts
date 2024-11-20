import type * as stripeJs from '@stripe/stripe-js'
import type { DefineComponent, HTMLAttributes } from 'vue'

export interface ElementProps {
  /**
   * Passes through to the [Element’s container](https://stripe.com/docs/js/element/the_element_container).
   */
  id?: string

  /**
   * Passes through to the [Element’s container](https://stripe.com/docs/js/element/the_element_container).
   */
  class?: HTMLAttributes['class']

  /**
   * Triggered when the Element loses focus.
   */
  onBlur?: () => any

  /**
   * Triggered when the Element receives focus.
   */
  onFocus?: () => any
}

export interface AuBankAccountElementProps extends ElementProps {
  /**
   * An object containing [Element configuration options](https://stripe.com/docs/js/elements_object/create_element?type=auBankAccount).
   */
  options?: stripeJs.StripeAuBankAccountElementOptions

  /**
   * Triggered when data exposed by this Element is changed (e.g., when there is an error).
   * For more information, refer to the [Stripe.js reference](https://stripe.com/docs/js/element/events/on_change?type=auBankAccountElement).
   */
  onChange?: (event: stripeJs.StripeAuBankAccountElementChangeEvent) => any

  /**
   * Triggered when the Element is fully rendered and can accept imperative `element.focus()` calls.
   * Called with a reference to the underlying [Element instance](https://stripe.com/docs/js/element).
   */
  onReady?: (element: stripeJs.StripeAuBankAccountElement) => any

  /**
   * Triggered when the escape key is pressed within the Element.
   */
  onEscape?: () => any
}

export type AuBankAccountElementComponent = DefineComponent<AuBankAccountElementProps>

export interface CardElementProps extends ElementProps {
  /**
   * An object containing [Element configuration options](https://stripe.com/docs/js/elements_object/create_element?type=card).
   */
  options?: stripeJs.StripeCardElementOptions

  /**
   * Triggered when data exposed by this Element is changed (e.g., when there is an error).
   * For more information, refer to the [Stripe.js reference](https://stripe.com/docs/js/element/events/on_change?type=cardElement).
   */
  onChange?: (event: stripeJs.StripeCardElementChangeEvent) => any

  /**
   * Triggered when the Element is fully rendered and can accept imperative `element.focus()` calls.
   * Called with a reference to the underlying [Element instance](https://stripe.com/docs/js/element).
   */
  onReady?: (element: stripeJs.StripeCardElement) => any

  /**
   * Triggered when the escape key is pressed within the Element.
   */
  onEscape?: () => any

  /**
   * Triggered when there is a change to the available networks the provided card can run on.
   * For more information, refer to the [Stripe.js reference](https://stripe.com/docs/js/element/events/on_networkschange?type=cardElement).
   */
  onNetworksChange?: (event: { elementType: 'card' }) => any

  /**
   * Triggered when the Element fails to load.
   */
  onLoadError?: (event: { elementType: 'card', error: stripeJs.StripeError }) => any
}

export type CardElementComponent = DefineComponent<CardElementProps>

export interface CardNumberElementProps extends ElementProps {
  /**
   * An object containing [Element configuration options](https://stripe.com/docs/js/elements_object/create_element?type=cardNumber).
   */
  options?: stripeJs.StripeCardNumberElementOptions

  /**
   * Triggered when data exposed by this Element is changed (e.g., when there is an error).
   * For more information, refer to the [Stripe.js reference](https://stripe.com/docs/js/element/events/on_change?type=cardNumberElement).
   */
  onChange?: (event: stripeJs.StripeCardNumberElementChangeEvent) => any

  /**
   * Triggered when the Element is fully rendered and can accept imperative `element.focus()` calls.
   * Called with a reference to the underlying [Element instance](https://stripe.com/docs/js/element).
   */
  onReady?: (element: stripeJs.StripeCardNumberElement) => any

  /**
   * Triggered when the escape key is pressed within the Element.
   */
  onEscape?: () => any

  /**
   * Triggered when there is a change to the available networks the provided card can run on.
   * For more information, refer to the [Stripe.js reference](https://stripe.com/docs/js/element/events/on_networkschange?type=cardNumberElement).
   */
  onNetworksChange?: (event: { elementType: 'cardNumber' }) => any

  /**
   * Triggered when the Element fails to load.
   */
  onLoadError?: (event: { elementType: 'cardNumber', error: stripeJs.StripeError }) => any
}

export type CardNumberElementComponent = DefineComponent<CardNumberElementProps>

export interface CardExpiryElementProps extends ElementProps {
  /**
   * An object containing [Element configuration options](https://stripe.com/docs/js/elements_object/create_element?type=cardExpiry).
   */
  options?: stripeJs.StripeCardExpiryElementOptions

  /**
   * Triggered when data exposed by this Element is changed (e.g., when there is an error).
   * For more information, refer to the [Stripe.js reference](https://stripe.com/docs/js/element/events/on_change?type=cardExpiryElement).
   */
  onChange?: (event: stripeJs.StripeCardExpiryElementChangeEvent) => any

  /**
   * Triggered when the Element is fully rendered and can accept imperative `element.focus()` calls.
   * Called with a reference to the underlying [Element instance](https://stripe.com/docs/js/element).
   */
  onReady?: (element: stripeJs.StripeCardExpiryElement) => any

  /**
   * Triggered when the escape key is pressed within the Element.
   */
  onEscape?: () => any
}

export type CardExpiryElementComponent = DefineComponent<CardExpiryElementProps>

export interface CardCvcElementProps extends ElementProps {
  /**
   * An object containing [Element configuration options](https://stripe.com/docs/js/elements_object/create_element?type=cardCvc).
   */
  options?: stripeJs.StripeCardCvcElementOptions

  /**
   * Triggered when data exposed by this Element is changed (e.g., when there is an error).
   * For more information, refer to the [Stripe.js reference](https://stripe.com/docs/js/element/events/on_change?type=cardCvcElement).
   */
  onChange?: (event: stripeJs.StripeCardCvcElementChangeEvent) => any

  /**
   * Triggered when the Element is fully rendered and can accept imperative `element.focus()` calls.
   * Called with a reference to the underlying [Element instance](https://stripe.com/docs/js/element).
   */
  onReady?: (element: stripeJs.StripeCardCvcElement) => any

  /**
   * Triggered when the escape key is pressed within the Element.
   */
  onEscape?: () => any
}

export type CardCvcElementComponent = DefineComponent<CardCvcElementProps>

export interface FpxBankElementProps extends ElementProps {
  /**
   * An object containing [Element configuration options](https://stripe.com/docs/js/elements_object/create_element?type=fpxBank).
   */
  options?: stripeJs.StripeFpxBankElementOptions

  /**
   * Triggered when data exposed by this Element is changed (e.g., when there is an error).
   * For more information, refer to the [Stripe.js reference](https://stripe.com/docs/js/element/events/on_change?type=fpxBankElement).
   */
  onChange?: (event: stripeJs.StripeFpxBankElementChangeEvent) => any

  /**
   * Triggered when the Element is fully rendered and can accept imperative `element.focus()` calls.
   * Called with a reference to the underlying [Element instance](https://stripe.com/docs/js/element).
   */
  onReady?: (element: stripeJs.StripeFpxBankElement) => any

  /**
   * Triggered when the escape key is pressed within the Element.
   */
  onEscape?: () => any
}

export type FpxBankElementComponent = DefineComponent<FpxBankElementProps>

export interface IbanElementProps extends ElementProps {
  /**
   * An object containing [Element configuration options](https://stripe.com/docs/js/elements_object/create_element?type=iban).
   */
  options?: stripeJs.StripeIbanElementOptions

  /**
   * Triggered when data exposed by this Element is changed (e.g., when there is an error).
   * For more information, refer to the [Stripe.js reference](https://stripe.com/docs/js/element/events/on_change?type=ibanElement).
   */
  onChange?: (event: stripeJs.StripeIbanElementChangeEvent) => any

  /**
   * Triggered when the Element is fully rendered and can accept imperative `element.focus()` calls.
   * Called with a reference to the underlying [Element instance](https://stripe.com/docs/js/element).
   */
  onReady?: (element: stripeJs.StripeIbanElement) => any

  /**
   * Triggered when the escape key is pressed within the Element.
   */
  onEscape?: () => any
}

export type IbanElementComponent = DefineComponent<IbanElementProps>

export interface IdealBankElementProps extends ElementProps {
  /**
   * An object containing [Element configuration options](https://stripe.com/docs/js/elements_object/create_element?type=idealBank).
   */
  options?: stripeJs.StripeIdealBankElementOptions

  /**
   * Triggered when data exposed by this Element is changed (e.g., when there is an error).
   * For more information, refer to the [Stripe.js reference](https://stripe.com/docs/js/element/events/on_change?type=idealBankElement).
   */
  onChange?: (event: stripeJs.StripeIdealBankElementChangeEvent) => any

  /**
   * Triggered when the Element is fully rendered and can accept imperative `element.focus()` calls.
   * Called with a reference to the underlying [Element instance](https://stripe.com/docs/js/element).
   */
  onReady?: (element: stripeJs.StripeIdealBankElement) => any

  /**
   * Triggered when the escape key is pressed within the Element.
   */
  onEscape?: () => any
}

export type IdealBankElementComponent = DefineComponent<IdealBankElementProps>

export interface P24BankElementProps extends ElementProps {
  /**
   * An object containing [Element configuration options](https://stripe.com/docs/js/elements_object/create_element?type=p24Bank).
   */
  options?: stripeJs.StripeP24BankElementOptions

  /**
   * Triggered when data exposed by this Element is changed (e.g., when there is an error).
   * For more information, refer to the [Stripe.js reference](https://stripe.com/docs/js/element/events/on_change?type=p24BankElement).
   */
  onChange?: (event: stripeJs.StripeP24BankElementChangeEvent) => any

  /**
   * Triggered when the Element is fully rendered and can accept imperative `element.focus()` calls.
   * Called with a reference to the underlying [Element instance](https://stripe.com/docs/js/element).
   */
  onReady?: (element: stripeJs.StripeP24BankElement) => any

  /**
   * Triggered when the escape key is pressed within the Element.
   */
  onEscape?: () => any
}

export type P24BankElementComponent = DefineComponent<P24BankElementProps>

export interface LinkAuthenticationElementProps extends ElementProps {
  /**
   * An object containing Element configuration options.
   */
  options?: stripeJs.StripeLinkAuthenticationElementOptions

  /**
   * Triggered when data exposed by this Element is changed (e.g., when there is an error).
   * For more information, refer to the [Stripe.js reference](https://stripe.com/docs/js/element/events/on_change?type=auBankAccountElement).
   */
  onChange?: (event: stripeJs.StripeLinkAuthenticationElementChangeEvent) => any

  /**
   * Triggered when the Element is fully rendered and can accept imperative `element.focus()` calls.
   * Called with a reference to the underlying [Element instance](https://stripe.com/docs/js/element).
   */
  onReady?: (element: stripeJs.StripeLinkAuthenticationElement) => any

  /**
   * Triggered when the escape key is pressed within the Element.
   */
  onEscape?: () => any

  /**
   * Triggered when the Element fails to load.
   */
  onLoadError?: (event: { elementType: 'linkAuthentication', error: stripeJs.StripeError }) => any

  /**
   * Triggered when the [loader](https://stripe.com/docs/js/elements_object/create#stripe_elements-options-loader) UI is mounted to the DOM and ready to be displayed.
   */
  onLoaderStart?: (event: { elementType: 'linkAuthentication' }) => any
}

export type LinkAuthenticationElementComponent = DefineComponent<LinkAuthenticationElementProps>

export interface EpsBankElementProps extends ElementProps {
  /**
   * An object containing [Element configuration options](https://stripe.com/docs/js/elements_object/create_element?type=epsBank).
   */
  options?: stripeJs.StripeEpsBankElementOptions

  /**
   * Triggered when data exposed by this Element is changed (e.g., when there is an error).
   * For more information, refer to the [Stripe.js reference](https://stripe.com/docs/js/element/events/on_change?type=epsBankElement).
   */
  onChange?: (event: stripeJs.StripeEpsBankElementChangeEvent) => any

  /**
   * Triggered when the Element is fully rendered and can accept imperative `element.focus()` calls.
   * Called with a reference to the underlying [Element instance](https://stripe.com/docs/js/element).
   */
  onReady?: (element: stripeJs.StripeEpsBankElement) => any

  /**
   * Triggered when the escape key is pressed within the Element.
   */
  onEscape?: () => any
}

export type EpsBankElementComponent = DefineComponent<EpsBankElementProps>

export interface PaymentElementProps extends ElementProps {
  /**
   * An object containing Element configuration options.
   */
  options?: stripeJs.StripePaymentElementOptions

  /**
   * Triggered when data exposed by this Element is changed.
   */
  onChange?: (event: stripeJs.StripePaymentElementChangeEvent) => any

  /**
   * Triggered when the Element is fully rendered and can accept imperative `element.focus()` calls.
   * Called with a reference to the underlying [Element instance](https://stripe.com/docs/js/element).
   */
  onReady?: (element: stripeJs.StripePaymentElement) => any

  /**
   * Triggered when the escape key is pressed within the Element.
   */
  onEscape?: () => any

  /**
   * Triggered when the Element fails to load.
   */
  onLoadError?: (event: { elementType: 'payment', error: stripeJs.StripeError }) => any

  /**
   * Triggered when the [loader](https://stripe.com/docs/js/elements_object/create#stripe_elements-options-loader) UI is mounted to the DOM and ready to be displayed.
   */
  onLoaderStart?: (event: { elementType: 'payment' }) => any
}

export type PaymentElementComponent = DefineComponent<PaymentElementProps>

export interface ExpressCheckoutElementProps extends ElementProps {
  /**
   * An object containing Element configuration options.
   */
  options?: stripeJs.StripeExpressCheckoutElementOptions

  /**
   * Triggered when the Element is fully rendered and can accept imperative `element.focus()` calls.
   * The list of payment methods that could possibly show in the element, or undefined if no payment methods can show.
   */
  onReady?: (event: stripeJs.StripeExpressCheckoutElementReadyEvent) => any

  /**
   * Triggered when the escape key is pressed within the Element.
   */
  onEscape?: () => any

  /**
   * Triggered when the Element fails to load.
   */
  onLoadError?: (event: { elementType: 'expressCheckout', error: stripeJs.StripeError }) => any

  /**
   * Triggered when a button on the Element is clicked.
   */
  onClick?: (event: stripeJs.StripeExpressCheckoutElementClickEvent) => any

  /**
   * Triggered when a buyer authorizes a payment within a supported payment method.
   */
  onConfirm: (event: stripeJs.StripeExpressCheckoutElementConfirmEvent) => any

  /**
   * Triggered when a payment interface is dismissed (e.g., a buyer closes the payment interface)
   */
  onCancel?: (event: { elementType: 'expressCheckout' }) => any

  /**
   * Triggered when a buyer selects a different shipping address.
   */
  onShippingAddressChange?: (event: stripeJs.StripeExpressCheckoutElementShippingAddressChangeEvent) => any

  /**
   * Triggered when a buyer selects a different shipping rate.
   */
  onShippingRateChange?: (event: stripeJs.StripeExpressCheckoutElementShippingRateChangeEvent) => any
}

export type ExpressCheckoutElementComponent = DefineComponent<ExpressCheckoutElementProps>

export interface PaymentRequestButtonElementProps extends ElementProps {
  /**
   * An object containing [Element configuration options](https://stripe.com/docs/js/elements_object/create_element?type=paymentRequestButton).
   */
  options?: stripeJs.StripePaymentRequestButtonElementOptions

  /**
   * Triggered when the Element is clicked.
   */
  onClick?: (event: stripeJs.StripePaymentRequestButtonElementClickEvent) => any

  /**
   * Triggered when the Element is fully rendered and can accept imperative `element.focus()` calls.
   * Called with a reference to the underlying [Element instance](https://stripe.com/docs/js/element).
   */
  onReady?: (element: stripeJs.StripePaymentRequestButtonElement) => any
}

export type PaymentRequestButtonElementComponent = DefineComponent<PaymentRequestButtonElementProps>

export interface CurrencySelectorElementProps extends ElementProps {
  /**
   * Triggered when the Element is fully rendered and can accept imperative `element.focus()` calls.
   * Called with a reference to the underlying [Element instance](https://stripe.com/docs/js/element).
   */
  onReady?: (element: stripeJs.StripeCurrencySelectorElement) => any

  /**
   * Triggered when the escape key is pressed within the Element.
   */
  onEscape?: () => any

  /**
   * Triggered when the Element fails to load.
   */
  onLoadError?: (event: { elementType: 'currencySelector', error: stripeJs.StripeError }) => any

  /**
   * Triggered when the [loader](https://stripe.com/docs/js/elements_object/create#stripe_elements-options-loader) UI is mounted to the DOM and ready to be displayed.
   */
  onLoaderStart?: (event: { elementType: 'currencySelector' }) => any
}

export type CurrencySelectorElementComponent = DefineComponent<CurrencySelectorElementProps>

export interface AddressElementProps extends ElementProps {
  /**
   * An object containing [Element configuration options](https://stripe.com/docs/js/elements_object/create_address_element#address_element_create-options).
   */
  options: stripeJs.StripeAddressElementOptions

  /**
   * Triggered when data exposed by this Element is changed (e.g., when there is an error).
   * For more information, refer to the [Stripe.js reference](https://stripe.com/docs/js/element/events/on_change?type=addressElement).
   */
  onChange?: (event: stripeJs.StripeAddressElementChangeEvent) => any

  /**
   * Triggered when the Element is fully rendered and can accept imperative `element.focus()` calls.
   * Called with a reference to the underlying [Element instance](https://stripe.com/docs/js/element).
   */
  onReady?: (element: stripeJs.StripeAddressElement) => any

  /**
   * Triggered when the escape key is pressed within the Element.
   */
  onEscape?: () => any

  /**
   * Triggered when the Element fails to load.
   */
  onLoadError?: (event: { elementType: 'address', error: stripeJs.StripeError }) => any

  /**
   * Triggered when the [loader](https://stripe.com/docs/js/elements_object/create#stripe_elements-options-loader) UI is mounted to the DOM and ready to be displayed.
   */
  onLoaderStart?: (event: { elementType: 'address' }) => any
}

export type AddressElementComponent = DefineComponent<AddressElementProps>

export interface ShippingAddressElementProps extends ElementProps {
  /**
   * An object containing [Element configuration options](https://stripe.com/docs/js/deprecated/create_shipping_address_element#shipping_address_element_create-options).
   */
  options?: stripeJs.StripeShippingAddressElementOptions

  /**
   * Triggered when data exposed by this Element is changed (e.g., when there is an error).
   * For more information, refer to the [Stripe.js reference](https://stripe.com/docs/js/element/events/on_change?type=shippingAddressElement).
   */
  onChange?: (event: stripeJs.StripeShippingAddressElementChangeEvent) => any

  /**
   * Triggered when the Element is fully rendered and can accept imperative `element.focus()` calls.
   * Called with a reference to the underlying [Element instance](https://stripe.com/docs/js/element).
   */
  onReady?: (element: stripeJs.StripeShippingAddressElement) => any

  /**
   * Triggered when the escape key is pressed within the Element.
   */
  onEscape?: () => any

  /**
   * Triggered when the Element fails to load.
   */
  onLoadError?: (event: { elementType: 'shippingAddress', error: stripeJs.StripeError }) => any

  /**
   * Triggered when the [loader](https://stripe.com/docs/js/elements_object/create#stripe_elements-options-loader) UI is mounted to the DOM and ready to be displayed.
   */
  onLoaderStart?: (event: { elementType: 'shippingAddress' }) => any
}

export type ShippingAddressElementComponent = DefineComponent<ShippingAddressElementProps>

export interface PaymentMethodMessagingElementProps {
  /**
   * Passes through to the [Element’s container](https://stripe.com/docs/js/element/the_element_container).
   */
  id?: string

  /**
   * Passes through to the [Element’s container](https://stripe.com/docs/js/element/the_element_container).
   */
  className?: string

  /**
   * An object containing [Element configuration options](https://stripe.com/docs/js/elements_object/create_element?type=afterpayClearpayMessage).
   */
  options?: stripeJs.StripePaymentMethodMessagingElementOptions

  /**
   * Triggered when the Element has been fully loaded, after initial method calls have been fired.
   * Called with a reference to the underlying [Element instance](https://stripe.com/docs/js/element).
   */
  onReady?: (element: stripeJs.StripePaymentMethodMessagingElement) => any
}

export type PaymentMethodMessagingElementComponent = DefineComponent<PaymentMethodMessagingElementProps>

export interface AffirmMessageElementProps {
  /**
   * Passes through to the [Element’s container](https://stripe.com/docs/js/element/the_element_container).
   */
  id?: string

  /**
   * Passes through to the [Element’s container](https://stripe.com/docs/js/element/the_element_container).
   */
  className?: string

  /**
   * An object containing [Element configuration options](https://stripe.com/docs/js/elements_object/create_element?type=afterpayClearpayMessage).
   */
  options?: stripeJs.StripeAffirmMessageElementOptions

  /**
   * Triggered when the Element has been fully loaded, after initial method calls have been fired.
   * Called with a reference to the underlying [Element instance](https://stripe.com/docs/js/element).
   */
  onReady?: (element: stripeJs.StripeAffirmMessageElement) => any
}

export type AffirmMessageElementComponent = DefineComponent<AffirmMessageElementProps>

export interface AfterpayClearpayMessageElementProps {
  /**
   * Passes through to the [Element’s container](https://stripe.com/docs/js/element/the_element_container).
   */
  id?: string

  /**
   * Passes through to the [Element’s container](https://stripe.com/docs/js/element/the_element_container).
   */
  className?: string

  /**
   * An object containing [Element configuration options](https://stripe.com/docs/js/elements_object/create_element?type=afterpayClearpayMessage).
   */
  options?: stripeJs.StripeAfterpayClearpayMessageElementOptions

  /**
   * Triggered when the Element has been fully loaded, after initial method calls have been fired.
   * Called with a reference to the underlying [Element instance](https://stripe.com/docs/js/element).
   */
  onReady?: (element: stripeJs.StripeAfterpayClearpayMessageElement) => any
}

export type AfterpayClearpayMessageElementComponent = DefineComponent<AfterpayClearpayMessageElementProps>
