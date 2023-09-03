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
            <el-input clearable style="width: 220px;" size="default" v-model="searchForm.resourceName"
                      placeholder="资源"></el-input>
          </SearchItem>
        </Search>
        <InfoButton style="margin-bottom: 20px" @create="handleCreate" @refresh="getData"></InfoButton>
      </div>
      <div>
        <el-table border row-key="id" ref="multipleTableRef" :data="tableData" stripe style="width: 100%" v-loading="loading">
          <el-table-column label="id"  prop="id" align="center" width="100"></el-table-column>
          <el-table-column label="资源名"  prop="resourceName">
            <template #default="{row}">
              {{row.resourceName}}
              <sup style="color: deepskyblue">{{row.children.length ? row.children.length : ''}}</sup>
            </template>
          </el-table-column>
          <el-table-column label="路径"  prop="url" ></el-table-column>
          <el-table-column label="请求方式"  align="center">
            <template #default="{row}">
              <el-tag v-if="row.requestMethod" :type="methodTag(row.requestMethod)">{{row.requestMethod}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="是否匿名访问"  align="center">
            <template #default="{row}">
              <el-switch
                disabled
                v-model="row.isAnonymous"
                class="ml-2"
                :active-value="1"
                :inactive-value="0"
                style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
              />
            </template>
          </el-table-column>
          <el-table-column label="操作"  align="center">
            <template #default="{row}">
              <el-button v-if="row.parentId==null" :icon="Plus" link type="primary" @click="handleSonResource(row.id)">新增</el-button>
              <el-button :icon="Edit" link type="primary" @click="handleEdit(row)">编辑</el-button>
              <el-popconfirm title="你确定要删除资源吗?" @confirm="handleDelete(row.id)">
                <template #reference>
                  <el-button :icon="Delete" link type="danger">删除</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <FormDrawer ref="formDrawerRef"  :title="drawerTitle" @submit="handleSubmit">
      <el-form ref="formRef" :model="form">
        <el-form-item label="资源名称" :label-width="formLabelWidth">
          <el-input v-model="form.resourceName" autocomplete="off" />
        </el-form-item>
        <el-form-item v-if="form.parentId" label="资源路径" :label-width="formLabelWidth">
          <el-input v-model="form.url" autocomplete="off" />
        </el-form-item>
        <el-form-item v-if="form.parentId" label="是否匿名访问" :label-width="formLabelWidth">
          <el-switch
            v-model="form.isAnonymous"
            class="ml-2"
            :active-value="1"
            :inactive-value="0"
            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
          />
        </el-form-item>
        <el-form-item v-if="form.parentId" label="请求方式" :label-width="formLabelWidth">
          <el-radio-group v-model="form.requestMethod">
            <el-radio v-for="method in requestArr" :key="method" :label="method">{{method}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </FormDrawer>
  </div>
</template>

<script setup lang="ts">
import {useRoute} from 'vue-router'
import {useInitTable} from "@/hooks/useTable.ts";
import {reqAddOrUpdResource, reqDelResource, reqResourceByName} from "@/api/resource";
import {useInitForm} from "@/hooks/useForm.ts";
import {resourceForm} from "@/model/form.ts";
import { Edit ,Delete,Plus} from '@element-plus/icons-vue'
import {methodTag} from "@/utils/methodTag.ts";

const route=useRoute()
const formLabelWidth='140px'

const {
  searchForm,
  resetSearchForm,
  tableData,
  loading,
  getData,
  handleDelete,
  multipleTableRef
}=useInitTable({
  searchForm:{resourceName:""},
  getList:reqResourceByName,
  delete:reqDelResource
})

const {
  formDrawerRef,
  formRef,
  form,
  drawerTitle,
  handleSubmit,
  handleCreate,
  handleEdit
}=useInitForm({
  form:resourceForm,
  create:reqAddOrUpdResource,
  update:reqAddOrUpdResource,
  getData
})

const requestArr=["GET","POST","DELETE","PATCH"]

const handleSonResource=(id:number)=>{
  form.resourceName=""
  form.url=""
  form.requestMethod="GET"
  form.isAnonymous=0
  form.parentId=id
  handleEdit(form)
}



</script>

<style scoped lang="scss">

</style>