<script setup lang="ts">
</script>

<template>
  <UMain>
    <UPageHero
      orientation="horizontal"
      :ui="{
        container: 'pb-0 sm:pb-0 lg:py-0',
        title: 'lg:mt-16',
        links: 'lg:mb-16',
        description: 'text-balance',
      }"
    >
      <template #title>
        Nuxt <br> <span class="text-primary">Stripe JS</span>
      </template>
      <template #description>
        Nuxt Stripe JS
      </template>

      <!--      <LazySkyBg is-index /> -->
    </UPageHero>

    <USeparator />
  </UMain>
</template>
