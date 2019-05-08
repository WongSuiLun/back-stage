<template>
  <div>
    <radio-btn :items="item" v-model="roomType"></radio-btn>
    <radio-btn :items="goodList" v-model="activeGood"></radio-btn>
    <date-picker></date-picker>
  </div>
</template>

<script>
import {RadioBtn,DatePicker} from '@/components'
export default {
  components:{
    RadioBtn,
    DatePicker
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

<style>

</style>
