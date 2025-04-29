<template>
  <div class="container">
    <clicker-header />
    <click-map ref="clickMap" @start="handleStart" @finish="handleFinish" />
    <clicker-footer ref="clickerFooter" @generate="handleGenerate" />
  </div>
</template>

<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';
import dayjs, { Dayjs } from 'dayjs';
import ClickMap from './ClickMap.vue';
import ClickerHeader from './ClickerHeader.vue';
import ClickerFooter from './ClickerFooter.vue';

const clickMap = useTemplateRef<InstanceType<typeof ClickMap>>("clickMap");
const clickerFooter = useTemplateRef<InstanceType<typeof ClickerFooter>>("clickerFooter");

const startTime = ref<Dayjs>();
function handleGenerate(seed: number) {
  startTime.value = undefined;
  clickMap.value?.generateMap(seed);
}
function handleStart() {
  startTime.value = dayjs();
  console.log(startTime.value);
}
function handleFinish() {
  if (startTime.value) {
    const endTime = dayjs();
    const duration = endTime.diff(startTime.value, 'second', true);
    clickerFooter.value?.setResult(duration);
  }
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
</style>