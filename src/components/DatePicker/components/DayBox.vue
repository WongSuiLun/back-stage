<template>
  <div class="day-box" :class="{active:active}" @click="chooseDay">
    <div class="date-style">{{data.date}}</div>
    <div>{{data.meta}}</div>
    <div>{{data.festival}}</div>
  </div>
</template>

<script>
export default {
  props:{
    data:{
      required:true
    },
  },
  data(){
    return{
      active:this.data.active,
    }
  },
  watch:{
    data:{
      immediate:true,
      handler(val){
        this.active = val.active
      }
    }
  },
  computed:{
    disable(){
      let nodisable = Boolean(this.data.date)
      return !nodisable
    }
  },
  methods:{
    chooseDay(){
      if(this.disable){
        return 
      }
      this.active = !this.active
      this.$emit('chooseDay',this.data.full_date,this.active)
      
      
    }
  }
}
</script>

<style lang="less" scoped>
  .day-box{
    height: 60px;
    min-width: 50px;
    flex-grow:1;
    box-sizing: border-box;
    border:1px solid #ddd;
    .date-style{
      font-size: 16px;
    }
  }
  .active{
    border: 2px solid #ff5c5d;
    background: #ffeceb;
    color: #000;
  }
  .active + .active{
    border: 2px solid #ff5c5d;
    border-left: 0;
  }
</style>
