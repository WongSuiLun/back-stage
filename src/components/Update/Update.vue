<template>
  <a-button type="primary" @click="autoUpdate">获取最新版本</a-button>
</template>

<script>
  const { ipcRenderer } = window.require('electron')
  export default {
    name: 'Update',
    mounted () {
      ipcRenderer.on('message', (event, {message, data}) => {
        if (message === 'error' || message === 'update-available' || message === 'update-not-available') {
          console.log(message, data)
        }
        if (message === 'update-available') {
          console.log('下载中...')
        }
        if (message === 'isUpdateNow') {
          console.log('现在下载')
          ipcRenderer.send('updateNow')
        }
      })
    },
    methods: {
      autoUpdate () {
        ipcRenderer.send('update')
      }
    }
  }
</script>

<style scoped>

</style>
