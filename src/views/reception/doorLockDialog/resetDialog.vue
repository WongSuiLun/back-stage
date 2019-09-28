<template>
  <el-dialog
    title="复位"
    v-if="dialogVisible"
    :visible.sync="dialogVisible"
    width="550px">
    已选房间：
    <br/>
    <br/>
    <room-list></room-list>
    <br/>
    <span>此操作将复位所选房间门锁, 是否继续?</span>
    <span slot="footer" class="dialog-footer">
      <a-button @click="closeDialog">取 消</a-button>
      <a-button type="primary" @click="confirmDialog">确 定</a-button>
    </span>
  </el-dialog>
</template>

<script>
  import RoomList from './components/roomList'
  import { getToken, reset } from '@/api/roomCardRemote'
  export default {
    name: 'resetDialog',
    components: {
      RoomList
    },
    computed: {
      dialogVisible: {
        get: function () {
          return this.$store.getters.getIsShowResetDialog
        },
        set: function (v) {
          this.$store.dispatch('setIsShowResetDialog', v)
        }
      }
    },
    methods: {
      closeDialog () {
        this.$store.dispatch('setIsShowResetDialog', '')
      },
      confirmDialog () {
        let rooms = this.$store.getters.getMultipleSelection
        if (rooms.length) {
          rooms.forEach(item => {
            getToken().then(res => {
              if (res.data.code === 0) {
                let params = {
                  roomnu: item.room_id_2,
                  token: res.data.token
                }
                reset(params).then(stRes => {
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
          this.closeDialog()
        }
      }
    }
  }
</script>

<style scoped>
</style>
