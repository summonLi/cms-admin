<template>
  <div class="dialog-container wt-dialog-container">
    <el-row class="sm-detail-form">
      <div class="query-title sm-detail-query">
        <div class="query-title-text">详情</div>
        <div class="query-btn">
          <el-button type="primary" size="small" @click="onAddOrEdit">{{viewType === 'add' ? '新增': '保存'}}</el-button>
          <el-button type="info" size="small" @click="onSmDialogClose">关闭</el-button>
        </div>
      </div>
      <div class="query-title">
        <div class="query-title-text">基本信息</div>
        <div class="query-btn">
<!--          <el-button type="info" size="small">收起</el-button>-->
        </div>
      </div>
      <div class="table-content">
        <el-form ref="form" :model="detailResult" v-loading="isTestDetailLoading" :rules="rules" label-width="120px" size="small" class="wt-detail-form">
          <el-form-item label="姓名：" prop="username" class="sm-col-6">
            <el-input v-model="detailResult.username" readonly></el-input>
          </el-form-item>
          <el-form-item label="所在部门：" prop="deptNum" class="sm-col-6">
            <el-input v-model="detailResult.deptNum" readonly></el-input>
          </el-form-item>
          <el-form-item label="选择性别：" prop="radio" class="sm-col-6">
            <el-radio-group v-model="detailResult.radio" readonly>
              <el-radio label="1">男</el-radio>
              <el-radio label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="switch开关：" prop="switch" class="sm-col-6">
            <el-switch v-model="detailResult.switch" readonly></el-switch>
          </el-form-item>
          <el-form-item label="复选框：" prop="checkbox" class="sm-col-6">
            <el-checkbox-group v-model="detailResult.checkbox" readonly>
              <el-checkbox label="选项1" name="checkbox"></el-checkbox>
              <el-checkbox label="选项2" name="checkbox"></el-checkbox>
              <el-checkbox label="选项3" name="checkbox"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="开始日期：" class="sm-col-6">
            <el-col :span="11">
              <el-form-item prop="startTime">
                <el-date-picker readonly v-model="detailResult.startTime" type="date" style="width: 100%;" placeholder="选择开始日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2" style="text-align: center;">-</el-col>
            <el-col :span="11">
              <el-form-item prop="endTime">
                <el-date-picker readonly v-model="detailResult.endTime" type="date" style="width: 100%;" placeholder="选择结束日期"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="描述：" prop="des" class="sm-col-6">
            <el-input type="textarea" v-model="detailResult.des" readonly></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-row>
  </div>
</template>

<script>
  import request from '@/utils/request'
  import { mapState } from 'vuex'
  export default {
    name: "view",
    props: ['viewType'],
    data() {
      return {
      }
    },
    methods: {
      /* -----------通用按钮------------ */
      //点击关闭按钮,触发父组件的sm-dialog-close方法
      onSmDialogClose() {
        this.$emit('sm-dialog-close')
      },
      //提交数据后刷新父组件的列表数据,触发父组件的sm-dialog-refresh方法
      onSmDiologRefresh() {
        this.$emit('sm-dialog-refresh')
      }
    },
    computed: {
      ...mapState({
        isTestDetailLoading: state => state.test.isTestDetailLoading,
        detailResult: state => state.test.TestDetailData
      })
    }
  }
</script>

<style scoped lang="scss">
  @import "../../styles/custom.scss";
  .sm-detail-form .sm-detail-query {
    margin-bottom: 18px;
  }
</style>
