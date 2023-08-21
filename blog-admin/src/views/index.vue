<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <el-row>
            <el-col class="col" :span="6" v-for="item in header" :key="item.name">
              <div class="item">
                <div>
                  <el-icon size="66" color="rgb(64, 201, 198)">
                    <component :is="item.icon"></component>
                  </el-icon>
                </div>
                <div style="font-size: 24px;">
                  <div style="color: rgba(0,0,0,.45);">{{ item.name }}</div>
                  <div>
                    <CounTo :value="item.value"></CounTo>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </template>
      <div>
        <el-row>
          <el-col :span="16">
            <Echarts :options="articleOptions"></Echarts>
          </el-col>
          <el-col :span="8">
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script setup lang='ts'>
import {ref} from 'vue'
import {reqRecentArticle} from "@/api/article";

const header = [
  {
    icon: "View",
    name: "访问量",
    value: 10,
  },
  {
    icon: "User",
    name: "用户量",
    value: 10,
  },
  {
    icon: "Notebook",
    name: "文章量",
    value: 10,
  },
  {
    icon: "Message",
    name: "留言评论量",
    value: 10,
  },
]

const articleOptions = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '5%',   // 左边距
  },
  title: [
    {
      text: '文章浏览量排行'
    }
  ],
  xAxis: {
    type: 'category',
    data: [],
    axisLabel: {
      interval: 0, // 显示所有标签
    },
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [],
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      }
    }
  ]
})

const getArticle = async () => {
  const res = await reqRecentArticle()
  if (res.status == 200) {
    for(let i=0;i<res.data.length;i++) {
      articleOptions.value.xAxis.data.push(res.data[i].articleTitle)
      articleOptions.value.series[0].data.push(res.data[i].views)
    }
  }
}

getArticle()
</script>

<style lang="scss" scoped>
:deep(.el-card__header) {
  padding: 0;
}

.box-card .card-header {
  display: block;
}

.box-card {
  background: rgb(247, 249, 251);
}

.col {
  padding: 0 25px;

  &:first-child {
    padding: 0 40px 0 0;
  }

  &:last-child {
    padding: 0 0 0 40px;
  }
}

.item {
  border: 1px solid #ece2e2;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 25px;
}
</style>
