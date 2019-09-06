<template>
  <div class="base-floor">
    <div class="label">
      <span>{{floorNumber}}F:</span>
    </div>
    <div>
      <a-row :gutter="8">
        <a-col :xl="2" :lg="3" :md="4" :sm="8"  :xs="12" v-for="(room) in floorRooms" :key="room.room_id">
          <base-room :roomInfo="room"></base-room>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
import BaseRoom from './BaseRoom'
export default {
  name: 'base-floor',
  components: {
    BaseRoom
  },
  props: {
    floorNumber: String,
    floorRooms: Array
  },
  computed: {}
}
</script>
<style lang="less" scoped>
.base-floor {
  .label {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 10px;
    font-size: 2em;
    text-align: left;
    color: #000;
  }
}
  .el-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: stretch;
    margin: 0!important;
    .el-col {
      margin: 0 0 10px 0;
    }
  }
</style>
