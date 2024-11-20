import { addComponent, addImportsDir, createResolver, defineNuxtModule } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-stripe-js',
    configKey: 'stripe',
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(_options, nuxt) {
    const resolver = createResolver(import.meta.url)
    const runtimeDir = resolver.resolve('./runtime')

    nuxt.options.alias['#stripe'] = runtimeDir

    addImportsDir(resolver.resolve('runtime/composables'))

    addComponent({
      name: 'Elements',
      filePath: resolver.resolve('./runtime/components/Elements'),
    })

    const components = ['AuBankAccountElement', 'CardElement', 'CardNumberElement', 'CardExpiryElement', 'CardCvcElement', 'FpxBankElement', 'IbanElement', 'IdealBankElement', 'P24BankElement', 'EpsBankElement', 'PaymentElement', 'PaymentRequestButtonElement', 'LinkAuthenticationElement', 'AddressElement', 'PaymentMethodMessagingElement', 'AffirmMessageElement', 'AfterpayClearpayMessageElement', 'ExpressCheckoutElement', 'ShippingAddressElement', 'CurrencySelectorElement']

    components.map(name => addComponent({
      name,
      export: name,
      filePath: resolver.resolve('./runtime/components'),
    }))
  },
})
