<template>
  <div>{{msgForB}}</div>
</template>

<script>

  import MsgC from "../components/MsgC"

  export default {
    name: 'MsgB',
    inject: [
      'passParam'
    ],
    props:{
      msgForB:{
        type: String,
        required:false
      },
      msgFromA:{
        type: String,
        required:false
      }
    },
    data(){
      return{
        msgFromB:"msgFromB"
      }
    },
    components:{
      "msg-c": MsgC,
    },
    mounted () {
      console.log("inject MsgB:" + this.passParam);
      console.log("B msg chain:" + this.msgForB + " a:" + this.msgFromA);
      this.$emit("callFromB",this.msgFromB);
    }
  }
</script>

<style scoped>

</style>
