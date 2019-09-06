<template>
  <div class="">
    <a-spin :spinning="spinning">
      <div class="room-management">
        <div class="room-management-body">
          <div class="room-management-main">
            <room-dashboard></room-dashboard>
          </div>
          <div class="room-management-footer">
            <room-management-footer></room-management-footer>
          </div>
        </div>
        <div>
          <room-order-dialog></room-order-dialog>
        </div>
      </div>
    </a-spin>
  </div>
</template>
<script>
import BaseRoom from "./components/BaseRoom.vue";
import RoomManagementHeader from "./components/RoomManagementHeader";
import RoomDashboard from "./components/RoomDashboard";
import RoomManagementFooter from "./components/RoomManagementFooter";
import RoomOrderDialog from "./components/RoomOrderDialog";
import RoomOrder from "./components/RoomOrder";
import { hrooms } from "@/api/room";
export default {
  name: "room-management",
  components: {
    BaseRoom,
    RoomManagementHeader,
    RoomDashboard,
    RoomManagementFooter,
    RoomOrderDialog,
    RoomOrder
  },
  created: function() {
    this.getAllRoom();
  },
  data() {
    return {
      loading: true,
      spinning: false
    };
  },
  methods: {
    getAllRoom: function() {
      this.spinning = true;
      hrooms().then(response => {
        this.$store.dispatch("resetRoomManagement");
        this.$store.dispatch("initRoomList", response.data.data);
        this.closeLoading();
        this.spinning = false;
      });
    },
    closeLoading() {
      this.loading = false;
    },
    handleClose() {
      this.$store.dispatch("updateisShowRoomOrderDialog", false);
      this.$store.dispatch("updateIsShowZoomIn", false);
    },
    handleZoomOut() {
      this.$store.dispatch("updateisShowRoomOrderDialog", true);
      this.$store.dispatch("updateIsShowZoomIn", false);
    }
  },
  computed: {
    getIsShowRoomOrderDialog() {
      return this.$store.state.RoomManagement.isShowRoomOrderDialog;
    },
    getIsShowRoomOrderZoomIn() {
      return this.$store.state.RoomManagement.isShowRoomOrderZoomIn;
    }
  }
};
</script>
<style lang="less" scoped>
.room-management {
  height: 100%;
  position: relative;
  .room-management-body {
    display: flex;
    height: 100%;
    flex-direction: column;
  }
  .room-management-main {
    flex: 1;
    overflow: hidden;
  }
  .room-management-footer {
    height: fit-content;
    padding-top: 5px;
  }
  .room-order-zoomin {
    position: absolute;
    top: 0px;
    bottom: 0px;
    z-index: 999;
    width: 100%;
    background: #e4e4e4;
    .zoomin-main {
      position: relative;
      background: #fff;
      height: 100%;
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
    }
  }
}
</style>
