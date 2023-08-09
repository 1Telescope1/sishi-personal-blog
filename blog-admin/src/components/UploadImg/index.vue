<template>
  <el-upload
    class="avatar-uploader"
    :action="uploadImageAction"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar"/>
    <el-icon v-else class="avatar-uploader-icon">
      <Plus/>
    </el-icon>
  </el-upload>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {Plus} from '@element-plus/icons-vue'

import type {UploadProps} from 'element-plus'
import {uploadImageAction} from "@/api/minio";
import {notification} from "@/utils/elComponent.ts";

const imageUrl = ref('')


const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  console.log(rawFile)
  if (rawFile.size / 1024 / 1024 > 20) {
    notification('头像大小超过2MB!', 'error')
    return false
  }
  notification('上传成功')
  return true
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
