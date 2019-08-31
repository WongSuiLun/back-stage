<template>
  <div>
    <under-line lineColor="red">
      <div slot="left">
        订单详情
      </div>
      <div slot="right">
        总价:￥2800
      </div>
    </under-line>
    <order-detail-item></order-detail-item>
    <order-detail-item></order-detail-item>
  </div>
</template>

<script>
import { UnderLine } from "@/components";
import OrderDetailItem from './OrderDetailItem'
export default {
  components: {
    UnderLine,
    OrderDetailItem
  }
};
</script>

<style>
</style>
