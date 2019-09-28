// import Vue from 'vue'
const tagState = {
    state: {
        tagData:[
            {
                id :0 ,
                tagName:'标签一',
                color:'#eee'
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
            tag ={
                id:state.tagData[state.tagData.length-1].id+1,  
                ...tag,
            }
            state.tagData.push(tag)
        }
    },
    actions: {
        
    }
}

export default tagState
