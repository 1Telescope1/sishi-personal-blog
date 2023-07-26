<template>
  <el-form label-position="top" :model="model" label-width="80px" class="mb-3" size="small">
    <el-row >
      <slot/>
      <template v-if="showSearch">
        <slot name="show" />
      </template>
      <el-col :span="6" >
        <div class="flex items-center justify-end">
          <el-button type="primary" @click="$emit('search')">搜索</el-button>
          <el-button @click="$emit('reset')">重置</el-button>
          <el-button type="primary" text @click="showSearch = !showSearch" v-if="hasShowSearch">
            {{ showSearch ? '收起' : "展开" }}
            <el-icon>
              <ArrowUp v-if="showSearch"/>
              <ArrowDown v-else/>
            </el-icon>
          </el-button>
        </div>
      </el-col>
    </el-row>
  </el-form>
</template>
<script lang="ts" setup>
import { ref,useSlots } from 'vue';
defineProps({
  model:Object
})
defineEmits(["search","reset"])
const showSearch = ref(false)
// 获取有哪些插槽
const slots = useSlots()
// !!是把有值转为true，无值转为false
const hasShowSearch = !!slots.show
</script>