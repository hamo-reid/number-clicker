<template>
  <div class="footer">
    <div class="starter">
      <input ref="starterInput" type="text" placeholder="种子，留空则随机生成" />
      <button v-show="!gameStore.isReady" @click="handleGenerate">生成</button>
      <button @click="handleReset">重置</button>
    </div>
    <div class="result">
      <span class="result-label">结果：</span>
      <span class="result-value" v-show="gameStore.isEnd">{{ gameStore.duration }}S</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useGameStore } from '../store'

const gameStore = useGameStore()
const starterInput = useTemplateRef<HTMLInputElement>('starterInput')
const handleGenerate = () => {
  // 生成随机数，并触发父组件的generate事件
  if (starterInput.value) {
    const seed = +starterInput.value.value
    if (seed) {
      gameStore.generateGame(seed)
    } else {
      starterInput.value.value = gameStore.generateGame().toString()
    }
  }
}
const handleReset = () => {
  // 重置游戏
  gameStore.resetGame()
  if (starterInput.value) {
    starterInput.value.value = ''
  }
}
</script>
<style lang="css" scoped>
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  margin: 20px auto;
}
.starter {
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.starter input {
  height: 30px;
  margin-right: 10px;
}
.starter input {
  border: 2px solid transparent;
  width: 15em;
  height: 2.5em;
  padding-left: 0.8em;
  outline: none;
  overflow: hidden;
  background-color: #FFFFFF;
  border: 2px solid #E0E0E0;
  border-radius: 10px;
  transition: all 0.5s;
}

.starter input:hover,
.starter input:focus {
  border: 2px solid rgb(140,215,144);
  box-shadow: 0px 0px 0px 7px rgb(140,215,144, 20%);
  background-color: white;
}

.starter button {
  width: 50px;
  height: 30px;
  border: 2px solid #E0E0E0;
  background-color: #FFFFFF;
  border-radius: 10px;
  transition: all 0.5s;
  color:#285943;
  cursor: pointer;
}
.starter button:hover,
.starter button:focus {
  border: 2px solid rgb(140,215,144);
  box-shadow: 0px 0px 0px 7px rgb(140,215,144, 20%);
  background-color: white;
}
.result {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.result-label {
  font-size: 20px;
  margin-bottom: 10px;
}
.result-value {
  font-size: 30px;
}
</style>