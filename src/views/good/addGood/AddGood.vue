<template>
  <div class="add-good">
    <a-spin tip="Loading..." :spinning="false">
      <div class="step">
        <wq-step :step-names="stepNames" v-model="step"></wq-step>
      </div>
      <base-info-form v-show="step==0" />
      <!-- <putaway-info-form v-show="step==1" /> -->
      <edit-date-price v-show="step==1" />
      <edit-detail v-show="step==2" />
      <!-- <add-good-result v-show="step==3" /> -->
      <preview-good></preview-good>
    </a-spin>
  </div>
</template>

<script>
import PreviewGood from "./components/PreviewGood";
import BaseInfoForm from "./components/BaseInfoForm";
import PutawayInfoForm from "./components/PutawayInfoForm";
import EditDatePrice from "./components/EditDatePrice";
import EditDetail from "./components/EditDetail";
import AddGoodResult from "./components/AddGoodResult";
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
      stepNames: [
        { name: "编辑基础信息", finish: true },
        // { name: "编辑上架信息", finish: true },
        { name: "编辑价格日历", finish: true },
        { name: "编辑详情页面", finish: true }
        // { name: "完成", finish: false }
      ],
      step: 0
    };
  },
  created() {
    if (this.$route.params.good) {
      this.initGood(this.$route.params.good);
    }
  },
  methods: {
    //初始化商品,添加编辑信息
    initGood(good) {
      this.$store.commit("SET_FORM", {
        goodId: good.no,
        storeNo: good.store_no,
        storeType: "",
        roomType: "",
        name: good.name,
        name2: good.name2,
        tags: good.tags,
        lightspots: good.lightspots,
        goodImgList: [],
        goodMainVideo: {},
        goodShopVideo: {},
        bookingInfo: "",
        transfer: "",
        comment: "",
        place: "",

        //微信分享
        shareTitle: "",
        shareDesc: "",
        shareImg: ""
      });
    }
  },
  watch: {
    $route: function(newVal) {
      console.log(newVal);
      let that = this;
      if (newVal.fullPath == "/good/add") {
        this.$confirm({
          title: "确定执行此操作?",
          content: "请确认已完成之前的编辑操作，否则将覆盖之前的操作。",
          onOk() {
            that.initGood(newVal.params.good);
          },
          onCancel() {}
        });
      }
    }
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
      color: #000;
      background: #f6f6f6;
      margin: 8px 0;
    }
  }
  .step {
    margin-bottom: 15px;
  }
}
</style>

