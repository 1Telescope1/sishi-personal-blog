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
                      placeholder="评论人昵称"></el-input>
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
      </div>
    </el-card>
    <div class="pagination">
      <el-pagination background layout="prev, pager ,next" :total="total" :current-page="pageNum"
                     :page-size="pageSize" @current-change="getData" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRoute} from 'vue-router'
import {useInitTable} from "@/hooks/useTable.ts";
import {talkCommentSearchForm} from "@/model/data.ts";
import {reqDelTalkComment, reqTalkCommentByPage} from "@/api/talkComment";
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
  searchForm:talkCommentSearchForm,
  getList:reqTalkCommentByPage,
  delete:reqDelTalkComment
})

</script>

<style scoped lang="scss">
.img {
  width: 100%;
  height: 70px;
}
</style>