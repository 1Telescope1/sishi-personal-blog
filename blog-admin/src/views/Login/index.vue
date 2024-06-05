<template>
  <el-row class="login-container">
    <el-col :lg="16" :md="12" class="left">
      <div>
        <div>欢迎光临</div>
        <div>此站点是四十后台管理系统</div>
      </div>
    </el-col>
    <el-col :lg="8" :md="12" class="right">
      <h2 class="title">欢迎回来</h2>
      <div>
        <span class="line"></span>
        <span>账号密码登录</span>
        <span class="line"></span>
      </div>
      <el-form ref="formRef" :rules="rules" :model="form" style="width: 250px">
        <el-form-item prop="nickname">
          <el-input v-model="form.nickname" placeholder="请输入用户名">
            <template #prefix>
              <el-icon><Avatar /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="form.password"
            placeholder="请输入密码"
            show-password
          >
            <template #prefix>
              <el-icon><lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            round
            color="#626aef"
            class="w-[250px]"
            type="primary"
            @click="onSubmit"
            :loading="loading"
            >登 录</el-button
          >
        </el-form-item>
      </el-form>
      <div style="color: black">
        <span>测试账号:test@123</span>
        <span style="margin-left: 5px">密码:123456</span>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { notification } from '@/utils/elComponent';
import { useUserStore } from '@/store/user';
import axios from 'axios';

const router = useRouter();
const user = useUserStore();

const form = reactive({
  nickname: 'test@123',
  password: '123456'
});

const rules = {
  nickname: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur'
    }
  ]
};

const formRef = ref();
const loading = ref(false);
const onSubmit = () => {
  formRef.value.validate(async (valid: any) => {
    if (!valid) {
      return false;
    }
    const flag = await user.login(form);
    axios.post('http://localhost:3000/auth/signin', form).then((res) => {
      console.log(res);
    });
    if (flag) {
      notification('登录成功');
      router.push('/');
    } else {
      notification('登录失败', 'error');
    }
  });
};

// 监听回车事件
function onKeyUp(e: any) {
  if (e.key == 'Enter') onSubmit();
}

// 添加键盘监听
onMounted(() => {
  document.addEventListener('keyup', onKeyUp);
});
// 移除键盘监听
onBeforeUnmount(() => {
  document.removeEventListener('keyup', onKeyUp);
});
</script>

<style lang="scss" scoped>
.login-container {
  min-height: 100vh;
  background-color: rgb(99, 102, 241);
}
.login-container .left,
.login-container .right {
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-container .right {
  flex-direction: column;
  background-color: rgba(253, 253, 253);
}
.left > div > div:first-child {
  font-weight: 700;
  font-size: 3rem /* 48px */;
  line-height: 1;
  margin-bottom: 1rem /* 16px */;
  color: rgba(253, 253, 253);
}
.left > div > div:last-child {
  color: rgb(229, 231, 235);
  font-size: 0.875rem /* 14px */;
  line-height: 1.25rem /* 20px */;
}
.right .title {
  font-weight: 700;
  font-size: 1.875rem /* 30px */;
  line-height: 2.25rem /* 36px */;
  color: rgb(31, 41, 55);
}
.right > div {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1.25rem /* 20px */;
  margin-bottom: 1.25rem /* 20px */;
  color: rgb(209, 213, 219);
}
.right .line {
  height: 1px;
  width: 4rem /* 64px */;
  background-color: rgb(229, 231, 235);
}
</style>
