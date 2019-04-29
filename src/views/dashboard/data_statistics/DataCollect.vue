<template>
  <time-select-tab
        defaultActiveKey="1"
        @timeSelectOnChange="timeChange"
      >
        <time-select-tab-pane
          tab="全部"
          key="1"
        >
          <div class="number-info">
            <a-row :gutter="16">
              <a-col
                :xs="24"
                :sm="24"
                :md="24"
                :lg="12"
                :xl="8"
                :xxl="6"
                v-for="(data,index) in statisticsData"
                :key="index"
              >
                <number-info
                  :loading="dataLoading"
                  :icon="data.icon"
                  :color="data.color"
                  :msg-list="data.message"
                ></number-info>
              </a-col>
            </a-row>
          </div>
        </time-select-tab-pane>
        <time-select-tab-pane
          tab="云来客栈"
          key="2"
        >
          2
        </time-select-tab-pane>
        <time-select-tab-pane
          tab="御瀛庄"
          key="3"
        >
          2
        </time-select-tab-pane>
        <time-select-tab-pane
          tab="温泉"
          key="4"
        >
          2
        </time-select-tab-pane>
        <time-select-tab-pane
          tab="餐饮"
          key="5"
        >
          2
        </time-select-tab-pane>
      </time-select-tab>
</template>

<script>
import { TimeSelectTab, TimeSelectTabPane, NumberInfo } from "@/components";
import { getAllStatisticsData } from "@/api/statistics";
export default {
 components: {
    TimeSelectTab,
    TimeSelectTabPane,
    NumberInfo,
  },
  data() {
    return {
      statisticsData: [],
      dataLoading: true
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      getAllStatisticsData().then(res => {
        this.statisticsData = res.data.result;
        setTimeout(() => {
          this.dataLoading = false;
        }, 1000);
      });
    },
    onTabChange(key, type) {
      console.log(key, type);
      this[type] = key;
    },
    timeChange(date, dateString) {
      console.log(date);
      console.log(dateString);
    }
  }
}
</script>

<style lang="less" scoped>
.number-info {
  padding: 20px 30px;
}
.data-box:not(:first-child) {
  margin-top: 20px;
}
</style>

