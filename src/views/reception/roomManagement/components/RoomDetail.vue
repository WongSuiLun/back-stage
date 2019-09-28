<template>
  <!-- <div class="room-detail" v-show="roomDetailVisibility">
    <div class="fiexd-left" @click="closeDetail" title="关闭房间信息"></div>
    <transition name="fade" >
      <div v-show="roomDetailVisibility" class="fiexd-right">
        <el-card style="height:100%">
          {{roomDetail}}
          <div>
            客人资料
            <p>姓名：xxxxxxxx</p>
            <p>身份证:xxxxxxxxxxxx</p>
          </div>
        </el-card>
      </div>
    </transition>
  </div> -->
   <a-drawer
      title="Basic Drawer"
      placement="right"
      :closable="false"
      @close="closeDetail"
      :visible="roomDetailVisibility"
    >
      <div v-show="roomDetailVisibility" class="fiexd-right">
        <el-card style="height:100%">
          {{roomDetail}}
          <div>
            客人资料
            <p>姓名：xxxxxxxx</p>
            <p>身份证:xxxxxxxxxxxx</p>
          </div>
        </el-card>
      </div>
    </a-drawer>
</template>
<script>
export default {
  methods: {
    closeDetail () {
      this.$store.dispatch('closeRoomDetail')
    }
  },
  computed: {
    roomDetailVisibility () {
      return this.roomDetail.visibility
    },
    roomDetail () {
      return this.$store.state.RoomManagement.roomDetail
    }
  }
}
</script>
<style lang="less" scoped>
.fiexd-left{
  position: fixed;
  top: 0;
  left: 0;
  right: 320px;
  height: 100%;
  background: #000;
  opacity: 0.5;
  z-index: 999;
  cursor: pointer;
}
.fiexd-right{
  position: fixed;
  top: 0;
  right: 0;
  width: 320px;
  height: 100%;
  background: #fcfcfc;
  z-index: 999;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>