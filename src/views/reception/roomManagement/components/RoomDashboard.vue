<template>
  <div class="room-dashboard">
    <dashboard-control class="dashboard-control"></dashboard-control>
    <room-detail></room-detail>
    <div class="floor-list">
      <base-floor
        :floorNumber="index"
        :floorRooms="floorRooms"
        v-for="(floorRooms,index) in getAllFloorRoom"
        :key="index">
      </base-floor>
    </div>
  </div>
</template>
<script>
import BaseFloor from './BaseFloor'
import DashboardControl from './DashboardControl'
import RoomDetail from './RoomDetail'
export default {
  name: 'room-dashboard',
  components: {
    BaseFloor,
    DashboardControl,
    RoomDetail
  },
  data () {
    return {}
  },
  created: function () {},
  computed: {
    getAllFloorRoom () {
      return this.$store.getters.getAllRoomsByFilter
    }
  }
}
</script>
<style lang="less" scoped>
.room-dashboard {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;
  height: 100%;
  width: 100%;
}
  .dashboard-control {
    height: fit-content;
  }
  .floor-list {
    flex: 1;
    overflow: auto;
  }
</style>
