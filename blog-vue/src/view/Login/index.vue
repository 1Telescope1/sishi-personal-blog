<template>
  <div class="login">
    <Particles id="tsparticles" class="login__particles" :options="particles" />
  </div>
</template>

<script setup lang='ts'>
import {ref} from 'vue'
import { particles } from './config/particles-config';

</script>

<style lang="scss" scoped>
.login-container {
  margin-top: 70px;
}
.login {
  flex: auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;

  &__particles {
    height: 100%;
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    /* background-image: url('../../assets/img/jiguang.jpeg'); */
  }
}

</style>
