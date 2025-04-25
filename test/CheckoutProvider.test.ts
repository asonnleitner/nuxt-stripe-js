import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { h } from 'vue'
import CheckoutProvider from '../src/runtime/components/CheckoutProvider.vue'
import { useCheckout } from '../src/runtime/composables/useCheckout'
import { useStripe } from '../src/runtime/composables/useStripe'
import * as mocks from './mocks'

describe('checkoutProvider', () => {
  let mockStripe: any
  let mockStripePromise: any
  let mockCheckoutSdk: any
  let mockSession: any
  // eslint-disable-next-line unused-imports/no-unused-vars
  let consoleError: any
  // eslint-disable-next-line unused-imports/no-unused-vars
  let consoleWarn: any
  let mockCheckout: any

  beforeEach(() => {
    mockStripe = mocks.mockStripe()
    mockStripePromise = Promise.resolve(mockStripe)
    mockCheckoutSdk = mocks.mockCheckoutSdk()
    mockStripe.initCheckout.mockResolvedValue(mockCheckoutSdk)
    mockSession = mocks.mockCheckoutSession()
    mockCheckoutSdk.session.mockReturnValue(mockSession)

    const { on: _on, session: _session, ...actions } = mockCheckoutSdk

    mockCheckout = { ...actions, ...mockSession }

    vi.spyOn(console, 'error')
    vi.spyOn(console, 'warn')
    consoleError = console.error
    consoleWarn = console.warn
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('injects CheckoutProvider with the useCheckout hook', async () => {
    const TestComponent = {
      template: '<div />',
      setup() {
        const checkout = useCheckout()
        return { checkout }
      },
    }

    const wrapper = mount(CheckoutProvider, {
      props: {
        stripe: mockStripe,
        options: {
          fetchClientSecret: async () => 'cs_123',
        },
      },
      slots: {
        default: () => h(TestComponent),
      },
    })

    await wrapper.vm.$nextTick()
    const testComponent = wrapper.findComponent(TestComponent)
    expect(testComponent.vm.checkout).toStrictEqual(mockCheckout)
  })

  it('injects CheckoutProvider with the useStripe hook', async () => {
    const TestComponent = {
      template: '<div />',
      setup() {
        const stripe = useStripe()
        return { stripe }
      },
    }

    const wrapper = mount(CheckoutProvider, {
      props: {
        stripe: mockStripe,
        options: {
          fetchClientSecret: vi.fn().mockResolvedValue('cs_123'),
        },
      },
      slots: {
        default: () => h(TestComponent),
      },
    })

    await wrapper.vm.$nextTick()
    const testComponent = wrapper.findComponent(TestComponent)
    expect(testComponent.vm.stripe).toStrictEqual(mockStripe)
  })

  it('allows a transition from null to a valid Stripe object', async () => {
    const TestComponent = {
      template: '<div />',
      setup() {
        const checkout = useCheckout()
        return { checkout }
      },
    }

    const wrapper = mount(CheckoutProvider, {
      props: {
        stripe: null,
        options: {
          fetchClientSecret: async () => 'cs_123',
        },
      },
      slots: {
        default: () => h(TestComponent),
      },
    })

    const testComponent = wrapper.findComponent(TestComponent)
    expect(testComponent.vm.checkout).toBe(null)

    await wrapper.setProps({ stripe: mockStripe })

    expect(testComponent.vm.checkout).toStrictEqual(mockCheckout)
  })

  it('works with a Promise resolving to a valid Stripe object', async () => {
    const TestComponent = {
      template: '<div />',
      setup() {
        const checkout = useCheckout()
        return { checkout }
      },
    }

    const wrapper = mount(CheckoutProvider, {
      props: {
        stripe: mockStripePromise,
        options: {
          fetchClientSecret: async () => 'cs_123',
        },
      },
      slots: {
        default: () => h(TestComponent),
      },
    })

    const testComponent = wrapper.findComponent(TestComponent)
    expect(testComponent.vm.checkout).toBe(null)

    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(testComponent.vm.checkout).toStrictEqual(mockCheckout)
  })
})
