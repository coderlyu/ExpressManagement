<template>
  <div>
    <el-row>
      <el-col>
        <h3 class="h-title">常用信息</h3>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6">
        <div class="item">
          <i class="el-icon-s-custom"></i>
          <div class="item-count">
            <h4>管理员</h4>
            <span>8</span>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6">
        <div class="item">
          <i class="el-icon-user-solid" style="color:#B6A2DE;"></i>
          <div class="item-count">
            <h4>学生</h4>
            <span>6,438</span>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6">
        <div class="item">
          <i class="el-icon-sell" style="color:#3ABFA2;"></i>
          <div class="item-count">
            <h4>日入库</h4>
            <span>253</span>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6">
        <div class="item">
          <i class="el-icon-sold-out" style="color:#F4516C;"></i>
          <div class="item-count">
            <h4>日出库</h4>
            <span>1,023</span>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <h3 class="h-title">其它信息</h3>
      </el-col>
    </el-row>
     <el-row :gutter="24" class="data-graph">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
        <el-card>
          <h3 class="graph-title">用户访问量</h3>
          <v-line></v-line>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
        <el-card>
          <h3 class="graph-title">物流去向</h3>
          <v-Map></v-Map>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import VLine from '@/components/common/v-line'
import VMap from '@/components/common/v-map'
export default {
  components: {
    vLine: VLine,
    vMap: VMap
  },
  data () {
    return {

    }
  }
}
</script>
<style lang="scss" scoped>
.h-title{
  margin: 20px 0;
}
.item{
  padding: 20px 10px;
  border: 1px solid #f9f9f9;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  i{
    font-size: 50px;
    color: #409EFF;
  }
  &-count{
    display: flex;
    flex-direction: column;
    text-align: end;
    color: #444;
    margin-right: 10px;
    justify-content: space-between;
    h4{
      margin: 0;
      padding: 0;
      font-size: 15px;
    }
    span{
      font-size: 13px;
      color: #333;
    }
  }
}
</style>
