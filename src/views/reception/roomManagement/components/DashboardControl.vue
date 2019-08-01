<template>
  <div class="dashboard-control">
    <div class="control-filter">
      <floor-filter></floor-filter>
      <room-filter></room-filter>
    </div>
    <div class="dashboard-control-right">
      <anchor-room></anchor-room>
      <clean-room-cache></clean-room-cache>
    </div>
  </div>
</template>
<script>
import RoomFilter from './RoomFilter'
import FloorFilter from './FloorFilter'
import AnchorRoom from './AnchorRoom'
import CleanRoomCache from './CleanRoomCache'
export default {
  components: {
    RoomFilter,
    FloorFilter,
    AnchorRoom,
    CleanRoomCache
  },
  data () {
    return {
      show: false,
      roomNum: ''
    }
  }
}
</script>
<style lang="less" scoped>
.dashboard-control {
  background: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
  .control-filter {
    /*min-width: 800px;*/
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
