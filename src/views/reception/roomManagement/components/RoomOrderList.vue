<template>
  <div>
    <div v-if="getRoomOrderList === undefined">
      无订单
    </div>
    <div v-for="(product,index) in getRoomOrderListById " :key="parseInt(index)">
      <room-order-list-item :product="product" :index="index"></room-order-list-item>
    </div>
  </div>
</template>
<script>
import RoomOrderListItem from './RoomOrderListItem'
export default {
  components: {
    RoomOrderListItem
  },
  computed: {
    getRoomId () {
      let roomId = this.$store.state.RoomPlaceOrder.roomInfo.room_id
      return roomId
    },
    getRoomOrderList () {
      return this.$store.state.RoomPlaceOrder.orderProductList
    },
    getRoomOrderListById () {
      if (this.getRoomOrderList[this.getRoomId] === null || this.getRoomOrderList[this.getRoomId] === undefined) {
        return []
      }
      return Object.values(this.getRoomOrderList[this.getRoomId])
    }
  }
}
</script>
