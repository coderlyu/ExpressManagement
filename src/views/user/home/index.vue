<template>
  <div class="home">
    <el-row type="flex" justify="center" style="padding: 20px 10px;">
      <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
        <el-input v-model="searchVal" placeholder="订单号/用户名">
          <el-button slot="append" icon="el-icon-search" @click="toSearch"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="24" :md="16" :lg="12" :xl="12">
        <div class="item-wrapper">
          <div class="item" @click="toPut">
            <img src="img/put.jpg" alt="">
            <span>寄件</span>
          </div>
          <div class="item" @click="toTake">
            <img src="img/take.png" alt="">
            <span>取件</span>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="news">
      <el-col>
        <h3>最新消息</h3>
        <ul>
          <li><a href="#">【最新消息】取件时间调整<el-tag type="warning">TOP</el-tag><el-tag>置顶</el-tag></a><span class="time">2019-12-28</span></li>
          <li><a href="#">【好消息】凭学生证寄件优惠通知<el-tag type="warning">NEW</el-tag><el-tag>置顶</el-tag></a><span class="time">2019-12-24</span></li>
          <li><a href="#">【最新优惠】超长超重包裹降费通知<el-tag type="warning">NEW</el-tag><el-tag>置顶</el-tag></a><span class="time">2019-10-01</span></li>
          <li><a href="#">【下期看点】物流界面入口<el-tag type="warning">TOP</el-tag></a><span class="time">2019-11-30</span></li>
          <li><a href="#">【双十一】活动入口<el-tag type="warning">TOP</el-tag></a><span class="time">2019-11-05</span></li>
          <li><a href="#">【双十一】取件信息调整<el-tag type="warning">NEW</el-tag></a><span class="time">2019-10-27</span></li>
          <li><a href="#">【最热门盘点】国际偏远附加费调整</a><span class="time">2019-06-24</span></li>
          <li><a href="#">【最新消息】取件信息调整</a><span class="time">2019-04-18</span></li>
          <li><a href="#">【好消息】物流投递点已更新</a><span class="time">2019-04-01</span></li>
          <li><a href="#">【618】新进设备</a><span class="time">2019-02-28</span></li>
          <li><a href="#">【最新消息】春节期间服务通知</a><span class="time">2019-01-02</span></li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'homePage',
  data () {
    return {
      searchVal: ''
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    toTake () {
      this.$router.push('/home/takeparts')
    },
    toPut () {
      this.$router.push('/home/mailing')
    },
    toSearch () {
      console.log('')
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  background:#fff;
  border-radius: 5px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 10px 0 0 20px;
}
.item-wrapper{
  display: flex;
  justify-content: center;
  .item{
    cursor: pointer;
    border-radius: 5%;
    margin: 20px;
    padding: 20px 0;
    background: #409EFF;
    // background: #00713d;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img{
      width: 50%;
      border-radius: 50%;
    }
    span{
      margin-top: 10px;
      font-weight: 600;
      font-size: 30px;
    }
  }
}
.news{
  ul {
    li{
      padding: 10px;
      display: flex;
      justify-content: space-between;
      a{
        padding-bottom: 5px;
        border-bottom: 1px solid #f9f9f9;
        flex: 1;
        overflow: hidden;
        color: #222;
        font-size: 14px;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      a:hover{
        text-decoration: underline;
        color: #409EFF;
      }
      span{
        margin-left: 5px;
      }
      .time{
        width: 100px;
        text-align: center;
        font-size: 13px;
        color: #666;
      }
    }
  }
}
@media (max-width: 768px) {
  .item-wrapper{
    .item{
      span{
        font-size: 25px;
      }
    }
  }
}
</style>
