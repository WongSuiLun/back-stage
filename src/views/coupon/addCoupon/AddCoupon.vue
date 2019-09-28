<template>
  <div class="content-warp">
    <a-form>
      <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="使用渠道">
        <a-select defaultValue="all" style="width: 120px" @change="handleChange">
          <a-select-option value="all">通用</a-select-option>
          <a-select-option value="wechat">微信</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        label="优惠券名称"
        help="建议名字长度15-20个字符"
      >
        <a-input v-model="couponName"></a-input>
      </a-form-item>
      <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="描述">
        <a-input v-model="couponDescription"></a-input>
      </a-form-item>
      <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="优惠金额">
        <a-input-number :min="0" v-model="couponAmount" />元
      </a-form-item>
      <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="优惠金额">
        <a-radio-group defaultValue="a" buttonStyle="solid" v-model="couponType">
          <a-radio-button value="a">店铺优惠券</a-radio-button>
          <a-radio-button value="b">商品优惠券</a-radio-button>
          <a-radio-button value="c">商品抵用券</a-radio-button>
        </a-radio-group>
      </a-form-item>
       <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="Rule_ID">
           <a-input v-model="ruleId"></a-input>
      </a-form-item>
       <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="Rule_ID">
           <a-input v-model="ruleId"></a-input>
      </a-form-item>
       <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="Rule_ID">
           <a-input v-model="ruleId"></a-input>
      </a-form-item>
       <a-form-item >
           <div style="display:flex;justify-content:center">
           <a-button type="primary">添加优惠券</a-button>
           </div>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      },
      couponName: "", //优惠券名称
      couponDescription: "", //优惠券描述
      couponAmount: 0, //优惠金额
      couponType: "",
      ruleId:""
    };
  }
};
</script>

<style>
</style>