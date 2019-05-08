<template>
  <div class="order-item">
    <div>
      {{orderItem.goodName}}
    </div>
    <div>
      数量:<a-input-number :min="1" :max="100000" :defaultValue="orderItem.number" @change="onChange" />
    </div>
    <div>
      使用日期:{{orderItem.useTime}}
    </div>
    <div>
      单价:{{orderItem.price}}
    </div>
    <div>
      总价:{{orderItem.total}}
    </div>
    <div>
      <a-button type="primary">删除</a-button>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      orderItem:{
        goodName:'大餐庙会二人入格套票',
        number:1,
        useTime:'2019-4-28',
        price:1400,
        total:1400
      }
    }
  },
  methods:{
    onChange(){
      
    }
  }
}
</script>

<style lang="less" scoped>
.order-item{
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  font-size: 16px;
  align-items: center;
  border-bottom: 1px solid #ddd;
}
</style>

