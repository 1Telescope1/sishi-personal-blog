<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>{{this.$route.meta.title}}</span>
        </div>
      </template>

    </el-card>
  </div>
</template>

<script setup lang="ts">
import {reqMessagePage} from "@/api/message";

const getMessage=async ()=>{
  const res=await reqMessagePage({pageNum:1,pageSize:6,userId:'',content:""})
  console.log(res)
}
getMessage()

</script>


<style scoped lang="scss">

</style>