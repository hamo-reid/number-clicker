<template>
    <div class="click-map">
        <div class="map-row" v-for="(i, index) in 10" :key="index">
            <click-item v-for="j in 10" :key="j-1" :x="j-1" :y="i-1"/>
        </div>
    </div>
</template>
<script setup lang="ts">
import ClickItem from './ClickItem.vue';
</script>

<style lang="css" scoped>
.click-map {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.map-row {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 10%;
}
</style>