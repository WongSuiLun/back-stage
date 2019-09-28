<template>
  <el-dialog
    title="状态设置"
    v-if="dialogVisible"
    :visible.sync="dialogVisible"
    width="550px">
    已选房间：
    <br/>
    <br/>
    <room-list></room-list>
    <br/>
    <br/>
    <set-lock-state ref="setLockState"></set-lock-state>
    <span slot="footer" class="dialog-footer">
      <a-button @click="closeDialog">取 消</a-button>
      <a-button type="primary" @click="confirmDialog">确 定</a-button>
    </span>
  </el-dialog>
</template>

<script>
  import RoomList from './components/roomList'
  import SetLockState from './components/setLockState'
  import { getToken, setLockState } from '@/api/roomCardRemote'
  export default {
    name: 'setLockStateDialog',
    components: {
      RoomList,
      SetLockState
    },
    computed: {
      dialogVisible: {
        get: function () {
          return this.$store.getters.getIsShowSetLockStateDialog
        },
        set: function (v) {
          this.$store.dispatch('setIsShowSetLockStateDialog', v)
        }
      }
    },
    methods: {
      closeDialog () {
        this.$store.dispatch('setIsShowSetLockStateDialog', '')
      },
      confirmDialog () {
        let formData = this.$refs.setLockState.getFormData()
        let rooms = this.$store.getters.getMultipleSelection
        if (rooms.length && formData) {
          rooms.forEach(item => {
            getToken().then(res => {
              if (res.data.code === 0) {
                let params = {
                  roomnu: item.room_id_2,
                  token: res.data.token,
                  actiontype: formData.lockState
                }
                setLockState(params).then(stRes => {
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
