<template>
  <router-view/>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  mounted () {
    this.$store.dispatch('app/Resize', { width: document.body.clientWidth })
    window.addEventListener('resize', () => {
      return (() => {
        this.$store.dispatch('app/Resize', { width: document.body.clientWidth })
      })()
    })
  }
}
</script>
<style lang="scss">
*{
  margin: 0;
  padding: 0;
  list-style: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
a{
  text-decoration: none;
  color: #333;
}
a:hover{
  text-decoration: none;
}
ul {
  padding: 0;
  margin: 0;
  list-style: none;
}
body {
  background: #fdfdfd;
}
::-webkit-scrollbar {
  width: 4px;
  height: 4px;
  background-color: #efefef;
}
::-webkit-scrollbar-thumb {
  background: #409EFF;
  border-radius: 8px;
}
::-webkit-scrollbar-track {
  border-radius:10px;
}
</style>
