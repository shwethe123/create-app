<template>
  <div class="home">
    <div class="vue_img">
      <img alt="Vue logo" src="../assets/logo.png">
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
<style scoped>
.vue_img {
  text-align: center;
}
</style>