<template>
  <el-col :span="6" :offset="0">
    <el-form-item  :label="label" :label-width="labelWidth">
      <slot/>
    </el-form-item>
  </el-col>
</template>
<script setup>
const props=defineProps({
  label:String,
  labelWidth:String
})
</script>
