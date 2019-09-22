<template>
  <div>
    <a-table :columns="columns" bordered :dataSource="data" :pagination="false" :scroll="{y:500}">
    <template slot="title">
      <div>
          用户列表（1881）
      </div>
      <div>
          <a-input></a-input>
      </div>
    </template>
      <span slot="action" slot-scope="text, record">
        <a href="javascript:;">Delete</a>
      </span>
    </a-table>
  </div>
</template>

<script>
const columns = [
  {
    title: "姓名",
    dataIndex: "realname",
    width: "33%",
    key: "realname"
  },
  {
    title: "电话",
    key: "phone",
    width: "33%",
    dataIndex: "phone"
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" }
  }
];

export default {
  data() {
    return {
      columns
    };
  },
  props: {
    data: Array
  }
};
</script>

<style>
</style>