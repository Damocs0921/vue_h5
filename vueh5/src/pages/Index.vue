<template>
  <div id="page">
    <!---->
    <div class="tab_wrapper">
      <div class="tab_item" v-for="(item,i) in tabItems" :key="item" @click="clickTab(i)">
        <img :src="getTabIcon(i)" alt="">
        <div>{{item}}</div>
      </div>
    </div>
    <!---->
    <div class="notice">
      <img src="../assets/index/notice/notice.png" alt="">
      <marquee class="note_txt" :interval="5000" :duration="500">
        <marquee-item v-for="(item,i) in msgList" :key="i" class="align-middle">{{item}}</marquee-item>
      </marquee>
      <img src="../assets/index/notice/cancel.png" alt="">
    </div>
    <!---->
    <tab class="tab_pager" v-model="tabIdx">
      <tab-item @on-item-click="switchTab(0)">实时数据</tab-item>
      <tab-item @on-item-click="switchTab(1)">本月营业额</tab-item>
    </tab>
    <swiper class="pager_wrapper" :show-dots="false" v-model="tabIdx">
      <swiper-item>
        <div class="real_time_top flex_row">
          <div class="rt_item flex_col">
            <div class="rt_tt flex_row">
              <div>今日营业额</div>
              <img src="../assets/index/notice/notice.png" alt="">
            </div>
            <div>
              <div>
                <span>
                  <countup :start-val="0" :end-val="todayAmt"></countup>
                </span>
              </div>
            </div>
          </div>
          <div class="rt_item flex_col">
            <div>
              <div>本月营业总额</div>
            </div>
            <div>
              <div><span>{{monthAmt}}</span>万</div>
            </div>
          </div>
        </div>
        <div class="real_time_pct flex_row">
          <div class="rp_item">
            <div>待客（批）</div>
            <div>0</div>
          </div>
          <div class="rp_item">
            <div>上座率</div>
            <div>0</div>
          </div>
          <div class="rp_item">
            <div>预订率</div>
            <div>0</div>
          </div>
          <div class="rp_item">
            <div>新增会员</div>
            <div>0</div>
          </div>
        </div>
        <div>更新时间:{{nowTime}}</div>
      </swiper-item>
      <swiper-item>
        <div class="month_wrapper flex_row">
          <div class="m_item flex_col">
            <div>本月营业总额</div>
            <div>{{monthAmt}}</div>
            <div>目标营业额</div>
            <div>{{targetAmt}}万</div>
          </div>
          <div class="m_item flex_col">
            <div style="width:80px;height:80px;">
              <x-circle
                :percent="3"
                :stroke-width="5"
                stroke-color="#04BE02">
                <div>已完成</div>
                <span>{{ 3 }}%</span>
              </x-circle>
            </div>
            <div>距离本月结束还有22天</div>
          </div>
        </div>
      </swiper-item>
    </swiper>

    <!---->
    <swiper loop auto :list="bannerList">
    </swiper>

    <!---->
    <div class="repo_tt flex_row" @click="moreData">
      <div>营业日报</div>
      <div>更多指标</div>
    </div>

    <!---->
    <div class="repo_table" ref="dataTable">
      <div class="repo_th flex_row">
        <div>日期</div>
        <div v-for="item in dailyTitleList" :key="item">{{item}}</div>
      </div>
      <div class="repo_tr flex_row" v-for="(item,i) in dailyDataList" :key="i" @click="goToDate(item.date)">
        <div>{{item.date}}</div>
        <div>{{item.amt}}</div>
        <div>{{item.amt}}</div>
        <div>{{item.amt}}</div>
      </div>
    </div>
    <div>生意再好也要有底线</div>


    <!--mask-->
    <data-type-panel class="mask" v-if="showPanel" v-bind:selectIdxList="panelSelectIdx" @onDataTypeSelected="onDataTypeSelected"></data-type-panel>

  </div>




</template>

<script>

  import { Marquee, MarqueeItem, Tab, TabItem, Swiper ,SwiperItem, Countup, XCircle ,Toast} from "vux";
  import DataTypePanel from "../components/DataTypePanel"

  export default {
    name: 'Index.vue',
    components:{
      Countup,SwiperItem,Marquee,MarqueeItem,Tab,TabItem,Swiper,XCircle,Toast,
      "data-type-panel": DataTypePanel,
    },
    data () {
      return {
        tabItems: [
          "营业汇总",
          "包房报表",
          "酒水报表",
          "会员数据",
          "营销中心"
        ],
        msgList:[
          "一个公告，阿拉阿拉阿拉啦啦啦啦啦了",
          "阿拉阿拉阿拉啦啦啦啦啦了,阿拉阿拉阿拉啦啦啦啦啦了,阿拉阿拉阿拉啦啦啦啦啦了,阿拉阿拉阿拉啦啦啦啦啦了,阿拉阿拉阿拉啦啦啦啦啦了 solong",
          "2个公告，阿拉阿拉阿拉啦啦啦啦啦了"
        ],
        tabIdx:0,
        todayAmt:20,
        monthAmt:3.2,
        nowTime:"2010-10-01",
        targetAmt:100,
        bannerList:[{
            url: 'javascript:',
            img: "http://images.newsmth.net/nForum/files/adv/2015-12-17-15-04-37.jpg",
          },
          {
            url: 'javascript:',
            img: "http://images.newsmth.net/nForum/files/adv/2015-12-17-15-04-37.jpg",
          },{
            url: 'javascript:',
            img: "http://images.newsmth.net/nForum/files/adv/2019-04-19-16-19-35.png",
          }
        ],
        dailyTitleList:[
          "营业额",
          "待客",
          "充值"
        ],
        dailyDataList:[
          {
            date:"0509(四)",
            amt:0.03,
          },
          {
            date:"0509(四)",
            amt:0.03,
          },
          {
            date:"0509(四)",
            amt:0.03,
          }
        ],
        panelSelectIdx:[0,1,2],
        showPanel:false
      }
    },
    mounted() {
      document.addEventListener("scroll", this.onScroll);
    },
    destroyed() {
      document.removeEventListener("scroll", this.onScroll);
    },
    methods:{
      getTabIcon(i){
        return require("@/assets/index/tab/hbg"+(i+1)+".png");
      },
      clickTab(i){
        console.log(i)
        if(i === 0){
          this.$router.push('/date')
        }
      },
      switchTab(i){
        this.tabIdx = i;
      },
      moreData(){
        console.log("更多指标")
        this.$vux.toast.show({
          text: "最多只能选择三项",
          type: "text",
          width: "160px"
        });
        this.showPanel = true;
      },
      goToDate(date){
        console.log(date)
      },
      onScroll(){
        var scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
        var h = this.$refs.dataTable.offsetTop + 40;
        console.log(scrollTop)
        console.log(h)
        // if (scrollTop - h > 0) {
        //   this.$refs.dataTableFixed.style.display = "block";
        //   this.$refs.dataTableFixed.style.height =
        //     this.$refs.dataTableFixed.querySelector("thead").offsetHeight +
        //     1 +
        //     "px";
        // } else {
        //   this.$refs.dataTableFixed.style.display = "none";
        // }
      },
      onDataTypeSelected(list){
        this.showPanel = false;
        console.log(list)
      }
    }
  }
</script>

<style scoped>

  #page{
    width: 100%;
  }

  .tab_wrapper{
    width: 100%;
    height: 60px;
    display: flex;
    flex-direction: row;
    overflow: hidden;
    border-bottom: 1px solid #eeeeee;

  }
  .tab_item{
    flex: 1;
    font-size: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .tab_item img{
    width: 20px;
    height: 20px;
    margin-bottom: 5px;
  }
  .tab_wrapper .tab_item:nth-child(even){
    border-left: 1px solid #eeeeee;
    border-right: 1px solid #eeeeee;
  }

  .notice{
    width: 100%;
    height: 36px;
    line-height: 36px;
    background: aquamarine;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .note_txt{
    font-size: 15px;
    flex: 1;
    text-align: left;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .notice img{
    width: 16px;
    height: 16px;
    margin: 0 10px;
  }

  .real_time_top{
    /*height: 100px;*/
    margin-top: 10px;
    font-size: 15px;
  }
  .rt_item{
    flex: 1;
    align-items: center;
  }
  .rt_item img{
    width: 15px;
    height: 15px;
    margin-left: 10px;
  }
  .rt_item span{
    font-size: 30px;
  }
  .rt_tt{
    align-items: center;
  }
  .real_time_pct{
    width: 100%;
  }
  .rp_item{
    flex: 1;
    margin: 0 5px;
    background: #E5E5E5;
    align-items: center;
    font-size: 10px;
  }
  .month_wrapper{
    justify-content: space-between;
  }
  .m_item{
    align-items: center;
  }

  .repo_tt{
    width: 100%;
    height: 50px;
    align-items: center;
    justify-content: space-between;
  }

  .repo_th div{
    flex: 1;
  }
  .repo_tr div{
    flex: 1;
  }
  .repo_tr:nth-child(even){
    background: #E5E5E5;
  }


</style>
