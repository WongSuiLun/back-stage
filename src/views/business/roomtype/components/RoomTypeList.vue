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
      <!-- <a-col span="6">
        <a-form-item label="房型" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input v-decorator="[
          'type_name',
        ]" />
        </a-form-item>
      </a-col>-->
      <a-col span="6">
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button type="primary" html-type="submit">查询</a-button>
        </a-form-item>
      </a-col>
    </a-form>
    <a-col :span="24">
      <a-table :columns="columns" :dataSource="data">
        <template slot="typeName" slot-scope="text, record">
          <editable-cell :text="text" @change="onCellChange(record, 'name', $event)" />
        </template>
        <span slot="chooseRoom">
          <a>取消在线选房</a>
        </span>
        <span slot="action" slot-scope="text, record">
          <!-- <a href="javascript:;">编辑</a>
          <a-divider type="vertical" /> -->
        
          <a-popconfirm title="确认删除房型吗?" @confirm="confirmDelete(record.type_id)"  okText="Yes" cancelText="No">
            <a href="javascript:;">删除</a>
          </a-popconfirm>
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
import { addRoomTypes, getRoomTypesByShop, getRoomTypes,updateRoomTypesById,deleteRoomTypesById} from "@/api/room";
import { EditableCell } from "@/components";
const columns = [
  {
    title: "ID",
    dataIndex: "type_id",
    key: "type_id"
  },
  {
    title: "店名",
    dataIndex: "shopName",
    key: "type_name2"
  },
  {
    title: "房型",
    dataIndex: "type_name",
    key: "type_name",
    scopedSlots: {
      customRender: "typeName"
    }
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
  components:{
    EditableCell
  },
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this),
      institutions: ["选择店"],
      data: [],
      columns,
      institutionMap: new Map()
    };
  },
  created() {
    this.initData();
  },
  methods: {
    confirmDelete (typeId) {
      deleteRoomTypesById(typeId).then(res=>{
        console.log(res)
        this.$message.success(res.data.message)
        this.initData();
      })
      
    },
    onCellChange(record, dataIndex, value){
      
      let updateData = {
        type_id:record.type_id,
        type_name:value,
      }
      updateRoomTypesById(record.store_id,updateData).then(res=>{
        this.$message.success(res.data.message)
      })
    },
    initData() {
      getInstitutions()
        .then(res => {
          this.institutions = res.data.data;
          this.institutions.forEach(ele => {
            this.institutionMap.set(ele.id, ele.name);
          });
        })
        .then(res => {
          getRoomTypes().then(res => {
            let roomTypes = res.data.data;
            this.data = roomTypes.map(ele => {
              ele.shopName = this.institutionMap.get(ele.store_id);
              return ele;
            });
          });
        });
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          getRoomTypesByShop(values.shop_id).then(res => {
            this.data = res.data.data.map(ele => {
              console.log(this.institutionMap)
              console.log(ele.store_id)
              ele.shopName = this.institutionMap.get(ele.store_id);
              return ele;
            });
          });
        }
      });
    },
    handleSelectChange(value) {}
  }
};
</script>