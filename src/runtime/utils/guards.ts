import type { Stripe } from '@stripe/stripe-js'

export const isArray = <T>(value: unknown): value is T[] => Array.isArray(value)

export const objectToString = Object.prototype.toString

export const toTypeString = (value: unknown) => objectToString.call(value)

export function objectKeys<T extends Record<string, unknown>>(obj: T): Array<keyof T> {
  return Object.keys(obj) as Array<keyof T>
}

export function isUnknownObject(raw: unknown): raw is { [key in PropertyKey]: unknown } {
  return raw !== null && typeof raw === 'object'
}

export function isPromise(raw: unknown): raw is PromiseLike<unknown> {
  return isUnknownObject(raw) && typeof raw.then === 'function'
}

// We are using types to enforce the `stripe` prop in this lib,
// but in an untyped integration `stripe` could be anything, so we need
// to do some sanity validation to prevent type errors.
export function isStripe(raw: unknown): raw is Stripe {
  return (
    isUnknownObject(raw)
    && typeof raw.elements === 'function'
    && typeof raw.createToken === 'function'
    && typeof raw.createPaymentMethod === 'function'
    && typeof raw.confirmCardPayment === 'function'
  )
}
