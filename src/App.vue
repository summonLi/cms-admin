<template>
  <div id="app">
<!--    <img src="./assets/logo.png">-->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss" scoped>
  @import "./styles/index.scss";
  body {
    margin: 0;
    padding: 0;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    overflow: scroll;
    overflow-y: hidden;
  }
  #app {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
</style>
