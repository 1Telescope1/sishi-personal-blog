<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>{{route.meta.title}}</span>
        </div>
      </template>
      <div>
        <Search :model="searchForm" @search="getData" @reset="resetSearchForm">
          <SearchItem>
            <el-input clearable style="width: 220px;" size="default" v-model="searchForm.nickname"
                      placeholder="用户昵称"></el-input>
          </SearchItem>
        </Search>
      </div>
      <div>
        <el-table ref="multipleTableRef" @selection-change="handleSelectionChange" :data="tableData" stripe style="width: 100%" v-loading="loading">
          <el-table-column type="selection" width="55" />
          <el-table-column label="头像" width="100" align="center">
            <template #default="{row}">
              <img v-viewer class="img" :src="row.avatar" alt="">
            </template>
          </el-table-column>
          <el-table-column label="昵称" prop="nickname" align="center">
          </el-table-column>
          <el-table-column label="发布时间" align="center">
            <template #default="{row}">
              {{formatDateTime(row.createTime).substring(0,10)}}
            </template>
          </el-table-column>
          <el-table-column label="是否禁用" align="center">
            <template #default="{row}">
              <el-switch
                v-model="row.isDisable"
                :active-value="1"
                :inactive-value="0"
                class="ml-2"
                style="--el-switch-on-color: #ff4949; --el-switch-off-color: #13ce66"
                @click="updateStatus(row.id,row.isDisable)"
                :loading="statusLoading"
              />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200" align="center">
            <template #default="{row}">
              <el-button :icon="Edit" size="small" type="primary" @click="handleEdit(row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination background layout="prev, pager ,next" :total="total" :current-page="pageNum"
                         :page-size="pageSize" @current-change="getData" />
        </div>
      </div>
    </el-card>

    <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
      <el-form ref="formRef" :model="form">
        <el-form-item label="标签名" :label-width="formLabelWidth">
          <el-input v-model="form.tagName" autocomplete="off" />
        </el-form-item>
      </el-form>
    </FormDrawer>
  </div>
</template>

<script setup lang="ts">
import {ref,reactive,onMounted,isRef} from 'vue'
import {useRoute} from 'vue-router'
import {useInitTable} from "@/hooks/useTable.ts";
import {reqDisableUser, reqGetUserByPage, reqIsDisAbleUser, reqSaveOrAddUser} from "@/api/user";
import {formatDateTime} from "@/utils/date.ts";
import {userInfoSearchForm} from "@/model/data.ts";
import {notification} from "@/utils/elComponent.ts";
import {  Edit } from '@element-plus/icons-vue'
import {useInitForm} from "@/hooks/useForm.ts";
import {reqAddOrUpdateTag} from "@/api/tag";


const route=useRoute()
const {
  searchForm,
  resetSearchForm,
  tableData,
  loading,
  pageSize,
  pageNum,
  total,
  getData,
  handleSelectionChange,
  multipleTableRef
}=useInitTable({
  searchForm:userInfoSearchForm,
  getList:reqGetUserByPage,
})

const formLabelWidth = '140px'

const {
  formDrawerRef,
  formRef,
  form,
  drawerTitle,
  handleSubmit,
  handleCreate,
  handleEdit
}=useInitForm({
  form:{
    email:"",
    nickname:"",
    avatar:""
  },
  update:reqSaveOrAddUser,
  create:reqSaveOrAddUser,
  getData
})


const statusLoading=ref(false)
const updateStatus=async(id:number,isDisable:number)=>{
  statusLoading.value=true
  const res=await reqIsDisAbleUser(id,Number(isDisable))
  if(res.status==200) {
    notification('修改成功')
    statusLoading.value=false
  }
}

</script>

<style scoped lang="scss">
.img {
  width: 100%;
  height: 70px;
}
</style>