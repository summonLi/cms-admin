<template>
  <div class="main-container">
    <div class="query-box">
      <div class="query-title">
        <div class="query-title-text">条件查询</div>
        <div class="query-btn">
          <el-button type="primary" size="small">查询</el-button>
          <el-button type="primary" size="small">重置</el-button>
        </div>
      </div>
      <div class="query-content">
        <el-form :inline="true" size="small" label-width="85px">
          <el-form-item label="菜单名称：">
            <el-input placeholder=请输入菜单名称></el-input>
          </el-form-item>
          <el-form-item label="菜单code：" label-width="100px">
            <el-input placeholder=请输入菜单code></el-input>
          </el-form-item>
          <el-form-item label="状态：">
            <el-select placeholder="请选择状态" v-model="selval">
              <el-option label="已启用" value="1"></el-option>
              <el-option label="未启用" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="table-box">
        <div class="query-title">
          <div class="query-title-text">查询结果</div>
          <div class="query-btn">
            <el-button type="primary" size="small">新增</el-button>
            <el-button type="danger" size="small">删除</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "menuList",
      data () {
          return {
            selval: ''
          }
      }
    }
</script>

<style scoped lang="scss">
  .query-title {
    display: flex;
    align-items:center;
    justify-content: space-between;
    border: 1px solid #f0f0f0;
    height: 50px;
  }
  .query-btn {
    margin-right: 18px;
  }
  .query-title-text {
    margin-left: 18px;
    color: #444444;
    font-size: 14px;
  }
  .query-content {
    border: 1px solid #f0f0f0;
    border-top: none;
    padding: 18px 18px 0 18px;
    margin-bottom: 20px;
  }
</style>
