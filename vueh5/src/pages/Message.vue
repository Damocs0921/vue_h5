<template>
  <div>
    <msg-a :msgForA="msgForA" :msgForB="msgForB" v-on:callFromA="callFromA" v-on:callFromB="callFromB"/>
    <input placeholder="please" v-model="inputValue"/>
  </div>
</template>

<script>

  import MsgA from "../components/MsgA"
  import MsgB from "../components/MsgB"
  import MsgC from "../components/MsgC"

  export default {
    name: 'Message',
    provide:{
      passParam:"pp" //传递给所有子孙组件的参数
    },
    components:{
      "msg-a": MsgA,
    },
    data(){
      return {
        msgForA:"msgForA",
        msgForB:"msgForB",
        inputValue:"",
      }
    },
    methods:{
      callFromA(e){
        console.log("callFromA",e)
      },
      callFromB(e){
        console.log("callFromB",e)
      },
      onInputValue(e){
        console.log("onInputValue:"+e);
      }
    },
    watch:{
      inputValue:{
        handler:"onInputValue",
        immediate:true
      }
    }
  }
</script>

<style scoped>

</style>
