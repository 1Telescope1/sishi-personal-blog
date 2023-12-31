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
          <SearchItem >
            <el-input clearable style="width: 220px;" size="default" v-model="searchForm.articleTitle" placeholder="文章标题" autocomplete="off"/>
          </SearchItem>
          <SearchItem >
            <el-select clearable size="default" v-model="searchForm.categoryId" placeholder="选择文章分类">
              <el-option v-for="category in categoryList" :key="category.id" :label="category.categoryName"
                         :value="category.id"/>
            </el-select>
          </SearchItem>
          <SearchItem >
            <el-select clearable size="default" v-model="searchForm.tagId" placeholder="选择文章标签">
              <el-option v-for="tag in tagList" :key="tag.id" :label="tag.tagName" :value="tag.id"/>
            </el-select>
          </SearchItem>
          <SearchItem  >
            <el-select clearable size="default" v-model="searchForm.type" placeholder="选择文章类型">
              <el-option v-for="type in articleType" :key="type.id" :label="type.typeName" :value="type.id"/>
            </el-select>
          </SearchItem>
        </Search>
      </div>
      <div>
        <el-table ref="multipleTableRef" @selection-change="handleSelectionChange" :data="tableData" stripe style="width: 100%" v-loading="loading">
          <el-table-column type="selection" width="55" />
          <el-table-column label="文章封面" width="185" align="center">
            <template #default="{row}">
              <img v-viewer class="img" :src="row.articleCover" alt="">
            </template>
          </el-table-column>
          <el-table-column label="标题"  align="center" prop="articleTitle"></el-table-column>
          <el-table-column label="发布时间"  align="center">
            <template #default="{row}">
              <span>{{formatDateTime(row.createTime).substring(0,10)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="文章标签"  align="center">
            <template #default="{row}">
              <el-tag>{{row.tag.tagName}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="浏览量"  align="center" prop="views">
            <template #default="{row}">
              <CounTo class="counTo" :value="row.views"></CounTo>
            </template>
          </el-table-column>
          <el-table-column label="文章类型"  align="center">
            <template #default="{row}">
              <el-tag type="success">{{getArticleTypeName(row.type)}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="文章置顶" align="center">
            <template #default="{row}">
              <el-switch v-model="row.isTop" disabled />
            </template>
          </el-table-column>
          <el-table-column label="文章推荐" align="center">
            <template #default="{row}">
              <el-switch v-model="row.isFeatured" disabled />
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template #default="{row}">
              <el-button :icon="Edit" size="small" type="primary" @click="router.push(`/article/publish/${row.id}`)">编辑</el-button>
              <el-popconfirm title="你确定要删除文章吗?" @confirm="handleDelete(row.id)">
                <template #reference>
                  <el-button :icon="Delete" size="small" type="danger">删除</el-button>
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

<script setup lang='ts'>
import {ref} from 'vue'
import {useInitTable} from "@/hooks/useTable.ts";
import {articleSearchForm, articleType, categoryList} from "@/model/data.ts";
import {reqDeleteArticle, reqGetArticlesPage} from "@/api/article";
import {Tag} from "@/model";
import {reqTags} from "@/api/tag";
import {formatDateTime} from "@/utils/date.ts";
import {useRouter,useRoute} from "vue-router";
import {  Edit,Delete } from '@element-plus/icons-vue'


const router=useRouter()
const route=useRoute()

const tagList=ref<Tag[]>([])
const getTagList=async ()=>{
  const res=await reqTags()
  if(res.status==200) {
    tagList.value=res.data
  }
}
getTagList()
const getArticleTypeName=(id:number)=>{
  for (let i=0;i<articleType.length;i++) {
    if(articleType[i].id==id) {
      return articleType[i].typeName
    }
  }
}

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
  multiSelectionIds,
  handleSelectionChange,
  multipleTableRef
} = useInitTable({
  searchForm: articleSearchForm,
  getList: reqGetArticlesPage,
  delete: reqDeleteArticle,
})
</script>

<style lang="scss" scoped>

.img {
  width: 100%;
  height: 90px;
}

.counTo {
  font-size: 18px;
  font-weight: 600;
}
</style>
