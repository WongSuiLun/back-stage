<template>
  <div class="anchor-room">
    <span class="label">定位房间：</span>
    <div class="anchor-input">
      <a-input v-model="room_num" size="small" @change="cleanAnchorRoom" @keydown.native="keySearchAnchorRoom($event)" ></a-input>
    </div>
    <a-button type="primary" size="small" plain @click="searchAnchorRoom" ref="achor">确定</a-button>
  </div>
</template>
<script>
export default {
  name: 'anchor-room',
  data () {
    return {
      room_num: ''
    }
  },
  methods: {
    keySearchAnchorRoom (e) {
      if (e.keyCode === 13) {
        this.searchAnchorRoom()
      }
    },
    searchAnchorRoom () {
      let aElement = document.createElement('a')
      aElement.href = `#room${this.room_num}`
      aElement.click()
      this.$store.dispatch('updateAnchorRoom', this.room_num)
    },
    cleanAnchorRoom () {
      this.$store.dispatch('updateAnchorRoom', this.room_num.trim())
    }
  }
}
</script>
<style lang="less" scoped>
.anchor-room{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .anchor-input{
    width: 200px;
    margin-right: 20px;
  }
  .label{
    font-size: 16px;
    font-weight: 600;
    padding-right:5px; 
  }
}
</style>

