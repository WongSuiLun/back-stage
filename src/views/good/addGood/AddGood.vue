<template>
  <div class="add-good">
    <div class="step">
      <wq-step :step-names="stepNames" v-model="step"></wq-step>
    </div>
    <base-info-form v-show="step==0"/>
    <putaway-info-form v-show="step==1"/>
    <edit-date-price v-show="step==2"/>
    <edit-detail v-show="step==3"/>
    <add-good-result v-show="step==4"/>
    <preview-good></preview-good>
  </div>
</template>

<script>
import PreviewGood from './components/PreviewGood'
import BaseInfoForm from './components/BaseInfoForm'
import PutawayInfoForm from './components/PutawayInfoForm'
import EditDatePrice from './components/EditDatePrice'
import EditDetail from './components/EditDetail'
import AddGoodResult from './components/AddGoodResult'
import { WqStep } from "@/components";
export default {
  components: {
    PreviewGood,
    BaseInfoForm,
    PutawayInfoForm,
    EditDatePrice,
    EditDetail,
    AddGoodResult,
    WqStep
  },
  data() {
    return {
      stepNames:[
        {name:"编辑基础信息",finish:true},
        {name:"编辑上架信息",finish:true},
        {name:"编辑价格日历",finish:true},
        {name:"编辑详情页面",finish:true},
        {name:"完成",finish:false},
      ],
      step:0
    };
  },
  created(){
   
  },
  methods: {
    
  }
};
</script>

<style lang="less" scoped>
.add-good {
  background: #fff;
  min-height: 500px;
  padding: 15px 20px;
  .content {
    .content-item {
      padding: 5px 8px;
      font-size: 16px;
      font-weight: 500;
      color:#000;
      background: #f6f6f6;
      margin: 8px 0;
    }
  }
  .step{
    margin-bottom: 15px;
  }
}
</style>

