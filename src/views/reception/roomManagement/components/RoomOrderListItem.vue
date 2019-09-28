<template>
  <div class="room-order-list-item">
    <span class="item">{{product.materials_name}}</span>
    <span class="item">
      <a-input-number
        v-model="count"
        size="mini"
        :min="1"
        :max="parseInt(product.quantity)"
        label="描述文字"
      ></a-input-number>
    </span>
    <span class="item">单价：{{product.unit_price}}</span>
    <span class="item">总价：{{totalPrice}}</span>
    <span class="item">
      <a-button type="danger" size="mini" @click="deleteProduct">删除</a-button>
    </span>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  props: {
    product: Object,
    index: Number
  },
  computed: {
    count: {
      get: function () {
        return this.product.count
      },
      set: function (value) {
        let product = {}
        Object.assign(product, this.product)
        product.count = value
        this.$store.dispatch('updateProductCount', product)
      }
    },
    totalPrice () {
      return (this.product.unit_price * this.count).toFixed(2)
    }
  },
  methods: {
    deleteProduct () {
      this.$store.dispatch('deleteProductInOrderList', this.product)
    }
  }
}
</script>
<style lang="less" scoped>
.room-order-list-item {
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-around;
  align-content: center;
  padding: 10px 0;
  text-align: center;
  line-height: 28px;
  .item{
    width: 150px;
    padding-left: 15px;
    text-align: left;
    flex-basis: 200px;
  }
}
</style>
