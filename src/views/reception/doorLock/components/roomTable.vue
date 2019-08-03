<template>
  <div class="container">
    <a-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      size="small"
      :total="pageTotal">
    </a-pagination>
    <!-- <el-table
      ref="multipleTable"
      v-loading="loading"
      element-loading-text="房间数据加载中..."
      :data="tableData"
      size="mini"
      height="calc(100% - 32px)"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="room_num"
        label="房间号"
        fixed>
      </el-table-column>
      <el-table-column
        prop="room_id_2"
        label="房间ID">
      </el-table-column>
      <el-table-column
        prop="room_type_name"
        label="房型">
      </el-table-column>
      <el-table-column
        prop="state"
        label="状态">
        <template slot-scope="scope">
          <span>{{scope.row.state}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="420"
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleMakeCard(scope.row)">制卡</el-button>
          <el-button size="mini" type="success" @click="handleSignalTest(scope.row)">信号测试</el-button>
          <el-button size="mini" type="info" @click="handleOpenDoor(scope.row)">开门</el-button>
          <el-button size="mini" type="warning" @click="handleSetLockState(scope.row)">状态设置</el-button>
          <el-button size="mini" type="danger" @click="handleReset(scope.row)">复位</el-button>
        </template>
      </el-table-column>
    </el-table>
    <signal-test-dialog></signal-test-dialog>
    <open-door-dialog></open-door-dialog>
    <reset-dialog></reset-dialog>
    <set-lock-state-dialog></set-lock-state-dialog>
    <make-card-dialog></make-card-dialog> -->
  </div>
</template>

<script>
  import SignalTestDialog from '@/views/reception/doorLockDialog/signalTestDialog'
  import OpenDoorDialog from '@/views/reception/doorLockDialog/openDoorDialog'
  import ResetDialog from '@/views/reception/doorLockDialog/resetDialog'
  import SetLockStateDialog from '@/views/reception/doorLockDialog/setLockStateDialog'
  import MakeCardDialog from '@/views/reception/doorLockDialog/makeCardDialog'
  import { hrooms } from '@/api/room'
  export default {
    name: 'roomTable',
    components: {
      SignalTestDialog,
      OpenDoorDialog,
      ResetDialog,
      SetLockStateDialog,
      MakeCardDialog
    },
    data () {
      return {
        loading: false,
        currentPage: 1,
        pageTotal: 0,
        pageSize: 0,
        tableData: []
      }
    },
    created () {
      this.getRoomList()
      this.$store.dispatch('setMultipleSelection', '')
    },
    methods: {
      getRoomList () {
        this.loading = true
        hrooms().then(res => {
          this.loading = false
          this.tableData = Object.values(res.data.data)
          this.pageTotal = Object.values(res.data.data).length
          this.pageSize = Object.values(res.data.data).length
          this.tableData.forEach(item => {
            item.room_id_2 = item.sid + '-' + item.room_id
          })
          this.tableData.sort((a, b) => a.room_id - b.room_id)
          this.tableData = [
            {
              room_num: 'D2',
              room_id_2: '51-632',
              room_type_name: '',
              state: ''
            },
            {
              room_num: 'D3',
              room_id_2: '51-633',
              room_type_name: '',
              state: ''
            }
          ]
        }).catch(() => {
          this.loading = false
          this.tableData = []
          this.pageTotal = 0
          this.pageSize = 0
        })
      },
      handleCurrentChange () {},
      handleSelectionChange (arr) {
        this.$store.dispatch('setMultipleSelection', arr)
      },
      handleMakeCard (item) {
        this.$refs.multipleTable.clearSelection()
        this.$refs.multipleTable.toggleRowSelection(item)
        this.$store.dispatch('setIsShowMakeCardDialog', true)
      },
      handleSignalTest (item) {
        this.$refs.multipleTable.clearSelection()
        this.$refs.multipleTable.toggleRowSelection(item)
        this.$store.dispatch('setIsShowSignalTestDialog', true)
      },
      handleOpenDoor (item) {
        this.$refs.multipleTable.clearSelection()
        this.$refs.multipleTable.toggleRowSelection(item)
        this.$store.dispatch('setIsShowOpenDoorDialog', true)
      },
      handleSetLockState (item) {
        this.$refs.multipleTable.clearSelection()
        this.$refs.multipleTable.toggleRowSelection(item)
        this.$store.dispatch('setIsShowSetLockStateDialog', true)
      },
      handleReset (item) {
        this.$refs.multipleTable.clearSelection()
        this.$refs.multipleTable.toggleRowSelection(item)
        this.$store.dispatch('setIsShowResetDialog', true)
      }
    }
  }
</script>

<style scoped>
  .el-pagination {
    text-align: right;
  }
</style>
