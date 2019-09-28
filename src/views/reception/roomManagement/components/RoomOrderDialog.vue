<template>
  <a-modal
    :visible="getIsShowRoomOrderDialog"
    width="50%"
    custom-class="room-order-dialog"
    :before-close="handleClose"
  >
    <!-- <div class="self-dialog-title">
      <div class="option" @click="handleZoomIn" title="放大">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-icon--"></use>
        </svg>
      </div>
      <div class="option" @click="handleClose" title="关闭">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-guanbi"></use>
        </svg>
      </div>
    </div> -->
    <div>
      <room-order></room-order>
    </div>
    <span slot="footer" class="dialog-footer">
      <a-button @click="dialogVisible = false">取 消</a-button>
      <a-button type="primary" @click="dialogVisible = false">确 定</a-button>
    </span>
  </a-modal>
</template>
<script>
import RoomOrder from './RoomOrder'
export default {
  components: {
    RoomOrder
  },
  data () {
    return {
      dialogVisible: true
    }
  },
  methods: {
    handleClose () {
      this.$store.dispatch('updateisShowRoomOrderDialog', false)
      this.$store.dispatch('updateIsShowZoomIn', false)
    },
    handleZoomIn () {
      this.$store.dispatch('updateisShowRoomOrderDialog', false)
      this.$store.dispatch('updateIsShowZoomIn', true)
    }
  },
  computed: {
    getIsShowRoomOrderDialog () {
      return this.$store.state.RoomManagement.isShowRoomOrderDialog
    }
  }
}
</script>
<style lang="less">
.room-order-dialog {
  .el-dialog__header {
    padding: 0px !important;
  }
  .el-dialog__body {
    padding: 0px !important;
    max-height: 700px;
  }
}
</style>
<style lang="less" scoped>
.room-order-dialog {
  min-width: 700px;
  max-height: 700px;
  position: relative;
}
.self-dialog-title {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 999;
  width: 60px;
  line-height: 35px;
  display: flex;
  justify-content: flex-end;
  .option {
    cursor: pointer;
    padding: 0 8px;
    &:hover {
      color: rgb(48, 132, 228);
    }
  }
}
</style>
