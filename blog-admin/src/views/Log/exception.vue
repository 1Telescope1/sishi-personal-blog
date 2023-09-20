<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>{{ route.meta.title }}</span>
        </div>

      </template>
      <div>
        <Search :model="searchForm" @search="getData" @reset="resetSearchForm">
          <SearchItem>
            <el-input clearable style="width: 220px;" size="default" v-model="searchForm.url"
                      placeholder="路径"></el-input>
          </SearchItem>
          <SearchItem>
            <el-input clearable style="width: 220px;" size="default" v-model="searchForm.method"
                      placeholder="请求方法"></el-input>
          </SearchItem>
        </Search>
        <InfoButton layout="delete,refresh" @refresh="getData" @delete="handleMultiDelete"></InfoButton>
      </div>
      <div>
        <el-table ref="multipleTableRef" @selection-change="handleSelectionChange" :data="tableData" stripe style="width: 100%" v-loading="loading">
          <el-table-column type="selection" width="55" />
          <el-table-column label="路径" prop="optUri" align="center">
          </el-table-column>
          <el-table-column label="请求方法"  align="center">
            <template #default="{row}">
              <el-tag v-if="row.optMethod" :type="methodTag(row.optMethod)">{{row.optMethod}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="异常信息" show-overflow-tooltip	 prop="exceptionInfo" align="center">
          </el-table-column>
          <el-table-column label="ip" prop="ipAddress" align="center">
          </el-table-column>
          <el-table-column label="异常时间" align="center">
            <template #default="{row}">
              {{formatDateTime(row.createTime)}}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200" align="center">
            <template #default="{row}">
              <el-popconfirm title="你确定要删除日志吗?" @confirm="handleDelete(row.id)">
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
import {reqDelException, reqDelExceptions, reqExceptionPage} from "@/api/log";
import {LogForm} from "@/model/data.ts";
import {methodTag} from "@/utils/methodTag.ts";
import {formatDateTime} from "@/utils/date.ts";
import { Delete } from '@element-plus/icons-vue'


const route = useRoute()

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
  searchForm:LogForm,
  getList:reqExceptionPage,
  delete:reqDelException,
  deleteList:reqDelExceptions
})


</script>

<style scoped lang="scss">
.card-header {
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
</style>