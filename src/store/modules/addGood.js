// import Vue from 'vue'
const addGoodState = {
    state: {
        isUpload: false,
        loadding:false,
        goodId: '',
        storeNo: '',
        storeType: '',
        typeId: -1,
        roomType: '',
        name: '',
        name2: '',
        unitPrice: 1,//商品单价
        tags: [
            { id: 6, name: "假日通用" },
            { id: 7, name: "周末通用" },
            { id: 8, name: "免预约" },
            { id: 9, name: "限时购" },
        ],
        lightspots: [],
        goodImgList: [],
        goodMainVideo: {},
        goodShopVideo: {},
        bookingInfo: '',
        transfer: '',
        comment: '',
        place: '',
        bookNeedKnow: '',
        upShelvesStyle: 0,//上架类型
        upShelvesTime: '',//上架时间
        downShelvesTime: '',//下架时间
        bookableType: 0,
        bookableTime: '',
        endBookableTime: '',
        peopleNum: 1,
        ignoreDateSelect:0,
        refundPolicy:0,

        //微信分享
        shareTitle: '',
        shareDesc: '',
        shareImg: '',

        //商品详情
        shopDetailRenderHtml: '1'
    },
    getters: {
        getImgListAttachIdList: state => {
            if (state.goodImgList.length > 0) {
                return state.goodImgList.map(ele => {
                    if(ele.hasOwnProperty('attach_id')){
                        return ele.attach_id
                    }else if(ele.hasOwnProperty('response')){
                        return ele.response.data.attach_id
                    }
                })
            }
            return []
        },
        getShopVideoAttachIdList: state => {
            if (state.goodShopVideo.id) {
                let vedio = []
                vedio.push(state.goodShopVideo.id)
                return vedio
            }
            return []

        },
        getMainVideoAttachIdList: state => {
            if (state.goodMainVideo.id) {
                let vedio = []
                vedio.push(state.goodMainVideo.id)
                return vedio
            }
            return []

        },
    },
    mutations: {
        SET_FORM: (state, values) => {
            Object.assign(state, values)
        },
        //设置商品ID
        SET_GOOD_ID: (state, goodId) => {
            state.goodId = goodId
        },
        SET_IS_EDIT: (state, isEdit) => {
            state.isEdit = isEdit
        },
        RESET_FORM: (state) => {
            Object.assign(state, {
                isUpload: false,
                goodId: '',
                storeNo: '',
                storeType: '',
                typeId: -1,
                roomType: '',
                name: '123',
                name2: '',
                unitPrice: 1,//商品单价
                tags: [
                    { id: 6, name: "假日通用" },
                    { id: 7, name: "周末通用" },
                    { id: 8, name: "免预约" },
                    { id: 9, name: "限时购" },
                ],
                lightspots: [],
                goodImgList: [],
                goodMainVideo: {},
                goodShopVideo: {},
                bookingInfo: '',
                transfer: '',
                comment: '',
                place: '',
                bookNeedKnow: '',
                upShelvesTime: '',//上架时间
                downShelvesTime: '',//下架时间
                bookableTime: '',
                endBookableTime: '',
                peopleNum: 1,
                ignoreDateSelect:0,
                refundPolicy:0,
                //微信分享
                shareTitle: '',
                shareDesc: '',
                shareImg: '',

                //商品详情
                shopDetailRenderHtml: '1'
            })
        }

    },
    actions: {

    }
}

export default addGoodState
