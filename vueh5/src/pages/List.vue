<!--先install better-scroll
下拉刷新 上拉加载 组件（在lib里面）-->
<template>
  <div id="app">
    <!--<header>vue-better-scroll demo</header>-->
    <tab>
      <tab-item v-for="item in tabItems" :key="n" :selected="n===1">{{ item.label }}</tab-item>
    </tab>
    <main class="left-box">
      <vue-better-scroll class="wrapper"
                         :scrollbar=null
                         :pullDownRefresh=null
                         :pullUpLoad=null
                         @pullingDown="onPullingDown"
                         @pullingUp="onPullingUp">
        <!--:scrollbar="scrollbarObj"-->
        <!--:pullDownRefresh="pullDownRefreshObj"-->
        <!--:pullUpLoad="pullUpLoadObj"-->
        <!--:startY="parseInt(startY)"-->
        <ul class="list-content">
          <li class="list-item"
              v-for="item in items" :key="item" @click="clickLeft(item)">{{item}}</li>
        </ul>
      </vue-better-scroll>
    </main>
    <main class="position-box">
      <vue-better-scroll class="wrapper"
                         ref="scroll"
                         @pullingDown="onPullingDown"
                         @pullingUp="onPullingUp">
        <!--:scrollbar="scrollbarObj"-->
        <!--:pullDownRefresh="pullDownRefreshObj"-->
        <!--:pullUpLoad="pullUpLoadObj"-->
        <!--:startY="parseInt(startY)"-->
        <ul class="list-content">
          <li class="list-item"
              v-for="item in items" :key="item">{{item}}</li>
        </ul>
      </vue-better-scroll>
    </main>
    <button class="go-top"
            @click="scrollTo">返回顶部</button>

  </div>
</template>

<script>

  import VueBetterScroll from '../lib/vue-better-scroll'
  import {Tab,TabItem} from "vux"

  let count = 2
  export default {
    name: 'List',
    components: {
      VueBetterScroll,
      Tab,TabItem
    },
    data () {
      return {
        // 这个配置可以开启滚动条，默认为 false。当设置为 true 或者是一个 Object 的时候，都会开启滚动条，默认是会 fade 的
        // scrollbarObj: {
        //   fade: true
        // },
        // // 这个配置用于做下拉刷新功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启下拉刷新，可以配置顶部下拉的距离（threshold） 来决定刷新时机以及回弹停留的距离（stop）
        // pullDownRefreshObj: {
        //   threshold: 90,
        //   stop: 40
        // },
        // // 这个配置用于做上拉加载功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启上拉加载，可以配置离底部距离阈值（threshold）来决定开始加载的时机
        // pullUpLoadObj: {
        //   threshold: 0,
        //   txt: {
        //     more: '加载更多',
        //     noMore: '没有更多数据了'
        //   }
        // },
        // startY: 0, // 纵轴方向初始化位置
        scrollToX: 0,
        scrollToY: -60,
        scrollToTime: 700,
        items: [],

        selectedId: 0,
        tabItems: [
          {label: '首页'},
          {label: '推荐'},
          {label: 'Android'},
          {label: '前端'},
          {label: '后端'},
          {label: 'iOS'},
          {label: '产品'},
          {label: '人工智能'},
          {label: '设计'}
        ],
        options: {
          activeColor: '#1d98bd'
          // 可在这里指定labelKey为你数据里文字对应的字段
        },
      }
    },
    mounted () {
      this.onPullingDown()
    },
    methods: {
      // 滚动到页面顶部
      scrollTo () {
        this.$refs.scroll.scrollTo(this.scrollToX, this.scrollToY, this.scrollToTime)
      },
      // 模拟数据请求
      getData () {
        return new Promise(resolve => {
          setTimeout(() => {
            const arr = []
            for (let i = 0; i < 10; i++) {
              arr.push(count++)
            }
            resolve(arr)
          }, 1000)
        })
      },
      onPullingDown () {
        // 模拟下拉刷新
        console.log('下拉刷新')
        count = 0
        this.getData().then(res => {
          this.items = res
          this.$refs.scroll.forceUpdate(true)
        })
      },
      onPullingUp () {
        // 模拟上拉 加载更多数据
        console.log('上拉加载')
        this.getData().then(res => {
          this.items = this.items.concat(res)
          if (count < 30) {
            this.$refs.scroll.forceUpdate(true)
          } else {
            this.$refs.scroll.forceUpdate(false)
          }
        })
      },
      clickLeft:function (obj) {
        console.log(obj)
        this.$refs.scroll.scrollTo(this.scrollToX, obj*-60, this.scrollToTime)
      }
    }
  }
</script>

<style scoped>
  * {
    padding: 0;
    margin: 0;
  }

  body,
  html {
    height: 100%;
    overflow: hidden;
  }

  #app {
    font-family: '微软雅黑', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 9;
    height: 40px;
    line-height: 40px;
    color: #fff;
    background-color: #009a61;
  }

  .left-box{
    position: fixed;
    top: 140px;
    left: 0;
    width: 100px;
    bottom: 0;
    overflow: hidden;
  }

  .position-box {
    position: fixed;
    top: 140px;
    left: 100px;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }

  .list-content {
    list-style: none;
    background: #fff;
  }

  .list-item {
    height: 60px;
    line-height: 60px;
    font-size: 18px;
    /*padding-left: 20px;*/
    border-bottom: 1px solid #e5e5e5;
  }
  .go-top {
    position: fixed;
    right: 20px;
    bottom: 20px;
    background-color: #009a61;
    border-radius: 5px;
    border: 1px solid #fff;
    color: #fff;
    padding: 10px 15px;
  }

  ly-tab{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    /*height: 100px;*/
  }
</style>
