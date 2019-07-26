<template>
  <div class="warp" :style="{left:left,top:top,right:right,bottom,}" :class="{'min':isMinus}">
    <div class="toolbox">
      <div class="action drag" @mousedown="move($event)" title="移动">
        <a-icon type="drag" />
      </div>
      <div class="action minus" v-show="!isMinus" @click="minus" title="缩小">
        <a-icon type="minus" />
      </div>
      <div class="action minus" v-show="isMinus" @click="plus" title="放大">
        <a-icon type="plus" />
      </div>
    </div>
    <div v-show="!isMinus" class="content" style="height:80vh;overflow:auto">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    defaultLeft:String,
    defaultTop:String
  },
  data() {
    return {
      left: this.defaultLeft,
      top: this.defaultTop,
      right: null,
      bottom: null,
      isMinus: false
    };
  },
  methods: {
    move(e) {
      event.preventDefault();
      console.log(e);
      console.log(this.top);
      let odiv = e.target; //获取目标元素
      let that = this;
      //算出鼠标相对元素的位置
      let disX = e.clientX - odiv.offsetLeft;
      let disY = e.clientY - odiv.offsetTop;
      document.onmousemove = e => {
       
        that.left = e.clientX + "px";
        if(e.clientX <= 0){
          that.left = 0 ;
        }
        
        that.top = e.clientY + "px";
        if(e.clientY <= 0){
          that.top = 0 ;
        }
      };
      document.onmouseup = e => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
    minus(e) {
      this.isMinus = true;
      this.left = null;
      this.top = null;
      this.right = 0;
      this.bottom = 0;
    },
    plus() {
      this.isMinus = false;
      this.right = null;
      this.bottom = null;
      this.top = this.defaultTop
      this.left = this.defaultLeft
    }
  }
};
</script>

<style lang="less" scoped>
.warp {
  .toolbox {
    display: flex;
    justify-content: flex-start;

    .action {
      padding: 2px;
      font-size: 16px;
      margin-right: 8px;
    }
    .drag {
      cursor: move;
    }
    .minus {
      cursor: pointer;
    }
    .content {
      max-height: 80px;
      overflow: auto;
    }
  }
  min-width: 150px;
  position: fixed;
  overflow: hidden;
  max-height: 80vh;
  background: #f6f6f6;
  border: 1px solid #c1c1c1;
  z-index: 9999;
}
.min {
  width: 150px;
  height: 28px;
}
</style>

