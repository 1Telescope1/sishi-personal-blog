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
            <el-input clearable style="width: 220px;" size="default" v-model="searchForm.linkName"
                      placeholder="友链名"></el-input>
          </SearchItem>
          <SearchItem>
            <el-input clearable style="width: 220px;" size="default" v-model="searchForm.linkAddress"
                      placeholder="链接"></el-input>
          </SearchItem>
          <SearchItem>
            <el-input clearable style="width: 220px;" size="default" v-model="searchForm.linkIntro"
                      placeholder="介绍"></el-input>
          </SearchItem>
        </Search>
        <InfoButton style="margin-bottom: 20px" @create="handleCreate" @refresh="getData"></InfoButton>

      </div>
      <div>
        <el-table ref="multipleTableRef" @selection-change="handleSelectionChange" :data="tableData" stripe style="width: 100%" v-loading="loading">
          <el-table-column type="selection" width="55" />
          <el-table-column label="链接头像"  width="100" align="center">
            <template #default="{row}">
              <img class="img" :src="row.linkAddress" alt="">
            </template>
          </el-table-column>
          <el-table-column label="站名"  align="center" prop="linkName">
          </el-table-column>
          <el-table-column label="地址"   align="center" prop="linkAddress">
          </el-table-column>
          <el-table-column label="介绍"  align="center" prop="linkIntro">
          </el-table-column>
          <el-table-column label="审核"  align="center">
            <template #default="{row}">
              <el-switch
                v-model="row.isStatus"
                disabled
                class="ml-2"
                style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                :active-value="1"
                :inactive-value="0"
              />
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
        <el-form-item label="头像" :label-width="formLabelWidth">
          <UploadImg @AvatarSuccess="handleAvatar" :imageUrl="form.avatar"></UploadImg>
        </el-form-item>
        <el-form-item label="站名" :label-width="formLabelWidth">
          <el-input v-model="form.linkName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.linkAddress" autocomplete="off" />
        </el-form-item>
        <el-form-item label="介绍" :label-width="formLabelWidth">
          <el-input v-model="form.linkIntro" autocomplete="off" />
        </el-form-item>
        <el-form-item label="审核" :label-width="formLabelWidth">
          <el-switch
            v-model="form.isStatus"
            :active-value="1"
            :inactive-value="0"
            class="ml-2"
            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
          />
        </el-form-item>
      </el-form>
    </FormDrawer>
  </div>
</template>

<script setup lang="ts">
import {useRoute} from 'vue-router'
import {useInitTable} from "@/hooks/useTable.ts";
import {reqAddFriend, reqDelFriendLink, reqFriendLinkByPage,} from "@/api/friendlink";
import {useInitForm} from "@/hooks/useForm.ts";
import {friendLinkSearchForm} from "@/model/data.ts";
import {formatDateTime} from "@/utils/date.ts";
import {  Edit,Delete } from '@element-plus/icons-vue'


const route = useRoute()

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
  handleDelete,
  multipleTableRef
} = useInitTable({
  searchForm: friendLinkSearchForm,
  getList: reqFriendLinkByPage,
  delete: reqDelFriendLink
})

const formLabelWidth = '140px'

const LinkForm = {
  isStatus: 0,
  linkName: "",
  linkAvatar: "",
  linkAddress: "",
  linkIntro: ""
}

const {
  formDrawerRef,
  formRef,
  form,
  drawerTitle,
  handleSubmit,
  handleCreate,
  handleEdit
} = useInitForm({
  form: LinkForm,
  create: reqAddFriend,
  update: reqAddFriend,
  getData
})

const handleAvatar=(imgUrl:string)=>{
  form.linkAvatar=imgUrl
}

</script>

<style scoped lang="scss">
.img {
  width: 100%;
  height: 70px;
}
</style>