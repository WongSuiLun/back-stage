<template>
  <time-select-tab defaultActiveKey="1">
    <time-select-tab-pane
      tab="今天"
      key="1"
    >
      <div>
        <v-chart
          :force-fit="true"
          :height="height"
          :data="data"
          :scale="scale"
        >
          <v-tooltip />
          <v-axis />
          <v-legend />
          <v-line
            position="date*value"
            color="key"
          />
          <v-point
            position="date*value"
            color="key"
            :size="4"
            :v-style="style"
            :shape="'circle'"
          />
        </v-chart>
      </div>
    </time-select-tab-pane>
    <time-select-tab-pane
      tab="本周"
      key="2"
    >
      2
    </time-select-tab-pane>
    <time-select-tab-pane
      tab="本月"
      key="3"
    >
      2
    </time-select-tab-pane>
    <time-select-tab-pane
      tab="季度"
      key="4"
    >
      2
    </time-select-tab-pane>
  </time-select-tab>

</template>

<script>
const DataSet = require("@antv/data-set");
import { TimeSelectTab, TimeSelectTabPane } from "@/components";
import { getWeekDaCanData } from "@/api/statistics";
export default {
  components: {
    TimeSelectTab,
    TimeSelectTabPane
  },
  data() {
    return {
      data: [],
      scale: [],
      height: 400,
      style: { stroke: "#fff", lineWidth: 1 }
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      getWeekDaCanData().then(res => {
        const sourceData = res.data.result;
        const dv = new DataSet.View().source(sourceData);
         dv.transform({
          type: "rename",
          map: {
            all: "全部",
            cn: "大陆",
            hk: "香港",
            ma: "澳门"
          }
        });
        dv.transform({
          type: "fold",
          fields: ["全部", "大陆", "香港", "澳门"],
          alias: "时间",
          key: "key",
          value: "value"
        });
       
        this.data = dv.rows;
        
        this.scale = [
          {
            dataKey: "date",
            min: 0,
            max: 1
          }
        ];
      });
    }
  }
};
</script>
