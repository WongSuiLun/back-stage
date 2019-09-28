<template>
  <a-button class="clean-cache-btn" size="small" @click="cleanRoomListCache" type="info" plain>清除缓存</a-button>
</template>
<script>
import { cleanRoomsCache } from '@/api/room'
export default {
  methods: {
    cleanRoomListCache () {
      cleanRoomsCache().then(response => {
        this.notifySuccess()
        this.$router.go(0)
      })
    },
    notifySuccess () {
      this.$notify({
        type: 'success',
        title: '成功',
        message: '清楚缓存成功'
      })
    }
  }
}
</script>
<style lang="less" scoped>
.clean-cache-btn {
  margin: 0 15px;
  width: 120px;
}
</style>
