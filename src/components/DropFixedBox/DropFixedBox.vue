<template>
  <div class="warp" :style="{left:left,top:top,right:right,bottom,}" :class="{'min':isMinus}">
    <div class="toolbox">
     
      <div class="action drag"  v-show="!isMinus" @mousedown="move($event)" title="移动">
        <a-icon type="drag" />
      </div>
      <div class="action minus" v-show="!isMinus" @click="minus" title="缩小">
        <a-icon type="minus" />
      </div>
      <div class="action plus" v-show="isMinus" @click="plus" title="放大">
        <a-icon type="plus" />
      </div>
      <div class="toolbox-bar" v-show="isMinus">
        123
      </div>
    </div>
    <div v-show="!isMinus" class="content" style="height:80vh;overflow:auto">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    defaultLeft: String,
    defaultTop: String
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
        if (e.clientX <= 0) {
          that.left = 0;
        }

        that.top = e.clientY + "px";
        if (e.clientY <= 0) {
          that.top = 0;
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
      this.bottom = '3px';
    },
    plus() {
      this.isMinus = false;
      this.right = null;
      this.bottom = null;
      this.top = this.defaultTop;
      this.left = this.defaultLeft;
    }
  }
};
</script>

<style lang="less" scoped>
.warp {
  min-width: 150px;
  position: fixed;
  max-height: 80vh;
  background: #f6f6f6;
  border: 1px solid #ccc;
  box-shadow: rgba(0, 0, 0, 0.6) 0px 0px 7px 0px !important;
    border-radius: 5px 5px 0 0;
  z-index: 9999;
  .toolbox {
    display: flex;
    justify-content: flex-start;
    position: absolute;
    top: -27px;
    left: 0px;
    width: 100%;
    .action {
      padding: 2px;
      width: 40px;
      text-align: center;
      background: #e9e9e9;
      font-size: 16px;
      margin-right: 8px;
      box-shadow: rgba(0, 0, 0, 0.6) 0px 0px 7px 0px !important;
      border-radius: 5px 5px 0 0;
    }
    .drag {
      cursor: move;
    }
    .minus {
      cursor: pointer;
    }
    .plus{
      cursor: pointer;
      margin-left: 10px;
    }
    .content {
      max-height: 80px;
      overflow: auto;
    }
    .toolbox-bar{
      height: 3px;
      background: #ccc;
      width: 100%;
      position: absolute;
      bottom: -3px;
      border: 1px solid ;
      border-radius: 4px;
    }
  }
}
.min {
  width: 300px;
  height: 0px;
  border: 1px;
  border-radius: 5px 5px 0 0;
}
</style>

