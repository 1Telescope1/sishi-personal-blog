<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <div class="first">
            <span>{{ route.meta.title }}</span>
            <el-button size="large" type="primary" class="button" text @click="dialogVisible = true">发布文章
            </el-button>
          </div>
          <div>
            <el-date-picker
              v-model="nowTime"
              type="date"
              placeholder="Pick a date"
              clearable
            />
          </div>
        </div>
      </template>
      <!--      <v-md-editor v-model="form.articleContent" height="400px"></v-md-editor>-->
      <div style="border: 1px solid #ccc">
        <Toolbar
          style="border-bottom: 1px solid #ccc"
          :editor="editorRef"
          :defaultConfig="toolbarConfig"
          :mode="mode"
        />
        <Editor
          style="height: 500px; overflow-y: hidden;"
          v-model="form.articleContent"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="handleCreated"
        />
      </div>
    </el-card>


    <el-dialog
      v-model="dialogVisible"
      title="发布文章"
      width="50%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form :model="form">
        <el-form-item label="文章标题" :label-width="formLabelWidth">
          <el-input v-model="form.articleTitle" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="文章分类" :label-width="formLabelWidth">
          <el-select v-model="form.categoryId" placeholder="选择分类">
            <el-option v-for="category in categoryList" :key="category.id" :label="category.categoryName"
                       :value="category.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="文章标签" :label-width="formLabelWidth">
          <el-select v-model="form.tagId" placeholder="选择标签">
            <el-option v-for="tag in tagList" :key="tag.id" :label="tag.tagName" :value="tag.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="文章类型" :label-width="formLabelWidth">
          <el-select v-model="form.type" placeholder="选择类型">
            <el-option v-for="type in articleType" :key="type.id" :label="type.typeName" :value="type.id"/>
          </el-select>
        </el-form-item>
        <el-form-item v-show="form.type==2" label="原文地址" :label-width="formLabelWidth">
          <el-input v-model="form.originalUrl" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="上传封面" :label-width="formLabelWidth">
          <UploadImg @AvatarSuccess="handleAvatar" :imageUrl="form.articleCover"></UploadImg>
        </el-form-item>
        <el-form-item label="原文置顶" :label-width="formLabelWidth">
          <el-switch v-model="form.isTop" :active-icon="Check" :inactive-icon="Close"/>
        </el-form-item>
        <el-form-item label="推荐" :label-width="formLabelWidth">
          <el-switch v-model="form.isFeatured" :active-icon="Check" :inactive-icon="Close"/>
        </el-form-item>
        <el-form-item label="发布形式" :label-width="formLabelWidth">
          <el-select v-model="form.status" placeholder="选择形式">
            <el-option v-for="status in articleStatus" :key="status.id" :label="status.statusName" :value="status.id"/>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="publishArticle">
          发布
        </el-button>
      </span>

      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import {onBeforeUnmount, ref, shallowRef} from 'vue'
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'
import {formatDate} from "@/utils/date.ts";
import {Article, CreateArticle} from "@/api/article/type.ts";
import {useUserStore} from "@/store/user.ts";
import {Tag} from "@/model";
import {reqTags} from "@/api/tag";
import {Check, Close} from "@element-plus/icons-vue";
import {reqArticleById, reqPublishArticle} from "@/api/article";
import {notification} from "@/utils/elComponent.ts";
import {articleStatus, articleType, categoryList} from "@/model/data.ts"
import {useRoute, useRouter} from "vue-router";


const route = useRoute()
const router = useRouter()
const {user} = useUserStore()
const form = ref<CreateArticle>({
  articleContent: "",
  articleCover: "",
  articleTitle: "",
  categoryId: null,
  isFeatured: 0,
  isTop: 0,
  originalUrl: null,
  password: null,
  status: 1,
  tagId: "",
  type: 1,
  userId: user!.id
})

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
const toolbarConfig = {}
const editorConfig = {placeholder: '请输入内容...'}
const mode = 'default' // 或 'simple'

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

const handleAvatar = (imgUrl: string) => {
  console.log(imgUrl)
  form.value.articleCover = imgUrl
}


const getArticle = async () => {
  const res = await reqArticleById(+(route.params.articleId))
  if (res.status == 200) {
    form.value = res.data
  }
}

if (route.params.articleId) {
  getArticle()
}

const nowTime = ref(formatDate(new Date()))

const dialogVisible = ref(false)
const formLabelWidth = '200px'
const tagList = ref<Tag[]>([])
const getTagList = async () => {
  const res = await reqTags()
  if (res.status == 200) {
    tagList.value = res.data
  }
}
getTagList()

const publishArticle = async () => {
  const res = await reqPublishArticle(form.value)
  if (res.status == 200) {
    notification("发布成功")
    dialogVisible.value = false
    router.push('/article/list')
  }
}


</script>

<style lang="scss" scoped>
.card-header {
  flex-direction: column;
}

.first {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
}

</style>
