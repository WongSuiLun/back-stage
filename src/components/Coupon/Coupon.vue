<template>
  <div class="coupon-item coupon-item-d">
    <div class="c-type" :style="getTypeClass">
      <div class="c-price">
        <template v-if="type=='coupon'">
          <em>¥</em> 
          <strong>20</strong>
        </template>
        <template v-if="type=='voucher'">
          <span style="font-size:26px;font-weight:600">二人入格</span>
        </template>
        <span class="type">{{getTypeName}}</span>
      </div>
      <div class="c-limit">满199可用</div>
      <div class="c-time">&nbsp;&nbsp;</div>
      <div class="c-time">2019.08.31-2019.09.11</div>
      <div class="c-type-top"></div>
      <div class="c-type-bottom"></div>
    </div>
    <div class="c-msg">
      <div class="c-range">
        <div class="range-item">
          <span class="label">限品类：</span>
          <span class="txt">仅可购买二人入格等商品</span>
          <b class style="display: none;"></b>
          <div class="item-tips" style="display: none;">
            <s></s>
            <div class="tips">仅可购买酒类部分商品</div>
          </div>
        </div>

        <div class="range-item">
          <span class="label">限平台：</span>
          <span class="txt">全平台</span>
          <b class style="display: none;"></b>
          <div class="item-tips" style="display: none;">
            <s></s>
            <div class="tips">全平台</div>
          </div>
        </div>
        <div class="range-item">
          <span class="label">券编号：</span>
          <span class="txt">40976785103</span>
        </div>
        <div class="range-item">
          <span class="label">类型：</span>
          <span class="txt">{{getTypeName}}</span>
        </div>
      </div>

      <div class="op-btns">
        <slot name="footer" style="width:100%"></slot>
      </div>

      <div class="ftx-03 ac mt5">&nbsp;&nbsp;</div>
    </div>

    <div class="overdue-site"></div>

    <div
      class="c-del"
      onclick="conformDo(this,'40976785103','248241142','F5B360A','jd_7561baceedf68');"
      clstag="pageclick|keycount|mycoupon_new_201610184|14"
    ></div>
  </div>
</template>

<script>
export default {
  props:{
    type:{
      default:'coupon',//voucher
      type:String,
    }
  },
  computed:{
    getTypeClass(){
      if(this.type == 'coupon'){
        return {
          backgroundColor:'#ff4d4f'
        }
      }else{
        return {
          backgroundColor:'#74d2d4'
        }
      }
    },
    getTypeName(){
      if(this.type == 'coupon'){
        return "优惠券"
      }else{
        return "抵用券"
      }
    }
  }
};
</script>

<style scoped>
.coupon-item-d .c-type {
  
  position: relative;
  width: 100%;
  height: 149px;
  padding: 30px 0 0;
  overflow: hidden;
  color: #fff;
  text-align: center;
  margin-top: 5px;
}
.coupon-item {
  position: relative;
  width: 264px;
}
.coupon-item .c-price {
  margin: 0 0 5px;
  text-align: center;
  font-weight: 400;
}
.coupon-item .c-price em {
  font-family: verdana;
  font-size: 24px;
  position: relative;
  top: -11px;
}
.coupon-item .c-price strong {
  line-height: 45px;
  font-size: 40px;
  font-family: Arial;
}
.coupon-item .c-price .type {
  display: inline-block;
  *display: inline;
  *zoom: 1;
  text-align: text-bottom;
  color: #197f81;
}
.coupon-item .c-type .c-type-bottom {
  position: absolute;
  width: 100%;
  height: 3px;
  bottom: 0;
  left: 0;
  border-bottom: 1px dashed #ffffff;
}
.coupon-item-d .c-type .c-limit span,

.coupon-item-d .c-type .c-time {
  color: #197f81;
}

.coupon-item .c-msg {
  overflow: visible;
  height: 220px;
  padding: 15px 0 0;
  background: #f9f9f9;
}

.coupon-item .range-item {
  padding: 0 20px;
  display: block;
  margin: 0 0 10px;
}
.coupon-item .range-item .label {
  display: inline;
  text-align: right;
}
.coupon-item .range-item .txt {
  width: 144px;
  color: #999;
  overflow: hidden;
  white-space: nowrap;
}

.coupon-item .overdue-site {
  position: absolute;
  display: block;
  width: 65px;
  height: 66px;
  left: 0;
  top: 0;
  overflow: hidden;
  background: url(//misc.360buyimg.com/user/myjd/coupon/css/i/coupon20160715.png) -99px
    0;
}

.op-btns {
  position: absolute;
  bottom: 20px;
  width: 100%;
}
</style>