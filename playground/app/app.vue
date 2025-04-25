<script setup lang="ts">
import { loadStripe } from '@stripe/stripe-js'

const stripe = ref<any>(null)
// const stripePromise = loadStripe('pk_test_Zqod6VDqXPnjAQNr14uLOyRb00UIUWladE')

const elementsOptions = {
  mode: 'payment' as const,
  amount: 1099,
  currency: 'usd',
}

async function onClick() {
  // stripe.value = null
  if (!stripe.value) {
    stripe.value = loadStripe('pk_test_Zqod6VDqXPnjAQNr14uLOyRb00UIUWladE')
  }
  else {
    stripe.value = null
  }
}
</script>

<template>
  <div>
    <Elements
      :stripe="stripe"
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
      <Checkout />
    </Elements>

    <button @click="onClick">
      Load Stripe
    </button>
  </div>
</template>
