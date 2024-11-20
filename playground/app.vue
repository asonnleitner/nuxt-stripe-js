<script setup lang="ts">
import type { StripeExpressCheckoutElementConfirmEvent, StripeExpressCheckoutElementOptions, StripeExpressCheckoutElementReadyEvent } from '@stripe/stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe('pk_test_Zqod6VDqXPnjAQNr14uLOyRb00UIUWladE')
const showButtons = ref(false)

const elementsOptions = {
  mode: 'payment' as const,
  amount: 1099,
  currency: 'usd',
}

function handleConfirm(event: StripeExpressCheckoutElementConfirmEvent) {
  console.log('Confirm event:', event)
  // const {error} = await stripe.confirmPayment({
  //   // `Elements` instance that's used to create the Express Checkout Element.
  //   elements,
  //   // `clientSecret` from the created PaymentIntent
  //   clientSecret,
  //   confirmParams: {
  //     return_url: 'https://example.com/order/123/complete',
  //   },
  //   // Uncomment below if you only want redirect for redirect-based payments.
  //   // redirect: 'if_required',
  // });

  // if (error) {
  // This point is reached only if there's an immediate error when confirming the payment. Show the error to your customer (for example, payment details incomplete).
  // } else {
  // Your customer will be redirected to your `return_url`.
  // }
}

function handleReady(event: StripeExpressCheckoutElementReadyEvent) {
  const { availablePaymentMethods } = event
  console.log('Ready event:', event)
  if (!availablePaymentMethods) {
    // No buttons available
  }
  else {
    // Show buttons
    showButtons.value = true
  }
}

const expressCheckoutOptions: StripeExpressCheckoutElementOptions = {
  emailRequired: true,
  layout: {
    maxColumns: 1,
    overflow: 'auto',
  },
  buttonType: {
    googlePay: 'book',
    applePay: 'book',
    paypal: 'buynow',
  },
  buttonTheme: {
    applePay: 'black',
  },
  buttonHeight: 55,
}
</script>

<template>
  <div>
    <Elements
      :stripe="stripePromise"
      :options="elementsOptions"
    >
      <CardElement />
      <!--      <ExpressCheckoutElement -->
      <!--        :style="{ -->
      <!--          visibility: showButtons ? 'visible' : 'hidden', -->
      <!--        }" -->
      <!--        :options="expressCheckoutOptions" -->
      <!--        @ready="(e) => { -->
      <!--          handleReady(e) -->
      <!--        }" -->
      <!--        @confirm="(e) => { -->
      <!--          handleConfirm(e) -->
      <!--        }" -->
      <!--      /> -->
    </Elements>
  </div>
</template>
