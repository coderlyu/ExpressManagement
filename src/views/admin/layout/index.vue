<template>
  <div class="container" v-cloak>
    <div v-show="isShow" class="mask" @click="toCloseMask"></div>
    <el-header>
      <my-header />
    </el-header>
    <el-main class="main">
      <el-row :gutter="20" class="main-wrapper">
        <el-col :sm="6" :md="5" :lg="4" :xl="2" class="left-w">
          <el-menu :default-active="$route.name" class="el-menu-vertical-demo left-nav" :style="isShow?'left: 0':''">
            <router-link to="/admin">
              <el-menu-item index="admin"><i class="el-icon-house"></i>首页</el-menu-item>
            </router-link>
            <el-submenu index="">
              <template slot="title"><i class="el-icon-menu"></i>人员管理</template>
              <router-link to="/admin/studentList">
                <el-menu-item index="studentList"><i class="el-icon-user"></i>学生用户</el-menu-item>
              </router-link>
              <router-link to="/admin/adminList">
                <el-menu-item index="adminList"><i class="el-icon-s-custom"></i>管理员</el-menu-item>
              </router-link>
            </el-submenu>
            <router-link to="/admin/packageList">
              <el-menu-item index="packageList"><i class="el-icon-files"></i>物流管理</el-menu-item>
            </router-link>
          </el-menu>
        </el-col>
        <el-col :xs="24" :sm="18" :md="19" :lg="20" :xl="22">
          <transition name="fade-transform" mode="out-in">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </transition>
        </el-col>
      </el-row>
    </el-main>
    <el-footer>
      <my-footer />
    </el-footer>
  </div>
</template>
<script>
import myHeader from './header/index'
import myFooter from './footer/index'
import { mapGetters } from 'vuex'
export default {
  components: {
    myHeader,
    myFooter
  },
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
    toCloseMask () {
      this.$store.dispatch('app/LeftClick')
    }
  }
}
</script>
<style lang="scss" scoped>
[v-cloak]{
  display: none;
}
/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.mask{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 99;
  background: rgba($color: #000000, $alpha: 0.3)
}
.main-wrapper {
  padding: 20px;
  height: 100%;
  .el-menu{
    border-right: 0;
  }
  .el-menu-item.is-active{
    border-left: 3px solid #409EFF;
    background-color: #fdfdfd;
  }
  .left-w{
    padding:20px 2px;
    background:#fff;
    box-shadow: 1px 0px 3px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    .left-nav{
      border-radius: 10px;
      background: #fff;
      height: 100%;
    }
  }
}
// .container{
//   // display: flex;
//   // flex-direction: column;
// }
header{
  padding: 0;
  color: white;
  height: 60px;
  // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
main{
  max-width: 1400px;
  margin: 0 auto;
  background: #fdfdfd;
  padding: 0;
  min-height: calc(100vh - 120px);
  overflow: hidden;
}
footer{
  padding: 0;
  height: 60px;
}
@media (max-width: 768px){
  .main-wrapper {
    padding: 10px 0;
      .left-w{
        border-radius: 0;
        padding: 0;
        .left-nav{
          position: fixed;
          top: 0;
          bottom: 0;
          width: 200px;
          left: -220px;
          z-index: 100;
          box-shadow: 1px 0px 3px rgba(0, 0, 0, 0.1);
          border-radius: 0;
          transition: 0.5s;
      }
    }
  }
}
</style>
