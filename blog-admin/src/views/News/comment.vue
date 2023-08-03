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
            <el-input clearable style="width: 220px;" size="default" v-model="searchForm.nickname"
                      placeholder="评论人昵称"></el-input>
          </SearchItem>
          <SearchItem>
            <el-input clearable style="width: 220px;" size="default" v-model="searchForm.title"
                      placeholder="评论的文章标题"></el-input>
          </SearchItem>
          <SearchItem>
            <el-input clearable style="width: 220px;" size="default" v-model="searchForm.content"
                      placeholder="评论内容"></el-input>
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
          <el-table-column label="内容" prop="commentContent" align="center">
          </el-table-column>
          <el-table-column label="所属文章标题" prop="articleTitle" align="center">
          </el-table-column>
          <el-table-column label="回复人" align="center">
            <template #default="{row}">
              <el-tag v-if="row.replyCommentId" type="success" size="large">{{row.replyUser.nickname}}</el-tag>
              <el-tag v-else size="large">无</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="发布时间" align="center">
            <template #default="{row}">
              {{formatDateTime(row.createTime).substring(0,10)}}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200" align="center">
            <template #default="{row}">
              <el-popconfirm title="你确定要删除留言吗?" @confirm="handleDelete(row.id)">
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
import {commentSearchForm} from "@/model/data.ts";
import {reqCommentByPage, reqDelComment} from "@/api/comment";
import {formatDateTime} from "@/utils/date.ts";

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
  handleDelete,
  handleSelectionChange,
  multipleTableRef
}=useInitTable({
  searchForm:commentSearchForm,
  getList:reqCommentByPage,
  delete:reqDelComment
})

</script>

<style scoped lang="scss">
.img {
  width: 100%;
  height: 70px;
}
</style>