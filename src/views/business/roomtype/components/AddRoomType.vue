<template>
  <a-form
    :form="form"
    @submit="handleSubmit"
  >
   <a-form-item
      label="店名"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 12 }"
    >
      <a-select
        v-decorator="[
          'shop_id',
          {rules: [{ required: true, message: '请选择店！' }]}
        ]"
        placeholder="请选择店"
        @change="handleSelectChange"
        
      >
        <a-select-option :value="institution.id" v-for="(institution,index) in institutions" :key="index">
          {{institution.name}}
        </a-select-option>

      </a-select>
    </a-form-item>
    <a-form-item
      label="房型"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 12 }"
    >
      <a-input
        v-decorator="[
          'type_name',
          {rules: [{ required: true, message: '填写房型' }]}
        ]"
      />
    </a-form-item>
    <a-form-item
      :wrapper-col="{ span: 12, offset: 5 }"
    >
      <a-button
        type="primary"
        html-type="submit"
      >
        添加房型
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { getInstitutions } from "@/api/institutions.js";
import { addRoomTypes } from "@/api/room";
export default {
  data () {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this),
      institutions:["选择店"]
    };
  },
  created(){
      this.initInstitutions()
  },
  methods: {
    initInstitutions(){
        getInstitutions().then(res=>{
            console.log(res)
            this.institutions = res.data.data
        })
    },
    handleSubmit (e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          let data={
              type_name:values.type_name,
              "is_choose_room": 0
          }
          let shop_id = values.shop_id
          
          addRoomTypes(data,shop_id).then(res=>{
              console.log(res)
              this.$message.success('添加成功')
          })
        }
      });
    },
    handleSelectChange (value) {
     
    },
  },
};
</script>