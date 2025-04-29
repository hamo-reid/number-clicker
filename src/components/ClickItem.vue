<template>
  <div class="click-item" :class="{'success': isSuccess}" @click="handleClick">
    <span
      v-show="!isSuccess"
      >{{ gameStore.isReady ? gameStore.gameMatrix![x][y] : ""  }}</span
    >
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import { useGameStore } from "../store";

const gameStore = useGameStore();
const props = defineProps<{
  x: number;
  y: number;
}>();
const isSuccess = ref(false);
watch(() => gameStore.isReady, () => {
  isSuccess.value = false;
});

function handleClick() {
  if (gameStore.isReady && !isSuccess.value) {
    isSuccess.value = gameStore.checkClick(props.x, props.y);
  }
}
</script>

<style lang="css" scoped>
.click-item {
  width: 50px;
  height: 50px;
  border: 1px solid #8CD790;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  cursor: pointer;
}
.click-item span {
  font-size: 20px;
}
.click-item:not(.success):hover {
  font-weight: 600;
  border: 2px solid #285943;
}
.click-item.success {
  background-color: #8CD790;
  color: white;
}
</style>
