<script setup lang="ts">
import { useElementsContextWithUseCase } from '../composables/useElements'

const context = useElementsContextWithUseCase('mounts <ElementsConsumer>')
</script>

<template>
  <slot v-bind="context" />
</template>
