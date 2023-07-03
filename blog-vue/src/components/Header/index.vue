<template>
  <div>
    <div class="navbar scrollTop_zero bg-base-300" ref="navbar">
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
            class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li><a>首页</a></li>
            <li><a>留言</a></li>
            <li><a>归档</a></li>
            <li><a>标签</a></li>
            <li><a>说说</a></li>
            <li><a>关于</a></li>
            <li><a>友链</a></li>
            <li>
              <a>Parent</a>
              <ul class="p-2">
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
              </ul>
            </li>
            <li><a>Item 3</a></li>
          </ul>
        </div>
        <a class="btn btn-ghost normal-case text-xl">daisyUI</a>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          <li><a>首页</a></li>
          <li><a>留言</a></li>
          <li><a>归档</a></li>
          <li><a>标签</a></li>
          <li><a>说说</a></li>
          <li><a>关于</a></li>
          <li><a>友链</a></li>
          <li tabindex="0">
            <details>
              <summary>Parent</summary>
              <ul class="p-2">
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
              </ul>
            </details>
          </li>
          <li><a>Item 3</a></li>
        </ul>
      </div>
      <div class="navbar-end">
        <button class="btn btn-ghost btn-circle">
          <el-icon :size="22"><Sunny /></el-icon>
        </button>
        <button class="btn btn-ghost btn-circle">
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
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
        <div class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img src="@/assets/images/头像.jpg" />
            </div>
          </label>
          <ul
            tabindex="0"
            class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-50"
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
const navbar = ref();
let navbarShow = ref(false);
let scrollTop = ref(0);

const handleScroll = () => {
  if(scrollTop.value<2) {
    navbar.value.classList.add('scrollTop_zero')
  } else {
    navbar.value.classList.remove('scrollTop_zero')
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
    navbar.value.style.color='rgb(66,66,66)'
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
  color: #FFFFFF !important;
}
</style>
