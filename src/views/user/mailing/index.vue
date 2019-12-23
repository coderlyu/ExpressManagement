<template>
  <div class="tabe-wrapper">
    <el-row>
      <el-col>
        <h3>寄件流程</h3>
        <div class="takeflow">
          <el-steps :active="active" finish-status="success" >
            <el-step title="第一步" icon="el-icon-edit" description="请在网上申请获取寄件码"></el-step>
            <el-step title="第二步" icon="el-icon-upload" description="输入姓名，寄件码"></el-step>
            <el-step title="第三步" icon="el-icon-picture" description="将包裹放入并关闭柜门"></el-step>
          </el-steps>
          <div class="takeinput">
            <p v-if="active === 0">【注意】请确保你已经获取到了寄件码，如果不懂操作可以详细查看下方的 “寄件须知” ,点击下一步</p>
            <el-form ref="takeform" :model="takeform" label-width="80px" :rules="formrules">
              <el-form-item label="姓名" prop="name" v-if="active === 1">
                <el-input v-model="takeform.name" placeholder="请输入你的姓名"></el-input>
              </el-form-item>
              <el-form-item label="寄件码" prop="code" v-if="active === 1">
                <el-input v-model="takeform.code" placeholder="请输入你获得的寄件码"></el-input>
              </el-form-item>
            </el-form>
            <p v-if="active === 2">【注意】请确保你已经放入了柜中，之后点击下一步</p>
          </div>
          <div class="bottom-footer">
            <el-button @click="next" :disabled="nextbtn">下一步</el-button>
            <el-button type="danger"  @click="back" :disabled="backbtn">上一步</el-button>
          </div>
        </div>
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
      active: 0,
      takeform: {
        name: '',
        code: ''
      },
      formrules: {
        name: [{ required: true, message: '请输入你的姓名', trigger: 'blur' }],
        code: [{ required: true, message: '请输入你手机上的寄件码', trigger: 'blur' }]
      },
      statusList: [
        '首先是网上下单，微信添加丰巢快递柜。',
        '添加完了之后，再公众号中绑定上手机号，并且完成实名认证。',
        '然后填写寄件人收件人的信息和寄送物品信息，填写完毕后，确认提交，网上下单完成。获得一个“寄件码”',
        '接下来就是寄件了，到丰巢专柜处，点击下中间的显示屏，选择寄件，输入“寄件码',
        '选择格口(根据所寄物品大小，一般小件选择小号的格口就可以)，然后支付运费，柜台格子会自动弹开，放入物品，关上格口，寄件完成。',
        '接下来就是快递员的工作了，他们会定点到快递柜取件，然后发走。'
      ]
    }
  },
  methods: {
    next () {
      if (this.active === 1) {
        this.$refs.takeform.validate((valid) => {
          if (valid) {
            this.active++
          } else {
            return false
          }
        })
      } else if (this.active === 2) {
        this.$confirm('请确保你已经完成了前两步, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.active++
          this.$message({
            type: 'success',
            message: '寄件成功，等待快递员揽件'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '操作已取消'
          })
        })
      } else {
        this.active++
      }
    },
    back () {
      if (this.active > 0) {
        this.active--
      }
    }
  },
  computed: {
    nextbtn () {
      if (this.active <= 2) {
        return false
      } else {
        return true
      }
    },
    backbtn () {
      if (this.active > 0) {
        return false
      } else {
        return true
      }
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
}
.takeflow{
  padding: 10px 5px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
 .bottom-footer{
   margin: 20px 0;
   width: 100%;
   display: flex;
   justify-content: space-between;
   align-items: center;
 }
 .takeinput{
    border: 1px solid #f7f7f7;
    border-radius: 3px;
    margin: 20px 0 0 0;
    padding: 10px 0;
    p{
      font-size: 14px;
      color: #333;
      text-indent: 2em;
    }
    .el-form-item:nth-of-type(2) {
      margin-bottom: 0;
    }
 }
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
</style>
