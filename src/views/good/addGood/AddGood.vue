<template>
  <div class="add-good">
    <a-spin tip="数据加载中,请稍后..." :spinning="loadding">
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
import { mixinAddGoodState } from "./mixin";
import AddGoodResult from "./components/AddGoodResult";
import { WqStep } from "@/components";
import { getGood,getHtml } from "@/api/good";
export default {
  mixins: [mixinAddGoodState],
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
        loadding: true
      });
      getGood(good.no).then(res => {
        this.$store.commit("SET_FORM", {
          loadding: false
        });
        console.log(res);
        let goodDetail = res.data.data;
        this.handlerGoodHtml(goodDetail.attachs,goodDetail.domain)
        this.$store.commit("SET_FORM", {
          isUpload: true,
          goodId: goodDetail.no,
          storeNo: goodDetail.store_no + "",
          storeType: goodDetail.type,
          roomType: "",
          name: goodDetail.name,
          name2: goodDetail.name2,
          tags: goodDetail.tags.map(ele => {
            return {
              id: ele.tag_id,
              name: ele.tag_name
            };
          }),
          lightspots: goodDetail.features.map(ele => {
            return ele.content;
          }), //todo
          goodImgList: this.findAttachByType(
            "img",
            goodDetail.attachs,
            goodDetail.domain
          ), //todo
          goodMainVideo: this.findAttachByType(
            "mainV",
            goodDetail.attachs,
            goodDetail.domain
          ), //todo
          goodShopVideo: this.findAttachByType(
            "shopV",
            goodDetail.attachs,
            goodDetail.domain
          ), //todo
          bookingInfo: "",
          transfer: good.is_regifted + "",
          comment: good.is_reviewed + "",
          place: good.back_end + "",
          bookNeedKnow: good.book_need_know,
          unitPrice: goodDetail.unit_price,
          upShelvesTime:goodDetail.up_shelves_time,
          downShelvesTime:goodDetail.down_shelves_time,
          bookableTime:goodDetail.bookable_time,
          endBookableTime:goodDetail.end_bookable_time,
          ignoreDateSelect:goodDetail.is_need_date,
          refundPolicy:goodDetail.is_return,
          //  upShelvesStyle: good.up,
          // //上架时间
          // upShelvesTime: state => state.addGood.upShelvesTime,
          // //下架时间
          // downShelvesTime: state => state.addGood.downShelvesTime,
          // //可预定类型
          // bookableType: state => state.addGood.bookableType,
          // bookableTime: state => state.addGood.bookableTime,
          // endBookableTime: state => state.addGood.endBookableTime,
          //微信分享
          shareTitle: "",
          shareDesc: "",
          shareImg: ""

          //  features: this.lightspots,
          //         book_need_know: this.bookNeedKnow, //预定须知
          //         back_end: this.place,
          //         is_regifted: this.transfer,
          //         is_reviewed: this.comment,
          //         attachs: {
          //           img: this.$store.getters.getImgListAttachIdList,
          //           shopV: this.$store.getters.getShopVideoAttachIdList,
          //           mainV: this.$store.getters.getMainVideoAttachIdList
          //         },
          //         // "attachs[img]": this.$store.getters.getImgListAttachIdList,
          //         // "attachs[shopV]": this.$store.getters.getShopVideoAttachIdList,
          //         // "attachs[mainV]": this.$store.getters.getMainVideoAttachIdList,
          //         up_shelves_time: this.upShelvesTime,
          //         down_shelves_time: this.downShelvesTime,
          //         people_num: this.peopleNum,
          //         bookable_time: this.bookableTime,
          //         end_bookable_time: this.endBookableTime

          // typeId: state => state.addGood.typeId,
          // name: state => state.addGood.name,
          // name2: state => state.addGood.name2,
          // tags: state => state.addGood.tags,
          // lightspots: state => state.addGood.lightspots,
          // goodImgList: state => state.addGood.goodImgList,
          // goodMainVideo: state => state.addGood.goodMainVideo,
          // goodShopVideo: state => state.addGood.goodShopVideo,
          // bookingInfo: state => state.addGood.bookingInfo,
          // transfer: state => state.addGood.transfer,
          // comment: state => state.addGood.comment,
          // place: state => state.addGood.place,
          // bookNeedKnow: state => state.addGood.bookNeedKnow,
          // unitPrice: state => state.addGood.unitPrice,
          // upShelvesStyle: state => state.addGood.upShelvesStyle,
          // //上架时间
          // upShelvesTime: state => state.addGood.upShelvesTime,
          // //下架时间
          // downShelvesTime: state => state.addGood.downShelvesTime,
          // //可预定类型
          // bookableType: state => state.addGood.bookableType,
          // bookableTime: state => state.addGood.bookableTime,
          // endBookableTime: state => state.addGood.endBookableTime,
          // peopleNum: state => state.addGood.peopleNum,
          // //微信分享
          // shareTitle: state => state.addGood.shareTitle,
          // shareDesc: state => state.addGood.shareDesc,
          // shareImg: state => state.addGood.shareImg,
          // shopDetailRenderHtml:state=>state.addGood.shopDetailRenderHtml
        });
      });
    },
    handlerGoodHtml(attachs,domain){
      let targetAttach = attachs.filter(attach => {
        return attach.type == 'html';
      });
      if (
        targetAttach.length > 0
      ) {
        let vObject = targetAttach[0];
        let  src= domain + vObject.path
        getHtml(src).then(res=>{
          this.$store.commit('SET_FORM',{
            shopDetailRenderHtml:res.data
          })
        })
      }
    },
    findAttachByType(typeName, attachs, domain) {
      let targetAttach = attachs.filter(attach => {
        return attach.type == typeName;
      });
      console.log(targetAttach);
      if (
        (typeName == "mainV" || typeName == "shopV") &&
        targetAttach.length > 0
      ) {
        let vObject = targetAttach[0];
        let tartgetObject = {
          id: vObject.id,
          attach_id: vObject.id,
          uid: vObject.id,
          domain: domain,
          file_url: domain + vObject.path,
          src: domain + vObject.path,
          url: domain + vObject.path
        };
        return tartgetObject;
      }
      return targetAttach.map(attach => {
        let path = attach.path;
        let index = path.lastIndexOf("/");
        let name = path.substr(index + 1);
        let tartgetObject = {
          attach_id: attach.id,
          uid: attach.id,
          domain: domain,
          file_url: domain + attach.path,
          url: domain + attach.path,
          status: "done",
          name
        };
        return tartgetObject;
      });
    }
  },
  watch: {
    $route: function(newVal) {
      console.log(newVal);
      let that = this;
      if (newVal.fullPath == "/good/add") {
        if (newVal.params.good) {
          this.$confirm({
            title: "确定执行此操作?",
            content: "请确认已完成之前的编辑操作，否则将覆盖之前的操作。",
            onOk() {
              that.initGood(newVal.params.good);
            },
            onCancel() {}
          });
        } else {
          this.$confirm({
            title: "确定执行此操作?",
            content: "您当前正在编辑商品，确认切换到添加商品？",
            onOk() {
              that.$store.commit("RESET_FORM");
            },
            onCancel() {}
          });
        }
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

