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

// const sourceData = [
//   { date: "2019-3", '合计': 7.0, '大陆': 3.9 },
//   { date: "Feb", '合计': 6.9, '大陆': 4.2 },
//   { date: "Mar", '合计': 9.5, '大陆': 5.7 },
//   { date: "Apr", '合计': 14.5, '大陆': 8.5 },
//   { date: "May", '合计': 18.4, '大陆': 11.9 },
//   { date: "Jun", '合计': 21.5, '大陆': 15.2 },
//   { date: "Jul", '合计': 25.2, '大陆': 17.0 },
//   { date: "Aug", '合计': 26.5, '大陆': 16.6 },
//   { date: "Sep", '合计': 23.3, '大陆': 14.2 },
//   { date: "Oct", '合计': 18.3, '大陆': 10.3 },
//   { date: "Nov", '合计': 13.9, '大陆': 6.6 },
//   { date: "Dec", '合计': 9.6, '大陆': 4.8 }
// ];

// const dv = new DataSet.View().source(sourceData);
// dv.transform({
//   type: "fold",
//   fields: ["合计", "大陆"],
//   alias: '时间',
//   key: "key",
//   value: "value"
// });
// const data = dv.rows;

// const scale = [
//   {
//     dataKey: "date",
//     min: 0,
//     max: 1
//   }
// ];
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
