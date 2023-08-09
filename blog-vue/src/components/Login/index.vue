<template>
  <button class="btn btn-ghost btn-circle" @click="showDialog">
    <div class="login">
      <div><SvgIcon icon-class="user" size="2rem"></SvgIcon></div>
    </div>
  </button>

  <el-dialog
  append-to-body
    :close-on-click-modal="false"
    :width="'35%'"
    v-model="dialogFormVisible"
    title="登录"
  >
    <el-form :model="form" :rules="rules" ref="ruleFormRef">
      <el-form-item
        label="用户名"
        prop="nickname"
        :label-width="formLabelWidth"
      >
        <el-input v-model="form.nickname" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
        <el-input
          type="password"
          show-password
          v-model="form.password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        v-show="!isLogin"
        label="确认密码"
        prop="confirmPwd"
        :label-width="formLabelWidth"
      >
        <el-input
          type="password"
          show-password
          v-model="form.confirmPwd"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        v-show="!isLogin"
        label="验证码"
        prop="identifyCode"
        :label-width="formLabelWidth"
      >
        <el-input
          type="password"
          show-password
          v-model="form.identifyCode"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item v-show="!isLogin">
        <img style="margin-left: 100px;" :src="codeUrl" alt="" @click="getIdentifyCode" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button v-show="!isLogin" @click="regester(ruleFormRef)"
          >注册</el-button
        >
        <el-button v-show="isLogin" @click="isLogin = false">去注册</el-button>
        <el-button v-show="!isLogin" @click="isLogin = true">
          去登录
        </el-button>
        <el-button v-show="isLogin" @click="login(ruleFormRef)">
          登录
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { FormRules } from "element-plus/lib/components/form/src/types.js";
import { reactive, ref } from "vue";
import { userForm } from "@/api/user/type";
import { FormInstance } from "element-plus/lib/components/form/index.js";
import { useUserStore } from "@/store/user";
import { notification } from "../../utils/elComponent";
import { reqRegister } from "../../api/user/index";

const dialogFormVisible = ref(false);
const formLabelWidth = "120px";

const form = reactive<userForm>({
  nickname: "",
  password: "",
  confirmPwd: "",
  identifyCode: "",
});
const codeUrl = ref("");

const rules = reactive<FormRules<userForm>>({
  nickname: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 10, message: "长度在 3 到 5 个字符", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    {
      min: 1,
      max: 20,
      message: "长度在 1 到 20 个字符",
      trigger: "blur",
    },
  ],
  // confirmPwd: [{ required: true, message: "请确认密码", trigger: "blur" }],
  // identifyCode: [{ required: true, message: "请输入验证码", trigger: "blur" }],
});

const showDialog = () => {
  resetForm(ruleFormRef.value)
  dialogFormVisible.value = true;
  isLogin.value = true;
};

const isLogin = ref(true);
const ruleFormRef = ref<FormInstance>();
const userStore = useUserStore();
const login = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid) => {
    if (valid) {
      const res = await userStore.login(form);
      if (res) {
        notification("Success", "登录成功");
        dialogFormVisible.value = false;
      } else {
        notification("Error", "账号或密码错误", "error");
      }
    } else {
      notification("Error", "请按格式输入账号密码", "error");
    }
  });
};

const getIdentifyCode = () => {
  const id = Math.floor(Math.random() * 100 + 1);
  codeUrl.value = `${import.meta.env.VITE_BASE_API}/user/identifyImage/${id}`;
};
getIdentifyCode();

const regester = async (formEl: FormInstance | undefined) => {
  if (form.confirmPwd != form.password) {
    notification("Error", "两次输入的密码不一致", "error");
    return;
  }
  if (!formEl) return;
  await formEl.validate(async (valid) => {
    if (valid) {
      const res = await reqRegister(form);
      if (res.data) {
        notification("Success", "注册成功");
        isLogin.value=true
        resetForm(ruleFormRef.value)
      } else {
        notification("Error", "用户已存在", "error");
      }
    } else {
      notification("Error", "请按格式输入账号密码", "error");
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
<style scoped>
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
