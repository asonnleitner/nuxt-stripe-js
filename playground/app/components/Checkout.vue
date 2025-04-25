<script setup lang="ts">
// const stripe = useStripe()

function onSubmit(event: Event) {
  const form = event.target as HTMLFormElement
  const formData = new FormData(form)
  const data = Object.fromEntries(formData.entries())

  // eslint-disable-next-line no-console
  console.log('Form Data:', data)
}
</script>

<template>
  <div>
    <form @submit.prevent="onSubmit">
      <fieldset>
        <legend>Customer Details</legend>

        <label for="name">Name</label>
        <input id="name" type="text" name="name" required>

        <label for="email">Email</label>
        <input id="email" type="email" name="email" required>
      </fieldset>

      <fieldset>
        <legend>Shipping Details</legend>

        <label for="address">Address</label>
        <input id="address" type="text" name="address" required>
      </fieldset>

      <button type="submit">
        Place Order
      </button>
    </form>
  </div>
</template>
