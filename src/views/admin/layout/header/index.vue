<template>
  <div class="header-container">
    <div class="logo hidden-xs-only" @click="toHome">
      <h1>校园物流信息后台管理</h1>
    </div>
    <div class="hidden-sm-and-up">
      <i class="el-icon-s-unfold left-btn" @click="toShowLeft"></i>
    </div>
    <el-dropdown trigger="click" :text-color="'#fff'" @command="handleCommand">
      <span class="el-dropdown-link">
         <img class="avatar" src="/img/avatar.png" alt="头像">
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="1">我的信息</el-dropdown-item>
        <el-dropdown-item command="2">设置</el-dropdown-item>
        <el-dropdown-item command="3">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      isShow: 'leftOpened'
    })
  },
  methods: {
    toHome () {
      if (this.$route.name === 'home') {
      } else {
        this.$router.push('/')
      }
    },
    handleCommand (command) {
      switch (command) {
        case '1':
          //
          break
        case '2':
          //
          break
        case '3':
          this.login()
          break
        default:
          break
      }
    },
    login () {
      this.$store.dispatch('user/logout').then(() => {
        this.$router.push('/login')
      }).catch(err => {
        this.$message({
          message: err,
          type: 'error'
        })
      })
    },
    toShowLeft () {
      this.$store.dispatch('app/LeftClick')
    }
  }
}
</script>
<style lang="scss" scoped>
.el-dropdown-link {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #f5f5f5;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.header-container {
  display: flex;
  justify-content: space-between;
  // background: #f9f9f9;
  background: #fff;
  height: 100%;
  align-items: center;
  padding: 0 20px;
  // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .logo{
    cursor: pointer;
    h1{
      font-family: '微软雅黑';
      color: #409EFF;
      font-weight: 700;
      font-size: 30px;
    }
  }
  .left-btn{
    color: #409EFF;
    font-size: 20px;
  }
  .avatar{
    width: 40px;
    border-radius: 50%;
    transition: .3s;
  }
  .avatar:hover{
    box-shadow: 0 0 0 2px #409EFF;
  }
}
</style>
