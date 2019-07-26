// import Vue from 'vue'
const addGoodState = {
    state: {
        storeNo:'123',
        name:'大餐庙会2人入格套票',
        name1:'（2人入格+温泉2位+早餐2位+大餐庙会2位+单车券+烟花券+游艺券）',
        tags:[
            {name:"假日通用"},
            {name:"周末通用"},
            {name:"免预约"},
            {name:"限时购"},
        ]
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
  