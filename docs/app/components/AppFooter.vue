<script setup lang="ts">
// const route = useRoute()
</script>

<template>
  <USeparator
    icon="i-simple-icons-nuxtdotjs"
    class="h-px"
  />

  <UFooter>
    <template #left>
      <NuxtLink
        to="https://github.com/asonnleitner/nuxt-stripe-js"
        target="_blank"
        class="text-sm text-(--ui-text-muted)"
      >
        Published under <span class="text-(--ui-text-highlighted)">MIT License</span>
      </NuxtLink>
    </template>

    <!-- <UNavigationMenu :items="items" variant="link" color="neutral" /> -->

    <template #right>
      <UButton
        aria-label="Nuxt Stripe JS on GitHub"
        icon="i-simple-icons-github"
        to="https://github.com/asonnleitner/nuxt-stripe-js"
        target="_blank"
        color="neutral"
        variant="ghost"
      />
    </template>
  </UFooter>
</template>
