import { describe, expect, it } from 'vitest'
import { nextTick, ref } from 'vue'
import { usePrevious } from '../src/runtime/utils/usePrevious'

describe('usePrevious', () => {
  it('returns the initial value if it has not yet been changed', () => {
    const current = ref('foo')
    const prev = usePrevious(current)

    expect(prev.value).toBe('foo')
  })

  it('returns the previous value after the it has been changed - string', async () => {
    const current = ref('foo')
    const prev = usePrevious(current)

    current.value = 'bar'
    await nextTick()
    expect(prev.value).toBe('foo')

    current.value = 'baz'
    await nextTick()
    expect(prev.value).toBe('bar')

    current.value = 'buz'
    await nextTick()
    expect(prev.value).toBe('baz')
  })

  it('returns the previous value after the it has been changed - object', async () => {
    const current = ref({ a: 1 })
    const prev = usePrevious(current)

    current.value.a = 2
    await nextTick()
    expect(prev.value).toEqual({ a: 1 })
  })

  it('returns the previous value after the it has been changed - array', async () => {
    const curr = ref<number[]>([1, 2, 3])
    const prev = usePrevious(curr)

    curr.value.push(4)
    await nextTick()
    expect(prev.value).toEqual([1, 2, 3])

    curr.value.splice(0, 1) // [2,3,4]
    await nextTick()
    expect(prev.value).toEqual([1, 2, 3, 4])
  })
})
