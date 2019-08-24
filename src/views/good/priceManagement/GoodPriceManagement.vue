<template>
  <div class="content-warp">
    <!-- <a-radio-group defaultValue="a" buttonStyle="solid">
      <a-radio-button value="a">精简模式</a-radio-button>
      <a-radio-button value="b">完整模式</a-radio-button>
    </a-radio-group>-->
    <a-button type @click="toggle">全部展开</a-button>
    <a-table
      :columns="columns"
      :dataSource="data"
      class="components-table-demo-nested"
      style="margin-top:20px"
      :expandRowByClick="true"
      @expand="handleExpand"
    >
      <a slot="operation" slot-scope="text" href="javascript:;">Publish</a>
      <a-table
        slot="expandedRowRender"
        slot-scope="text"
        :columns="innerColumns"
        :dataSource="innerData"
        :pagination="false"
        :showHeader="false"
      >
        <span slot="status" slot-scope="text">
          500
        </span>
        <span slot="operation" slot-scope="text" class="table-operation">
          <a href="javascript:;">Pause</a>
          <a href="javascript:;">Stop</a>
          <a-dropdown>
            <a-menu slot="overlay">
              <a-menu-item>Action 1</a-menu-item>
              <a-menu-item>Action 2</a-menu-item>
            </a-menu>
            <a href="javascript:;">
              More
              <a-icon type="down" />
            </a>
          </a-dropdown>
        </span>
      </a-table>
    </a-table>
  </div>
</template>

<script>
const columns = [
  { title: "商品", dataIndex: "name", key: "name", width: 200 },
  { title: "角色", dataIndex: "platform", key: "platform", width: 200 },
  { title: "等级名称", dataIndex: "version", key: "version", width: 200 },
  {
    title: "2019-08-22",
    dataIndex: "upgradeNum",
    key: "upgradeNum",
    width: 200
  },
  { title: "2019-08-23", dataIndex: "creator", key: "creator", width: 200 },
  { title: "2019-08-24", dataIndex: "createdAt", key: "createdAt", width: 200 },
  {
    title: "操作",
    key: "operation",
    scopedSlots: { customRender: "operation" }
  }
];

const data = [];
for (let i = 0; i < 3; ++i) {
  data.push({
    key: i,
    name: "大餐庙会2人入格套票",
    platform: "	特殊价格旅行社",
    version: "普通用户",
    upgradeNum: 500,
    creator: "500",
    createdAt: "500"
  });
}

const innerColumns = [
  { title: "商品", dataIndex: "test", key: "test", width: 200 },
  { title: "角色", dataIndex: "date", key: "date", width: 200 },
  { title: "等级名称", dataIndex: "name", key: "name", width: 200 },
  {
    title: "2019-08-22",
    key: "state",
    scopedSlots: { customRender: "status" },
    width: 200
  },
  {
    title: "2019-08-23",
    dataIndex: "upgradeNum",
    key: "upgradeNum",
    width: 200
  },
  {
    title: "2019-08-24",
    dataIndex: "upgradeNum",
    key: "upgradeNum2",
    width: 200
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
    scopedSlots: { customRender: "operation" }
  }
];

const innerData = [];
for (let i = 0; i < 3; ++i) {
  innerData.push({
    test: "",
    key: i,
    date: "预订中心经理",
    name: "白银用户",
    upgradeNum: "56",
    upgradeNum2: "56"
  });
}

export default {
  data() {
    return {
      data,
      columns,
      innerColumns,
      innerData,
      defaultExpandAllRows: true,
      expandedRowKeys: [0, 1]
    };
  },
  methods: {
    toggle() {
      this.expandedRowKeys = [];
      this.defaultExpandAllRows = !this.defaultExpandAllRows;
      alert(this.defaultExpandAllRows);
    },
    handleExpand(expanded, record) {
      console.log(expanded);
      console.log(record);
    }
  }
};
</script>

<style>
</style>