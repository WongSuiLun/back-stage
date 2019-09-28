<template>
  <div>
    <radio-btn :items="item" v-model="roomType"></radio-btn>
    <radio-btn :items="goodList" v-model="activeGood"></radio-btn>
  </div>
</template>

<script>
import {RadioBtn} from '@/components'
export default {
  components:{
    RadioBtn
  },
  data(){
    return {
      roomType:'',
      item: [
        "推荐套餐",
        "云来客栈",
        "御瀛庄",
        "御泉府邸",
        "亲王府",
        "露天温泉",
        "大餐庙会",
        "潘金莲"
      ],
      goodList:[
        "入格",
        "上房",
        "童趣房",
        "86房",
        "小套房",
        "大客房",
        "更多..."
      ],
      activeGood:''
    }
  },
  created(){
    
  }
}
</script>
<style lang="less" scoped>
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/  
::-webkit-scrollbar  
{  
    width: 16px;  /*滚动条宽度*/
    height: 8px;  /*滚动条高度*/
}  
  
  
/*定义滑块 内阴影+圆角*/  
::-webkit-scrollbar-thumb  
{  
    border-radius: 8px;  /*滚动条的圆角*/
    background-color: #ddd;  /*滚动条的背景颜色*/
}
</style>
