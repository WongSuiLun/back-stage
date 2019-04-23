<template>
  <div class="number-info-warp">
    <a-card
      :loading="loading"
      @click="loading=!loading"
      :bodyStyle="bodyStyle"
    >
      <div style="display:flex;" >
        <div class="icon-content" >
          <a-icon :type="icon" style="font-size:50px;color:#f1f1f1"/>
        </div>
        <div class="number-content" style="flex-grow:1;color:#fff;margin-left:20px;font-size:18px;">
          <p v-for="msg in msgList" :key="msg">
            {{msg}}
          </p>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
export default {
  props:{
    color:{
      type:String,
      required:true
    },
    icon:{
      type:String,
      required:false
    },
    msgList:{
      type:Array,
      required:true
    }
  },
  data() {
    return {
      loading: true,
      bodyStyle:{
        height:'180px',
        background:'#fff'
      }
    };
  },
  watch:{
    loading:{
      handler:function(val){
        if(val){
          this.bodyStyle.background = "#fff"
        }else{
          this.bodyStyle.background = this.color
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
.number-info-warp {
  // min-width: 320px;
  margin: 10px 0;
}
</style>
