<template>
  <el-dialog
    title="编辑"
    :visible.sync="studentEditDialog"
    :width="width"
    center
    :before-close="handleClose">
    <el-form ref="stuEditForm" :model="stuEditForm" :rules="stuRules" label-width="60px">
      <el-form-item label="编号">
        <el-input v-model="stuEditForm.userId" disabled></el-input>
      </el-form-item>
      <el-form-item label="名字" prop="name">
        <el-input v-model="stuEditForm.name"></el-input>
      </el-form-item>
      <el-form-item label="账号">
        <el-input v-model="stuEditForm.userName" disabled></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="stuEditForm.phone" disabled></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="stuEditForm.remark"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认保存</el-button>
        <el-button @click="handleClose">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
export default {
  props: {
    w: {
      type: String,
      default: '70%'
    },
    item: {
      type: Object,
      required: true
    },
    stuEditDialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      width: this.w,
      studentEditDialog: this.stuEditDialog,
      stuEditForm: {
        userId: '',
        remark: '',
        phone: '',
        name: '',
        userName: ''
      },
      stuRules: {
        name: [{ required: true, message: '名字不能为空', trigger: 'blur' }]
      }
    }
  },
  watch: {
    stuEditDialog () {
      this.studentEditDialog = this.stuEditDialog
    },
    item () {
      this.stuEditForm = this.item
    },
    w () {
      this.width = this.w
    }
  },
  methods: {
    handleClose () {
      this.$emit('editCancel')
    },
    onSubmit () {
      this.$refs.stuEditForm.validate((valid) => {
        if (valid) {
          this.$emit('editSubmit', this.stuEditForm)
        } else {
          this.$message({
            message: '当前表单填写不合法',
            type: 'warning'
          })
          return false
        }
      })
    }
  },
  created () {
    this.stuEditForm = Object.assign(this.stuEditForm, this.item)
  }
}
</script>
<style lang="sass" scoped>

</style>
