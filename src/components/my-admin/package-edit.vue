<template>
  <el-dialog
    title="编辑"
    :visible.sync="packageEditDialog"
    :width="width"
    center
    :before-close="handleClose">
    <el-form ref="packEditForm" :model="packEditForm" :rules="packRules" label-width="100px">
      <el-form-item label="产品名称" prop="productName">
        <el-input v-model="packEditForm.productName" disabled></el-input>
      </el-form-item>
      <el-form-item label="收件人手机" prop="phone">
        <el-input v-model="packEditForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="取件码" prop="logCode">
        <el-input v-model="packEditForm.logCode"></el-input>
      </el-form-item>
      <el-form-item label="收货地址" prop="deliveryAddress">
        <el-input v-model="packEditForm.deliveryAddress"></el-input>
      </el-form-item>
      <el-form-item label="发货地址" prop="shipAddress">
        <el-input v-model="packEditForm.shipAddress"></el-input>
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
    width: {
      type: String,
      default: '70%'
    },
    item: {
      type: Object,
      required: true
    },
    packEditDialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
    var validatePhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else {
        let reg = /^[1][3,4,5,7,8][0-9]{9}$/
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('手机号格式不正确'))
        }
      }
    }
    return {
      packageEditDialog: this.packEditDialog,
      packEditForm: {
        productName: '', // 产品名称
        logCode: '', // 取件码
        phone: '', // 收件人手机号
        postId: '', // 驿站Id
        deliveryAddress: '', // 收货地址
        shipAddress: '', // 发货地址
        type: 1 // 1(等待揽件 2运输中 3已签收)
      },
      packRules: {
        productName: [{ required: true, message: '产品名称不能为空', trigger: 'blur' }],
        logCode: [{ required: true, message: '取件码不能为空', trigger: 'blur' }],
        deliveryAddress: [{ required: true, message: '收货地址不能为空', trigger: 'blur' }],
        shipAddress: [{ required: true, message: '发货地址不能为空', trigger: 'blur' }],
        phone: [{ required: true, validator: validatePhone, trigger: 'blur' }]
      }
    }
  },
  watch: {
    packEditDialog () {
      this.packageEditDialog = this.packEditDialog
    },
    item () {
      this.packEditForm = this.item
    }
  },
  methods: {
    handleClose () {
      this.$emit('editCancel')
    },
    onSubmit () {
      this.$refs.packEditForm.validate((valid) => {
        if (valid) {
          this.$emit('editSubmit', this.packEditForm)
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
    this.packEditForm = Object.assign(this.packEditForm, this.item)
  }
}
</script>
<style lang="sass" scoped>

</style>
