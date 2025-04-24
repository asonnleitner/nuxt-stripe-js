<script setup lang="ts">
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe('pk_test_Zqod6VDqXPnjAQNr14uLOyRb00UIUWladE')

const elementsOptions = {
  mode: 'payment' as const,
  amount: 1099,
  currency: 'usd',
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
