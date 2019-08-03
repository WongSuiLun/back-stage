<template>
    <div>
        <div class="floor-list">
            <div class="floor-item"
                 v-for="(floorItem, floorIdx) in floorList"
                 :key="floorIdx">
                <div class="floor-name">{{floorIdx}}F</div>
                <div class="room-list">
                    <div class="room-item"
                         v-for="(roomItem, roomIdx) in floorItem"
                         :key="roomIdx"
                         :class="{ 'is-locked': (lockedList.indexOf(roomItem.room_id) !== -1), 'is-chosen': (chosenIDList.indexOf(roomItem.room_id) !== -1) }"
                         @click="handleChooseRoom(roomItem)">
                        <div class="room-num">{{roomItem.room_num}}</div>
                        <div class="room-type">{{roomItem.type_name}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="chosen-list">
            <div class="title">可选 {{orderItem.quantity}} 间，已选 {{chosenList.length}} 间</div>
            <div class="main">
                <el-tag class="chosen-item"
                        :key="idx"
                        v-for="(item, idx) in chosenList"
                        closable @close="handleCloseTagItem(item)">{{item.room_num}}</el-tag>
            </div>
        </div>
    </div>
</template>

<script>
import { getShopsRooms, roomDayStatus } from '@/api/room'
export default {
  name: 'RoomList',
  props: ['orderItem'],
  data () {
    return {
      lockedList: [],
      roomList: {},
      floorList: {},
      chosenList: []
    }
  },
  created () {
    this.initData()
    this.getRoomList()
  },
  computed: {
    chosenIDList: function () {
      return this.chosenList.map(function (item) {
        return item.room_id
      })
    }
  },
  watch: {
    orderItem: function () {
      this.initData()
      this.getRoomList()
    },
    chosenList: function () {
      this.$emit('chosen', this.chosenList)
    }
  },
  methods: {
    initData: function () {
      this.lockedList = []
      this.roomList = {}
      this.floorList = {}
      this.chosenList = []
    },
    getRoomList: function () {
      this.$emit('loadingStart')
      let query = { goodsNo: this.orderItem.goods_no }
      getShopsRooms(query).then(response => {
        this.$emit('loadingEnd')
        this.setRoomList(response.data.data)
        this.getRoomListStatus()
      }).catch(reason => {
        this.$emit('loadingEnd')
        this.$message.error(reason.message)
      })
    },
    getRoomListStatus: function () {
      this.$emit('loadingStart')
      let query = { date: (this.$moment(this.orderItem.use_time).valueOf() + '').substring(0, 10) }
      roomDayStatus(query).then(response => {
        this.$emit('loadingEnd')
        this.setLockedList(response.data.data)
      }).catch(reason => {
        this.$emit('loadingEnd')
        this.$message.error(reason.message)
      })
    },
    filterRoomListToFloorList: function (data) {
      let list = {}
      let _this = this
      data.forEach(function (item) {
        if (list[item.floor] === undefined) {
          list[item.floor] = []
        }
        if (item.type_id === _this.orderItem.type_id) {
          list[item.floor].push(item)
        }
        list[item.floor].sort(function (a, b) {
          return +a.room_id - +b.room_id
        })
      })
      this.floorList = list
    },
    setRoomList: function (data) {
      let list = {}
      data.forEach(function (item) {
        list[item.room_id] = item
      })
      this.roomList = list
      let _this = this
      this.chosenList = this.orderItem.roomNosList.map(function (item) {
        return _this.roomList[item]
      })
      this.filterRoomListToFloorList(data)
    },
    setLockedList: function (data) {
      let list = []
      let _this = this
      data.forEach(function (item) {
        if (item.is_locked === 1 && _this.orderItem.roomNosList.indexOf(item.room_id + '') === -1) {
          list.push(item.room_id)
        }
      })
      this.lockedList = list
    },
    getChosenList: function () {
      return this.chosenIDList
    },
    handleChooseRoom: function (item) {
      if (this.lockedList.indexOf(item.room_id) === -1) {
        if (this.chosenList.indexOf(item) === -1) {
          if (this.chosenList.length < +this.orderItem.quantity) {
            this.chosenList.push(item)
          } else {
            this.$message.error('达到可选最大数量')
          }
        } else {
          this.chosenList.splice(this.chosenList.indexOf(item), 1)
        }
      }
    },
    handleCloseTagItem: function (item) {
      this.chosenList.splice(this.chosenList.indexOf(item), 1)
    }
  }
}
</script>

<style scoped lang="less">
    @color-locked: #f56c6c;
    @color-free: #6ccac9;
    @color-chosen: #cab85b;
    .floor-list {
        max-height: 400px;
        overflow: auto;
        .floor-name {
            padding: 10px 0;
            font-size: 30px;
        }
        .room-list {
            &:after {
                content: '';
                display: block;
                clear: both;
            }
            .room-item {
                float: left;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 90px;
                height: 80px;
                border: 1px solid #f1f1f1;
                background: @color-free;
                cursor: pointer;
                .room-num {
                    color: #ff6c60;
                    font-size: 20px;
                }
                .room-type {
                    color: #8175c7;
                    font-size: 14px;
                }
                &.is-locked {
                    background: @color-locked;
                    cursor: initial;
                    * {
                        color: #fff;
                    }
                }
                &.is-chosen {
                    background: @color-chosen;
                }
            }
        }
    }
    .chosen-list {
        border-top: 1px solid #ddd;
        .title {
            padding: 10px 0;
        }
        .main {
            max-height: 150px;
            overflow: auto;
            .chosen-item {
                margin: 10px 10px 0 0;
            }
        }
    }
</style>
