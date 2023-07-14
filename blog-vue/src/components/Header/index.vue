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
        <a class="btn btn-ghost normal-case text-xl">Teles</a>
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
        <label class="swap swap-rotate" style="font-size: 14px;">
          <!-- this hidden checkbox controls the state -->
          <input type="checkbox" />

          <!-- sun icon -->
          <svg
            class="swap-on fill-current w-8 h-8"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
            />
          </svg>

          <!-- moon icon -->
          <svg
            class="swap-off fill-current w-8 h-8"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
            />
          </svg>
        </label>
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
        <Login></Login>
        <div class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img src="@/assets/images/头像.jpg" />
            </div>
          </label>
          <ul
            tabindex="0"
            class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box"
          >
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
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
        path: "/talks"
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
  color: #ffffff !important;
}
.header-bg {
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
