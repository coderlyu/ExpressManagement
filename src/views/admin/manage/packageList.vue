<template>
  <div class="student-container">
    <div class="search-form">
      <el-button type="primary" @click="handleAdd">新增</el-button>
      <!-- <el-button type="primary" @click="handleSearch">查询</el-button> -->
      <el-dropdown split-button type="primary" @command="handleCommand">
        {{ menuName }}
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="0">全部</el-dropdown-item>
          <el-dropdown-item command="1">等待揽件</el-dropdown-item>
          <el-dropdown-item command="2">运输中</el-dropdown-item>
          <el-dropdown-item command="3">已签收</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="tableData">
      <el-table
      :data="packages"
      v-loading="loading"
      style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" class="demo-table-expand">
              <el-form-item label="物流号">
                <span class="content">{{ props.row.logId }}</span>
              </el-form-item>
              <el-form-item label="驿站编码">
                <span class="content">{{ props.row.postId }}</span>
              </el-form-item>
              <el-form-item label="收件人手机号">
                <span class="content">{{ props.row.phone }}</span>
              </el-form-item>
              <el-form-item label="取件码">
                <span class="content">{{ props.row.logCode }}</span>
              </el-form-item>
              <el-form-item label="发货地址">
                <span class="content">{{ props.row.shipAddress }}</span>
              </el-form-item>
              <el-form-item label="收货地址">
                <span class="content">{{ props.row.deliveryAddress }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="物流号"
          min-width="180"
          prop="logId">
        </el-table-column>
        <el-table-column
          label="状态"
          min-width="80"
          prop="type">
          <template slot-scope="scope">
           <template v-for="(type,index) in status">
             <el-tag
              v-if="type.id=== scope.row.type"
              :key="index"
              :type="type.type">
              {{type.name}}
            </el-tag>
           </template>
          </template>
        </el-table-column>
        <el-table-column
          label="备注"
          min-width="80"
          prop="remark">
          <template slot-scope="scope">
            <span>{{ scope.row.remark?scope.row.remark:'无' }}</span>
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
    <package-add :width="width" :packAddDialog="packAddDialog" @addCancel="addCancel" @addSubmit="addSubmit"></package-add>
    <package-edit :width="width" :packEditDialog="packEditDialog" @editCancel="editCancel" @editSubmit="editSubmit" :item="dataItem"></package-edit>
  </div>
</template>
<script>
import packageAdd from '@/components/my-admin/package-add'
import packageEdit from '@/components/my-admin/package-edit'
export default {
  components: {
    packageAdd,
    packageEdit
  },
  data () {
    return {
      menuName: '全部',
      pageSize: 10,
      total: null,
      currentPage: 1,
      loading: true,
      packAddDialog: false,
      packEditDialog: false,
      dataItem: {},
      packages: [],
      width: '70%',
      status: [
        {
          id: 1,
          name: '等待揽件',
          type: 'info'
        },
        {
          id: 2,
          name: '运输中',
          type: ''
        },
        {
          id: 3,
          name: '已签收',
          type: 'success'
        }
      ],
      searchForm: {
        type: 0,
        page: null,
        size: null
      }
    }
  },
  methods: {
    getPackageList () {
      this.packages = []
      this.loading = true
      this.searchForm.page = this.currentPage
      this.searchForm.size = this.pageSize
      if (this.searchForm.type === 0) {
        delete this.searchForm.type
      }
      this.$store.dispatch('express/getList', this.searchForm).then(res => {
        let data = res.extend.data
        this.packages = data.records
        this.total = data.total
        this.loading = false
      }).catch(err => {
        this.$message({
          message: err,
          type: 'error'
        })
      })
    },
    resizeHandler () {
      let w = window.screenWidth || document.body.clientWidth
      if (w <= 768) {
        this.width = '100%'
      } else {
        this.width = '70%'
      }
    },
    handleCommand (e) {
      let index = parseInt(e)
      switch (index) {
        case 0:
          this.menuName = '全部'
          this.searchForm.type = 0
          this.getPackageList()
          break
        case 1:
          this.menuName = '等待揽件'
          this.searchForm.type = 1
          this.getPackageList()
          break
        case 2:
          this.menuName = '运输中'
          this.searchForm.type = 2
          this.getPackageList()
          break
        case 3:
          this.menuName = '已签收'
          this.searchForm.type = 3
          this.getPackageList()
          break
      }
    },
    handleAdd () { // 弹出新增组件
      this.packAddDialog = true
    },
    editSubmit (data) { // 编辑组件确认
      this.editCancel()
      this.$store.dispatch('express/toUpdate', data).then(data => {
        this.getPackageList()
        this.$message({
          message: '修改成功',
          type: 'success'
        })
      }).catch(err => {
        this.$message({
          message: err,
          type: 'error'
        })
      })
    },
    addSubmit (pack) { // 新增组件确认
      this.addCancel()
      this.$store.dispatch('express/toSave', pack).then(data => {
        console.log('save', data)
        this.$message({
          message: '新增成功',
          type: 'success'
        })
      }).catch(err => {
        this.$message({
          message: err,
          type: 'error'
        })
      })
    },
    editCancel () { // 编辑组件取消
      this.packEditDialog = false
    },
    addCancel () { // 新增组件取消
      this.packAddDialog = false
    },
    handleEdit (index, row) { // 弹出编辑组件
      this.dataItem = row
      this.packEditDialog = true
    },
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('express/toDelete', { id: row.logId }).then(data => {
          this.getPackageList()
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }).catch(err => {
          this.$message({
            message: err,
            type: 'error'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    currentPageChange (currentPage) { // 当前页改变事件
      this.currentPage = currentPage
      this.getPackageList()
    }
  },
  created () {
    this.getPackageList()
    window.addEventListener('resize', this.resizeHandler)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resizeHandler)
  }
}
</script>
<style lang="scss" scoped>
.content {
  color: #000;
  letter-spacing: 1px;
  font-size: 15px;
}
.student-container{
  background: #fff;
  box-shadow: 1px 0px 3px rgba(0, 0, 0, 0.1);
  border-top: 1px solid transparent;
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
