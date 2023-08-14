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
            <el-input clearable style="width: 220px;" size="default" v-model="searchForm.roleName"
                      placeholder="角色名"></el-input>
          </SearchItem>
        </Search>
        <InfoButton style="margin-bottom: 20px" @create="handleCreate" @refresh="getData"></InfoButton>
      </div>
      <div>
        <el-table border ref="multipleTableRef" @selection-change="handleSelectionChange" :data="tableData" stripe style="width: 100%" v-loading="loading">
          <el-table-column type="selection" width="55" />
          <el-table-column label="角色"  align="center" prop="roleName">
            <template #default="{row}">
              <el-tag>{{row.roleName}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="是否禁用"  align="center">
            <template #default="{row}">
              <el-switch
                v-model="row.isDisable"
                class="ml-2"
                style="--el-switch-on-color:#ff4949; --el-switch-off-color:  #13ce66"
                :active-value="1"
                :inactive-value="0"
                @change="handleStatusChange(row,row.isDisable)"

              />
            </template>
          </el-table-column>
          <el-table-column label="发布时间" align="center">
            <template #default="{row}">
              {{formatDateTime(row.createTime).substring(0,10)}}
            </template>
          </el-table-column>
          <el-table-column width="500" label="操作"  align="center">
            <template #default="{row}">
              <el-button :icon="EditPen" :text="true" bg @click="handleDialog(true,row)">分配菜单</el-button>
              <el-button :icon="EditPen" :text="true" bg @click="handleDialog(false,row)">分配资源</el-button>
              <el-button :icon="Edit" type="primary" @click="handleEdit(row)">编辑</el-button>
              <el-popconfirm title="你确定要删除标签吗?" @confirm="handleDelete(row.id)">
                <template #reference>
                  <el-button :icon="Delete" type="danger">删除</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>

        </el-table>
      </div>
    </el-card>
    <FormDrawer ref="formDrawerRef"  :title="drawerTitle" @submit="handleSubmit">
      <el-form ref="formRef" :model="form">
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-input v-model="form.roleName" autocomplete="off" />
        </el-form-item>
      </el-form>
    </FormDrawer>

    <el-dialog :close-on-click-modal="false" destroy-on-close	 v-model="dialogFormVisible" :title="isMenu ? '分配菜单' : '分配资源'">
      <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        :props="defaultProps"
        :default-checked-keys="checkedKeys"
        @check="handleClick"
      />
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="handlePermission">
          确定
        </el-button>
      </span>
      </template>
    </el-dialog>

  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {useRoute} from 'vue-router'
import {useInitTable} from "@/hooks/useTable.ts";
import {
  reqAddOrUpdRole,
  reqAllRole,
  reqChangeDisable,
  reqChangeRoleMenu,
  reqChangeRoleResource,
  reqDisableRole
} from "@/api/role";
import {useInitForm} from "@/hooks/useForm.ts";
import {formatDateTime} from "@/utils/date.ts";
import {  Edit ,Delete,EditPen} from '@element-plus/icons-vue'
import {Resource} from "@/api/resource/type.ts";
import {Menu} from "@/api/menu/type.ts";
import {reqResourceByName} from "@/api/resource";
import {reqMenuByName} from "@/api/menu";
import {Role, RolePermission} from "@/api/role/type.ts";
import {notification} from "@/utils/elComponent.ts";


const route = useRoute()

const formLabelWidth='140px'
let dialogFormVisible=ref(false)
let isMenu=ref(true)
const data=ref([])
const roleId=ref()
const defaultProps=ref({})
const checkedKeys=ref([])
const resourceList=ref<Resource[]>([])
const menuList=ref<Menu[]>([])
const resourceProps={
  children: 'children',
  label: 'resourceName',
}
const menuProps={
  children: 'children',
  label: 'name',
}
const handleDialog=(flag:boolean,role:Role)=>{
  isMenu.value=flag
  roleId.value=role.id
  data.value=isMenu.value ? menuList.value : resourceList.value
  defaultProps.value=isMenu.value? menuProps : resourceProps
  checkedKeys.value=isMenu.value ? role.menuId : role.resourceId
  dialogFormVisible.value=true
}

const handleClick=(data:any,obj:any)=> {
  checkedKeys.value=obj.checkedKeys
}

const handlePermission=async () =>{
  let res
  const data:RolePermission={
    roleId: roleId.value, roleMenu: [], roleResource: []
  }
  if(isMenu.value) {
    for(let i=0;i<checkedKeys.value.length;i++) {
      data.roleMenu?.push({roleId: roleId.value,menuId:checkedKeys.value[i]})
    }
    res=await reqChangeRoleMenu(data)
  } else {
    for(let i=0;i<checkedKeys.value.length;i++) {
      data.roleResource?.push({roleId: roleId.value,resourceId:checkedKeys.value[i]})
    }
    res=await reqChangeRoleResource(data)
  }
  if(res.data) {
    notification("修改成功")
    getData()
  }
  dialogFormVisible.value=false
}

const initPermission=async ()=>{
  const res1=await reqResourceByName({resourceName:""})
  const res2=await reqMenuByName({name:""})
  if(res1.status==200&&res2.status==200) {
    resourceList.value=res1.data
    menuList.value=res2.data
  }
}
initPermission()

const {
  searchForm,
  resetSearchForm,
  tableData,
  loading,
  getData,
  handleSelectionChange,
  handleDelete,
  handleStatusChange,
  multipleTableRef
} = useInitTable({
  searchForm: {roleName: ""},
  getList: reqAllRole,
  updateStatus:reqChangeDisable,
  delete: reqDisableRole
})

const {
  formDrawerRef,
  formRef,
  form,
  drawerTitle,
  handleSubmit,
  handleCreate,
  handleEdit
} = useInitForm({
  form: {roleName: ""},
  create: reqAddOrUpdRole,
  update: reqAddOrUpdRole,
  getData
})


</script>

<style scoped lang="scss">

</style>