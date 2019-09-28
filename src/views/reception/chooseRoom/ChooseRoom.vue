<template>
  <div class="choose-room">
    <div class="room-container" v-loading="loading">
      <div class="time-bar">
        <a-date-picker
          v-model="startDate"
          type="date"
          placeholder="选择日期"
          style="width: 150px"
          size="small"
          @change="datePickerChange"
          value-format="timestamp"
          clearable
        ></a-date-picker>
        <div class="date-scroll" ref="dateScroll">
          <span
            class="date-item"
            v-for="(dateItem, index) in dateList"
            :key="index"
            :class="{ active: (index === currentDateItem) }"
            @click="dateItemClick($event, index, dateItem.timestamp)"
          >{{dateItem.date}} ({{dateItem.week}})</span>
        </div>
      </div>
      <div class="type-bar">
        <span
          class="type-item"
          :class="{ active: currentTypeId === -1 }"
          @click="typeItemClick(-1)"
        >全部</span>
        <span
          class="type-item"
          v-for="typeItem in roomType"
          :key="typeItem.type_id"
          :class="{ active: (typeItem.type_id === currentTypeId) }"
          @click="typeItemClick(typeItem.type_id)"
        >{{typeItem.type_name}}</span>
      </div>
      <div class="rooms">
        <div class="floor-item" v-for="(floorItem, index) in floorRooms" :key="index">
          <div class="floor-name">{{index}}F</div>
          <div class="floor-rooms">
            <div
              class="room-item"
              v-for="(roomItem, index) in floorItem"
              :key="index"
              v-show="(currentTypeId === -1 || currentTypeId === roomItem.type_id) && (currentStatus == -1 || (currentStatus === 1 && isLockedList.indexOf(roomItem.room_id) != -1) || (currentStatus === 2 && isLockedList.indexOf(roomItem.room_id) === -1))"
              :class="{ 'is-locked': isLockedList.indexOf(roomItem.room_id) != -1}"
            >
              {{roomItem.room_num}}
              <br />
              <span class="type-name">{{roomItem.type_name}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="status-bar">
        <!--<span class="status-item status-all"><span class="status-color"></span>全部（{{allNum}}）</span>-->
        <span
          class="status-item"
          v-for="item in statusList"
          :key="item.id"
          :class="[item.class, { 'active': (currentStatus === item.id) }]"
          @click="statusItemClick(item.id)"
        >
          <span class="status-color"></span>
          {{item.text}}
        </span>
        <!--<span class="status-item status-locked"><span class="status-color"></span>预定（{{lockedNum}}）</span>-->
        <!--<span class="status-item status-free"><span class="status-color"></span>空闲（{{freeNum}}）</span>-->
      </div>
    </div>
    <div class="order-container">
      <div class="action-list">
        <a-button
          type="primary"
          class="btn-arrange-room"
          :loading="loadingArrangeRooms"
          size="mini"
          @click="doAutoArrangeRooms"
        >系统排房</a-button>
      </div>
      <order-list class="order-list" ref="orderList" :currentDateNum="currentDateNum"></order-list>
    </div>
  </div>
</template>

<script>
import { getShopsRooms, roomDayStatus, autoArrangeRooms } from "@/api/room";
import OrderList from "./components/OrderList";

export default {
  name: "ChooseRoom",
  components: { OrderList },
  data() {
    return {
      loading: false,
      loadingArrangeRooms: false,
      startDate: "",
      dateList: [],
      currentDateNum: "",
      currentDateItem: 0,
      currentTypeItem: 0,
      currentTypeId: -1,
      currentStatus: -1,
      roomType: [],
      floorRooms: {},
      roomList: [],
      isLockedList: [],
      allNum: 0,
      lockedNum: 0,
      freeNum: 0
    };
  },
  created() {
    let d = new Date();
    d.setHours(0, 0, 0, 0);
    this.startDate = d.getTime();

    let week = ["日", "一", "二", "三", "四", "五", "六"];
    let startDate = +(d.getTime() + "").substring(0, 10);
    let list = [];
    for (let i = 0; i < 30; i++) {
      let temp = startDate + 3600 * 24 * i;
      let date = this.$moment(temp * 1000).format("YYYY-MM-DD");
      var obj = {
        date: date,
        timestamp: temp,
        week: week[this.$moment(temp * 1000).format("d")]
      };
      list.push(obj);
    }
    this.dateList = list;
    this.startDate = "";
    this.currentDateNum = list[0].timestamp;
    if (this.$store.getters.getRoomList.length) {
      this.formatRoomsData(this.$store.getters.getRoomList);
    } else {
      this.getRooms();
    }
  },
  computed: {
    statusList() {
      return [
        { id: 1, text: "预定 " + this.lockedNum, class: "status-locked" },
        { id: 2, text: "空闲 " + this.freeNum, class: "status-free" }
      ];
    },
    isReload: function() {
      return this.$store.getters.getIsChosen;
    }
  },
  watch: {
    isReload() {
      this.getRoomStatus();
    },
    currentDateNum: function() {
      if (this.roomList.length) {
        this.getRoomStatus();
      }
    }
  },
  methods: {
    datePickerChange: function() {
      if (this.startDate) {
        this.currentDateItem = -1;
        this.currentDateNum = (this.startDate + "").substring(0, 10);
        this.$refs.dateScroll.scrollLeft = 0;
      }
    },
    dateItemClick: function(e, index, date) {
      this.startDate = "";
      this.currentDateItem = index;
      this.currentDateNum = date;
      this.$refs.dateScroll.scrollLeft =
        index * e.srcElement.clientWidth - e.srcElement.clientWidth * 0.5;
    },
    typeItemClick: function(typeId) {
      this.currentTypeId = typeId;
    },
    getRooms: function() {
      this.loading = true;
      getShopsRooms()
        .then(response => {
          this.loading = false;
          this.formatRoomsData(response.data.data);
          this.getRoomStatus();
        })
        .catch(reason => {
          this.loading = false;
        });
    },
    getRoomStatus: function() {
      this.loading = true;
      var query = { date: this.currentDateNum };
      roomDayStatus(query)
        .then(response => {
          this.loading = false;
          this.filterIsLockedRoomList(response.data.data);
        })
        .catch(reason => {
          this.loading = false;
        });
    },
    formatRoomsData: function(data) {
      let roomType = [];
      let roomTypeTemp = [];
      let floorRooms = {};
      this.roomList = data;
      this.$store.dispatch("updateRoomList", data);
      for (let i = 0; i < data.length; i++) {
        if (roomTypeTemp.indexOf(data[i].type_name) === -1) {
          let obj = { type_id: data[i].type_id, type_name: data[i].type_name };
          roomTypeTemp.push(data[i].type_name);
          roomType.push(obj);
        }
        if (floorRooms[data[i].floor] === undefined) {
          floorRooms[data[i].floor] = [];
        }
        floorRooms[data[i].floor].push(data[i]);
        floorRooms[data[i].floor].sort(function(a, b) {
          return +a.room_num - +b.room_num;
        });
      }
      this.roomType = roomType;
      this.floorRooms = floorRooms;
    },
    filterIsLockedRoomList: function(data) {
      this.isLockedList = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].is_locked === 1) {
          this.isLockedList.push(data[i].room_id);
        }
      }
      this.allNum = this.roomList.length;
      this.lockedNum = this.isLockedList.length;
      this.freeNum = this.allNum - this.lockedNum;
    },
    statusItemClick: function(statusId) {
      if (statusId === this.currentStatus) {
        this.currentStatus = -1;
      } else {
        this.currentStatus = statusId;
      }
    },
    doAutoArrangeRooms: function() {
      this.loadingArrangeRooms = true;
      autoArrangeRooms({
        use_time: this.$moment(this.currentDateNum * 1000).format("YYYY-MM-DD")
      })
        .then(response => {
          this.loadingArrangeRooms = false;
          this.$notify({
            title: response.data.status === "success" ? "成功" : "失败",
            message: response.data.message,
            type: response.data.status === "success" ? "success" : "error"
          });
          this.$store.dispatch("updateIsChosen", new Date().getTime());
          // this.getRoomStatus()
          // this.$refs.orderList.getOrderList()
        })
        .catch(reason => {
          this.loadingArrangeRooms = false;
          this.$message.error(reason.message);
        });
    }
  }
};
</script>

<style scoped lang="less">
@color-locked: #f56c6c;
@color-free: #6ccac9;

.choose-room {
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  height: 100%;
  text-align: left;
  .room-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    .time-bar,
    .type-bar,
    .status-bar {
      display: flex;
      align-items: center;
      padding: 10px 0;
      box-sizing: border-box;
    }
    .time-bar {
      display: flex;
      align-items: flex-start;
      min-height: 60px;
      border-bottom: 1px solid #ddd;
      .date-scroll {
        flex: 1;
        width: 100px;
        margin: 0 0 0 10px;
        white-space: nowrap;
        overflow: auto;
        .date-item {
          display: inline-block;
          height: 30px;
          line-height: 30px;
          padding: 0 10px;
          margin: 0 10px 5px 0;
          border-radius: 3px;
          font-size: 12px;
          background: #55a532;
          color: #fff;
          cursor: pointer;
          &:hover {
            background: #30601d;
          }
          &.active {
            background: #222;
            &:hover {
              background: #222;
            }
          }
        }
      }
    }
    .type-bar {
      min-height: 60px;
      border-bottom: 1px solid #ddd;
      .type-item {
        display: inline-block;
        height: 30px;
        line-height: 30px;
        padding: 0 10px;
        margin: 0 10px 0 0;
        border-radius: 3px;
        font-size: 12px;
        background: #55a532;
        color: #fff;
        cursor: pointer;
        &:hover {
          background: #30601d;
        }
        &.active {
          background: #222;
          &:hover {
            background: #222;
          }
        }
      }
    }
    .status-bar {
      padding: 0;
      .status-item {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        height: 30px;
        padding: 0 10px 0 5px;
        margin: 5px 15px 5px 0;
        border: 1px solid #222;
        border-radius: 3px;
        cursor: pointer;
        font-size: 0.8em;
        &.active {
          background: #222;
          color: #fff;
          &:hover {
            background: #222;
          }
        }
        &:hover {
          background: #ddd;
        }
        .status-color {
          display: inline-block;
          width: 20px;
          height: 20px;
          margin-right: 10px;
          border-radius: 3px;
        }
        &.status-all {
          .status-color {
            background: #ddd;
          }
        }
        &.status-locked {
          .status-color {
            background: @color-locked;
          }
        }
        &.status-free {
          .status-color {
            background: @color-free;
          }
        }
      }
    }
    .rooms {
      flex: 1;
      padding: 10px 0;
      box-sizing: border-box;
      overflow: auto;
      .floor-item {
        .floor-name {
          padding: 10px 0;
          font-size: 30px;
        }
        .floor-rooms {
          &:after {
            content: "";
            display: block;
            clear: both;
          }
          .room-item {
            float: left;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            width: 100px;
            height: 90px;
            border: 1px solid #f1f1f1;
            font-size: 20px;
            font-weight: bold;
            background: @color-free;
            color: #ff6c60;
            cursor: pointer;
            .type-name {
              font-size: 18px;
              color: #8175c7;
            }
            &.is-locked {
              background: @color-locked;
              color: #fff;
              * {
                color: #fff;
              }
            }
          }
        }
      }
    }
  }
  .order-container {
    display: flex;
    flex-direction: column;
    width: 420px;
    background: #fff;
    border-left: 1px solid #ddd;
    .action-list {
      .btn-arrange-room {
        margin: 10px;
      }
    }
    .order-list {
      /*height: calc(100% - 60px);*/
      flex: 1;
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
}
</style>
