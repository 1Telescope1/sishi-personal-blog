<template>
  <span>{{ d.num.toFixed(0) }}</span>
</template>

<script lang="ts" setup>
import {reactive, watch} from 'vue'
import gsap from "gsap"

const props = defineProps({
  value: {
    type: Number,
    default: 0
  }
})

const d = reactive({
  num: 0
})

const AnimteToValue = () => {
  gsap.to(d, {
    duration: 1,
    num: props.value
  })
}

AnimteToValue()

watch(() => props.value, () => AnimteToValue())

</script>

<style scoped>

</style>
