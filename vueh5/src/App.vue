<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view :key="$route.fullPath"/>
    <!--防止复用-->

    <!--https://juejin.im/post/5cdcbae9e51d454759351d84-->
    <!-- 需要缓存的视图组件 -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive">
      </router-view>
    </keep-alive>
    <!-- 不需要缓存的视图组件 -->
    <router-view v-if="!$route.meta.keepAlive">
    </router-view>

  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    include: []
  }),
  watch: {
    $route(to, from) {
      //如果 要 to(进入) 的页面是需要 keepAlive 缓存的，把 name push 进 include数组
      if (to.meta.keepAlive) {
        !this.include.includes(to.name) && this.include.push(to.name);
      }
      //如果 要 form(离开) 的页面是 keepAlive缓存的，
      //再根据 deepth 来判断是前进还是后退
      //如果是后退
      if (from.meta.keepAlive && to.meta.deepth < from.meta.deepth) {
        var index = this.include.indexOf(from.name);
        index !== -1 && this.include.splice(index, 1);
      }
    }
  }
}
</script>

<style lang="less">

  body{
    padding: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /*margin-top: 60px;*/
    width: 100%;
    padding: 0;
  }

  .flex_row{
    display: flex;
    flex-direction: row;
  }

  .flex_col{
    display: flex;
    flex-direction: column;
  }

  .mask{
    position: fixed;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background: rgba(0,0,0,0.3);
  }

  .rem(@name,@px){
    @{name}:unit(@px/75,rem);
  }

</style>
