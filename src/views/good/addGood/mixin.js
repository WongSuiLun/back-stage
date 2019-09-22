import { mapState } from 'vuex'


const mixinAddGoodState = {
  computed: {
    ...mapState({
      storeNo: state => state.addGood.storeNo,
      storeType: state => state.addGood.storeType,
      roomType: state => state.addGood.roomType,
      name: state => state.addGood.name,
      name2: state => state.addGood.name2,
      tags: state => state.addGood.tags,
      lightspots: state => state.addGood.lightspots,
      goodImgList: state => state.addGood.goodImgList,
      goodMainVideo: state => state.addGood.goodMainVideo,
      goodShopVideo: state => state.addGood.goodShopVideo,
      bookingInfo: state => state.addGood.bookingInfo,
      transfer: state => state.addGood.transfer,
      comment: state => state.addGood.comment,
      place: state => state.addGood.place,
      bookNeedKnow: state => state.addGood.bookNeedKnow,
      unitPrice: state => state.addGood.unitPrice,
      upShelvesStyle: state => state.addGood.upShelvesStyle,
      //上架时间
      upShelvesTime: state => state.addGood.upShelvesTime,
      //下架时间
      downShelvesTime: state => state.addGood.downShelvesTime,
      //可预定类型
      bookableType: state => state.addGood.bookableType,
      bookableTime: state => state.addGood.bookableTime,
      endBookableTime: state => state.addGood.endBookableTime,
      peopleNum: state => state.addGood.peopleNum,
      //微信分享
      shareTitle: state => state.addGood.shareTitle,
      shareDesc: state => state.addGood.shareDesc,
      shareImg: state => state.addGood.shareImg
    })
  },
}

export { mixinAddGoodState }
