<template>

  <div>
    <div>{{msgForA}}</div>
    <msg-b v-bind="$attrs" v-on="$listeners" :msgFromA="msgFromA"></msg-b>
    <!-- 通过v-bind 绑定$attrs属性，C组件可以直接获取到A组件中传递下来的props（除了B组件中props声明的） -->
  </div>


</template>

<script>

  import MsgB from "../components/MsgB"

  export default {
    name: 'MsgA',
    inject: [
      'passParam'
    ],
    props:{
      msgForA:{
        type: String,
        required:false
      }
    },
    data(){
      return {
        msgFromA:"msgFromA",
      }
    },
    components:{
      "msg-b": MsgB,
    },
    mounted () {
      console.log("inject MsgA:" + this.passParam);
      console.log("A msg chain:" + this.msgForA)
      this.$emit("callFromA",this.msgFromA);
    }
  }
</script>

<style scoped>

</style>
