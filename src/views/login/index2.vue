<template>
  <div class="login-container">
    <div class="loginform">
      <el-card class="box-card">
        <h1 v-if="isLogin">登录界面</h1>
        <h1 v-else>注册界面</h1>
        <el-divider><i class="el-icon-user-solid"></i></el-divider>
        <el-form ref="loginform" :model="loginform" :rules="loginRules" class="input-form">
          <el-form-item prop="name" v-if="!isLogin">
            <el-input v-model="loginform.name" placeholder="请输入你的名字">
              <template slot="prepend">
                <i slot="suffix" class="el-input__icon el-icon-user-solid"></i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="name">
            <el-input v-model="loginform.username" placeholder="请输入账号">
              <template slot="prepend">
                <i slot="suffix" class="el-input__icon el-icon-user-solid"></i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="phone">
            <el-input v-model="loginform.phone" placeholder="请输入电话号码">
              <template slot="prepend">
                <i slot="suffix" class="el-input__icon el-icon-user-solid"></i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginform.password" show-password placeholder="请输入密码">
               <template slot="prepend">
                <i slot="suffix" class="el-input__icon el-icon-lock"></i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="secondPassword" v-if="!isLogin">
            <el-input v-model="loginform.secondPassword" show-password placeholder="请再次确认密码">
               <template slot="prepend">
                <!-- <i slot="suffix" class="el-input__icon el-icon-lock"></i> -->
                <svg-icon icon-class="2-mima" style="color:#444;background:#444;"></svg-icon>
              </template>
            </el-input>
          </el-form-item>
          <!-- <el-form-item v-if="isLogin" prop="code">
            <el-input v-model="loginform.code" placeholder="请输入验证码">
              <template slot="append">
                1234
              </template>
            </el-input>
          </el-form-item> -->
          <el-form-item>
            <el-button :loading="loading" type="primary" @click="onSubmit">
              <span v-if="isLogin">立即登录</span>
              <span v-else>立即注册</span>
            </el-button>
          </el-form-item>
        </el-form>
        <div class="login-footer">
          <p class="forget" v-if="isLogin">忘记密码？<i class="el-icon-question"></i></p>
          <p class="register" @click="toregister">
            <span v-if="isLogin">点击注册</span>
            <span v-else>返回登录</span>
            </p>
        </div>
      </el-card>
    </div>
    <div class="footer">
      <my-footer></my-footer>
    </div>
  </div>
</template>
<script>
import myfooter from '../user/layout/footer/index'
export default {
  components: {
    myFooter: myfooter
  },
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'))
      } else {
        if (value.length < 8) {
          callback(new Error('密码长度在8-100之间'))
        } else {
          let regex = /^[A-Za-z][A-Za-z0-9]{7,99}$/
          if (regex.test(value)) {
            callback()
          } else {
            callback(new Error('密码只能由字母，数字构成，且不能数字开头'))
          }
        }
      }
    }
    var validateSecondPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('重复密码不能为空'))
      } else {
        if (value === this.loginform.password) {
          callback()
        } else {
          callback(new Error('两次密码不一致'))
        }
      }
    }
    return {
      isLogin: true,
      loginform: {
        name: '',
        username: '',
        password: '',
        secondPassword: '',
        phone: ''
      },
      loading: false,
      loginRules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, message: '长度大于 3 ', trigger: 'blur' }
        ],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        secondPassword: [
          { required: true, validator: validateSecondPass, trigger: 'blur' }
        ],
        code: [ { required: true, message: '验证码不能为空', trigger: 'blur' } ]
      }
    }
  },
  methods: {
    toregister () {
      this.isLogin = !this.isLogin
    },
    onSubmit () {
      let _this = this
      this.$refs.loginform.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$message({
            type: 'success',
            message: '登录成功',
            onClose: () => {
              // 登录成功的回调
              _this.$store.dispatch('user/login', this.loginform).then( () => {
                _this.loading = false
                this.$router.push('/')
                // this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              }).catch(err=>{
                console.log(err)
                _this.loading = false
              })
              // this.$message.success('登录成功的回调')
            }
          })
        } else {
          this.$message.error('登录失败')
          return false
        }
      })
    }
  },
  watch: {
    isLogin () {
      this.loginform = {
        name: '',
        password: '',
        secondPassword: '',
        code: ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>
p{
  color: #245EBF;
  cursor: pointer;
  font-size: 12px;
}
.login-container{
  background: url('/img/login-bg.jpg') center center no-repeat;
  background-size: cover;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  .loginform{
    flex: 1;
    display: flex;
    align-items: center;
    h1{
      width: 100%;
      text-align: center;
      font-family: '微软雅黑',"宋体","Arial Narrow",Helvetica,sans-serif;
      padding: 10px 0;
    }
    .input-form{
      margin-top: 20px;
      button{
        width: 100%;
      }
    }
    .login-footer{
      width: 100%;
      height: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .forget{
        i{
          color: rgb(138, 94, 13);
        }
      }
      .register{
        font-size: 15px;
      }
    }
  }
  .footer{
    height: 60px;
  }
}
@media (max-width: 500px) {
  .login-container{
    .loginform {
      h1{
        margin: 0;
        padding: 0;
      }
      .input-form {
        .el-form-item {
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>
