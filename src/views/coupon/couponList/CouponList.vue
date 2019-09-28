<template>
  <div class="content-warp">
    <a-tabs defaultActiveKey="1" tabPosition="left" @prevClick="callback" @nextClick="callback">
      <a-tab-pane tab="全部优惠券" key="1">
        <coupon-data></coupon-data>
      </a-tab-pane>
      <a-tab-pane tab="已过期优惠券" key="2">Content of tab 2</a-tab-pane>
      <a-tab-pane tab="抵用券" key="3">Content of tab 3</a-tab-pane>
      <a-tab-pane tab="满减券" key="4">Content of tab 4</a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { Coupon } from "@/components";
import CouponData from './components/CouponData'
export default {
  components: {
    Coupon,
    CouponData
  },
  methods: {
    callback(val) {
      console.log(val);
    }
  }
};
</script>

<style>
</style>