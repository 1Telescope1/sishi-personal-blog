<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>{{ route.meta.title }}</span>
        </div>
        <InfoButton></InfoButton>
      </template>
      <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import {useRoute} from 'vue-router'
import {useInitTable} from "@/hooks/useTable.ts";

const route = useRoute()

// const {
//   searchForm,
//   resetSearchForm,
//   tableData,
//   loading,
//   pageNum,
//   total,
//   pageSize,
//   getData,
//   handleDelete,
//   handleSelectionChange,
//   multipleTableRef,
//   handleMultiDelete,
//   multiSelectionIds,
// } = useInitTable({
//
// })

</script>

<style scoped lang="scss">
.card-header {
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
</style>