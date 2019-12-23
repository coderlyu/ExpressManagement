<template>
  <div class="nearby">
    <el-row>
      <el-col>
        <p class="address"><svg-icon icon-class="address"></svg-icon> 当前位置<span>{{ localaddress }}</span></p>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <div id="mymap"></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      map: '',
      geolocation: '',
      localaddress: ''
    }
  },
  methods: {
    initMap () {
      // 百度地图API功能
      this.map = new BMap.Map('mymap') // 创建Map实例
      this.map.centerAndZoom(new BMap.Point(120.59246739,30.00236458), 11) // 初始化地图,设置中心点坐标和地图级别
      this.map.setCurrentCity('绍兴市') // 设置地图显示的城市 此项是必须设置的
      this.map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放
      var Scaleopts = { // 配置
        anchor: BMAP_ANCHOR_TOP_RIGHT, // 控件的停靠位置
        // BMAP_ANCHOR_TOP_LEFT     控件将定位到地图的左上角
        // BMAP_ANCHOR_TOP_RIGHT    控件将定位到地图的右上角
        // BMAP_ANCHOR_BOTTOM_LEFT  控件将定位到地图的左下角
        // BMAP_ANCHOR_BOTTOM_RIGHT 控件将定位到地图的右下角
        offset: new BMap.Size(10, 10) // 控件的水平偏移值
      }
      var Navopts = {
        anchor: '',
        offset: new BMap.Size(10, 10), // 控件的水平偏移值
        type: '', // 平移缩放控件的类型
        // BMAP_NAVIGATION_CONTROL_LARGE  标准的平移缩放控件（包括平移、缩放按钮和滑块）
        // BMAP_NAVIGATION_CONTROL_SMALL  仅包含平移和缩放按钮
        // BMAP_NAVIGATION_CONTROL_PAN    仅包含平移按钮
        // BMAP_NAVIGATION_CONTROL_ZOOM   仅包含缩放按钮
        showZoomInfo: '', // 是否显示级别提示信息
        enableGeolocation: '' // 控件是否集成定位功能，默认为false
      }
      // 添加地图类型控件
      this.map.addControl(new BMap.NavigationControl(Navopts)) // 平移缩放控件
      this.map.addControl(new BMap.OverviewMapControl()) // 缩略地图
      this.map.addControl(new BMap.ScaleControl(Scaleopts)) // 比例尺
      this.map.addControl(new BMap.MapTypeControl()) // 地图类型
      this.map.addControl(new BMap.CopyrightControl()) // 版权
      this.map.addControl(new BMap.GeolocationControl()) // 定位 针对移动端开发，默认位于地图左下方
    },
    getLocalAddress () {
      const geolocation = new BMap.Geolocation()
      var _this = this
      geolocation.getCurrentPosition(function getinfo (position) {
        let city = position.address.city // 获取城市信息
        let province = position.address.province // 获取省份信息
        _this.localaddress = province + ' ' + city
      }, function (e) {
        _this.localAddress = '定位失败'
      }, { provider: 'baidu' })
    }
  },
  mounted () {
    this.initMap()
    this.getLocalAddress()
  }
}
</script>
<style lang="scss" scoped>
#mymap {
  height: 500px;
}
.nearby {
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba($color: #000000, $alpha: 0.1);
  border-radius: 10px;
  padding: 20px 10px;
  .address {
    margin: 20px 0;
    line-height: 20px;
    font-size: 16px;
    font-size: 600;
    span {
      font-weight: 400;
      font-size: 14px;
      margin-left: 20px;
    }
  }
}
</style>
