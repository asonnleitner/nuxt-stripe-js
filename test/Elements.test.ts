import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { h, onMounted, ref } from 'vue'
import Elements from '../src/runtime/components/Elements.vue'
import ElementsConsumer from '../src/runtime/components/ElementsConsumer.vue'
import { useElements } from '../src/runtime/composables/useElements'
import { useStripe } from '../src/runtime/composables/useStripe'
import * as mocks from './mocks'

describe('elements', () => {
  let mockStripe: any
  let mockStripePromise: any
  let mockElements: any
  let consoleError: any
  let consoleWarn: any

  beforeEach(() => {
    mockStripe = mocks.mockStripe()
    mockStripePromise = Promise.resolve(mockStripe)
    mockElements = mocks.mockElements()
    mockStripe.elements.mockReturnValue(mockElements)

    vi.spyOn(console, 'error')
    vi.spyOn(console, 'warn')
    consoleError = console.error
    consoleWarn = console.warn
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('injects elements with the useElements hook', () => {
    const TestComponent = {
      template: '<div/>',
      setup() {
        const elements = useElements()
        expect(elements.value).toStrictEqual(mockElements)
        return {}
      },
    }

    mount(Elements, {
      props: {
        stripe: mockStripe,
      },
      slots: {
        default: () => h(TestComponent),
      },
    })
  })

  it('only creates elements once', () => {
    const TestComponent = {
      template: '<div/>',
      setup() {
        const elements = useElements()
        expect(elements.value).toStrictEqual(mockElements)
        return {}
      },
    }

    mount(Elements, {
      props: {
        stripe: mockStripe,
      },
      slots: {
        default: () => h(TestComponent),
      },
    })

    expect(mockStripe.elements).toHaveBeenCalledTimes(1)
  })

  it('injects stripe with the useStripe hook', () => {
    const TestComponent = {
      template: '<div/>',
      setup() {
        const stripe = useStripe()
        expect(stripe.value).toStrictEqual(mockStripe)
        return {}
      },
    }

    mount(Elements, {
      props: {
        stripe: mockStripe,
      },
      slots: {
        default: () => h(TestComponent),
      },
    })
  })

  it('provides elements and stripe with the ElementsConsumer component', () => {
    expect.assertions(2)

    mount(Elements, {
      props: {
        stripe: mockStripe,
      },
      slots: {
        default: () => h(ElementsConsumer, null, {
          default: (ctx: any) => {
            expect(ctx.elements).toStrictEqual(mockElements)
            expect(ctx.stripe).toStrictEqual(mockStripe)
            return h('div')
          },
        }),
      },
    })
  })

  it('provides given stripe instance on mount', () => {
    const TestComponent = {
      template: '<div/>',
      setup() {
        const stripe = useStripe()

        if (!stripe) {
          throw new Error('Stripe instance is null')
        }

        return {}
      },
    }

    expect(() => {
      mount(Elements, {
        props: {
          stripe: mockStripe,
        },
        slots: {
          default: () => h(TestComponent),
        },
      })
    }).not.toThrow('Stripe instance is null')
  })

  it('allows a transition from null to a valid Stripe object', async () => {
    const TestComponent = {
      template: '<div />',
      setup() {
        const elements = useElements()
        return { elements }
      },
    }

    const wrapper = mount(Elements, {
      props: {
        stripe: null,
      },
      slots: {
        default: () => h(TestComponent),
      },
    })

    const testComponent = wrapper.findComponent(TestComponent)
    expect(testComponent.vm.elements).toBe(null)

    await wrapper.setProps({
      stripe: mockStripe,
    })

    expect(testComponent.vm.elements).toStrictEqual(mockElements)
  })

  it('works with a Promise resolving to a valid Stripe object', async () => {
    const TestComponent = {
      template: '<div/>',
      setup() {
        const elements = useElements()
        return { elements }
      },
    }

    // First render with a Promise
    const wrapper = mount(Elements, {
      props: {
        stripe: mockStripePromise,
      },
      slots: {
        default: () => h(TestComponent),
      },
    })

    const testComponentVM = wrapper.findComponent(TestComponent).vm

    expect(testComponentVM.elements).toBe(null)

    await wrapper.vm.$nextTick()

    expect(testComponentVM.elements).toStrictEqual(mockElements)
  })

  it('allows a transition from null to a valid Promise', async () => {
    const TestComponent = {
      template: '<div />',
      setup() {
        const elements = useElements()
        return { elements }
      },
    }

    const wrapper = mount(Elements, {
      props: {
        stripe: null,
      },
      slots: {
        default: () => h(TestComponent),
      },
    })

    const testComponent = wrapper.findComponent(TestComponent)
    expect(testComponent.vm.elements).toBe(null)

    await wrapper.setProps({
      stripe: mockStripePromise,
    })
    await wrapper.vm.$nextTick()

    expect(testComponent.vm.elements).toStrictEqual(mockElements)
  })

  it('does not set context if Promise resolves after Elements is unmounted', async () => {
    // Silence console output so test output is less noisy
    consoleError.mockImplementation(() => {})

    const wrapper = mount(Elements, {
      props: {
        stripe: mockStripePromise,
      },
      slots: {
        default: () => null,
      },
    })

    wrapper.unmount()

    await mockStripePromise

    expect(consoleError).not.toHaveBeenCalled()
  })

  it('works with a Promise resolving to null for SSR safety', async () => {
    const nullPromise = Promise.resolve(null)

    const TestComponent = {
      template: '<div v-if="elements">not empty</div>',
      setup() {
        const elements = useElements()
        return { elements }
      },
    }

    const wrapper = mount(Elements, {
      props: {
        stripe: nullPromise,
      },
      slots: {
        default: () => h(TestComponent),
      },
      attachTo: document.body,
    })

    expect(wrapper.html()).not.toContain('not empty')
    expect(wrapper.element.innerHTML).toBe('<!--v-if-->')

    await nullPromise
    await wrapper.vm.$nextTick()

    expect(wrapper.html()).not.toContain('not empty')
    expect(wrapper.element.innerHTML).toBe('<!--v-if-->')
  })

  it('errors when props.stripe is `undefined`', () => {
    // Silence console output so test output is less noisy
    consoleError.mockImplementation(() => {})

    expect(() =>
      mount(Elements, {
        props: {
          stripe: undefined,
        },
      }),
    ).toThrow('Invalid prop `stripe` supplied to `Elements`.')
  })

  it('errors when props.stripe is `false`', () => {
    // Silence console output so test output is less noisy
    consoleError.mockImplementation(() => {})

    expect(() =>
      mount(Elements, {
        props: {
          stripe: false,
        },
      }),
    ).toThrow('Invalid prop `stripe` supplied to `Elements`.')
  })

  it('errors when props.stripe is a string', () => {
    // Silence console output so test output is less noisy
    consoleError.mockImplementation(() => {})

    expect(() =>
      mount(Elements, {
        props: {
          stripe: 'foo',
        },
      }),
    ).toThrow('Invalid prop `stripe` supplied to `Elements`.')
  })

  it('errors when props.stripe is a some other object', () => {
    // Silence console output so test output is less noisy
    consoleError.mockImplementation(() => {})

    expect(() =>
      mount(Elements, {
        props: {
          stripe: { foo: 'bar' },
        },
      }),
    ).toThrow('Invalid prop `stripe` supplied to `Elements`.')
  })

  it('does not allow changes to a set Stripe object', async () => {
    // Silence console output so test output is less noisy
    consoleWarn.mockImplementation(() => {})

    // Create a wrapper with initial stripe object
    const wrapper = mount(Elements, {
      props: {
        stripe: mockStripe,
      },
      slots: {
        default: () => h('div', 'Child component'),
      },
    })

    // Create another mock stripe object
    const mockStripe2 = mocks.mockStripe()

    // Update the props with the new stripe object
    await wrapper.setProps({
      stripe: mockStripe2,
    })

    // Verify that elements was only called on the first stripe object
    expect(mockStripe.elements.mock.calls).toHaveLength(1)
    expect(mockStripe2.elements.mock.calls).toHaveLength(0)

    // Verify warning was logged
    expect(consoleWarn).toHaveBeenCalledWith('Unsupported prop change on Elements: You cannot change the `stripe` prop after setting it.')
  })

  it('allows changes to options via elements.update after setting the Stripe object', async () => {
    const wrapper = mount(Elements, {
      props: {
        stripe: mockStripe,
        options: { foo: 'foo' },
      },
    })

    // Update the props
    await wrapper.setProps({
      stripe: mockStripe,
      options: { bar: 'bar' },
    })

    // Verify behavior
    expect(mockStripe.elements).toHaveBeenCalledWith({ foo: 'foo' })
    expect(mockStripe.elements).toHaveBeenCalledTimes(1)

    expect(mockElements.update).toHaveBeenCalledWith({ bar: 'bar' })
    expect(mockStripe.elements).toHaveBeenCalledTimes(1)
  })

  it('allows options changes before setting the Stripe object', async () => {
    const wrapper = mount(Elements, {
      props: {
        stripe: null,
        options: { foo: 'foo' },
      },
    })

    await wrapper.setProps({
      stripe: mockStripe,
      options: { bar: 'bar' },
    })

    expect(consoleWarn).not.toHaveBeenCalled()

    await wrapper.setProps({
      stripe: mockStripe,
      options: { bar: 'bar' },
    })

    expect(mockStripe.elements).toHaveBeenCalledWith({ bar: 'bar' })
  })

  it('throws when trying to call useElements outside of Elements context', () => {
    const TestComponent = {
      template: '<div/>',
      setup() {
        return {
          elements: useElements(),
        }
      },
    }

    expect(() => {
      mount(TestComponent)
    }).toThrow('Could not find Elements context; You need to wrap the part of your app that calls useElements() in an <Elements> provider.')
  })

  it('throws when trying to call useStripe outside of Elements context', () => {
    const TestComponent = {
      template: '<div/>',
      setup() {
        return {
          elements: useStripe(),
        }
      },
    }

    expect(() => {
      mount(TestComponent)
    }).toThrow(
      'Could not find Elements context; You need to wrap the part of your app that calls useStripe() in an <Elements> provider.',
    )
  })

  it('throws when trying to mount an <ElementsConsumer> outside of Elements context', () => {
    // Silence console output so test output is less noisy
    consoleError.mockImplementation(() => {})

    const TestComponent = {
      render() {
        return h(ElementsConsumer, null, {
          default: () => h('div'),
        })
      },
    }

    expect(() => mount(TestComponent)).toThrow(
      'Could not find Elements context; You need to wrap the part of your app that mounts <ElementsConsumer> in an <Elements> provider.',
    )
  })

  it('creates only one elements instance when updated while resolving Stripe promise', async () => {
    let updateResolver: any = () => {}
    const updateResult = new Promise<void>((resolve) => {
      updateResolver = resolve
    })

    let stripePromiseResolve: any = () => {}
    const stripePromise = new Promise<any>((resolve) => {
      stripePromiseResolve = resolve
    })

    // Only resolve stripe once the options have been updated
    updateResult.then(() => {
      stripePromiseResolve(mockStripe)
    })

    // Create a test component that will trigger a re-render
    const TestComponent = {
      template: '<Elements :stripe="stripePromise" :options="options" />',
      components: { Elements },
      setup() {
        const count = ref(0)
        const options = ref({ appearance: { theme: 'flat' } })

        // Simulate React's forceRerender pattern with Vue reactivity
        onMounted(() => {
          setTimeout(() => {
            count.value += 1 // This will trigger a component update
            setTimeout(() => {
              updateResolver()
            })
          })
        })

        return {
          stripePromise,
          options,
        }
      },
    }

    mount(TestComponent)

    await updateResult

    await stripePromise

    // Wait for any pending promises to resolve
    await new Promise(resolve => setTimeout(resolve, 0))

    expect(mockStripe.elements).toHaveBeenCalledWith({
      appearance: { theme: 'flat' },
    })
    expect(mockStripe.elements).toHaveBeenCalledTimes(1)
  })
})
