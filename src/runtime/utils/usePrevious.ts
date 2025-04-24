import type { Ref, ShallowRef, WritableComputedRef } from 'vue'
import { ref, toRaw, unref, watch } from 'vue'

type MaybeRef<T = unknown> = T | Ref<T> | ShallowRef<T> | WritableComputedRef<T>

export function usePrevious<T>(value: MaybeRef<T>): Ref<T> {
  let last = clone(unref(value))
  const previous = ref<T>(last)

  watch(() => unref(value), (current) => {
    previous.value = last
    last = clone(current)
  }, { deep: true, flush: 'sync' })

  return previous as Ref<T>
}

function clone<T>(val: T): T {
  const raw = toRaw(val)
  if (raw === null || typeof raw !== 'object')
    return raw

  try {
    return structuredClone(raw)
  }
  catch {
    return JSON.parse(JSON.stringify(raw))
  }
}
