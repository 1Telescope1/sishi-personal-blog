<template>
  <el-upload
    class="avatar-uploader"
    :action="uploadFileAction"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon">
      <Plus />
    </el-icon>
  </el-upload>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Plus } from '@element-plus/icons-vue';

import type { UploadProps } from 'element-plus';
import { uploadFileAction } from '@/api/minio';
import { notification } from '@/utils/elComponent.ts';
import { fragmentUpload } from '@/utils/BigFileUpload';

const props = defineProps<{
  imageUrl: string;
}>();

const emit = defineEmits<{
  (e: 'AvatarSuccess', imageUrl: string): void;
}>();

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  emit('AvatarSuccess', response.data.url);
};

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile: File) => {
  if (rawFile.size / 1024 / 1024 > 20) {
    notification('大小超过2MB!', 'error');
    return false;
  }
  notification('上传成功');
  fragmentUpload(rawFile);

  // return true;
};
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
