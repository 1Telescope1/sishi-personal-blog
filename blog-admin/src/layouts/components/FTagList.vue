<template>
  <div class="f-tag-list" :style="{ left: blogStore.asideWidth }">
    <el-tabs
      v-model="activeTab"
      type="card"
      class="flex-1"
      @tab-remove="removeTab"
      style="min-width: 100px"
      @tab-change="changeTab"
    >
      <el-tab-pane
        class="tab"
        :closable="item.path != '/'"
        v-for="item in tabList"
        :key="item.path"
        :label="item.title"
        :name="item.path"
      ></el-tab-pane>
    </el-tabs>
    <span class="tag-btn">
      <el-dropdown @command="handleClose">
        <span class="el-dropdown-link">
          <el-icon>
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="clearOther">关闭其他</el-dropdown-item>
            <el-dropdown-item command="clearAll">全部关闭</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </span>
  </div>
  <div style="height: 44px"></div>
</template>
<script lang="ts" setup>
import { useTabList } from "@/hooks/useTabList.ts";
import { useBlogStore } from "@/store/blog";
const { activeTab, tabList, changeTab, removeTab, handleClose } = useTabList();

const blogStore=useBlogStore()
</script>
<style lang="scss" scoped>
.f-tag-list {
  position: fixed;
  background-color: rgb(243, 244, 246);
  display:flex;
  align-items: center;
  padding-left: 0.5rem/* 8px */;
  padding-right: 0.5rem/* 8px */;
  top: 104px;
  right: 0;
  height: 44px;
  z-index: 100;
}
.tag-btn {
  background-color: rgb(255 ,255 ,255);
  display: flex;
  border-radius: 0.25rem/* 4px */;
  margin-left: auto;
  align-items: center;
  justify-content: center;
  padding-left: 0.5rem/* 8px */;
  padding-right: 0.5rem/* 8px */;
  height: 32px;
}
:deep(.el-tabs__header) {
  border: 0 !important;
  margin-bottom: 0px;
}
:deep(.el-tabs__nav) {
  border: 0 !important;
}
:deep(.el-tabs__item) {
  border: 0 !important;
  height: 32px;
  line-height: 32px;
  background-color: rgb(255, 255, 255);
  border-radius: 0.25rem; /* 4px */
  margin-left: 5px;

}
:deep(.el-tabs__nav-next),
:deep(.el-tabs__nav-prev) {
  line-height: 32px;
  height: 32px;
}
:deep(.is-disabled) {
  cursor: not-allowed;
  color: rgba(209, 213, 219, 1);
}
</style>
