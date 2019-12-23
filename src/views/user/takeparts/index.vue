<template>
  <div class="tabe-wrapper">
    <el-row>
      <el-col>
        <h3>取件流程</h3>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" style="padding: 20px 10px;">
      <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
        <el-form ref="takeform" :model="takeform" :rules="takeroles"  label-width="65px">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="takeform.name" placeholder="姓名">
            </el-input>
          </el-form-item>
          <el-form-item label="取件码" prop="code">
            <el-input v-model="takeform.code" placeholder="取件码">
            </el-input>
          </el-form-item>
          <el-button @click="submitForm('takeform')">确认取件</el-button>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <div class="status">
          <h3>操作说明</h3>
          <ul>
            <li class="item" v-for="(item, index) in statusList" :key="index">
              <span>{{ index + 1 }}</span>
              <p>{{ item }}</p>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'takepartsPage',
  data () {
    return {
      takeform: {
        name: '',
        code: ''
      },
      takeroles: {
        name: [{ required: true, message: '请输入你的姓名', trigger: 'blur' }],
        code: [{ required: true, message: '请输入手机上的取件码', trigger: 'blur' }]
      },
      statusList: [
        '找到公司楼下或者小区里面的丰巢快递柜，点击取包裹。',
        '当快递柜页面上出现“取件码开箱”的时候，点击它。',
        '输入你的取件码。',
        '等丰巢快递柜系统出现“箱格已打开，请取出包裹后关上箱门”的时候找到快递柜打开的箱格，把快递取出来就可以了。'
      ]
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('此操作将提交你的信息, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            // TODO
            this.$message({
              type: 'success',
              message: '取件成功!请收好你的包裹'
            })
            this.takeform = {
              name: '',
              code: ''
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '操作已取消'
            })
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.tabe-wrapper {
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 10px;
  h3{
    padding-left: 5px;
  }
  .status {
    .item{
      display: flex;
      margin: 3px 0;
      color: #333;
      font-size: 14px;
      span{
        width: 40px;
        text-align: end;
        margin-right: 10px;
      }
      p{
        flex: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
