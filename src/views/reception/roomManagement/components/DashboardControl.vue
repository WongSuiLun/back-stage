<template>
  <div class="dashboard-control">
    <a-row type="flex">
      <a-col :span="12">
        <floor-filter></floor-filter>
        <room-filter></room-filter>
      </a-col>
      <a-col :span="12">
        <div class="dashboard-control-right">
          <anchor-room></anchor-room>
          <clean-room-cache></clean-room-cache>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import RoomFilter from "./RoomFilter";
import FloorFilter from "./FloorFilter";
import AnchorRoom from "./AnchorRoom";
import CleanRoomCache from "./CleanRoomCache";
export default {
  components: {
    RoomFilter,
    FloorFilter,
    AnchorRoom,
    CleanRoomCache
  },
  data() {
    return {
      show: false,
      roomNum: ""
    };
  }
};
</script>
<style lang="less" scoped>
.dashboard-control {
  background: #fff;
  padding:15px 5px;
  .control-filter {
    min-width: 800px;
  }
  .dashboard-control-right {
    display: flex;
    justify-content: flex-end;
  }
}

@media screen and (max-width: 1400px) {
  .dashboard-control {
    flex-direction: column;
    justify-content: initial;
    align-items: initial;
  }
}
</style>
