<template>
    <div class="order-list">
        <a-pagination
                class="page"
                small
                :pager-count="5"
                layout="total, prev, pager, next"
                :page-size="pageSize"
                :total="pageTotal"
                @current-change="handlePageChange"
                :current-page="currentPage">
        </a-pagination>
        <el-table :data="orderList" v-loading="loadingOrderList" size="mini" height="calc(100% - 26px)" style="width: 100%;">
            <el-table-column
                    width="100"
                    fixed
                    prop="no"
                    label="订单号"></el-table-column>
            <el-table-column
                    width="60"
                    label="状态"
                    fixed>
                <template slot-scope="scope">
                    <span :class="{
                    'green' : isOrderItemChosen(scope.row) === '已排房',
                    'blue' : isOrderItemChosen(scope.row) === '已排房（未排完）' ,
                    'red' : isOrderItemChosen(scope.row) === '未排房'
                    }">{{isOrderItemChosen(scope.row)}}&nbsp;</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="customer"
                    label="订购人"></el-table-column>
            <el-table-column
                    label="房间号">
                <template slot-scope="scope">
                    <span v-html="getOrderRooms(scope.row)" style="word-break: break-word;"></span>
                </template>
            </el-table-column>
            <el-table-column
                    width="70"
                    fixed="right"
                    label="操作"
                    style="padding-right: 10px;box-sizing: border-box;">
                <template slot-scope="scope">
                    <a-button size="mini" @click="handleOrderDetail(scope.row.no)">查看</a-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- <order-detail-dialog
                ref="orderDetailDialog"
                :order-no="viewsDetailOrderNo">
        </order-detail-dialog> -->
    </div>
</template>

<script>
import { getOrders } from '@/api/order'
import { roomtypes } from '@/api/room'
// import OrderDetail from '../../orderPage/components/OrderDetail'
import OrderDetailDialog from '@/views/reception/orderDetailDialog/OrderDetailDialog'

export default {
  name: 'OrderList',
  props: ['currentDateNum'],
  components: {OrderDetailDialog},
  data () {
    return {
      loadingOrderList: false,
      orderList: [],
      pageTotal: 1,
      pageSize: 1,
      currentPage: 1,
      viewsDetailOrderNo: ''
    }
  },
  created () {
    this.getOrderList()
  },
  computed: {
    isReload: function () {
      return this.$store.getters.getIsChosen
    }
  },
  watch: {
    isReload () {
      this.getOrderList()
    },
    currentDateNum: function () {
      this.getOrderList()
    }
  },
  methods: {
    handlePageChange (val) {
      this.currentPage = val
      this.getOrderList(false)
    },
    setOrderList: function (data) {
      let list = data
      list.data.forEach(function (item) {
        item.detail.forEach(function (detailItem) {
          detailItem.type_id = list.meta.goods[detailItem.goods_no].type_id
        })
      })
      this.orderList = list.data
    },
    getOrderList: function (isInitial) {
      if (isInitial === undefined) {
        this.currentPage = 1
        this.pageTotal = 1
        this.pageSize = 1
        this.orderList = []
      }
      if (this.$store.getters.getRoomTypeList.length) {
        this.queryOrderList()
      } else {
        let typeIdList
        roomtypes(this.$store.getters.getShopId).then(responseRoomType => {
          typeIdList = responseRoomType.data.data.map(function (item) {
            return item.type_id
          })
          this.$store.dispatch('updateRoomTypeList', typeIdList)
          this.queryOrderList()
        })
      }
    },
    queryOrderList: function () {
      let query = {
        use_time: this.currentDateNum,
        page: this.currentPage,
        state: [1, 2, 3],
        goods_type: this.$store.getters.getRoomTypeList
      }
      this.loadingOrderList = true
      getOrders(query).then(response => {
        this.loadingOrderList = false
        this.setOrderList(response.data)
        this.pageTotal = +response.data.meta.pagination.total
        this.pageSize = +response.data.meta.pagination.per_page
        this.currentPage = +response.data.meta.pagination.currentPage
      }).catch(reason => {
        this.loadingOrderList = false
        this.setOrderList([])
        this.pageTotal = 0
        this.pageSize = 0
        this.currentPage = 1
      })
    },
    isOrderItemChosen: function (row) {
      let _this = this
      // -1 未排房 0 已排房（未排完） 1 已排房
      let currentDate = +this.currentDateNum
      let list = row.detail.filter(function (item) {
        return +(_this.$moment(item.use_time).valueOf() + '').substring(0, 10) === currentDate && +item.is_del === 0 && +item.type_id !== -1 && +item.store_no === +_this.$store.getters.getShopId
      })
      let arrayChosen = list.map(function (item) {
        let code = -1

        if (item.room_nos) {
          if (item.room_nos[(_this.$moment(item.use_time).valueOf() + '').substring(0, 10)].length === +item.quantity) {
            code = 1
          } else {
            code = 0
          }
        } else {
          code = -1
        }
        return code
      })
      if (arrayChosen.indexOf(0) !== -1) {
        return '已排房（未排完）'
      } else if (arrayChosen.indexOf(1) !== -1 && arrayChosen.indexOf(-1) !== -1) {
        return '已排房（未排完）'
      } else if (arrayChosen.indexOf(1) !== -1) {
        return '已排房'
      } else if (arrayChosen.indexOf(-1) !== -1) {
        return '未排房'
      }
    },
    handleOrderDetail: function (OrderNo) {
      this.$refs.orderDetailDialog.showDialog()
      this.viewsDetailOrderNo = OrderNo
    },
    getOrderRooms: function (order) {
      let rooms = []
      for (let i = 0; i < order.detail.length; i++) {
        if (order.detail[i].room_nos) {
          let roomNos = order.detail[i].room_nos[this.currentDateNum]
          if (roomNos) {
            let orderItemDateRooms = roomNos.map(function (item) {
              return item.room_id
            })
            rooms = rooms.concat(orderItemDateRooms)
          }
        }
      }
      let tempRooms = []
      for (let i = 0; i < rooms.length; i++) {
        if (tempRooms.indexOf(rooms[i]) === -1) {
          tempRooms.push(rooms[i])
        }
      }
      return tempRooms.join(', ')
    }
  }
}
</script>

<style scoped lang="less">
    .green { color: #55a532; }
    .blue { color: #0086b3}
    .red { color: #d43f3a; }
    .page { float: right;}
</style>
