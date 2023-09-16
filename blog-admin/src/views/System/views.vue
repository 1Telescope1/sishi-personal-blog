<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>{{route.meta.title}}</span>
        </div>
      </template>
      <div>
<!--        <Search :model="searchForm" @search="getData" @reset="resetSearchForm">-->
<!--          <SearchItem>-->
<!--            <el-input clearable style="width: 220px;" size="default" v-model="searchForm.address"-->
<!--                      placeholder="物理地址"></el-input>-->
<!--          </SearchItem>-->
<!--        </Search>-->
        <InfoButton layout="delete,refresh" @refresh="getData" @delete="handleMultiDelete"></InfoButton>
      </div>
      <div>
        <el-table ref="multipleTableRef" @selection-change="handleSelectionChange" :data="tableData" stripe style="width: 100%" v-loading="loading">
          <el-table-column type="selection" width="55" />
          <el-table-column label="ip" prop="ip" align="center">
          </el-table-column>
          <el-table-column label="物理地址" prop="address" align="center">
          </el-table-column>
          <el-table-column label="浏览时间" align="center">
            <template #default="{row}">
              {{formatDateTime(row.createTime).substring(0,10)}}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200" align="center">
            <template #default="{row}">
              <el-popconfirm title="你确定要删除聊天吗?" @confirm="handleDelete(row.id)">
                <template #reference>
                  <el-button :icon="Delete"  type="danger">删除</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination background layout="prev, pager ,next" :total="total" :current-page="pageNum"
                         :page-size="pageSize" @current-change="getData" />
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import {useRoute} from 'vue-router'
import {useInitTable} from "@/hooks/useTable.ts";
import {chatForm} from "@/model/data.ts";
import {reqDelView, reqDelViewsByIds, reqViewsPage} from "@/api/views";
import {formatDateTime} from "@/utils/date.ts";
import { Delete } from '@element-plus/icons-vue'


const route=useRoute()


const {
  searchForm,
  resetSearchForm,
  tableData,
  loading,
  pageNum,
  total,
  pageSize,
  getData,
  handleDelete,
  handleSelectionChange,
  multipleTableRef,
  handleMultiDelete,
} = useInitTable({
  searchForm:chatForm,
  getList:reqViewsPage,
  delete:reqDelView,
  deleteList:reqDelViewsByIds
})

</script>

<style scoped lang="scss">

</style>