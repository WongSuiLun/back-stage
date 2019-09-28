<template>
  <div :style="{color:color,background:bgColor}" class="week-box">
    {{week}}
  </div>
</template>

<script>
export default {
  props:{
    week:{
      type:String,
      default:null
    },
    color:{
      type:String,
      default:'#fff'
    },
    bgColor:{
      type:String,
      default:'#ff5c5d'
    }
  }
}
</script>

<style lang="less" scoped>
  .week-box{
    font-size: 16px;
    line-height: 30px;
    text-align: center;
    height:30px;
  }
</style>
