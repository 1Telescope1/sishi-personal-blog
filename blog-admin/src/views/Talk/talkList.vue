<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>{{ route.meta.title }}</span>
        </div>
      </template>
      <div>
        <div class="talk-list">
          <div class="talk-item" v-for="talk in tableData" :key="talk.id">
            <div class="first">
              <div class="meta">
                <div>
                  <img class="img" :src="talk.userinfo.avatar" alt="" />
                </div>
                <div class="first-f">
                  <div class="name">
                    <div>{{ talk.userinfo.nickname }}</div>
                    <div style="cursor: pointer">
                      <el-dropdown :hide-on-click="false" :hide-timeout="1050">
                        <span class="el-dropdown-link">
                          <el-icon :size="24"><More /></el-icon>
                        </span>
                        <template #dropdown>
                          <el-dropdown-menu>
                            <el-dropdown-item>
                              <el-button :icon="Edit" size="small" type="primary" @click="router.push(`/talk/publish/${talk.id}`)">编辑</el-button>
                            </el-dropdown-item>
                            <el-dropdown-item>
                              <el-popconfirm title="你确定要删除说说吗?" @confirm="handleDelete(talk.id)">
                                <template #reference>
                                  <el-button :icon="Delete" size="small" type="danger">删除</el-button>
                                </template>
                              </el-popconfirm>
                            </el-dropdown-item>
                          </el-dropdown-menu>
                        </template>
                      </el-dropdown>
                    </div>
                  </div>
                  <div class="time">
                    {{ formatDateTime(talk.createTime).substring(0, 10) }}
                  </div>
                </div>
              </div>
            </div>
            <div class="content">
              <v-md-preview
                ref="talkRef"
                class="md"
                :text="talk.content"
              ></v-md-preview>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import { useRoute,useRouter } from "vue-router";
import { useInitTable } from "@/hooks/useTable.ts";
import { reqAllTalk, reqDelTalk } from "@/api/talk";
import { formatDateTime } from "../../utils/date.ts";
import {  Edit,Delete } from '@element-plus/icons-vue'
import {Talk} from "@/api/talk/type.ts";


const route = useRoute();
const router=useRouter()
const {
  loading,
  handleDelete,
  handleSelectionChange,
  multipleTableRef,
} = useInitTable({
  getList:reqAllTalk,
  delete: reqDelTalk,
});

const tableData=ref<Talk[]>()
const getData=async ()=>{
  const res=await reqAllTalk()
  if(res.status==200) {
    tableData.value=res.data
  }
}
getData()

</script>

<style scoped lang="scss">
.talk-list {
  .talk-item {
    margin-top: 20px;
    padding: 16px 20px;
    border-radius: 10px;
    box-shadow: 0 3px 8px 6px rgb(7 17 27/6%);
    transition: all 0.3s ease 0s;

    &:hover {
      box-shadow: 0 5px 10px 8px rgba(7, 17, 27, 0.16);
      transform: translateY(-3px);
    }
  }

  .first {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .meta {
      display: flex;
      //align-items: center;
      .img {
        height: 40px;
        width: 40px;
        border-radius: 50%;
      }

      .first-f {
        margin-left: 10px;
        line-height: 24px;

        .name {
          width: 1480px;
          display: flex;
          justify-content: space-between;
          font-size: 20px;
          font-weight: 600;
        }

        .time {
          color: #999999;
        }
      }
    }
  }
}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
