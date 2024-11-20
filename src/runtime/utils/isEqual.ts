import { isArray, isUnknownObject, objectKeys, toTypeString } from './guards'

const PLAIN_OBJECT_STR = '[object Object]'

export function isEqual(left: unknown, right: unknown): boolean {
  if (!isUnknownObject(left) || !isUnknownObject(right))
    return left === right

  const leftArray = isArray(left)
  const rightArray = isArray(right)

  if (leftArray !== rightArray)
    return false

  const leftPlainObject = toTypeString(left) === PLAIN_OBJECT_STR
  const rightPlainObject = toTypeString(right) === PLAIN_OBJECT_STR

  if (leftPlainObject !== rightPlainObject)
    return false

  // Not sure what sort of special object this is (regexp is one option), so fallback to reference check.
  if (!leftPlainObject && !leftArray)
    return left === right

  const leftKeys = objectKeys(left)
  const rightKeys = objectKeys(right)

  if (leftKeys.length !== rightKeys.length)
    return false

  const keySet: Record<PropertyKey, boolean> = {}

  for (let i = 0; i < leftKeys.length; i += 1)
    keySet[leftKeys[i]!] = true

  for (let i = 0; i < rightKeys.length; i += 1)
    keySet[rightKeys[i]!] = true

  const allKeys = Object.keys(keySet)

  if (allKeys.length !== leftKeys.length)
    return false

  const l = left
  const r = right

  const pred = (key: string): boolean => isEqual(l[key], r[key])

  return allKeys.every(pred)
}
