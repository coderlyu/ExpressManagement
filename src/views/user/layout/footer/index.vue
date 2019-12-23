<template>
  <div class="footer-container">
      <p>©2019-2020 coderly版权所有 - <a href="http://www.beian.miit.gov.cn">浙ICP备19015516号-2</a></p>
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
.footer-container{
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  p, a{
    font-size: 12px;
    color: #60819D;
  }
  a:hover {
    color: #444;
  }
}
</style>
