<template>
  <div class="studentSearch">
    <el-dialog
    title="查询"
    :visible.sync="stuSearchdialogVisible"
    :width="dialogWidth"
    :before-close="handleClose">
      <el-form :model="searchForm"  label-width="80px">
        <el-form-item label="名字">
          <el-input v-model="searchForm.name" placeholder="名字"></el-input>
        </el-form-item>
        <el-form-item label="开始时间" prop="startDate">
          <el-date-picker type="date" placeholder="开始时间" v-model="searchForm.startDate" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="endDate">
          <el-date-picker placeholder="结束时间" v-model="searchForm.endDate" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="handleClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    stuSearchDialog: {
      type: Boolean,
      default: false
    },
    w: {
      type: String,
      default: '70%'
    }
  },
  data () {
    return {
      stuSearchdialogVisible: this.stuSearchDialog,
      searchForm: {
        name: '',
        startDate: '',
        endDate: ''
      },
      dialogWidth: this.w
    }
  },
  watch: {
    stuSearchDialog () {
      this.stuSearchdialogVisible = this.stuSearchDialog
    },
    w () {
      this.dialogWidth = this.w
    }
  },
  methods: {
    handleClose () {
      this.$emit('searchCancel', false)
      this.searchForm = {
        name: '',
        startDate: '',
        endDate: ''
      }
    },
    onSubmit () {
      this.$emit('searchSubmit', this.searchForm)
    },
    onCancel () {
      console.log('取消')
    }
  }
}
</script>
<style lang="sass" scoped>

</style>
