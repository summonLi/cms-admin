<template>
    <div class="main-container">
        <div class="home-box">
            <div class="home-li">
              <img class="home-li-img" src="../assets/img/home01.png">
              <div class="home-li-text">基础信息</div>
            </div>
            <div class="home-li">
              <img class="home-li-img" src="../assets/img/home01.png">
              <div class="home-li-text">基础信息</div>
            </div>
            <div class="home-li">
              <img class="home-li-img" src="../assets/img/home01.png">
              <div class="home-li-text">基础信息</div>
            </div>
            <div class="home-li">
              <img class="home-li-img" src="../assets/img/home01.png">
              <div class="home-li-text">基础信息</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "home"
    }
</script>

<style scoped lang="scss">
  @import '../styles/index.scss';
  .home-box {
    display: flex;
    flex-wrap: wrap;
    .home-li {
      padding: 10px;
      .home-li-img {
        display: block;
        width: 50px;
        height: 50px;
        margin: 0 auto;
      }
      .home-li-text {
        padding: 5px 0;
        text-align: center;
      }
    }
  }
</style>
