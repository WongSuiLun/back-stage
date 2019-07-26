import { mapState } from 'vuex'


const mixinAddGoodState = {
  computed: {
    ...mapState({
        storeNo:state => state.addGood.storeNo,
        storeType:state => state.addGood.storeType,
        roomType:state => state.addGood.roomType,
        name:state => state.addGood.name,
        name1:state => state.addGood.name1,
        tags:state => state.addGood.tags,
        lightspots:state => state.addGood.lightspots,
        goodImgList:state => state.addGood.goodImgList,
        goodMainVideo:state => state.addGood.goodMainVideo,
        goodShopVideo:state => state.addGood.goodShopVideo,
        bookingInfo:state => state.addGood.bookingInfo,
        transfer:state => state.addGood.transfer,
        comment:state => state.addGood.comment,
        place:state => state.addGood.place,

        //微信分享
        shareTitle:state => state.addGood.shareTitle,
        shareDesc:state => state.addGood.shareDesc,
        shareImg:state => state.addGood.shareImg
      })
  },
}

export { mixinAddGoodState}
