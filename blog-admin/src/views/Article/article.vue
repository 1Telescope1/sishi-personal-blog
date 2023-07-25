<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <div class="first">
            <span>发布文章</span>
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
      <v-md-editor v-model="form.articleContent" height="400px"></v-md-editor>
    </el-card>

    <el-dialog
        v-model="dialogVisible"
        title="发布文章"
        width="50%"
        :before-close="handleClose"
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
          <el-select v-model="form.type" placeholder="选择标签">
            <el-option v-for="type in articleType" :key="type.id" :label="type.typeName" :value="type.id"/>
          </el-select>
        </el-form-item>
        <el-form-item v-show="form.type==2" label="原文地址" :label-width="formLabelWidth">
            <el-input v-model="form.originalUrl" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="上传封面" :label-width="formLabelWidth">
          <el-upload
              class="upload-demo"
              drag
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
              multiple
          >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
              将文件拖到此处或<em>点击上传</em>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item  label="原文置顶" :label-width="formLabelWidth">
          <el-switch v-model="form.isTop" :active-icon="Check" :inactive-icon="Close" />
        </el-form-item>
        <el-form-item  label="推荐" :label-width="formLabelWidth">
          <el-switch v-model="form.isFeatured" :active-icon="Check" :inactive-icon="Close" />
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
import {reactive, ref} from "vue";
import {formatDate} from "@/utils/date.ts";
import {ElMessageBox} from 'element-plus'
import {CreateArticle} from "@/api/article/type.ts";
import {useUserStore} from "@/store/user.ts";
import {Tag} from "@/model";
import {reqTags} from "@/api/tag";
import {Check, Close, UploadFilled} from "@element-plus/icons-vue";
import {reqPublishArticle} from "@/api/article";
import {notification} from "@/utils/elComponent.ts";

const nowTime = ref(formatDate(new Date()))
let text = ref("")

const {user} = useUserStore()
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
const categoryList = [
  {
    id: 1,
    categoryName: "hhh"
  },
  {
    id: 2,
    categoryName: "sqd"
  },
  {
    id: 3,
    categoryName: "chifan"
  },
]
const articleType = [
  {
    id: 1,
    typeName: '原创'
  },
  {
    id: 2,
    typeName: '转载'
  },
  {
    id: 3,
    typeName: '翻译'
  }
]
const articleStatus=[
  {
    id:1,
    statusName:"公布"
  },
  {
    id:2,
    statusName:"私密"
  },
  {
    id:3,
    statusName:"草稿"
  }
]
const form = reactive<CreateArticle>({
  articleContent: "",
  articleCover: null,
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
const publishArticle=async ()=>{
  const res=await reqPublishArticle(form)
  if(res.status==200) {
    notification("发布成功")
    dialogVisible.value=false
  }
}
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
      .then(() => {
        done()
      })
      .catch(() => {
        // catch error
      })
}

</script>

<style lang="scss" scoped>
.card-header {
  display: flex;
  flex-direction: column;
}

.first {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
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
