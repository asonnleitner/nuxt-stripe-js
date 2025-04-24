import type * as stripeJs from '@stripe/stripe-js'
import type { Ref } from 'vue'
import type { UnknownOptions } from '../utils/extractAllowedOptionsUpdates'
import { computed, defineComponent, h, onBeforeUnmount, ref, toRefs, watch, watchEffect } from 'vue'
import { useElementsOrCheckoutSdkContextWithUseCase } from '../composables/useCheckout'
import { extractAllowedOptionsUpdates } from '../utils/extractAllowedOptionsUpdates'
import { usePrevious } from '../utils/usePrevious'

const capitalized = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

function createElementComponent(type: stripeJs.StripeElementType) {
  const displayName = `${capitalized(type)}Element`

  return defineComponent({
    name: displayName,
    __elementType: type,

    props: {
      id: String,
      options: { type: Object, default: () => ({}) },
    },

    setup: (props, { slots, emit, attrs }) => {
      const { options } = toRefs(props) as { options: Ref<UnknownOptions> }
      const ctx = useElementsOrCheckoutSdkContextWithUseCase(`mounts <${displayName}>`)
      const elements = computed(() => 'elements' in ctx ? ctx.elements : null)
      const checkoutSdk = computed(() => 'checkoutSdk' in ctx ? ctx.checkoutSdk : null)
      const element = ref<stripeJs.StripeElement | null>(null)
      const elementRef = ref<stripeJs.StripeElement | null>(null)
      const domNode = ref<HTMLElement | null>(null)

      watch(element, (element) => {
        element?.on('blur', event => emit('blur', event))
        element?.on('focus', event => emit('focus', event))
        element?.on('escape', event => emit('escape', event))
        element?.on('click', event => emit('click', event))
        element?.on('loaderror', event => emit('loaderror', event))
        element?.on('loaderstart', event => emit('loaderstart', event))
        element?.on('networkschange', event => emit('networkschange', event))
        element?.on('confirm', event => emit('confirm', event))
        element?.on('cancel', event => emit('cancel', event))
        element?.on('shippingaddresschange', event => emit('shippingaddresschange', event))
        element?.on('shippingratechange', event => emit('shippingratechange', event))
        element?.on('change', event => emit('change', event))
        // Passes through the event, which includes visible PM types. For other Elements, pass through the Element itself.
        element?.on('ready', event => emit('ready', type === 'expressCheckout' ? event : element))
      }, { immediate: true })

      watchEffect(() => {
        if (elementRef.value === null && domNode.value !== null && (elements.value || checkoutSdk.value)) {
          let newElement: stripeJs.StripeElement | null = null
          if (checkoutSdk.value) {
            switch (type) {
              case 'payment':
                newElement = checkoutSdk.value.createPaymentElement(options.value)
                break
              case 'address':
                if ('mode' in options.value) {
                  const { mode, ...restOptions } = options.value
                  if (mode === 'shipping') {
                    newElement = checkoutSdk.value.createShippingAddressElement(restOptions)
                  }
                  else if (mode === 'billing') {
                    newElement = checkoutSdk.value.createBillingAddressElement(restOptions)
                  }
                  else {
                    throw new Error('Invalid options.mode. mode must be \'billing\' or \'shipping\'.')
                  }
                }
                else {
                  throw new Error('You must supply options.mode. mode must be \'billing\' or \'shipping\'.')
                }
                break
              case 'expressCheckout':
                newElement = checkoutSdk.value.createExpressCheckoutElement(options.value) as stripeJs.StripeExpressCheckoutElement
                break
              case 'currencySelector':
                newElement = checkoutSdk.value.createCurrencySelectorElement()
                break
              default:
                throw new Error(`Invalid Element type ${displayName}. You must use either the <PaymentElement />, <AddressElement :options="{ mode: 'shipping' }" />, <AddressElement :options="{ mode: 'billing' }" />, or <ExpressCheckoutElement />.`)
            }
          }
          else if (elements.value) {
            newElement = elements.value.create(type, options.value)
          }

          // Store element in a ref to ensure it's _immediately_ available in cleanup hooks in StrictMode
          elementRef.value = newElement
          // Store element in state to facilitate event listener attachment
          element.value = newElement

          if (newElement) {
            newElement.mount(domNode.value)
          }
        }
      })

      onBeforeUnmount(() => {
        if (elementRef.value && typeof elementRef.value.destroy === 'function') {
          try {
            elementRef.value.destroy()
            elementRef.value = null
          }
          catch {
            // Do nothing
          }
        }
      })

      const prevOptions = usePrevious(options)
      watch([options, prevOptions], () => {
        if (!elementRef.value)
          return

        const updates = extractAllowedOptionsUpdates(options.value, prevOptions.value, ['paymentRequest'])

        if (updates && 'update' in elementRef.value) {
          elementRef.value.update(updates)
        }
      })

      return () => h('div', { id: props.id, class: attrs.class, ref: domNode }, slots.default?.())
    },
  })
}

export default createElementComponent
