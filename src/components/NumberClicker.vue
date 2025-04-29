<template>
  <div class="container">
    <clicker-header />
    <click-map ref="clickMap"/>
    <clicker-footer ref="clickerFooter"/>
  </div>
</template>

<script setup lang="ts">
import { useTemplateRef } from 'vue';
import ClickMap from './ClickMap.vue';
import ClickerHeader from './ClickerHeader.vue';
import ClickerFooter from './ClickerFooter.vue';

const clickMap = useTemplateRef<InstanceType<typeof ClickMap>>("clickMap");
const clickerFooter = useTemplateRef<InstanceType<typeof ClickerFooter>>("clickerFooter");
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