// import Vue from 'vue'
const addGoodState = {
    state: {
        storeNo:'123',
        storeType:'',
        roomType:'',
        name:'大餐庙会2人入格套票',
        name1:'（2人入格+温泉2位+早餐2位+大餐庙会2位+单车券+烟花券+游艺券）',
        tags:[
            {id:6,name:"假日通用"},
            {id:7,name:"周末通用"},
            {id:8,name:"免预约"},
            {id:9,name:"限时购"},
        ],
        lightspots:[],
        goodImgList:[],
        goodMainVideo:{},
        goodShopVideo:{},
        bookingInfo:'',
        transfer:'',
        comment:'',
        place:'',

        //微信分享
        shareTitle:'',
        shareDesc:'',
        shareImg:''
        
    },
    getters: {
      
    },
    mutations: {
        SET_FORM: (state, values) => {
            Object.assign(state,values)
          },
    },
    actions: {
    }
  }
  
  export default addGoodState
  