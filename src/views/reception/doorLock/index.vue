<template>
  <div class="container">
    <div class="action-list">
      <a-button type="primary" size="small" @click="handleBatchSignalTest">批量信号测试</a-button>
      <a-button type="primary" size="small" @click="handleBatchMakeCard">批量制卡</a-button>
    </div>
    <room-table style="height: calc(100% - 40px);"></room-table>
    <make-card-dialog></make-card-dialog>
    <signal-test-dialog></signal-test-dialog>
  </div>
</template>

<script>
  import SignalTestDialog from '@/views/reception/doorLockDialog/signalTestDialog'
  import MakeCardDialog from '@/views/reception/doorLockDialog/makeCardDialog'
  import RoomTable from './components/roomTable'
  export default {
    name: 'index',
    components: {
      RoomTable,
      MakeCardDialog,
      SignalTestDialog
    },
    methods: {
      handleBatchSignalTest () {
        let rooms = this.$store.getters.getMultipleSelection
        if (rooms.length) {
          this.$store.dispatch('setIsShowSignalTestDialog', true)
        } else {
          this.$notify({
            title: '失败',
            message: '请至少选择一项',
            type: 'error'
          })
        }
      },
      handleBatchMakeCard () {
        let rooms = this.$store.getters.getMultipleSelection
        if (rooms.length) {
          this.$store.dispatch('setIsShowMakeCardDialog', true)
        } else {
          this.$notify({
            title: '失败',
            message: '请至少选择一项',
            type: 'error'
          })
        }
      }
    }
  }
</script>

<style scoped>
  .container {
    width: 100%;
    height: 100%;
  }
</style>
