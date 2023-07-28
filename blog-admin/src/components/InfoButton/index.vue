<template>
  <div>
    <el-button v-if="btns.includes('create')" @click="$emit('create')"
               :icon="Plus" type="success">新增
    </el-button>
    <el-popconfirm
      v-if="btns.includes('delete')"
      title="是否要删除选中记录？"
      confirmButtonText="确认"
      cancelButtonText="取消"
      @confirm="$emit('delete')"
    >
      <template #reference>
        <el-button type="danger" :icon="Delete">批量删除</el-button>
      </template>
    </el-popconfirm>
    <el-button v-if="btns.includes('refresh')" @click="$emit('refresh')"
               :icon="Refresh" type="primary">刷新
    </el-button>
    <el-button v-if="btns.includes('download')" @click="$emit('download')"
               :icon="Download" type="primary">导出数据
    </el-button>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {Plus, Delete, Download,Refresh} from '@element-plus/icons-vue'

import {computed} from "vue";

const props = defineProps({
  layout: {
    type: String,
    default: "create,refresh,delete,download,",
  },
});

const btns = computed(() => props.layout.split(","));

defineEmits(["create", "refresh", "delete", "download"]);


</script>

<style scoped lang="scss">

</style>