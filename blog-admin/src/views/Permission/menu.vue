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
            <el-input clearable style="width: 220px;" size="default" v-model="searchForm.name"
                      placeholder="菜单"></el-input>
          </SearchItem>
        </Search>
        <InfoButton style="margin-bottom: 20px" @create="handleCreate" @refresh="getData"></InfoButton>
      </div>
      <div>
        <el-table border row-key="id" ref="multipleTableRef" @selection-change="handleSelectionChange" :data="tableData" stripe style="width: 100%" v-loading="loading">
          <el-table-column label="菜单名称"  prop="name" align="center"></el-table-column>
          <el-table-column label="图标"   align="center">
            <template #default="{row}">
              <el-icon :size="16" >
                <component :is="row.icon"/>
              </el-icon>
            </template>
          </el-table-column>
          <el-table-column label="排序"  prop="orderNum" align="center"></el-table-column>
          <el-table-column label="访问路径"  prop="path" align="center"></el-table-column>
          <el-table-column label="组件路径"  prop="component" align="center"></el-table-column>
          <el-table-column label="创建时间"  align="center">
            <template #default="{row}">
              {{formatDateTime(row.createTime).substring(0,10)}}
            </template>
          </el-table-column>
          <el-table-column label="操作"  align="center">
            <template #default="{row}">
              <el-button v-if="row.parentId==null" :icon="Plus" link type="primary" @click="handleSonMenu(row.id)">新增</el-button>
              <el-button :icon="Edit" link type="primary" @click="handleEdit(row)">编辑</el-button>
              <el-popconfirm title="你确定要删除标签吗?" @confirm="handleDelete(row.id)">
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
        <el-form-item label="菜单名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="图标" :label-width="formLabelWidth">
          <el-input v-model="form.icon" autocomplete="off" />
        </el-form-item>
        <el-form-item label="排序" :label-width="formLabelWidth">
          <el-input-number
            v-model="form.orderNum"
            :min="1"
            :max="10"
            controls-position="right"
            size="large"
          />
        </el-form-item>
        <el-form-item label="访问路径" :label-width="formLabelWidth">
          <el-input v-model="form.path" autocomplete="off" />
        </el-form-item>
        <el-form-item label="组件路径" :label-width="formLabelWidth">
          <el-input v-model="form.component" autocomplete="off" />
        </el-form-item>
      </el-form>
    </FormDrawer>
  </div>
</template>

<script setup lang="ts">
import {useRoute} from 'vue-router'
import {useInitTable} from "@/hooks/useTable.ts";
import {reqAddOrUpdMenu, reqDelMenu, reqMenuByName, reqMenuISHidden} from "@/api/menu";
import {useInitForm} from "@/hooks/useForm.ts";
import {formatDateTime} from "@/utils/date.ts";
import {  Edit ,Delete,Plus} from '@element-plus/icons-vue'
import {menuForm} from "@/model/form.ts";


const route=useRoute()
const formLabelWidth='140px'

const {
  searchForm,
  resetSearchForm,
  tableData,
  loading,
  getData,
  handleSelectionChange,
  handleDelete,
  handleMultiStatusChange,
  handleStatusChange,
  multipleTableRef
}=useInitTable({
  searchForm:{name:""},
  getList:reqMenuByName,
  updateStatus:reqMenuISHidden,
  delete:reqDelMenu
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
  form:menuForm,
  create:reqAddOrUpdMenu,
  update:reqAddOrUpdMenu,
  getData
})

const handleSonMenu=(id:number)=>{
  form.name=""
  form.path=""
  form.component=""
  form.icon=""
  form.parentId=id
  form.orderNum=1
  handleEdit(form)
}

</script>

<style scoped lang="scss">

</style>