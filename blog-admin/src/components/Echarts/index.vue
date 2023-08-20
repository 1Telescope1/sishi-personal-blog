<template>
  <div>
    <div ref="chartContainer" style="height: 400px;"></div>
  </div>
</template>

<script setup>
import { ref, onMounted,watch } from 'vue';
import * as echarts from 'echarts';

const props = defineProps({
  options: {
    type: Object,
  }
})

let myChart=ref(null)

watch(props.options,()=>{
  generate()
})

const chartContainer = ref(null);

onMounted(() => {
  // 初始化 ECharts 实例
  myChart = echarts.init(chartContainer.value);
  generate()
});

const generate=()=>{

  // ECharts 配置项
  const options=props.options

  // 渲染图表
  myChart.setOption(options);
}

</script>
