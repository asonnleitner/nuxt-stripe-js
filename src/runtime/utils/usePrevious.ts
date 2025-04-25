import type { Ref, ShallowRef, WritableComputedRef } from 'vue'
import { ref, toRaw, unref, watch } from 'vue'

type MaybeRef<T = unknown> = T | Ref<T> | ShallowRef<T> | WritableComputedRef<T>

export function usePrevious<T>(value: MaybeRef<T>): Ref<T> {
  let last = preserveReference(unref(value))
  const previous = ref<T>(last)

  watch(() => unref(value), (current) => {
    previous.value = last
    last = preserveReference(current)
  }, { deep: true, flush: 'sync' })

  return previous as Ref<T>
}

function preserveReference<T>(val: T): T {
  const raw = toRaw(val)

  // Directly return primitive values
  if (raw === null || typeof raw !== 'object')
    return raw

  // Directly return Promises, Functions, and other non-cloneable objects
  if (raw instanceof Promise || typeof raw === 'function' || raw instanceof Error || raw instanceof RegExp)
    return raw

  // For regular objects, attempt to clone
  try {
    return structuredClone(raw)
  }
  catch {
    try {
      return JSON.parse(JSON.stringify(raw))
    }
    catch {
      // If all else fails, just return the original reference
      return raw
    }
  }
}
