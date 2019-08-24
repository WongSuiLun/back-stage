<template>
  <div class="add-good">
    <div class="step">
      <wq-step :step-names="stepNames" v-model="step"></wq-step>
    </div>
    <!-- <a-steps>
      <a-step status="finish" title="编辑基础信息">
        <a-icon type="user" slot="icon"/>
      </a-step>
      <a-step status="finish" title="编辑价格日历">
        <a-icon type="solution" slot="icon"/>
      </a-step>
      <a-step status="process" title="编辑详情页面">
        <a-icon type="loading" slot="icon"/>
      </a-step>
      <a-step status="wait" title="完成">
        <a-icon type="smile-o" slot="icon"/>
      </a-step>
    </a-steps> -->
    <base-info-form v-show="step==0"/>
    <putaway-info-form v-show="step==1"/>
    <preview-good></preview-good>
  </div>
</template>

<script>
import PreviewGood from './components/PreviewGood'
import BaseInfoForm from './components/BaseInfoForm'
import PutawayInfoForm from './components/PutawayInfoForm'
import { WqStep } from "@/components";
export default {
  components: {
    PreviewGood,
    BaseInfoForm,
    PutawayInfoForm,
    WqStep
  },
  data() {
    return {
      stepNames:[
        {name:"编辑基础信息",finish:true},
        {name:"编辑上架信息",finish:true},
        {name:"编辑价格日历",finish:false},
        {name:"编辑详情页面",finish:false},
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

