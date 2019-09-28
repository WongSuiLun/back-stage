// import Vue from 'vue'
const tagState = {
    state: {
        tagData:[
            {
                id :0 ,
                title:123
            }
        ]
    },
    getters: {
       getTagData:(state)=>{
           return state.tagData
       }
    },
    mutations: {
        ADD_TAG:(state,tag)=>{
            state.tagData.push(tag)
        },
        INIT_TAG_DATA:(state,tags)=>{
            state.tagData = tags
        },
        DELETE_TAG:(state,tag)=>{
            let index = state.tagData.findIndex((ele)=>{return ele.id = tag.id})
            state.tagData.splice(index,1)
        }
    },
    actions: {
        
    }
}

export default tagState
