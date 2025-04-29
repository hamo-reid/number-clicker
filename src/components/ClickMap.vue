<template>
    <div class="click-map">
        <div class="map-row" v-for="(i, index) in 10" :key="index">
            <click-item v-for="j in 10" :key="j-1" :x="j-1" :y="i-1" @item-click="handleItemClick"/>
        </div>
    </div>
</template>
<script setup lang="ts">
import { provide, ref } from 'vue';
import ClickItem from './ClickItem.vue';
import {generateShuffledArray, array2d} from '../utils'

const randomMatrix = ref<number[][]>()

function generateMap(seed: number) {
  // 先重置所有状态
  randomMatrix.value = undefined
  isReady.value = false
  currentNumber.value = 0

  // 生成1-100的数字，乱序，且基于seed
  // 生成1-100的数字，乱序，且基于seed
  const randomArray = generateShuffledArray(seed)
  // 将一维数组二维化，shape [10,10]
  randomMatrix.value = array2d(randomArray, 10)

  isReady.value = true
}


provide('randomMatrix', randomMatrix)  // 将乱序数组提供给子组件

const currentNumber = ref(0) // 记录当前的数字，用于判断是否点击正确
provide('currentNumber', currentNumber) // 将当前数字提供给子组件

const isReady = ref(false) // 记录是否已经准备好
provide('isReady', isReady) // 将是否准备好提供给子组件

const isStarted = ref(false) // 记录是否开始游戏

const handleItemClick = (result: boolean) => {
  if (!isStarted.value) {
    isStarted.value = true
    emit('start')
  }
  if (result) {
    currentNumber.value++
  } else {
    return
  }
  if (currentNumber.value === 100) {
    console.log('游戏结束')
    emit('finish')
  }
}

const emit = defineEmits<{
  (e: "start"): void,
  (e: "finish"): void,
}>()

defineExpose({
  generateMap
})
</script>

<style lang="css" scoped>
.click-map {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: #f0f0f0;
}

.map-row {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 10%;
}
</style>