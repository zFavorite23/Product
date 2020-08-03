<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
}
.v-modal {
  z-index: 0 !important;
}
body {
  margin: 0 !important;
  padding: 0 !important;
  min-width: 1600px !important; /*no*/
}
</style>
