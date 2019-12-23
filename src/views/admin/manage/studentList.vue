<template>
  <div class="student-container">
    <div class="search-form">
      <el-button type="primary" @click="handleSearch">查询</el-button>
    </div>
    <div class="tableData">
      <el-table
      :data="students"
      v-loading="loading"
      style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" class="demo-table-expand">
              <el-form-item label="编号">
                <span>{{ props.row.userId }}</span>
              </el-form-item>
              <el-form-item label="用户账号">
                <span>{{ props.row.userName }}</span>
              </el-form-item>
              <el-form-item label="名字">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="手机号">
                <span>{{ props.row.phone }}</span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ props.row.createTime }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="用户编号"
          min-width="180"
          prop="userId">
        </el-table-column>
        <el-table-column
          label="名字"
          min-width="100"
          prop="name">
        </el-table-column>
        <el-table-column
          label="用户简介"
          prop="remark">
          <template slot-scope="scope">
            <span>{{ scope.row.remark? scope.row.remark: '无'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" min-width="110px">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)" circle></el-button>
            <el-button type="danger" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="student-page">
        <el-pagination
          :page-size="pageSize"
          :pager-count="5"
          :background="true"
          layout="prev, pager, next"
          :total="total"
          :current-page="currentPage"
          @current-change="currentPageChange"
          hide-on-single-page>
        </el-pagination>
      </div>
    </div>
    <student-edit :w="width" :item="dataItem" :stuEditDialog="stuEditDialog" @editCancel="editCancel" @editSubmit="editSubmit"></student-edit>
    <student-search :w="width" :stuSearchDialog="stuSearchDialog" @searchCancel="searchCancel" @searchSubmit="searchSubmit"></student-search>
  </div>
</template>
<script>
import studentEdit from '@/components/my-admin/student-edit'
import studentSearch from '@/components/my-admin/student-search'
export default {
  components: {
    studentEdit,
    studentSearch
  },
  data () {
    return {
      width: '70%',
      pageSize: 10,
      total: null,
      currentPage: 1,
      loading: true,
      stuSearchDialog: false,
      stuEditDialog: false,
      dataItem: {},
      students: [],
      searchForm: {
        type: 1,
        size: null,
        page: null
      }
    }
  },
  methods: {
    resizeHandler () {
      let w = window.screenWidth || document.body.clientWidth
      if (w <= 768) {
        this.width = '100%'
      } else {
        this.width = '70%'
      }
    },
    getStudentList () {
      this.packages = []
      this.loading = true
      this.searchForm.page = this.currentPage
      this.searchForm.size = this.pageSize
      this.$store.dispatch('user/getList', this.searchForm).then(res => {
        let data = res.extend.data
        this.students = data.records
        this.total = data.total
        this.loading = false
      }).catch(err => {
        this.$message({
          message: err,
          type: 'error'
        })
      })
    },
    searchSubmit (data) { // 查询组件确认查询
      this.searchCancel()
      console.log(data)
    },
    searchCancel () { // 查询组件取消
      this.stuSearchDialog = false
    },
    handleSearch () { // 弹出查询组件
      this.stuSearchDialog = true
    },
    editSubmit (data) { // 编辑组件确认
      this.editCancel()
      console.log(data)
    },
    editCancel () { // 编辑组件取消
      this.stuEditDialog = false
    },
    handleEdit (index, row) { // 弹出编辑组件
      this.dataItem = row
      this.stuEditDialog = true
    },
    handleDelete (index, row) {
      console.log('删除', index, row)
    },
    currentPageChange (currentPage) { // 当前页改变事件
      this.currentPage = currentPage
      console.log(this.currentPage)
    }
  },
  created () {
    this.getStudentList()
    window.addEventListener('resize', this.resizeHandler)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resizeHandler)
  }
}
</script>
<style lang="scss" scoped>
.student-container{
  background: #fff;
  border-top: 1px solid transparent;
  box-shadow: 1px 0px 3px rgba(0, 0, 0, 0.1);
  padding: 10px 0;
  .search-form{
    padding-left: 2em;
    margin-top: 20px;
  }
  .tableData{
    margin: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    box-sizing: border-box;
    padding: 15px;
    .student-page{
      margin-top: 15px;
      float: right;
    }
    &::after{
      content: ' ';
      display: block;
      clear: both;
    }
  }
}
@media (max-width: 700px) {
  .student-container{
    .tableData{
      margin: 0;
      padding: 0;
      .student-page{
        margin-top: 15px;
      }
    }
  }
}
</style>
