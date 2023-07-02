<template>
  <svg
    :xmlns="xmlns"
    :class="classStyle"
    :fill="fill"
    :viewBox="viewBox"
    :stroke="stroke"
  >
    <path
      :stroke-linecap="strokeLinecap"
      :stroke-linejoin="strokeLinejoin"
      :stroke-width="strokeWidth"
      :d=d
    />
  </svg>
</template>

<script setup lang="ts">
const props = defineProps<{
  xmlns: {
    type: string,
    default: "http://www.w3.org/2000/svg"
    required: false
  };
  classStyle:{
    type: string,
    default: "h-5 w-5"
    required: false
  }
  fill:{
    type: string,
    default: "none"
    required: false
  }
  viewBox:{
    type: string,
    default: "0 0 24 24"
    required: false
  }
  stroke:{
    type: string,
    default: "currentColor"
    required: false
  }
  strokeLinecap:{
    type: string,
    default: "round"
    required: false
  }
  strokeLinejoin:{
    type: string,
    default: "round"
    required: false
  }
  strokeWidth:{
    type: string,
    default: "2"
    required: false
  }
  d:{
    type: string,
    required: true
  }
}>();
console.log(props);

</script>

<style scoped></style>
