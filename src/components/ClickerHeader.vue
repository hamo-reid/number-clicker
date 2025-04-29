<template>
  <div class="header">
    <h1>Clicker</h1>
    <h3 v-if="gameStore.isReady">下一个： {{ gameStore.nextNumber }}</h3>
  </div>
</template>
<script setup lang="ts">
import { useGameStore } from '../store'
const gameStore = useGameStore()

</script>
<style lang="css" scoped>
.header {
  display: flex;
  flex-direction: column;
  height: 100px; 
  align-items: center;
}
</style>