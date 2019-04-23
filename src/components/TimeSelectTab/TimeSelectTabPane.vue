<template>
  <div v-show="isActive">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props:{
    tab:{
      type:String,
      required:false
    }
  },
  data(){
    return {
      key:this.$vnode.key
    }
  },
  computed:{
    isActive(){
      // console.log(this.$parent.$vnode)
      return this.$parent.activeKey == this.key
    }
    
  },
  created(){
    if(this.$parent.$vnode.componentOptions.tag ==='time-select-tab'){
      console.warn('time-select-tab-pane的父组件不是time-select-tab,请正确使用。')
    }
  }
}
</script>

<style>

</style>
