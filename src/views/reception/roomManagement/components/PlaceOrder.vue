<template>
  <div>
    <under-line lineColor="red">
      <span slot="left">商品</span>
      <span slot="right">
        <a-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          size="mini"
          v-model="searchKey"
          @keydown.native="searchGood"
        ></a-input>
      </span>
    </under-line>
    <div id="room-order-choose-tabs">
      <el-tabs v-model="activeTabName">
        <el-tab-pane
          v-for="(type,index) in goodsType"
          :key="index"
          :label="type"
          :name="type"
        >
          <div style="display:flex;flex-wrap:wrap">
            <base-product
              v-for="(product,index) in getProductByGoodType(type)"
              :key="index"
              :productInfo="product"
            ></base-product>
          </div>
        </el-tab-pane>
        <el-tab-pane
          label="检索商品"
          name="searchGoods"
        >
          <div style="display:flex;flex-wrap:wrap">
            <base-product
              v-for="(product,index) in getProductBySearchKey"
              :key="index"
              :productInfo="product"
            ></base-product>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <under-line lineColor="red">
      <span slot="left">订单</span>
      <span slot="right">总结：0.00</span>
    </under-line>
    <div class="mg-top-20 mg-bottom-10">
      <room-order-list></room-order-list>
    </div>
    <under-line lineColor="red">
      <span slot="left">选项</span>
    </under-line>
    <div class="mg-top-20 mg-bottom-10 delivery">
      <el-switch
        v-model="isDeliveryWhenAbsent"
        active-text="客人不在时是否允许配送到房间"
      ></el-switch>
    </div>
    <under-line lineColor="red">
      <span slot="left">备注</span>
    </under-line>
    <div
      class="mg-top-20 mg-bottom-10"
      style="min-height:100px;"
    >
      <a-input
        type="textarea"
        :rows="4"
        placeholder="请输入内容"
        v-model="remark"
      ></a-input>
    </div>
    <div class="place-order-footer">
      <a-button type="danger"  @click="addRoomOrder">下单</a-button>
    </div>
  </div>
</template>
<script>
import UnderLine from '@/components/UnderLine/UnderLine'
import BaseProduct from './BaseProduct'
import RoomOrderList from './RoomOrderList'
import StringUtils from '@/utils/StringUtils'
import { addRoomOrder } from '@/api/room'
export default {
  components: {
    UnderLine,
    BaseProduct,
    RoomOrderList
  },
  props: {
    goodsType: Object,
    goodsData: Array
  },
  data () {
    return {
      isDeliveryWhenAbsent: false,
      activeTabName: '酒店材料',
      remark: '',
      searchKey: ''
    }
  },
  methods: {
    getProductByGoodType (type) {
      let products = []
      this.goodsData.forEach(element => {
        if (element.goodstype_name === type) {
          products.push(
            element
          )
        }
      })
      return products
    },
    searchGood (e) {
      if (e.keyCode === 13) {
        this.activeTabName = 'searchGoods'
      }
    },
    isTargetForSearchKey (searchKey, goodData) {
      if (StringUtils.isAlpha(searchKey)) {
        let key = searchKey.toLocaleLowerCase()
        if (goodData.pinyin.indexOf(key) !== -1 || goodData.lyx.indexOf(key) !== -1) {
          return true
        }
        return false
      } else {
        return goodData.materials_name.indexOf(searchKey) !== -1
      }
    },
    addRoomOrder () {
      let queryData = {}
      let baseQueryLabel = 'order_detail'
      let orderLabel = '[order]'
      let roomId = this.$store.state.RoomPlaceOrder.roomInfo.room_id
      let orderProductList = this.$store.state.RoomPlaceOrder.orderProductList[roomId]
      for (let key in orderProductList) {
        queryData[`${baseQueryLabel}${orderLabel}[${orderProductList[key].goodsnum_id}][goodsnum_id]`] = orderProductList[key].goodsnum_id
        queryData[`${baseQueryLabel}${orderLabel}[${orderProductList[key].goodsnum_id}][quantity]`] = orderProductList[key].count
        queryData[`${baseQueryLabel}${orderLabel}[${orderProductList[key].goodsnum_id}][warehouse_id]`] = orderProductList[key].warehouse_id
        queryData[`${baseQueryLabel}${orderLabel}[${orderProductList[key].goodsnum_id}][materials_name]`] = orderProductList[key].materials_name
        queryData[`${baseQueryLabel}${orderLabel}[${orderProductList[key].goodsnum_id}][warehouse_id]`] = orderProductList[key].warehouse_id
        queryData[`${baseQueryLabel}${orderLabel}[${orderProductList[key].goodsnum_id}][unit]`] = orderProductList[key].unit
      }
      queryData[`${baseQueryLabel}[is_allow]`] = this.isDeliveryWhenAbsent
      queryData[`${baseQueryLabel}[shop_id]`] = this.$store.getters.getShopId
      queryData[`${baseQueryLabel}[remark]`] = this.remark
      queryData[`${baseQueryLabel}[room_id]`] = this.$store.state.RoomPlaceOrder.roomInfo.room_id
      addRoomOrder(queryData).then(response => {
        if (!response.data.status) {
          this.$message({
            showClose: true,
            message: response.data.data,
            type: 'warning'
          })
        } else {
          this.$message({
            showClose: true,
            message: response.data.data,
            type: 'success'
          })
          this.$store.dispatch('cleanOrderList')
          this.$emit('refreshData')
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  computed: {
    getProductBySearchKey () {
      let searchProducts = []
      this.goodsData.forEach(element => {
        if (this.isTargetForSearchKey(this.searchKey, element)) {
          searchProducts.push(
            element
          )
        }
      })
      return searchProducts
    }
  }
}
</script>

<style lang="less">
#room-order-choose-tabs {
  .el-tabs__nav-scroll {
    background: #eee;
  }
  .el-tabs__item.is-active {
    color: #666;
    border-bottom: 2px solid #c81623;
  }
  .el-tabs__item:hover {
    color: #c81623;
  }
  .el-tabs__active-bar {
    background-color: #c81623 !important;
  }
}
</style>
<style lang="less" scoped>
.mg-top-20 {
  margin-top: 20px;
}
.mg-bottom-10 {
  margin-bottom: 10px;
}
.delivery {
  display: flex;
  justify-content: flex-start;
}
.place-order-footer{
  display:flex;
  justify-content: flex-end;
  margin-bottom:20px;
}
</style>
