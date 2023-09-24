<template>
  <div>
    <div class="navbar scrollTop_zero" :class="scrollTop>1 ? 'header-bg' : ''" ref="navbar">
      <div class="navbar-start">
        <div class="dropdown">
          <label tabindex="0" class="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabindex="0"
            class="menu summary-black menu-sm dropdown-content mt-3 z-[1] p-2 shadowrounded-box w-52"
          >
            <li v-for="menu in menuList" :key="menu.name">
              <details v-if="menu.children">
                <summary><SvgIcon :icon-class="menu.icon"></SvgIcon>{{ menu.name}}</summary>
                <ul class="p-2">
                  <li v-for="menuChildren in menu.children">
                      <router-link :to="menuChildren.path">
                        <SvgIcon :icon-class="menuChildren.icon"></SvgIcon>{{ menuChildren.name }}
                      </router-link>
                  </li>
                </ul>
              </details>
              <li v-else class="p-0">
                <router-link :to="menu.path">
                  <SvgIcon :icon-class="menu.icon"></SvgIcon> {{ menu.name }}
                </router-link>
              </li>
            </li>
          </ul>
        </div>
        <a class="btn btn-ghost normal-case text-xl">四十</a>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1 ">
          <li v-for="menu in menuList" :key="menu.name">
            <details v-if="menu.children">
              <summary><SvgIcon :icon-class="menu.icon"></SvgIcon>{{ menu.name}}</summary>
              <ul class="p-2 summary-black">
                <li v-for="menuChildren in menu.children">
                    <router-link :to="menuChildren.path">
                      <SvgIcon :icon-class="menuChildren.icon"></SvgIcon>{{ menuChildren.name }}
                    </router-link>
                </li>
              </ul>
            </details>
            <li v-else class="p-0">
              <router-link :to="menu.path">
                <SvgIcon :icon-class="menu.icon"></SvgIcon> {{ menu.name }}
              </router-link>
            </li>
          </li>
        </ul>
      </div>
      <div class="navbar-end">
        <button class="btn btn-ghost btn-circle" @click="changeTheme">
          <SvgIcon :icon-class="blog.isDark? 'moon' : 'sun'" size="1.5rem"></SvgIcon>
        </button>
        <button class="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
        <Login v-if="!user.user"></Login>
        <div v-else class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img v-if="!user.user.userinfo.avatar" src="@/assets/images/default.png" />
              <img v-else :src="user.user.userinfo.avatar" />
            </div>
          </label>
          <ul
            tabindex="0"
            class="mt-3 z-[1] summary-black p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box"
          >
            <li @click="logout"><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useUserStore } from '@/store/user';
import { useDark,useToggle } from "@vueuse/core";
import { useBlogStore } from '../../store/blog';

const isDark = useDark({
  selector: 'html',
  attribute: 'theme',
  valueDark: 'dark',
  valueLight: 'light',
})

const toggle = useToggle(isDark);
const blog=useBlogStore()
const changeTheme=()=>{
  toggle()
  blog.isDark=!blog.isDark

}

const menuList = [
  {
    name: "首页",
    icon: "home",
    path: "/"
  },
  {
    name: "文章",
    icon: "article",
    children: [
      {
        name: "归档",
        icon: "archives",
        path: "/archive"
      },
      // {
      //   name: "分类",
      //   icon: "category",
      //   path: "/category"
      // },
      {
        name: "标签",
        icon: "tag",
        path: "/tag"
      },
    ]
  },
  {
    name: "娱乐",
    icon: "fun",
    children: [
      {
        name: "说说",
        icon: "talk",
        path: "/talk"
      },
      // {
      //   name: "相册",
      //   icon: "album",
      //   path: "/album"
      // },
      // {
      //   name: "图床",
      //   icon: "upload",
      //   path: "/picture"
      // },
    ]
  },
  {
    name: "友链",
    icon: "friend",
    path: "/friend"
  },
  {
    name: "留言板",
    icon: "message",
    path: "/message"
  },
  {
    name: "关于",
    icon: "plane",
    path: "/about"
  },
];

const navbar = ref();
let navbarShow = ref(false);
let scrollTop = ref(0);

const handleScroll = () => {
  if (scrollTop.value < 1) {
    navbar.value.classList.add("scrollTop_zero");
  } else {
    navbar.value.classList.remove("scrollTop_zero");
  }
  let top =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0;
  if (scrollTop.value <= top) {
    navbarShow.value = true;
    navbar.value.style.transform = `translateY(-70px)`;
  } else {
    navbarShow.value = false;
    navbar.value.style.transform = `translateY(0px)`;
    navbar.value.style.color = "rgb(66,66,66)";
  }

  scrollTop.value = top;
};

const user=useUserStore()
const logout=()=>{
  user.logout()
  
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.navbar {
  position: fixed;
  transition: all 0.5s;
  z-index: 1000;
}
.scrollTop_zero {
  background-color: rgba(0, 0, 0, 0);
}
.header-bg {
  color: var(--grey-9) !important;
  background: linear-gradient(-225deg, var(--color-cyan-light) 0, var(--color-pink-light) 100%);
}
.summary-black {
  background: rgba(0, 0, 0, .5);
  color: #ffffff;
}
.p-0 {
  padding: 0;
}
.login {
  display: flex;
  align-items: center;
  flex-direction: row;
}
</style>
