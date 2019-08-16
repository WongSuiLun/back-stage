<template>
  <a-row>
    <a-form :form="form" @submit="handleSubmit">
      <a-col span="6">
        <a-form-item label="店名" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-select
            v-decorator="[
          'shop_id',
          {rules: [{ required: true, message: '请选择店！' }]}
        ]"
            placeholder="请选择店"
          >
            <a-select-option
              :value="institution.id"
              v-for="(institution,index) in institutions"
              :key="index"
            >{{institution.name}}</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col span="6">
        <a-form-item label="房型" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input v-decorator="[
          'type_name',
        ]" />
        </a-form-item>
      </a-col>
      <a-col span="6">
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button type="primary" html-type="submit">查询</a-button>
        </a-form-item>
      </a-col>
    </a-form>
    <a-col :span="24">
      <a-table :columns="columns" :dataSource="data">
        <span slot="chooseRoom">
          <a>取消在线选房</a>
        </span>
        <span slot="action" slot-scope>
          <a href="javascript:;">编辑</a>
          <a-divider type="vertical" />
          <a href="javascript:;">删除</a>
          <!-- <a-divider type="vertical" />
          <a href="javascript:;" class="ant-dropdown-link">
            More actions
            <a-icon type="down" />
          </a>-->
        </span>
      </a-table>
    </a-col>
  </a-row>
</template>

<script>
import { getInstitutions } from "@/api/institutions.js";
import { addRoomTypes, getRoomTypes } from "@/api/room";
const columns = [
  {
    title: "ID",
    dataIndex: "type_id",
    key: "type_id"
  },
  {
    title: "房型",
    dataIndex: "type_name",
    key: "type_name"
  },
  {
    title: "店名",
    dataIndex: "type_name2",
    key: "type_name2"
  },
  {
    title: "预定选房",
    key: "chooseRoom",
    scopedSlots: { customRender: "chooseRoom" }
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
      formLayout: "horizontal",
      form: this.$form.createForm(this),
      institutions: ["选择店"],
      data: [],
      columns
    };
  },
  created() {
    this.initInstitutions();
  },
  methods: {
    initInstitutions() {
      getInstitutions().then(res => {
        console.log(res);
        this.institutions = res.data.data;
      });
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          getRoomTypes(values.shop_id).then(res => {
            this.data = res.data.data;
          });
        }
      });
    },
    handleSelectChange(value) {}
  }
};
</script>