<template>
  <div class="coupon-item coupon-item-d">
    <div class="c-type">
      <div class="c-price">
        <em>¥</em>
        <strong>20</strong>
        <span class="type">东券</span>
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
          <span class="txt">仅可购买酒类部分商品</span>
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
          <span class="txt">优惠券</span>
        </div>

      </div>

      <div class="op-btns" style="display:flex;justify-content: space-between;padding:0 20px;">
        <a-button type="primary">导出领取人</a-button>
        <a-button type="danger">立即下架</a-button>
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
export default {};
</script>

<style scoped>
.coupon-item-d .c-type {
  background-color: #74d2d4;
  position: relative;
    width: 100%;
    height: 149px;
    padding: 30px 0 0;
    overflow: hidden;
    color: #fff;
    text-align: center;
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
    background: url(//misc.360buyimg.com/user/myjd/coupon/css/i/coupon20160715.png) -3px -296px no-repeat;
    background-position: 2px -302px;
}
.coupon-item-d .c-type .c-limit span, .coupon-item-d .c-type .c-time {
    color: #197f81;
}

.coupon-item .c-msg {
    overflow: visible;
    height: 277px;
    padding: 15px 0 0;
    background: #f9f9f9;
}

.coupon-item .range-item {
    display: block;
    margin: 0 0 10px;
}
.coupon-item .range-item .label {
    width: 60px;
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
    background: url(//misc.360buyimg.com/user/myjd/coupon/css/i/coupon20160715.png) -99px 0;
}
</style>