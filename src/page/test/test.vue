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
          <el-form-item label="名称：">
            <el-input placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="类别：" label-width="100px">
            <el-input placeholder="请输入菜单code"></el-input>
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
            <el-button type="primary" size="small" @click="toAdd">新增</el-button>
            <el-button type="danger" size="small" @click="onDeleteMultiple">删除</el-button>
          </div>
        </div>
        <div class="table-content">
          <el-table border :data="result.list" header-row-class-name="sm-table-header-row" v-loading.body="form.isListLoading" element-loading-text="加载中..." :default-sort="{ prop: '', order: 'descending'}" @selection-change="onMultipleSelectionChange" @sort-change="onSortChange" size="mini" fit highlight-current-row>
            <el-table-column type="selection" width="65">
            </el-table-column>
            <el-table-column label="Id" width="100">
              <template slot-scope="scope">
                {{scope.row.id}}
              </template>
            </el-table-column>
            <el-table-column label="名称" show-overflow-tooltip>
              <template slot-scope="scope">
                {{scope.row.name}}
              </template>
            </el-table-column>
            <el-table-column label="类别" show-overflow-tooltip>
              <template slot-scope="scope">
                {{scope.row.classify}}
              </template>
            </el-table-column>
            <el-table-column label="备注" show-overflow-tooltip>
              <template slot-scope="scope">
                {{scope.row.note}}
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="250px" fixed="right">
              <template slot-scope="scope">
                <el-button size="mini" @click="toView(scope.row)">查看</el-button>
                <el-button size="mini" @click="toEdit(scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="toDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="sm-form-pagination">
            <el-pagination
              :current-page="result.currentPage"
              :page-sizes="[20, 50, 100]"
              :page-size="result.pageSize"
              layout="total, prev, pager, next, sizes, jumper"
              :total="result.total"
              @current-change="onPageCurrentChange"
              @size-change="onPageSizeChange">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>

    <!--添加-->
    <div class="wt-dialog">
      <el-dialog title="添加" :visible.sync="isAddDialogVisible" :close-on-press-escape="false"
                 :close-on-click-modal="false" :modal-append-to-body="false" lock-scroll>
        <testAdd @sm-dialog-close="isAddDialogVisible = false"
                     @sm-dialog-refresh="(isAddDialogVisible = false) | requestFormList()"
                     ref="addView" viewType="add"></testAdd>
      </el-dialog>
    </div>

    <!--编辑-->
    <div class="wt-dialog">
      <el-dialog title="编辑" :visible.sync="isEditDialogVisible" :close-on-press-escape="false"
                 :close-on-click-modal="false" :modal-append-to-body="false" lock-scroll>
        <testAdd @sm-dialog-close="isEditDialogVisible = false"
                 @sm-dialog-refresh="(isEditDialogVisible = false) | requestFormList()"
                 ref="editView" viewType="edit"></testAdd>
      </el-dialog>
    </div>

    <!--查看-->
    <div class="wt-dialog">
      <el-dialog title="查看" :visible.sync="isViewDialogVisible" :close-on-press-escape="false"
                 :close-on-click-modal="false" :modal-append-to-body="false" lock-scroll>
        <testView @sm-dialog-close="isViewDialogVisible = false"
                 @sm-dialog-refresh="(isViewDialogVisible = false) | requestFormList()"
                 ref="viewView" viewType="view"></testView>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import request from '@/utils/request'
  import testAdd from './add'
  import testView from './view'
  export default {
    name: "test",
    data () {
      return {
        selval: '',
        form: { //表单数据
          formListUrl: '/', //查询列表的url
          formDeleteUrl: '/',//删除列表数据的url
          isListLoading: false,
          formData: { //查询条件
            name: '',
            updateTimeRange: []
          },
          pageData: {//分页默认查询条件
            currentPage: 0,
            pageSize: 20,
            sortName: '',
            sortOrder: ''
          }
        },
        result: { // 列表结果数据
          list: [{id: 1, name: '闪电鲸', classify: '软件类', note: '超级好'}]
        },
        isAddDialogVisible: false,//是否显示新增弹出层
        isEditDialogVisible: false,//是否显示编辑弹出层
        isViewDialogVisible: false,//是否显示查看弹出层
        multipleDataList: [],//多选数据
      }
    },
    components: {
      testAdd,
      testView
    },
    methods: {
      /* -----------表格和分页的操作 -----------*/
      //点击排序
      onSortChange(column) {
        this.form.pageData.sortName = column.prop
        this.form.pageData.sortOrder = column.order
      },
      //多选选择
      onMultipleSelectionChange(data) {
        this.multipleDataList = data
      },
      //切换页码
      onPageCurrentChange(pageNum) {

      },
      /* -----------按钮操作 -----------*/
      //点击新增
      toAdd() {
        this.$store.dispatch('resetTestDetailData')
        this.isAddDialogVisible = true
        //判断是否是第一次打开新建弹出框，第一次不执行该方法，非第一次，执行该方法重置表单
        if (this.$refs.addView !== null && this.$refs.addView !== undefined) {
          this.$refs.addView.setup()
        }
      },
      //点击编辑
      toEdit(rowDate) {
        //根据id请求该条数据的详情
        // this.$store.dispatch('queryTestDetailData',rowDate.id)
        this.isEditDialogVisible = true
        //判断是否是第一次打开新建弹出框，第一次不执行该方法，非第一次，执行该方法重置表单
        if (this.$refs.editView !== null && this.$refs.editView !== undefined) {
          this.$refs.editView.setup()
        }
      },
      //点击查看
      toView(rowDate) {
        //根据id请求该条数据的详情
        // this.$store.dispatch('queryTestDetailData',rowDate.id)
        this.isViewDialogVisible = true
        //判断是否是第一次打开新建弹出框，第一次不执行该方法，非第一次，执行该方法重置表单
        if (this.$refs.viewView !== null && this.$refs.viewView !== undefined) {
          this.$refs.viewView.setup()
        }
      },
      //点击删除
      toDelete(rowDate) {
        this.$confirm('是否删除？','提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.requestDeleteMutil([rowDate.id])
        }).catch(() => {

        })
      },
      //点击多条数据删除
      onDeleteMultiple() {
        if (this.multipleDataList.length <= 0) {
          this.$alert('请选中至少一列数据','提示', {
            type:'error',
            confirmButtonText: '确定'
          }).then(() => {

          }).catch(() => {

          })
          return
        }
        this.$confirm('是否删除','提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const dataIdList = []
          this.multipleDataList.forEach((item) => {
            dataIdList.push(item.id)
          })
          this.requestDeleteMutil(dataIdList)
        })
      },
      /*  ------------------------- 网络请求  -------------------------  */
      requestFormList() {
        this.form.isListLoading = true
        request({
          url: this.form.formListUrl,
          method: 'post',
          data: this.form
        }).then(response => {
          this.result = response.data
          this.form.isListLoading = false
        }).catch(() => {
          this.form.isListLoading = false
        })
      },
      requestDeleteMutil(dataIdList) {
        request({
          url: this.form.formDeleteUrl,
          method: 'post',
          data: { list: dataIdList }
        }).then(response => {
          this.requestFormList()
        }).catch(error => {
          console.log('error', error)
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../styles/custom.scss";
  .sm-form-pagination {
    text-align: right;
    margin: 18px 0;
  }
</style>

