<template>
  <div class="place-order-warp">
    <user-search></user-search>
    <user-info :info="info"></user-info>
    <a-row>
      <a-col
        :sm="24"
        :md="16"
      >
        <good-select></good-select>
      </a-col>
    </a-row>
    <order-detail></order-detail>
    <customer-info></customer-info>
    <bus-order></bus-order>
    <div>
      <a-form
        :form="form"
        @submit="handleSubmit"
      >
        <a-form-item
          label="额外大餐庙会人数"
          :label-col="{ span: 9 }"
          :wrapper-col="{ span: 6 }"
        >
          <a-input v-decorator="['name']" />
        </a-form-item>
        <a-form-item
        >
          <div class="action">
            <a-button
              type="primary"
              style="background:green;border:0;margin-right:8px"
            >
              待订订单
            </a-button>
            <a-button
              type="primary"
              style="background:red;border:0;margin-right:8px"
            >
              保留订单
            </a-button>
            <a-button type="primary">
              手机下单
            </a-button>
          </div>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import UserSearch from "./UserSearch";
import UserInfo from "./UserInfo";
import GoodSelect from "./GoodSelect";
import OrderDetail from "./OrderDetail";
import CustomerInfo from "./CustomerInfo";
import BusOrder from "./BusOrder";
export default {
  components: {
    UserSearch,
    UserInfo,
    GoodSelect,
    OrderDetail,
    CustomerInfo,
    BusOrder
  },
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this),
      info: {
        name: "刘光光",
        vipLevel: "白银会员",
        points: "2000分",
        phone: "15919289952",
        oldCardNumber: "8602585",
        birthday: "2019/01/06",
        tagInfo: "喜欢吃辣，蔡少盐",
        email: "",
        address: "广东省珠海市斗门区斗门镇珠海XXXX"
      }
    };
  },
  methods:{
    handleSubmit(){

    },
    onChange(){

    }
  }
};
</script>

<style lang="less" scoped>
.place-order-warp {
  background: #fff;
  padding: 10px 20px 20px;
  .action{
    display: flex;
    justify-content: center;
  }
}
</style>
