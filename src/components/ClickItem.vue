<template>
  <div class="click-item" :class="{'success': isSuccess}" @click="handleClick">
    {{ isReady ? randomMatrix![x][y] : ""  }}
  </div>
</template>
<script setup lang="ts">
import { inject, ref } from 'vue';
import type { Ref } from 'vue';
const props = defineProps<{
  x: number,
  y: number,
}>();
const emit = defineEmits<{
  (e: 'itemClick', result: boolean): void
}>()
const randomMatrix = inject<Ref<number[][]>>('randomMatrix')
const currentNumber = inject<Ref<number>>('currentNumber')
const isReady = inject<Ref<boolean>>('isReady')
const isSuccess = ref(false)

function handleClick() {
  // 判断当前的数字的下一个数字是否和当前点击的数字相同，相同则点击成功，否则失败
  if (randomMatrix?.value[props.x][props.y] === currentNumber!.value + 1) {
    isSuccess.value = true
    emit('itemClick', true)
  } else {
    emit('itemClick', false)
  }
}
</script>

<style lang="css" scoped>
.click-item {
  width: 50px;
  height: 50px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
}
.click-item.success {
  background-color: green;
  color: white;
}
</style>