<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>文章列表</span>
        </div>
      </template>
      <div>
        <Search :model="searchForm" @search="getData" @reset="resetSearchForm">
          <SearchItem :labelWidth="formLabelWidth">
            <el-input style="width: 220px;" size="default" v-model="searchForm.articleTitle" placeholder="文章标题" autocomplete="off"/>
          </SearchItem>
          <SearchItem  :labelWidth="formLabelWidth">
            <el-select size="default" v-model="searchForm.categoryId" placeholder="选择文章分类">
              <el-option v-for="category in categoryList" :key="category.id" :label="category.categoryName"
                         :value="category.id"/>
            </el-select>
          </SearchItem>
          <SearchItem  :labelWidth="formLabelWidth">
            <el-select size="default" v-model="searchForm.tagId" placeholder="选择文章标签">
              <el-option v-for="tag in tagList" :key="tag.id" :label="tag.tagName" :value="tag.id"/>
            </el-select>
          </SearchItem>
          <SearchItem  :labelWidth="formLabelWidth">
            <el-select size="default" v-model="searchForm.type" placeholder="选择文章类型">
              <el-option v-for="type in articleType" :key="type.id" :label="type.typeName" :value="type.id"/>
            </el-select>
          </SearchItem>
        </Search>
      </div>
    </el-card>
  </div>
</template>

<script setup lang='ts'>
import {ref} from 'vue'
import {useInitTable} from "@/hooks/useTable.ts";
import {articleSearchForm, articleType, categoryList} from "@/model/data.ts";
import {reqDeleteArticle, reqGetArticleList, reqPublishArticle} from "@/api/article";
import {Tag} from "@/model";
import {reqTags} from "@/api/tag";

const tagList=ref<Tag>([])
const getTagList=async ()=>{
  const res=await reqTags()
  if(res.status==200) {
    tagList.value=res.data
  }
}

const formLabelWidth = "120px"
const {
  searchForm,
  resetSearchForm,
  tableData,
  loading,
  currentPage,
  total,
  limit,
  getData,
  handleDelete,
  handleStatusChange,
  multiSelectionIds,
  multipleTableRef
} = useInitTable({
  searchForm: articleSearchForm,
  getList: reqGetArticleList,
  delete: reqDeleteArticle,
  updateStatus: reqPublishArticle
})

</script>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 100%;
}
</style>
