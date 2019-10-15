<template>
  <div>
    <div style="margin-bottom:10px">
      <a-button type="primary" @click="showDrawer">新增机构类型</a-button>
      <a-drawer
        title="新增机构列表"
        placement="right"
        :closable="false"
        @close="onClose"
        :visible="newInstituteDrawerVisible"
      >
        <a-form layout="vertical" hideRequiredMark>
          <a-row :gutter="16">
            <a-col :span="24">
              <a-form-item label="类别名">
                <a-input
                  v-model="typeTitle"
                  placeholder="请输入类别名"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="24">
              <a-form-item label="Sign">
                <a-input
                 v-model="sign"
                />
              </a-form-item>
            </a-col>
          </a-row>
         
        </a-form>
        <div
        :style="{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e8e8e8',
          padding: '10px 16px',
          textAlign: 'right',
          left: 0,
          background: '#fff',
          borderRadius: '0 0 4px 4px',
        }"
      >
        <a-button
          style="marginRight: 8px"
          @click="onClose"
        >
          取消
        </a-button>
        <a-button @click="handleAddInstituteType" type="primary" >
          提交
        </a-button>
      </div>
      </a-drawer>
    </div>
    <a-table :columns="columns" :dataSource="data" bordered>
      <template
        v-for="col in ['name', 'age', 'address']"
        :slot="col"
        slot-scope="text, record, index"
      >
        <div :key="col">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="e => handleChange(e.target.value, record.key, col)"
          />
          <template v-else>{{text}}</template>
        </div>
      </template>
      <template slot="operation" slot-scope="text, record, index">
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a @click="() => save(record.key)">Save</a>
            <a-popconfirm title="Sure to cancel?" @confirm="() => cancel(record.key)">
              <a>Cancel</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="() => edit(record.key)">Edit</a>
          </span>
        </div>
      </template>
    </a-table>
  </div>
</template>

<script>
const columns = [
  {
    title: "id",
    dataIndex: "id",
  },
  {
    title: "title",
    dataIndex: "title",
  },
  {
    title: "operation",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" }
  }
];

import { getInstitutionType,createInstitution } from "@/api/institutions";
export default {
  data() {
    return {
      data:[],
      columns,
      newInstituteDrawerVisible: false,
      typeTitle:'',
      sign:''
    };
  },
  created() {
    this.init()
  },
  methods: {
    init(){
      getInstitutionType().then(res => {
      this.data=res.data.data
    });
    },
    showDrawer() {
      this.newInstituteDrawerVisible = true;
    },
    onClose() {
      this.newInstituteDrawerVisible = false;
    },
    handleAddInstituteType(){
      let data = {
        title:this.typeTitle,
        sign:this.sign
      }
      createInstitution(data).then(res=>{
        this.typeTitle = ''
        this.sign = ''
        this.newInstituteDrawerVisible = false
        this.$message.success('添加成功')
        this.init()
      })
    },
    handleChange(value, key, column) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.data = newData;
      }
    },
    edit(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target.editable = true;
        this.data = newData;
      }
    },
    save(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        delete target.editable;
        this.data = newData;
        this.cacheData = newData.map(item => ({ ...item }));
      }
    },
    cancel(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        Object.assign(
          target,
          this.cacheData.filter(item => key === item.key)[0]
        );
        delete target.editable;
        this.data = newData;
      }
    }
  }
};
</script>

<style>
</style>
