<template>
  <div class="root" @touchmove="$event.preventDefault()">
    <div class="panel">
      <grid :cols="3" :show-lr-borders="false" :show-vertical-dividers="false">
        <grid-item class="p_item" v-for="(item,i) in itemList" :key="i" @on-item-click="selectItem(i)">
          <div v-bind:class="{'box-active':getItemSelect(i)}">
            {{item}}
          </div>
        </grid-item>
      </grid>
      <div class="btn flex_row">
        <div @click="cancel">取消</div>
        <div @click="ok">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Grid, GridItem } from 'vux'

  export default {
    name: 'DataTypePanel',
    props: {
      selectIdxList: {
        type: Array,
        required:true
      }
    },
    components: {
      Grid,
      GridItem
    },
    data () {
      return {
        itemList:[
          "一个选项",
          "4个选项",
          "2个选项",
          "3个选项",
          "6个选项",
          "5个选项"
        ]
      }
    },
    mounted () {
      console.log(this.selectIdxList)
    },
    methods:{
      getItemSelect(i){
        let select = false;
        this.selectIdxList.forEach(function (item,idx) {
          if(item === i){
            select = true;
            return false;
          }
        })
        return select;
      },
      selectItem(i){
        console.log(i)
        console.log(this.getItemSelect(i))
        if(this.getItemSelect(i)){
          let index = this.selectIdxList.indexOf(i);
          this.selectIdxList.splice(index, 1);
        }else{
          this.selectIdxList.push(i)
        }
      },
      ok(){
        this.$emit('onDataTypeSelected',this.selectIdxList)
      },
      cancel(){
        this.$emit('onDataTypeSelected',this.selectIdxList)
      },
    }
  }
</script>

<style scoped>
  .root{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .panel{
    width: 80%;
    background: white;
  }
  .p_item{
    color: #35495e;
    text-decoration: none;
    border: none;
  }
  .p_item div{
    border: blue;
    width: 90%;
    height: 80%;
    font-size: 10px;
  }
  .box-active{
    background: #0BB20C;
    color: white;
  }
  .btn{
    width: 100%;
    align-items: center;;
  }
  .btn div{
    flex: 1;
  }


</style>
