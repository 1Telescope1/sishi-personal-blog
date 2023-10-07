<template>
  <div>
    <div ref="chartContainer" style="height: 400px;"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';

// 引入 ECharts 核心模块
import * as echarts from 'echarts/core';

// 引入必须的模块
import { TitleComponent, TooltipComponent, GridComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart, LineChart, PieChart } from 'echarts/charts';

// 注册必须的模块
echarts.use([ TitleComponent, TooltipComponent, GridComponent, LegendComponent, CanvasRenderer]);
echarts.use([BarChart, LineChart, PieChart]);


const props = defineProps({
  options: {
    type: Object,
  }
})

let myChart = ref(null)

watch(props.options, () => {
  generate()
})

const chartContainer = ref(null);

onMounted(() => {
  // 初始化 ECharts 实例
  myChart.value = echarts.init(chartContainer.value);
  generate()
});

const generate = () => {
  // ECharts 配置项
  const options = props.options;

  // 渲染图表
  myChart.value.setOption(options);
}

</script>
