<template>
  <div class="room-state-table" style="margin-top:20px;">
    <a-table bordered :dataSource="dataSource" :columns="columns" size :scroll="{ x: 500 }">
      <template slot="date" slot-scope="text, record">
        <div
          class="td date"
          @mouseenter="handleMouseEnter(record,'date')"
          :class="{'active':hoverKey=='date'}"
          @mouseleave="handleMouseLeave(record)"
        >{{record.date}}</div>
      </template>
      <template slot="week" slot-scope="text, record">
        <div
          class="td"
          @mouseenter="handleMouseEnter(record,'week')"
          :class="{'active':hoverKey=='week','emphasize':record[`week`]=='六'||record[`week`]=='日'}"
          @mouseleave="handleMouseLeave(record)"
        >{{record.week}}</div>
      </template>
      <template slot="total" slot-scope="text, record">
        <div
          class="td"
          @mouseenter="handleMouseEnter(record,'total')"
          :class="{'active':hoverKey=='total','emphasize':record[`total`]==0}"
          @mouseleave="handleMouseLeave(record)"
        >{{record.total}}</div>
      </template>
      <template slot="total_free" slot-scope="text, record">
        <div
          class="td"
          @mouseenter="handleMouseEnter(record,'total_free')"
          :class="{'active':hoverKey=='total_free'}"
          @mouseleave="handleMouseLeave(record)"
        >{{record.total_free}}</div>
      </template>
      <template v-for="other in roomColumn" :slot="`max-${other.title}`" slot-scope="text, record">
        <div
          :key="other.title"
          class="td"
          @mouseenter="handleMouseEnter(record,`${other.title}`)"
          :class="{'active':hoverKey==`${other.title}`,'emphasize':record[`${other.title}`][`max`]==0}"
          @mouseleave="handleMouseLeave(record)"
        >{{record[`${other.title}`]["max"]}}</div>
      </template>
      <template
        v-for="other in roomColumn"
        :slot="`surplus-${other.title}`"
        slot-scope="text, record"
      >
        <div
          :key="other.title"
          class="td surplus"
          @mouseenter="handleMouseEnter(record,`${other.title}`)"
          :class="{'active':hoverKey==`${other.title}`,'emphasize':record[`${other.title}`][`surplus`]==0}"
          @mouseleave="handleMouseLeave(record)"
        >{{record[`${other.title}`]["surplus"]}}</div>
      </template>
    </a-table>
  </div>
</template>
<script>
import { isNumber } from "util";
const data = {
  "1565884800": {
    "4": { max: 133, surplus: 0 },
    "5": { max: 93, surplus: 26 },
    "6": { max: 14, surplus: 0 },
    "16": { max: 20, surplus: 0 },
    "18": { max: 46, surplus: 0 },
    "22": { max: 1, surplus: 0 },
    "25": { max: 3, surplus: 3 },
    "27": { max: 4, surplus: 2 },
    "28": { max: 4, surplus: 4 },
    "29": { max: 4, surplus: 4 },
    "31": { max: 1, surplus: 1 },
    "32": { max: 2, surplus: 0 },
    "33": { max: 9, surplus: 4 },
    "35": { max: 10, surplus: 7 },
    "36": { max: 3, surplus: 2 },
    "37": { max: 1, surplus: 1 },
    "38": { max: 1, surplus: 1 },
    "39": { max: 1, surplus: 1 },
    "40": { max: 1, surplus: 1 },
    "41": { max: 1, surplus: 1 },
    "42": { max: 1, surplus: 1 },
    "43": { max: 1, surplus: 1 },
    "44": { max: 2, surplus: 2 },
    date: "2019-08-16",
    week: "五",
    total: 356,
    total_free: 62
  },
  "1565971200": {
    "4": { max: 133, surplus: 0 },
    "5": { max: 93, surplus: 0 },
    "6": { max: 14, surplus: 0 },
    "16": { max: 20, surplus: 0 },
    "18": { max: 46, surplus: 0 },
    "22": { max: 1, surplus: 0 },
    "25": { max: 3, surplus: 0 },
    "27": { max: 4, surplus: 0 },
    "28": { max: 4, surplus: 0 },
    "29": { max: 4, surplus: 0 },
    "31": { max: 1, surplus: 0 },
    "32": { max: 2, surplus: 0 },
    "33": { max: 9, surplus: 3 },
    "35": { max: 10, surplus: 7 },
    "36": { max: 3, surplus: 3 },
    "37": { max: 1, surplus: 1 },
    "38": { max: 1, surplus: 1 },
    "39": { max: 1, surplus: 1 },
    "40": { max: 1, surplus: 1 },
    "41": { max: 1, surplus: 1 },
    "42": { max: 1, surplus: 1 },
    "43": { max: 1, surplus: 1 },
    "44": { max: 2, surplus: 2 },
    date: "2019-08-17",
    week: "六",
    total: 356,
    total_free: 22
  },
  "1566057600": {
    "4": { max: 133, surplus: 0 },
    "5": { max: 93, surplus: 51 },
    "6": { max: 14, surplus: 3 },
    "16": { max: 20, surplus: 0 },
    "18": { max: 46, surplus: 2 },
    "22": { max: 1, surplus: 0 },
    "25": { max: 3, surplus: 3 },
    "27": { max: 4, surplus: 4 },
    "28": { max: 4, surplus: 4 },
    "29": { max: 4, surplus: 4 },
    "31": { max: 1, surplus: 1 },
    "32": { max: 2, surplus: 2 },
    "33": { max: 9, surplus: 7 },
    "35": { max: 10, surplus: 10 },
    "36": { max: 3, surplus: 3 },
    "37": { max: 1, surplus: 1 },
    "38": { max: 1, surplus: 1 },
    "39": { max: 1, surplus: 1 },
    "40": { max: 1, surplus: 1 },
    "41": { max: 1, surplus: 1 },
    "42": { max: 1, surplus: 1 },
    "43": { max: 1, surplus: 1 },
    "44": { max: 2, surplus: 2 },
    date: "2019-08-18",
    week: "日",
    total: 356,
    total_free: 103
  },
  "1566144000": {
    "4": { max: 133, surplus: 12 },
    "5": { max: 93, surplus: 80 },
    "6": { max: 14, surplus: 11 },
    "16": { max: 20, surplus: 10 },
    "18": { max: 46, surplus: 17 },
    "22": { max: 1, surplus: 0 },
    "25": { max: 3, surplus: 3 },
    "27": { max: 4, surplus: 3 },
    "28": { max: 4, surplus: 4 },
    "29": { max: 4, surplus: 4 },
    "31": { max: 1, surplus: 0 },
    "32": { max: 2, surplus: 2 },
    "33": { max: 9, surplus: 7 },
    "35": { max: 10, surplus: 10 },
    "36": { max: 3, surplus: 3 },
    "37": { max: 1, surplus: 1 },
    "38": { max: 1, surplus: 1 },
    "39": { max: 1, surplus: 1 },
    "40": { max: 1, surplus: 1 },
    "41": { max: 1, surplus: 1 },
    "42": { max: 1, surplus: 1 },
    "43": { max: 1, surplus: 1 },
    "44": { max: 2, surplus: 2 },
    date: "2019-08-19",
    week: "一",
    total: 356,
    total_free: 175
  },
  "1566230400": {
    "4": { max: 133, surplus: 72 },
    "5": { max: 93, surplus: 85 },
    "6": { max: 14, surplus: 14 },
    "16": { max: 20, surplus: 16 },
    "18": { max: 46, surplus: 29 },
    "22": { max: 1, surplus: 0 },
    "25": { max: 3, surplus: 3 },
    "27": { max: 4, surplus: 3 },
    "28": { max: 4, surplus: 4 },
    "29": { max: 4, surplus: 3 },
    "31": { max: 1, surplus: 1 },
    "32": { max: 2, surplus: 2 },
    "33": { max: 9, surplus: 6 },
    "35": { max: 10, surplus: 9 },
    "36": { max: 3, surplus: 2 },
    "37": { max: 1, surplus: 1 },
    "38": { max: 1, surplus: 1 },
    "39": { max: 1, surplus: 1 },
    "40": { max: 1, surplus: 1 },
    "41": { max: 1, surplus: 1 },
    "42": { max: 1, surplus: 1 },
    "43": { max: 1, surplus: 1 },
    "44": { max: 2, surplus: 2 },
    date: "2019-08-20",
    week: "二",
    total: 356,
    total_free: 258
  },
  "1566316800": {
    "4": { max: 133, surplus: 85 },
    "5": { max: 93, surplus: 85 },
    "6": { max: 14, surplus: 14 },
    "16": { max: 20, surplus: 17 },
    "18": { max: 46, surplus: 29 },
    "22": { max: 1, surplus: 0 },
    "25": { max: 3, surplus: 3 },
    "27": { max: 4, surplus: 4 },
    "28": { max: 4, surplus: 4 },
    "29": { max: 4, surplus: 4 },
    "31": { max: 1, surplus: 1 },
    "32": { max: 2, surplus: 2 },
    "33": { max: 9, surplus: 9 },
    "35": { max: 10, surplus: 9 },
    "36": { max: 3, surplus: 2 },
    "37": { max: 1, surplus: 1 },
    "38": { max: 1, surplus: 1 },
    "39": { max: 1, surplus: 1 },
    "40": { max: 1, surplus: 1 },
    "41": { max: 1, surplus: 1 },
    "42": { max: 1, surplus: 1 },
    "43": { max: 1, surplus: 1 },
    "44": { max: 2, surplus: 2 },
    date: "2019-08-21",
    week: "三",
    total: 356,
    total_free: 277
  },
  "1566316801": {
    "4": { max: 133, surplus: 85 },
    "5": { max: 93, surplus: 85 },
    "6": { max: 14, surplus: 14 },
    "16": { max: 20, surplus: 17 },
    "18": { max: 46, surplus: 29 },
    "22": { max: 1, surplus: 0 },
    "25": { max: 3, surplus: 3 },
    "27": { max: 4, surplus: 4 },
    "28": { max: 4, surplus: 4 },
    "29": { max: 4, surplus: 4 },
    "31": { max: 1, surplus: 1 },
    "32": { max: 2, surplus: 2 },
    "33": { max: 9, surplus: 9 },
    "35": { max: 10, surplus: 9 },
    "36": { max: 3, surplus: 2 },
    "37": { max: 1, surplus: 1 },
    "38": { max: 1, surplus: 1 },
    "39": { max: 1, surplus: 1 },
    "40": { max: 1, surplus: 1 },
    "41": { max: 1, surplus: 1 },
    "42": { max: 1, surplus: 1 },
    "43": { max: 1, surplus: 1 },
    "44": { max: 2, surplus: 2 },
    date: "2019-08-21",
    week: "三",
    total: 356,
    total_free: 277
  },
  "1566316802": {
    "4": { max: 133, surplus: 85 },
    "5": { max: 93, surplus: 85 },
    "6": { max: 14, surplus: 14 },
    "16": { max: 20, surplus: 17 },
    "18": { max: 46, surplus: 29 },
    "22": { max: 1, surplus: 0 },
    "25": { max: 3, surplus: 3 },
    "27": { max: 4, surplus: 4 },
    "28": { max: 4, surplus: 4 },
    "29": { max: 4, surplus: 4 },
    "31": { max: 1, surplus: 1 },
    "32": { max: 2, surplus: 2 },
    "33": { max: 9, surplus: 9 },
    "35": { max: 10, surplus: 9 },
    "36": { max: 3, surplus: 2 },
    "37": { max: 1, surplus: 1 },
    "38": { max: 1, surplus: 1 },
    "39": { max: 1, surplus: 1 },
    "40": { max: 1, surplus: 1 },
    "41": { max: 1, surplus: 1 },
    "42": { max: 1, surplus: 1 },
    "43": { max: 1, surplus: 1 },
    "44": { max: 2, surplus: 2 },
    date: "2019-08-21",
    week: "三",
    total: 356,
    total_free: 277
  },
  "1566316803": {
    "4": { max: 133, surplus: 85 },
    "5": { max: 93, surplus: 85 },
    "6": { max: 14, surplus: 14 },
    "16": { max: 20, surplus: 17 },
    "18": { max: 46, surplus: 29 },
    "22": { max: 1, surplus: 0 },
    "25": { max: 3, surplus: 3 },
    "27": { max: 4, surplus: 4 },
    "28": { max: 4, surplus: 4 },
    "29": { max: 4, surplus: 4 },
    "31": { max: 1, surplus: 1 },
    "32": { max: 2, surplus: 2 },
    "33": { max: 9, surplus: 9 },
    "35": { max: 10, surplus: 9 },
    "36": { max: 3, surplus: 2 },
    "37": { max: 1, surplus: 1 },
    "38": { max: 1, surplus: 1 },
    "39": { max: 1, surplus: 1 },
    "40": { max: 1, surplus: 1 },
    "41": { max: 1, surplus: 1 },
    "42": { max: 1, surplus: 1 },
    "43": { max: 1, surplus: 1 },
    "44": { max: 2, surplus: 2 },
    date: "2019-08-21",
    week: "三",
    total: 356,
    total_free: 277
  },
  "1566316804": {
    "4": { max: 133, surplus: 85 },
    "5": { max: 93, surplus: 85 },
    "6": { max: 14, surplus: 14 },
    "16": { max: 20, surplus: 17 },
    "18": { max: 46, surplus: 29 },
    "22": { max: 1, surplus: 0 },
    "25": { max: 3, surplus: 3 },
    "27": { max: 4, surplus: 4 },
    "28": { max: 4, surplus: 4 },
    "29": { max: 4, surplus: 4 },
    "31": { max: 1, surplus: 1 },
    "32": { max: 2, surplus: 2 },
    "33": { max: 9, surplus: 9 },
    "35": { max: 10, surplus: 9 },
    "36": { max: 3, surplus: 2 },
    "37": { max: 1, surplus: 1 },
    "38": { max: 1, surplus: 1 },
    "39": { max: 1, surplus: 1 },
    "40": { max: 1, surplus: 1 },
    "41": { max: 1, surplus: 1 },
    "42": { max: 1, surplus: 1 },
    "43": { max: 1, surplus: 1 },
    "44": { max: 2, surplus: 2 },
    date: "2019-08-21",
    week: "三",
    total: 356,
    total_free: 277
  },
  "1566316805": {
    "4": { max: 133, surplus: 85 },
    "5": { max: 93, surplus: 85 },
    "6": { max: 14, surplus: 14 },
    "16": { max: 20, surplus: 17 },
    "18": { max: 46, surplus: 29 },
    "22": { max: 1, surplus: 0 },
    "25": { max: 3, surplus: 3 },
    "27": { max: 4, surplus: 4 },
    "28": { max: 4, surplus: 4 },
    "29": { max: 4, surplus: 4 },
    "31": { max: 1, surplus: 1 },
    "32": { max: 2, surplus: 2 },
    "33": { max: 9, surplus: 9 },
    "35": { max: 10, surplus: 9 },
    "36": { max: 3, surplus: 2 },
    "37": { max: 1, surplus: 1 },
    "38": { max: 1, surplus: 1 },
    "39": { max: 1, surplus: 1 },
    "40": { max: 1, surplus: 1 },
    "41": { max: 1, surplus: 1 },
    "42": { max: 1, surplus: 1 },
    "43": { max: 1, surplus: 1 },
    "44": { max: 2, surplus: 2 },
    date: "2019-08-21",
    week: "三",
    total: 356,
    total_free: 277
  },
  "1566316806": {
    "4": { max: 133, surplus: 85 },
    "5": { max: 93, surplus: 85 },
    "6": { max: 14, surplus: 14 },
    "16": { max: 20, surplus: 17 },
    "18": { max: 46, surplus: 29 },
    "22": { max: 1, surplus: 0 },
    "25": { max: 3, surplus: 3 },
    "27": { max: 4, surplus: 4 },
    "28": { max: 4, surplus: 4 },
    "29": { max: 4, surplus: 4 },
    "31": { max: 1, surplus: 1 },
    "32": { max: 2, surplus: 2 },
    "33": { max: 9, surplus: 9 },
    "35": { max: 10, surplus: 9 },
    "36": { max: 3, surplus: 2 },
    "37": { max: 1, surplus: 1 },
    "38": { max: 1, surplus: 1 },
    "39": { max: 1, surplus: 1 },
    "40": { max: 1, surplus: 1 },
    "41": { max: 1, surplus: 1 },
    "42": { max: 1, surplus: 1 },
    "43": { max: 1, surplus: 1 },
    "44": { max: 2, surplus: 2 },
    date: "2019-08-21",
    week: "三",
    total: 356,
    total_free: 277
  }
};
export default {
  components: {},
  data() {
    return {
      dataSource: Object.values(data),
      count: 2,
      columns: [
        {
          title: "日期",
          dataIndex: "date",
          fixed: "left",
          scopedSlots: { customRender: "date" }
        },
        {
          title: "星期",
          dataIndex: "week",
          scopedSlots: { customRender: "week" }
        },
        {
          title: "总房数",
          dataIndex: "total",
          scopedSlots: { customRender: "total" }
        },
        {
          title: "总空房",
          dataIndex: "total_free",
          scopedSlots: { customRender: "total_free" }
        }
      ],
      roomColumn: [],
      hoverKey: ""
    };
  },
  created() {
    this.generateDataColumn(data);
  },
  methods: {
    generateDataColumn(data) {
      let dataOne = data[Object.keys(data)[0]];
      console.log(dataOne);
      for (let key in dataOne) {
        if (!isNaN(parseInt(key))) {
          let column = {
            title: key,
            dataIndex: key,
            children: [
              {
                title: "总量",
                dataIndex: `max-${key}`,
                key: `max-${key}`,
                scopedSlots: { customRender: `max-${key}` }
              },
              {
                title: "剩余",
                dataIndex: `surplus-${key}`,
                key: `surplus-${key}`,
                scopedSlots: { customRender: `surplus-${key}` }
              }
            ],
            scopedSlots: { customRender: key }
          };
          this.roomColumn.push(column);
          this.columns.push(column);
        }
      }
    },
    handleMouseEnter(record, key) {
      this.hoverKey = key;
      console.log();
      document
        .querySelector(`th[key='${key}']`)
        .setAttribute("class", "headActive");
      document
        .querySelector(`th[key='max-${key}']`)
        .setAttribute("class", "maxHeadActive");
      document
        .querySelector(`th[key='surplus-${key}']`)
        .setAttribute("class", "surplusHeadActive");
    },
    handleMouseLeave() {
      this.hoverKey = "";
      document.querySelector(`.headActive`).removeAttribute("class");
      document.querySelector(`.maxHeadActive`).removeAttribute("class");
      document.querySelector(`.surplusHeadActive`).removeAttribute("class");
    }
  }
};
</script>
<style lang="less">
.room-state-table {
  .headActive {
    background: #e6f7ff;
  }
  .maxHeadActive {
    background: #e6f7ff;
  }
  .surplusHeadActive {
    background: lightgreen;
  }
  .ant-table-tbody {
    td {
      padding: 0 !important;
    }
    tr:nth-child(even) {
      background: lightgoldenrodyellow;
    }
    .date {
      width: 100px;
    }
    .td {
      padding: 5px 0px;
      text-align: center;
    }
    .active {
      background: #e6f7ff;
      &.surplus {
        background: lightgreen;
      }
    }
    .emphasize {
      color: red;
      font-weight: 600;
    }
  }
}
</style>