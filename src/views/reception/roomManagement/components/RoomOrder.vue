<template>
  <div class="room-order">
    <a-tabs
      id="room-order-base-tabs"
    >
      <a-tab-pane :tab="`客房服务 (房间:${getRoomInfo.room_num})`" key="0">
        <place-order
          :goodsType="goods_type"
          :goodsData="goods_data"
          @refreshData="refreshData"
        ></place-order>
      </a-tab-pane>
      <a-tab-pane tab="订单" key="1">
        <!-- <a-table
          :data="getOrderListByRoomId"
          border
          stripe
          size="mini"
          style="width: 100%"
          :default-sort="{prop: 'date', order: 'descending'}"
        >
          <a-table-column
            prop="warehouse_no"
            label="订单号"
            sortable
            width="180"
          ></a-table-column>
          <a-table-column
            prop="state"
            label="状态"
            sortable
            width="180"
          ></a-table-column>
          <a-table-column
            prop="phone"
            label="手机"
          ></a-table-column>
          <a-table-column
            prop="total"
            label="总价"
          ></a-table-column>
          <a-table-column
            prop="ctime"
            label="创建时间"
          ></a-table-column>
          <a-table-column
            fixed="right"
            label="操作"
            width="200"
          >
            <template slot-scope="scope">
              <a-button
                @click="showDetail(scope.row)"
                size="small"
              >查看</a-button>
              <a-button
                type="primary"
                size="small"
                @click="cancelRoomOrder(scope.row)"
              >取消订单</a-button>
            </template>
          </a-table-column>
        </a-table> -->
      </a-tab-pane>
      <a-tab-pane tab="日志" key="2">
        <table class="room-detail-table table table-bordered table-hover" style="margin-top:20px">
          <tbody>
            <tr class="active">
              <td>消息</td>
              <td>时间</td>
            </tr>
            <tr>
              <td colspan="2" v-show="getRoomLogByRoomId.length===0">暂无数据</td>
            </tr>
            <tr v-for="(log,index) in getRoomLogByRoomId" :key="index">
              <td>{{log.data}}</td>
              <td>{{log.time}}</td>
            </tr>
          </tbody>
        </table>
      </a-tab-pane>
    </a-tabs>
    <a-modal
      title="订单详情"
      :visible="orderDetailDialogVisible"
      width="50%"
      append-to-body
    >
      <table class="table table-bordered">
        <tbody>
          <tr>
            <td style="background:#f2f2f2;height: 25px;padding: 5px 10px;border: 1px solid #e6e6e6;font-weight: bold;text-align: center;">订单号</td>
            <td>{{detailOrder.warehouse_no}}</td>
            <td style="background:#f2f2f2;height: 25px;padding: 5px 10px;border: 1px solid #e6e6e6;font-weight: bold;text-align: center;">创建时间</td>
            <td>{{detailOrder.ctime}}</td>
          </tr>
        </tbody>
      </table>
      <table class="table table-bordered  table-hover">
        <tbody>
          <tr>
            <td class="td_head">商品名</td>
            <td class="td_head">数量</td>
          </tr>
          <tr v-for="(product,index) in detailOrderInfo" :key="index">
            <td>{{product.materials_name}}</td>
            <td>{{product.quantity}}/{{product.unit}}</td>
          </tr>
        </tbody>
      </table>
    </a-modal>
  </div>
</template>
<script>
import PlaceOrder from './PlaceOrder'
import { getRoomGoods, getOrderByShop, cancelRoomOrder, getOrderDetail, getRoomLog } from '@/api/room.js'
// import { convertHanziToPinYin, convertHanZiToInitial } from '@/utils/pinyinUtils.js'
export default {
  components: {
    PlaceOrder
  },
  data () {
    return {
      goods_type: {},
      goods_data: [],
      orderDetailDialogVisible: false,
      detailOrder: {},
      detailOrderInfo: []
    }
  },
  created () {
    this.getRoomGoodsForOrder()
    this.getOrderList()
    this.getRoomOrderLogList()
  },
  methods: {
    refreshData () {
      this.getRoomGoodsForOrder()
      this.getOrderList()
      this.getRoomOrderLogList()
    },
    getRoomGoodsForOrder () {
      getRoomGoods().then(response => {
        this.goods_type = response.data.goods_type
        if (response.data.data !== false) {
          this.goods_data = response.data.data
        }
        this.initPinYin()
      })
    },
    initPinYin () {
      console.log(this.goods_data)
      this.goods_data.forEach(element => {
        // element.pinyin = convertHanziToPinYin(element.materials_name)
        // element.lyx = convertHanZiToInitial(element.materials_name)
        element.pinyin = element.materials_name
        element.lyx = element.materials_name
      })
    },
    getOrderList () {
      getOrderByShop().then(response => {
        this.$store.dispatch('initOrderListByShop', response.data !== null ? response.data : [])
      })
    },
    getRoomOrderLogList () {
      getRoomLog().then(response => {
        this.$store.dispatch('initOrderLogList', response.data)
      })
    },
    showDetail (data) {
      this.detailOrder = data
      let query = {order_no: data.warehouse_no}
      getOrderDetail(query).then(response => {
        this.detailOrderInfo = response.data
      })
      this.orderDetailDialogVisible = true
    },
    cancelRoomOrder (data) {
      let query = {order_no: data.warehouse_no}
      cancelRoomOrder(query).then(response => {
      })
    }
  },
  computed: {
    getRoomInfo () {
      return this.$store.state.RoomPlaceOrder.roomInfo
    },
    getAllOrderListByShop () {
      return this.$store.state.RoomPlaceOrder.orderListByShop
    },
    getOrderListByRoomId () {
      let orderList = []
      let allOrderList = this.$store.state.RoomPlaceOrder.orderListByShop
      let roomInfo = this.$store.state.RoomPlaceOrder.roomInfo
      if (roomInfo === undefined || allOrderList === undefined) {
        return
      }
      allOrderList.forEach(order => {
        if (order.room_id === roomInfo.room_id) {
          orderList.push(order)
        }
      })
      return orderList
    },
    getRoomLogByRoomId () {
      let logList = []
      let allLogList = this.$store.state.RoomPlaceOrder.orderLogList || []
      let roomInfo = this.getRoomInfo
      if (roomInfo === undefined || allLogList === undefined || allLogList === null) {
        return 0
      }
      allLogList.forEach(log => {
        if (log.room_id === roomInfo.room_id) {
          logList.push(log)
        }
      })
      return logList
    }
  }
}
</script>

<style lang="less">
#room-order-base-tabs > .el-tabs__content {
  height: calc(100% - 40px);
  min-height: 500px;
  overflow: auto;
  overflow-x: hidden;
  padding: 15px 15px 30px 15px !important;
  box-sizing: border-box;
}
.room-order {
  height: 100%;
  .el-tabs {
    overflow: hidden;
  }

  .el-tabs {
  }
  .el-table {
    margin-bottom: 20px;
    tr,
    th {
      padding: 8px 0;
    }
  }
}
</style>

<style lang="less" scoped>
#room-order-base-tabs {
  height: 100%;
}
</style>
