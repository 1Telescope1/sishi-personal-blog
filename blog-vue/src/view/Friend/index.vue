<template>
  <div class="page-header">
    <h1 class="page-title">友链</h1>
    <img
      class="page-cover"
      src="https://static.ttkwsd.top/config/c8049b9b880411ebb6edd017c2d2eca2.jpg"
      alt=""
    />
    <!-- 波浪 -->
    <Waves></Waves>
  </div>
  <div class="bg">
    <div class="page-container">
      <div class="information">
        <div>
          <SvgIcon
            class="flower"
            icon-class="flower"
            size="20px"
            color="pink"
          ></SvgIcon>
        </div>
        <div class="text">本站信息</div>
      </div>
      <div class="pink-box">
        <div>名称：四十</div>
        <div>简介：Do not go gentle into the good night</div>
        <div>头像：http://43.138.109.120:9000/avatar/%E5%A4%B4%E5%83%8F.jpg</div>
        <div>网址：http://www.sqda.top/</div>
      </div>
      <div class="information">
        <div>
          <SvgIcon
            class="flower"
            icon-class="flower"
            size="20px"
            color="pink"
          ></SvgIcon>
        </div>
        <div class="text">申请方法</div>
      </div>
      <div class="welcome">
        需要交换友链的可点击<span
        class="dialog"
        @click="dialogFormVisible = true"
      >此处💖</span
      >
      </div>
      <div class="pink-box">
        <div>
          出于信息需要,大佬你的信息格式要包含：网站名称、网站简介、头像链接、网站地址
        </div>
      </div>
      <div class="information">
        <div>
          <SvgIcon
            class="flower"
            icon-class="flower"
            size="20px"
            color="pink"
          ></SvgIcon>
        </div>
        <div class="text">小伙伴们</div>
      </div>
      <div class="list">
        <div class="content" v-for="link in linkList" :key="link.id" @click="pushUrl(link.linkAddress)">
          <div class="content-img">
            <img class="img rorate" v-lazy="link.linkAvatar" alt="">
          </div>
          <div class="info">
            <div class="name">{{ link.linkName }}</div>
            <div class="synopsis">{{ link.linkIntro }}</div>
          </div>
        </div>
      </div>
    </div>


    <el-dialog
      width="50%"
      center
      title="申请友链"
      v-model="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <el-form ref="dataForm" :rules="rules" :model="link">
        <el-form-item
          label="网站名称"
          prop="name"
          :label-width="formLabelWidth"
        >
          <el-input v-model="link.linkName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="网站头像"
          prop="avatar"
          :label-width="formLabelWidth"
        >
          <el-input v-model="link.linkAvatar" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="网站简介"
          prop="info"
          :label-width="formLabelWidth"
        >
          <el-input v-model="link.linkIntro" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="网站地址" prop="url" :label-width="formLabelWidth">
          <el-input v-model="link.linkAddress" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive} from "vue";
import {Link, LinkDetail} from "@/api/friendlink/type";
import {reqAddFriend, reqFriendList} from "@/api/friendlink/index";
import {notification} from "@/utils/elComponent";

const linkList = ref<LinkDetail[]>([]);
const init = async () => {
  const res = await reqFriendList();
  if (res.status == 200) {
    linkList.value = res.data;
  }
};
init();

const pushUrl = (url: string) => {
  window.open(url)
}

const formLabelWidth = "120px";

const link = reactive<Link>({
  linkAddress: "",
  linkName: "",
  linkAvatar: "",
  linkIntro: "",
});

const rules = {
  name: [{required: true, message: "必填字段", trigger: "blur"}],
  // email: [
  //   { required: true, message: "必填字段", trigger: "blur" },
  //   {
  //     pattern:
  //       /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/,
  //     message: "填写正确的邮箱",
  //   },
  // ],
  description: [{required: true, message: "必填字段", trigger: "blur"}],
  url: [
    {required: true, message: "必填字段", trigger: "blur"},
    {
      pattern:
        /^((https|http|ftp|rtsp|mms){0,1}(:\/\/){0,1})www\.(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/,
      message: "填写正确的网址",
    },
  ],
  avatar: [{required: true, message: "必填字段", trigger: "blur"}],
};

let dialogFormVisible = ref(false);

const submit = async () => {
  const res = await reqAddFriend(link);
  if (res.status == 200) {
    notification("success", "添加成功");
    dialogFormVisible.value = false;
  }
};
</script>

<style lang="scss" scoped>
.information {
  display: flex;
  align-items: center;
}

.text {
  font-weight: 800;
  font-size: 24px;
  margin-left: 10px;
}

.flower {
  animation: rotate 6s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}

@media (max-width: 767px) {
  .friend-item {
    width: calc(100% - 2rem);
  }
}

.pink-box {
  margin: 10px 30px;
  padding: 15px 0 15px 20px;
  border-radius: 10px;
  border-left: 3px solid #f080ce;
  overflow: hidden;
  background: rgba(228, 105, 207, 0.12);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  font-size: 15px;
  color: #999999;
}

.welcome {
  margin-left: 46px;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    width: 6px;
    height: 6px;
    background: var(--primary-color);
    border-radius: 50%;
    top: 14px;
    left: -16px;
  }
}

.dialog {
  cursor: pointer;
  color: #f080ce;
}

.list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: 10px 30px;

  .content {
    display: flex;
    align-items: center;
    padding: 10px 15px;
    width: 48%;
    margin-bottom: 20px;
    cursor: pointer;

    &:nth-child(odd) {
      margin-right: 4%;
    }

    box-shadow: 0 0 2rem var(--box-bg-shadow);
    border-radius: 10px;

    .content-img {
      width: 65px;
    }

    .img {
      width: 65px ;
      height: 65px;
      border-radius: 10px;
      transition: all 0.5s;
    }

    .info {
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      font-size: 15px;
      font-weight: 600;
      flex: 1;
      .name {
        color: #f080ce;
      }
    }
  }
}

@media (max-width: 600px) {
  .list {
    .content {
      width: 100%;
    }
  }
}
</style>
