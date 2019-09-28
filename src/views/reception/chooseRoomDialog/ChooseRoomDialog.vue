<template>
    <div v-if="isShowDialog">
    <el-dialog
            title="选房"
            :visible.sync="isShowDialog"
            append-to-body
            width="50%">
        <room-list
                ref="roomList"
                v-loading="loadingDialog"
                :orderItem="orderItem"
                @chosen="isDisable=($event.length === 0)"
                @loadingStart="loadingDialog=true"
                @loadingEnd="loadingDialog=false"></room-list>
        <div slot="footer" class="dialog-footer">
            <a-button @click="isShowDialog=false">取消</a-button>
            <a-button
                    type="primary"
                    @click="handleConfirm"
                    :loading="loadingDialog" :disabled="isDisable">确定</a-button>
        </div>
    </el-dialog>
    </div>
</template>

<script>
  import RoomList from './components/RoomList'
  import { arrangeRooms } from '@/api/room'
  export default {
    name: 'ChooseRoomDialog',
    components: {RoomList},
    data () {
      return {
        loadingDialog: false,
        orderItem: '',
        isShowDialog: false,
        isDisable: true
      }
    },
    methods: {
      showDialog () {
        this.isShowDialog = true
      },
      handleConfirm: function () {
        let detailId = this.orderItem.id
        let roomId = this.$refs.roomList.getChosenList()
        let inTime = +(this.$moment(this.orderItem.use_time).valueOf() + '').substring(0, 10)
        let outTime = +inTime + 24 * 3600
        let orderNo = this.orderItem.order_no
        let query = {
          detail_id: detailId,
          room_id: roomId,
          in: inTime,
          out: outTime,
          order_no: orderNo
        }
        arrangeRooms(query).then(response => {
          // this.$emit('chosen')
          this.$store.dispatch('updateIsChosen', new Date().getTime())
          this.$notify({
            title: (response.data.status === 'success' ? '成功' : '错误'),
            message: response.data.message,
            type: response.data.status === 'success' ? 'success' : 'error'
          })
          this.isShowDialog = false
        }).catch(reason => {
          this.$message.error(reason.message)
        })
      },
      setOrderItem: function (orderItem) {
        this.orderItem = orderItem
      }
    }
  }
</script>

<style scoped>

</style>
