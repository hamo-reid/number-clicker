<template>
  <div class="footer">
    <div class="starter">
      <input ref="starterInput" type="text" placeholder="种子，留空则随机生成" />
      <button @click="handleGenerate">生成</button>
    </div>
    <div class="result">
      <span class="result-label">结果：</span>
      <span class="result-value" v-show="result">{{ result }}S</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useTemplateRef, ref } from 'vue'
const starterInput = useTemplateRef<HTMLInputElement>('starterInput')
const handleGenerate = () => {
  // 生成随机数，并触发父组件的generate事件
  let random
  if (starterInput.value?.value) {
    random = Number(starterInput.value.value)
  } else {
    random = Math.floor(Math.random() * 100000)
  }
  emit('generate', random)
  if (starterInput.value) {
    starterInput.value.value = random.toString()
  }
}
const emit = defineEmits<{
  (e: 'generate', seed: number): void
}>()
const result = ref<number>()
function setResult(time: number) {
  result.value = time
}
defineExpose({
  setResult,
})
</script>
<style lang="css" scoped>
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.starter {
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}
.starter input {
  height: 30px;
  margin-right: 10px;
  padding: 0 10px;
}
.starter button {
  width: 50px;
  height: 30px;
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