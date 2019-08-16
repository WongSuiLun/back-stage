<template>
  <div>
    <div class="data-box">
      <!-- 数据1 -->
      <data-collect></data-collect>
    </div>
    <!-- 数据2 -->
    <div class="data-box">
      <da-can-chart></da-can-chart>
    </div>
    <div class="data-box">
      <da-can-chart></da-can-chart>
    </div>
  </div>
</template>

<script>
// import { TimeSelectTab, TimeSelectTabPane } from "@/components";
import DataCollect from "./DataCollect";
import DaCanChart from "./DaCanChart";
// import Chart  from "./Chart";
export default {
  components: {
    DataCollect,
    DaCanChart
  },
  data() {
    return {};
  },
  created() {}
};
</script>

<style lang="less" scoped>
.number-info {
  padding: 20px 30px;
}
.data-box:not(:first-child) {
  margin-top: 20px;
}
</style>

