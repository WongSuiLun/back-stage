<template>
  <el-dialog
    title="开门"
    v-if="dialogVisible"
    :visible.sync="dialogVisible"
    width="550px">
    已选房间：
    <br/>
    <br/>
    <room-list></room-list>
    <br/>
    <make-card ref="makeCard"></make-card>
    <span slot="footer" class="dialog-footer">
      <a-button @click="closeDialog">取 消</a-button>
      <a-button type="primary" @click="cancelRoomCard">移除卡</a-button>
      <a-button type="primary" @click="setRoomCard">发 卡</a-button>
    </span>
  </el-dialog>
</template>

<script>
  import RoomList from './components/roomList'
  import MakeCard from './components/makecard'
  import { getToken, setRoomCard, cancelRoomCard } from '@/api/roomCardRemote'
  export default {
    name: 'makeCardDialog',
    components: {
      RoomList,
      MakeCard
    },
    computed: {
      dialogVisible: {
        get: function () {
          return this.$store.getters.getIsShowMakeCardDialog
        },
        set: function (v) {
          this.$store.dispatch('setIsShowMakeCardDialog', v)
        }
      }
    },
    methods: {
      closeDialog () {
        this.$store.dispatch('setIsShowMakeCardDialog', '')
      },

      setRoomCard () {
        let formData = this.$refs.makeCard.getFormData()
        let rooms = this.$store.getters.getMultipleSelection
        if (rooms.length && formData) {
          rooms.forEach(item => {
            formData.cardList.forEach(cardItem => {
              getToken().then(res => {
                if (res.data.code === 0) {
                  let params = {
                    roomnu: item.room_id_2,
                    token: res.data.token,
                    keyvalue: cardItem,
                    nickname: cardItem,
                    'expire-date': formData.cut_off_date
                  }
                  setRoomCard(params).then(stRes => {
                    setTimeout(() => {
                      this.$notify({
                        title: (stRes.data.code === 0 ? '成功' : '失败') + '（房间：' + item.room_num + '）',
                        message: stRes.data.errmsg,
                        type: stRes.data.code === 0 ? 'success' : 'error'
                      })
                    }, 1)
                  }).catch(err => {
                    this.$message.error(err.message)
                  })
                } else {
                  setTimeout(() => {
                    this.$notify({
                      title: (res.data.code === 0 ? '成功' : '失败') + '（房间：' + item.room_num + '）',
                      message: res.data.errmsg,
                      type: res.data.code === 0 ? 'success' : 'error'
                    })
                  }, 1)
                }
              }).catch(err => {
                this.$message.error(err.message)
              })
            })
          })
          this.closeDialog()
        }
      },
      cancelRoomCard () {
        let formData = this.$refs.makeCard.getFormData()
        let rooms = this.$store.getters.getMultipleSelection
        if (rooms.length && formData) {
          rooms.forEach(item => {
            formData.cardList.forEach(cardItem => {
              getToken().then(res => {
                if (res.data.code === 0) {
                  let params = {
                    roomnu: item.room_id_2,
                    token: res.data.token,
                    keyvalue: cardItem
                  }
                  cancelRoomCard(params).then(stRes => {
                    setTimeout(() => {
                      this.$notify({
                        title: (stRes.data.code === 0 ? '成功' : '失败') + '（房间：' + item.room_num + '）',
                        message: stRes.data.errmsg,
                        type: stRes.data.code === 0 ? 'success' : 'error'
                      })
                    }, 1)
                  }).catch(err => {
                    this.$message.error(err.message)
                  })
                } else {
                  setTimeout(() => {
                    this.$notify({
                      title: (res.data.code === 0 ? '成功' : '失败') + '（房间：' + item.room_num + '）',
                      message: res.data.errmsg,
                      type: res.data.code === 0 ? 'success' : 'error'
                    })
                  }, 1)
                }
              }).catch(err => {
                this.$message.error(err.message)
              })
            })
          })
          this.closeDialog()
        }
      }
    }
  }
</script>

<style scoped>
</style>
