<template>
  <div class="setting">
    <el-row>
      <el-col>
        <div class="editform">
          <svg-icon v-if="showEdit" icon-class="close" @click="showEdit = false"></svg-icon>
          <el-form ref="editform" :model="editform" label-width="80px">
            <el-form-item label="姓名">
              <el-input v-if="showEdit" v-model="editform.name"></el-input>
              <p v-else>{{ editform.name }}</p>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group  v-if="showEdit" v-model="editform.sex">
                <el-radio-button label="男"></el-radio-button>
                <el-radio-button label="女"></el-radio-button>
                <el-radio-button label="无"></el-radio-button>
              </el-radio-group>
              <p v-else>{{ editform.sex }}</p>
            </el-form-item>
            <el-form-item label="年龄">
              <el-input v-if="showEdit" v-model="editform.age"></el-input>
              <p v-else>{{ editform.age }}</p>
            </el-form-item>
            <el-form-item label="地址">
              <el-input v-if="showEdit" v-model="editform.address">
                <template slot="append"><p @click="getAddress" style="cursor: pointer;">自动定位</p></template>
              </el-input>
              <p v-else>{{editform.address}}</p>
            </el-form-item>
            <div class="tip">
              <el-alert
              title="修改后别忘记保存"
              type="success">
            </el-alert>
            </div>
            <el-form-item>
              <el-button v-if="showEdit" @click="onSubmit">确认保存</el-button>
              <el-button v-else type="primary" @click="toEdit">修改资料</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      showEdit: false,
      editform: {
        name: this.$store.getters.userName ? this.$store.getters.userName : 'coderly',
        age: 21,
        sex: '男',
        address: ''
      }
    }
  },
  methods: {
    toEdit () {
      this.showEdit = true
    },
    getLocalAddress () {
      const geolocation = new BMap.Geolocation()
      var _this = this
      geolocation.getCurrentPosition(function getinfo (position) {
        let city = position.address.city // 获取城市信息
        let province = position.address.province // 获取省份信息
        _this.editform.address = province + ' ' + city
      }, function (e) {
        _this.localAddress = '定位失败'
      }, { provider: 'baidu' })
    },
    getAddress () {
      this.editform.address = '正在获取'
      this.getLocalAddress()
    },
    onSubmit () {
      console.log('submit!')
      this.showEdit = false
    }
  }
}
</script>
<style lang="scss" scoped>
.setting {
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba($color: #000000, $alpha: 0.1);
  border-radius: 10px;
  padding: 20px 10px;
  .editform {
    position: relative;
    padding-top: 20px;
    svg {
      top: -10px;
      cursor: pointer;
      font-size: 20px;
      position: absolute;
      right: 0;
    }
    p {
      font-size: 15px;
      font-weight: 600;
    }
    .tip {
      margin-bottom: 10px;
    }
  }
}
</style>
