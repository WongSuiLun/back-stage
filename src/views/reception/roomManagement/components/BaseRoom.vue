<template>
  <div
    class="base-room"
    :style="roomBackgorundStyle"
    :id="`room${getRoomInfo.room_num}`"
    :class="roomTypeClass"
    @click="handleClick"
    @mouseleave="hiddenContextMenu"
    @contextmenu="showContextMenu"
  >
    <div
      class="room-attribute"
      :class="{emphasize:isAnchorRoomNum}"
    >
      <div class="attribute-style">
        <span class="room-number">{{getRoomInfo.room_num}}</span>
        <span class="room-type">{{getRoomInfo.room_type_name}}</span>
      </div>
      <div class="status-icon">
        <svg
          class="icon"
          aria-hidden="true"
        >
          <use :xlink:href="iconType"></use>
        </svg>
      </div>
      <div class="attribute-style">
        <span
          class="room-number"
          style="color:#000;font-size:20px"
        >
          <span v-show="isRoomPreOrder">
            <svg
              class="icon"
              aria-hidden="true"
            >
              <use xlink:href="#icon-EXPARR"></use>
            </svg>
          </span>
          &nbsp;
        </span>
        <span
          class="room-type"
          style="color:red;font-size:20px"
        >
          <svg
            class="icon"
            aria-hidden="true"
          >
            <use xlink:href="#icon-EXPLEA"></use>
          </svg>
        </span>
      </div>
    </div>
    <div
      class="room-context-menu"
      :style="{top:contextOffsetY+'px',left:contextOffsetX+'px'}"
    >
      <ul>
        <li @click="cleanRoom">住房清洁</li>
        <li @click="placeOrder">客房服务</li>
        <li @click="checkIn">入住</li>
        <li @click="checkOut">退房</li>
      </ul>
    </div>
    <el-dialog
      title="入住"
      :visible.sync="checkInDialogVisible"
      width="40%"
      custom-class="checkInDialog"
      @click.native.stop="stopProp"
    >
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label"><i class="el-icon-date"></i> 直接入住</span>
          <straight-checkin ></straight-checkin>
        </el-tab-pane>
        <el-tab-pane label="团队入住">
          <team-checkin></team-checkin>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>
<script>
import RoomManagementHelper from '@/utils/RoomManagementHelper.js'
import StraightCheckin from './StraightCheckin'
import TeamCheckin from './TeamCheckin'
import { checkIn } from '@/api/room'
export default {
  name: 'base-room',
  components: {
    StraightCheckin,
    TeamCheckin
  },
  data () {
    return {
      isShowContextMenu: false,
      contextOffsetX: 0,
      contextOffsetY: 0,
      roomManagementHelper: RoomManagementHelper,
      checkInDialogVisible: false
    }
  },
  props: {
    roomInfo: Object
  },
  created: function () {
  },
  computed: {
    roomStatusLabel () {
      return this.roomManagementHelper.getLabelByStatus(this.getState)
    },
    roomBackgorundStyle () {
      if (this.$store.state.RoomManagement.otherTypeFilter.isNeedFilter) {
        return {
          background: this.$store.state.RoomManagement.otherTypeFilter.emphasizeColor
        }
      }
      return {}
    },
    roomTypeClass () {
      let classObj = {}
      let cleanOrDirty = this.roomManagementHelper.getCleanOrDirtyBySattus(this.getState)
      classObj[`status-${cleanOrDirty}`] = true
      classObj['activeContext'] = this.isShowContextMenu
      classObj['emphasize'] = this.isAnchorRoomNum
      return classObj
    },
    iconType () {
      return this.roomManagementHelper.getIconNameByStatus(this.getState)
    },
    getRoomInfo () {
      return this.roomInfo === undefined ? { state: '' } : this.roomInfo
    },
    getState () {
      return this.roomInfo === undefined ? '' : this.getRoomInfo.state
    },
    getAnchorRoomNum () {
      return this.$store.state.RoomManagement.anchorRoomNum
    },
    isAnchorRoomNum () {
      return this.getRoomInfo.room_num === this.getAnchorRoomNum
    },
    isRoomPreOrder () {
      if (!this.getRoomInfo.hasOwnProperty('pre_order_no')) { return false }
      return this.getRoomInfo.pre_order_no !== null && this.getRoomInfo.pre_order_no !== undefined && this.pre_order_no !== ''
    }
  },
  methods: {
    handleClick: function () {
      this.showDetail()
    },
    showContextMenu: function (e) {
      this.isShowContextMenu = true
      this.contextOffsetX = e.clientX
      this.contextOffsetY = e.clientY
      e.preventDefault()
    },
    hiddenContextMenu: function () {
      this.isShowContextMenu = false
    },
    showDetail: function () {
      this.$store.dispatch('updateRoomDetail', { visibility: true, roomId: this.getRoomInfo.room_id })
    },
    stopProp: function (e) {
      e.stopPropagation()
    },
    cleanRoom: function (e) {
      e.stopPropagation()
      this.roomStatus = 'OD'
      this.isShowContextMenu = false
    },
    cleanComplete: function (e) {
      e.stopPropagation()
      this.roomStatus = 'VC'
      this.isShowContextMenu = false
    },
    checkOut: function (e) {
      e.stopPropagation()
      this.roomStatus = 'VD'
      this.isShowContextMenu = false
    },
    checkIn: function (e) {
      e.stopPropagation()
      this.checkInDialogVisible = true
      this.hiddenContextMenu()
      let roomId = []
      roomId.push(this.getRoomInfo.room_num)
      checkIn({ 'room_num': roomId }).then(response => {
        const h = this.$createElement
        let type = response.data.status === 'false' ? 'error' : 'success'
        let title = response.data.status === 'false' ? '操作失败' : '操作成功'
        this.$notify({
          type,
          title,
          /* eslint-disable  */
          message: h('i', { style: 'color: teal' }, response.data.message)
        })
      })
    },
    placeOrder: function (e) {
      e.stopPropagation()
      this.$store.dispatch('updateRoomId', this.roomInfo)
      this.$store.dispatch('updateisShowRoomOrderDialog', true)
      this.$store.dispatch('updateIsShowZoomIn', false)
    }
  }
}
</script>
<style lang="less">
.checkInDialog{
  .el-dialog__body{
    padding:5px;
  }
}
</style>

<style lang="less" scoped>
.base-room {
  width: 100%;
  height: 100%;
  min-height: 80px;
  max-width: 100%;
  cursor: pointer;
  display: flex;
  border: 2px solid #ebeef5;
  border-radius: 10px;
  margin-bottom: 5px;
  background-color: #fff;
  color: #303133;
  justify-items: center;
  position: relative;
  &:hover {
    -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  &.status-dirty {
    background-color: #c4b16f;
  }
  &.status-clean {
    background-color: #6ccac9;
  }
  .status-icon {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 0;
    font-size: 3em;
    color: #fff;
  }
  &.activeContext .room-context-menu {
    display: block;
  }
  .room-context-menu {
    position: fixed;
    background: #fff;
    background-color: #fff;
    border: 1px solid #eee;
    -moz-box-shadow: 10px 10px 5px #888888; /* 老的 Firefox */
    box-shadow: 5px 5px 2px #888888;
    display: none;
    z-index: 999;
    text-align: left;
    ul {
      padding: 2px;
      list-style: none;
      margin: 0;
      li {
        min-width: 100px;
        padding: 5px 15px;
        color: #303133;
      }
      li:hover {
        background-color: #ebebeb;
      }
    }
  }
  &.emphasize {
    border: 2px solid red;
    box-sizing: border-box;
  }
  .room-attribute {
    display: flex;
    flex-direction: column;
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
    .attribute-style {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      height: fit-content;
      .room-number {
        color: rgb(255, 108, 96);
        font-weight: 700;
        font-size: 20px;
      }
      .room-type {
        color: rgb(129, 117, 199);
        font-size: 18px;
        font-weight: 700;
      }
    }
  }
}

</style>

