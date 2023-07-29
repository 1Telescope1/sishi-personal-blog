<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>{{this.$route.meta.title}}</span>
        </div>
        <InfoButton @create="handleCreate" @refresh="getData"></InfoButton>
      </template>
      <div>
        <el-table ref="multipleTableRef" @selection-change="handleSelectionChange" :data="tableData" stripe style="width: 100%" v-loading="loading">
          <el-table-column type="selection" width="55" />
          <el-table-column label="标签名" width="185" align="center">
            <template #default="{row}">
              <el-tag>{{row.tagName}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="创建时间"  align="center">
            <template #default="{row}">
              <span>{{formatDateTime(row.createTime).substring(0,10)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="更新时间" align="center">
            <template #default="{row}">
              <span>{{formatDateTime(row.updateTime).substring(0,10)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200" align="center">
            <template #default="{row}">
              <el-button :icon="Edit" size="small" type="primary" @click="handleEdit(row)">编辑</el-button>
              <el-popconfirm title="你确定要删除标签吗?" @confirm="handleDelete(row.id)">
                <template #reference>
                  <el-button :icon="Delete" size="small" type="danger">删除</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
      <el-form ref="formRef" :model="form">
        <el-form-item label="标签名" :label-width="formLabelWidth">
          <el-input v-model="form!.tagName" autocomplete="off" />
        </el-form-item>
      </el-form>
    </FormDrawer>

    <el-dialog v-model="dialogFormVisible" title="标签信息" width="30%">
      <el-form :model="form">
        <el-form-item label="标签名" :label-width="formLabelWidth">
          <el-input v-model="form.tagName" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="update">
          确定
        </el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {ref} from'vue'
import {reqAddOrUpdateTag, reqDelTag, reqTags} from "@/api/tag";
import {useInitTable} from "@/hooks/useTable.ts";
import {formatDateTime} from "@/utils/date.ts";
import {Tag} from "@/model";
import {  Edit,Delete } from '@element-plus/icons-vue'
import {useInitForm} from "@/hooks/useForm.ts";


const {
  tableData,
  loading,
  handleSelectionChange,
  handleDelete,
  handleUpdate,
  getData,
  multiSelectionIds
}=useInitTable({
  getList:reqTags,
  delete:reqDelTag,
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
  form:{
    tagName:""
  },
  update:reqAddOrUpdateTag,
  create:reqAddOrUpdateTag,
  getData
})

const tagForm=ref<Tag>()
let dialogFormVisible=ref(false)
const formLabelWidth = '140px'
const edit=(data:Tag)=>{
  dialogFormVisible.value=true
  tagForm.value=JSON.parse(JSON.stringify(data));
}
const update=()=>{
  handleUpdate(tagForm.value)
  dialogFormVisible.value=false
}

</script>

<style scoped lang="scss">
.card-header {
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

</style>