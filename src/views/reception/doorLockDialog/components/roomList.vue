<template>
  <div class="container">
    <el-tag v-for="(item, index) in roomList" :key="index">{{item.room_num}}</el-tag>
  </div>
</template>

<script>
  export default {
    name: 'roomList',
    data () {
      return {
        roomList: this.$store.getters.getMultipleSelection
      }
    }
  }
</script>

<style scoped>
  .container {
    max-height: 150px;
    overflow: auto;
  }
  .el-tag {
    margin: 5px 10px 5px 0;
  }
</style>
