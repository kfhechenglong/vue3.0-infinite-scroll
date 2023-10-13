<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <ListComp msg="支持Vue3的滚动加载插件" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ListComp from "./components/ListComp.vue";
export default defineComponent({
  name: "App",
  components: {
    ListComp,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
