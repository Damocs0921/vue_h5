<template>
  <div id="page" ref="outer">
    <div class="title">
      <flexbox :gutter="0" wrap="wrap">
        <flexbox-item :span="1/7" v-for="(itemDate,iDate) in title" :key="iDate">
          <div>{{itemDate}}</div>
        </flexbox-item>
      </flexbox>
    </div>
    <div ref="scr">
      <scroller lock-x ref="scroller">
        <div id="calendar" ref="inner">
          <div v-for="(item,i) in list" :key="i">
            <div>{{item.month}}</div>
            <flexbox :gutter="0" wrap="wrap">
              <flexbox-item :span="1/7" v-for="(itemDate,iDate) in item.list" :key="iDate">
                <div v-bind:class="{'box-active':getItemSelect(itemDate)}" @click="selectItem(itemDate)">{{itemDate.txt}}</div>
              </flexbox-item>
            </flexbox>
          </div>
        </div>
      </scroller>
    </div>
  </div>
</template>

<script>
  import {Flexbox,FlexboxItem,Scroller} from "vux"
  export default {
    name: 'Calendar',
    components:{
      Flexbox,FlexboxItem,Scroller
    },
    data () {
      return {
        title: ["日","一","二","三","四","五","六"],
        list: [],
        selectedItem:null
      }
    },
    created () {
      let list = [];
      let today = new Date();
      let startDate = new Date(today.setDate(today.getDate()-365));
      for (let i = 0; i <= 12; i++){
        let firstDay;
        if(i === 0){
          firstDay = startDate;
        }else{
          firstDay = new Date(startDate.getFullYear(),startDate.getMonth() + i,1);
        }
        let lastDay;
        if(i === 12){
          lastDay = today;
        }else{
          lastDay = new Date(startDate.getFullYear(), startDate.getMonth()+1 + i, 0);
        }
        let weekList = [];
        for (let j=0 ;j < firstDay.getDay(); j++){
          weekList.push({
            txt:"",
            date:null
          })
        }
        for (let j=firstDay.getDate(); j <= lastDay.getDate(); j++ ){
          weekList.push({
            txt: j + "",
            date: new Date(firstDay.getFullYear(),firstDay.getMonth(),j)
          })
        }
        list.push({
          month:firstDay.getFullYear()+ "." + (firstDay.getMonth()+1),
          list:weekList
        });
      }
      this.list = list;
    },
    mounted(){
      // this.$nextTick(function(){
      //   var div = document.getElementById('calendar');
      //   div.scrollTop = div.scrollHeight;
      //   console.log(div)
      //   console.log(div.scrollHeight)
      //   console.log(div.scrollTop)
      // })
      this.$nextTick(() => {
        this.$nextTick(() => {
          this.$refs.scroller.reset();
          this.$nextTick(() => {
            this.$refs.scroller.reset({
              top: this.$refs.inner.offsetHeight - this.$refs.scr.offsetHeight
            });
          });
        });
      });
    },
    methods:{
      selectItem(item){
        this.selectedItem = item;
      },
      getItemSelect(item){
        return this.selectedItem && (this.selectedItem.date === item.date);
      }
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  /*#page{*/
    /*.title{*/
      /*color: yellow;*/
    /*}*/
  /*}*/
.title{
  position: fixed;
  top:0;
  left: 0;
  right: 0;
  background: blue;
  color: white;
}
.box-active{
  background: yellow;
}
scroller{
  width: 100%;
  height: 100%;
}

</style>
