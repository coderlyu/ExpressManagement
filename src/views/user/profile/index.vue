<template>
  <div class="user">
    <el-row>
      <el-col>
        <div class="user-info">
          <div class="user-info-img">
            <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1425948001,1258378810&fm=26&gp=0.jpg" alt="头像">
          </div>
          <div class="user-info-detail">
            <h2>尊敬的<span class="name">{{this.$store.getters.userName}}</span>早上好<span class="grade"><i class="grade-left">V</i><i class="grade-right">7</i></span></h2>
            <div class="bottom">
              <div class="bottom-left">
                <svg-icon icon-class="qq"></svg-icon>
                <svg-icon icon-class="weixin"></svg-icon>
                <svg-icon icon-class="weibo"></svg-icon>
                信用等级：<svg-icon icon-class="grade_v1"></svg-icon>
              </div>
              <span class="time">上次登录：<i>2019-12-8 21:00:23</i></span>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
        <div class="item">
          <div class="item-left">
            <svg-icon icon-class="包裹"></svg-icon>
          </div>
          <div class="item-right">
            <h3>总包裹数</h3>
            <p class="item-right-english">PACKAGE NUMBER</p>
            <p class="item-right-number">120</p>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
        <div class="item">
          <div class="item-left">
            <svg-icon style="font-size:53px;" icon-class="弃件包裹"></svg-icon>
          </div>
          <div class="item-right">
            <h3>弃件包裹</h3>
            <p class="item-right-english">PACKAGE NUMBER</p>
            <p class="item-right-number">10</p>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
        <div class="item">
          <div class="item-left">
            <svg-icon style="font-size:53px;" icon-class="退货包裹"></svg-icon>
          </div>
          <div class="item-right">
            <h3>退货包裹</h3>
            <p class="item-right-english">PACKAGE NUMBER</p>
            <p class="item-right-number">15</p>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
        <div class="item">
          <div class="item-left">
            <svg-icon icon-class="交付包裹"></svg-icon>
          </div>
          <div class="item-right">
            <h3>交付包裹</h3>
            <p class="item-right-english">PACKAGE NUMBER</p>
            <p class="item-right-number">95</p>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <div class="user-other-info">
          <h3>基本信息</h3>
          <div class="info-item">
            <span><svg-icon icon-class="man"></svg-icon> 性名</span>
            <p>{{ this.$store.getters.userName }}</p>
          </div>
          <div class="info-item">
            <span><svg-icon icon-class="sex"></svg-icon> 性别</span>
            <p><svg-icon icon-class="man"></svg-icon></p>
          </div>
          <div class="info-item">
            <span><svg-icon icon-class="address"></svg-icon> 所在地</span>
            <p>浙江·绍兴</p>
          </div>
          <div class="info-item">
            <span><svg-icon icon-class="phone"></svg-icon> 联系电话</span>
            <p>{{ this.$store.getters.phone }}</p>
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

    }
  }
}
</script>
<style lang="scss" scoped>
.user {
  .user-info {
    display: flex;
    background: #fff;
    height: 74px;
    border-top-left-radius: 35px;
    border-bottom-left-radius: 35px;
    .user-info-img{
      width: 80px;
      img {
        box-shadow: 0 0 0 2px #fff;
          width: 70px;
          height: 74px;
          border-radius: 50%;
      }
   }
   .user-info-detail {
     margin-left: 20px;
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: center;
      h2 {
        line-height: 30px;
        font-size: 15px;
        span.grade {
          align-self:flex-end;
          margin-left: 5px;
          padding: 0 5px;
          height: 20px;
          line-height: 20px;
          display: inline-block;
          background: #e87600;
          border-radius: 2px;
          color: #fff;
          i.grade-left {
            font-size: 14px;
            font-weight: 700;
          }
          i.grade-right {
            margin-left: 2px;
            font-size: 12px;
            font-weight: 700;
          }
        }
        span.name {
          color: #FF9700;
          margin: 0 10px;
        }
      }
      div.bottom {
        line-height: 25px;
        font-size: 14px;
        color: #444;
        display: flex;
        flex-direction: row;
        // align-items: center;
        svg{
          font-size: 16px;
          margin: 0 3px;
        }
        span.time {
          font-size: 12px;
          flex: 1;
          text-align: end;
          margin-right: 10px;
        }
      }
    }
  }
  .item {
    padding: 5px 10px;
    margin: 15px 5px 0 5px;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba($color: #000000, $alpha: 0.1);
    border-radius: 5px;
    display: flex;
    height: 100px;
    &-left {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 80px;
      svg{
        font-size: 70px;
      }
    }
    &-right {
      display: flex;
      flex: 1;
      flex-direction: column;
      text-align: end;
      margin-right: 10px;
      justify-content: space-between;
      h3 {
        font-size: 16px;
        line-height: 25px;
      }
      &-english {
        font-size: 12px;
      }
      &-number {
        font-size: 28px;
        font-weight: 600;
        color: #1296DB;
      }
    }
  }
  .user-other-info {
    margin-top: 20px;
    padding: 15px;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba($color: #000000, $alpha: 0.1);
    border-radius: 10px;
    .info-item {
      margin: 15px 0;
      display: flex;
      flex-direction: row;
      line-height: 25px;
      span {
        position: relative;
        margin-right: 20px;
        text-align: end;
        display: inline-block;
        width: 85px;
        color: #444;
        font-size: 15px;
        font-weight: 600;
        svg {
          font-size: 18px;
          position: absolute;
          left: 0;
        }
      }
      p {
        font-size: 15px;
      }
    }
  }
}
@media screen and (max-width:768px){
  .user {
    .user-info {
      .user-info-detail {
        div.bottom {
          line-height: 25px;
          font-size: 14px;
          color: #444;
          display: flex;
          flex-direction: column;
          // align-items: center;
          svg{
            font-size: 16px;
            margin: 0 3px;
          }
          span.time {
            flex: 1;
            text-align: end;
            margin-right: 10px;
          }
        }
      }
    }
  }
}
</style>
