<template>

  <div id="page">
    <ve-line :data="chartData" :colors="colors" :settings="chartSettings" :data-empty="true" :loading="true">
      <!--<div class="data-empty">没有数据😂</div>-->
    </ve-line>
    <div class="test_rem">test</div>
  </div>

</template>

<script>

  export default {
    name: 'Chart',
    data: function () {
      return {
        chartSettings: {
          stack: { '用户': ['访问用户', '下单用户'] },
          area: true,
          axisVisible:false
        },
        colors:["#ff5000","#666666"],
        chartData: {
          columns: ['日期', '访问用户', '下单用户', '下单率'],
          rows: [
            { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
            { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
            { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
            { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
            { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
            { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
          ],
        }
      }
    }
  }
</script>

<style lang="less" scoped>
.test_rem{
  background: yellow;
  width: 1rem;
  height: 3rem;
  color: @test-color;
}

</style>
