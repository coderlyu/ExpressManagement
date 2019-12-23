<template>
  <div class="login">
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="15" :md="12" :lg="11" :xl="9">
        <div class="login-logo">
          <svg-icon icon-class="userlogo" style="font-size:120px;"/>
          <h1 v-if="isLoginState">登录</h1>
          <h1 v-else>注册</h1>
        </div>
        <div class="login-form">
          <div class="input-item" v-if="!isLoginState">
            <span class="error_tip" v-show="nickname_err">{{ nickname_tip }}</span>
            <svg-icon icon-class="nickname" style="font-size:20px;color:white;"/>
            <input type="text" :value="user.nickname" @blur="testnickname" placeholder="昵称"/>
          </div>
          <div class="input-item">
            <span class="error_tip" v-show="username_err">{{ username_tip }}</span>
            <svg-icon icon-class="user" style="font-size:20px;color:white;"/>
            <input type="text" :value="user.username" @blur="testname" placeholder="用户名/手机号/邮箱"/>
          </div>
          <div class="input-item" v-if="!isLoginState">
            <span class="error_tip" v-show="phone_err">{{ phone_tip }}</span>
            <svg-icon icon-class="phone" style="font-size:20px;color:white;"/>
            <input type="text" :value="user.phone" @blur="testphone" placeholder="手机号码"/>
          </div>
          <div class="input-item">
            <span class="error_tip" v-show="password_err">{{ password_tip }}</span>
            <svg-icon icon-class="mima" style="font-size:20px;color:white;"/>
            <input type="password" :value="user.password" @blur="testpass" placeholder="请输入密码" />
          </div>
          <div class="input-item" v-if="!isLoginState">
            <span class="error_tip" v-show="secondpassword_err">{{ secondpasspord_tip }}</span>
            <svg-icon icon-class="2-mima" style="font-size:20px;color:white;"/>
            <input type="password" :value="user.secondpassword" @blur="testsecondpass" placeholder="请再次输入密码" />
          </div>
          <div class="login-form-footer">
            <p class="login-form-footer-register" @click="toRegister" v-if="isLoginState">注册新用户</p>
            <p class="login-form-footer-register" @click="toLogin" v-else>已有账号</p>
            <p class="login-form-footer-forget" v-if="isLoginState">忘记密码?</p>
          </div>
          <div class="login-form-btn">
            <el-button color="linear-gradient(to right, rgb(173, 2, 2), rgb(228, 107, 107))" v-if="isLoginState" @click="login">登录</el-button>
            <el-button color="linear-gradient(to right, rgb(173, 2, 2), rgb(228, 107, 107))" v-else @click="register">注册</el-button>
          </div>
        </div>
        <div class="my-divider">
          <div class="my-divider-item"></div>
          <span>第三方直接登录</span>
        </div>
        <div class="login-other">
          <div class="login-other-item">
            <svg-icon icon-class="qq" style="font-size:30px;"/>
          </div>
          <div class="login-other-item">
            <svg-icon icon-class="wx" style="font-size:30px;"/>
          </div>
          <div class="login-other-item">
            <svg-icon icon-class="zfb" style="font-size:30px;"/>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isLoginState: true,
      nickname_err: false,
      username_err: false,
      password_err: false,
      secondpassword_err: false,
      phone_err: false,
      phone_tip: '',
      nickname_tip: '',
      username_tip: '',
      password_tip: '',
      secondpasspord_tip: '',
      user: {
        nickname: '',
        username: '',
        phone: '',
        password: '',
        secondpassword: ''
      }
    }
  },
  methods: {
    testnickname (e) {
      if (!e.target.value) {
        this.nickname_tip = '昵称不能为空'
        this.nickname_err = true
      } else {
        this.user.nickname = e.target.value
        this.nickname_err = false
      }
    },
    testphone (e) {
      let reg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!e.target.value) {
        this.phone_tip = '手机号码不能为空'
        this.phone_err = true
      } else {
        if (!reg.test(e.target.value)) {
          this.phone_tip = '手机号码格式不正确'
          this.phone_err = true
        } else {
          this.phone_err = false
        }
        this.user.phone = e.target.value
      }
    },
    testname (e) {
      if (!e.target.value) {
        this.username_tip = '用户名不能为空'
        this.username_err = true
      } else {
        this.user.username = e.target.value
        this.username_err = false
      }
    },
    testpass (e) {
      if (!e.target.value) {
        this.password_tip = '密码不能为空'
        this.password_err = true
      } else {
        this.user.password = e.target.value
        this.password_err = false
      }
    },
    testsecondpass (e) {
      if (!e.target.value) {
        this.secondpasspord_tip = '用户名不能为空'
        this.secondpassword_err = true
      } else {
        if (e.target.value !== this.user.password) {
          this.secondpasspord_tip = '两次密码必须相同'
          this.secondpassword_err = true
          this.user.secondpassword = e.target.value
          return
        }
        this.user.secondpassword = e.target.value
        this.secondpassword_err = false
      }
    },
    toRegister () {
      this.isLoginState = false
      this.init()
    },
    toLogin () {
      this.isLoginState = true
      this.init()
    },
    login () {
      if (this.user.username && this.user.password) {
        if (!this.username_err && !this.password_err) {
          this.$store.dispatch('user/login', this.user).then(() => {
            this.$message({
              message: '登录成功',
              type: 'success'
            })
            this.$router.push('/')
          }).catch((err) => {
            console.log(err)
            this.$message({
              message: err,
              type: 'error'
            })
          })
        } else {
          this.$message({
            message: '数据格式不正确',
            type: 'warning'
          })
        }
      } else {
        this.$message({
          message: '参数不能为空',
          type: 'warning'
        })
      }
    },
    register () {
      if (this.user.username && this.user.password && this.user.secondpassword && this.user.nickname && this.user.phone) {
        if (this.user.password === this.user.secondpassword) {
          if (!this.nickname_err && !this.username_err && !this.password_err && !this.phone_err) {
            this.$store.dispatch('user/register', this.user).then((data) => {
              this.$message({
                message: '注册成功',
                type: 'success'
              })
              this.toLogin()
            }).catch(err => {
              this.$message({
                message: err,
                type: 'error'
              })
            })
          } else {
            this.$message({
              message: '参数不合法，请确保你输入正确的',
              type: 'warning'
            })
          }
        } else {
          this.$message({
            message: '两次密码不一致',
            type: 'warning'
          })
        }
      } else {
        this.$message({
          message: '参数不能为空',
          type: 'warning'
        })
      }
    },
    init () {
      this.nickname_err = false
      this.username_err = false
      this.password_err = false
      this.secondpassword_err = false
      this.phone_err = false
      this.phone_tip = ''
      this.nickname_tip = ''
      this.username_tip = ''
      this.password_tip = ''
      this.secondpasspord_tip = ''
      this.user = {
        nickname: '',
        username: '',
        phone: '',
        password: '',
        secondpassword: ''
      }
    }
  },
  created () {
    this.init()
  }
}
</script>
<style lang="scss" scoped>
.error_tip {
    position: absolute;
    color: red;
    font-size: 12px;
    left: 10px;
    bottom: -17px;
}
.login {
    min-height: 100vh;
    background: url('/img/login-bg.jpg');
    background-size: cover;
    &-logo {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      // padding-top: px;
      h1 {
        color: #fff;
      }
    }
    &-form {
        width: 100%;
        height: 350px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        margin-bottom: 20px;
        .input-item {
            position: relative;
            width: 80%;
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid white;
            padding-bottom: 5px;
            svg {
                width: 20px;
                margin-right: 5px;
            }
            input {
                flex: 1;
                overflow: hidden;
                border: 0;
                background-color: transparent !important;
                color: white;
                font-size: 15px;
                padding-left: 10px;
                outline: none;
            }
            input::-webkit-input-placeholder {
                opacity:0.7;
                color: white;
                font-size: 15px;
                font-weight: 200;
            }
            input:-internal-autofill-previewed, input:-internal-autofill-selected {
                -webkit-text-fill-color: #FFFFFF !important;
                transition: background-color 5000s ease-in-out 0s !important;
            }
            &-code {
                text-align: center;
                width: 50px;
                font-size: 13px;
                display: inline-block;
                background-color: #d34b4b;
                padding: 3px;
                color: white;
            }
        }
        &-footer {
            margin-top: 20px;
            display: flex;
            flex-direction: row;
            color: white;
            font-size: 12px;
            width: 80%;
            justify-content: space-between;
            p {
              cursor: pointer;
                margin: 0 10px;
            }
            &-forget {
                color: red;
            }
            &-register {
                color: #037efd;
            }
        }
        &-btn {
            display: flex;
            margin-top: 20px;
            width: 80%;
            button {
                flex: 1;
            }
        }
    }
    .my-divider {
      width: 80%;
      margin: 0 auto;
      position: relative;
      span{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #000;
        padding: 2px 10px;
        z-index: 2;
        font-size: 14px;
        background: #fff;
      }
      &-item{
        top: 50%;
        transform: translateY(-50%);
        width: 100%;
        border: 1px solid #fff;
        position: absolute;
        z-index: 1;
      }
    }
    &-other {
      width: 80%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      &-item {
        cursor: pointer;
        padding: 30px;
      }
    }
}
</style>
