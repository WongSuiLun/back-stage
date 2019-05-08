<template>
  <div class="my—date-picker">
    <div class="month-choose">
      <div>
        <div class="btn" @click="preMouth" title="上个月">
          <font-awesome-icon
            :style="styleObject"
            icon="chevron-left"
          />
        </div>
      </div>
      <div
        class="month-item"
        @click="changeMonth(-1)"
      >{{offsetMonth(-1).year}}年{{offsetMonth(-1).month}}月</div>
      <div class="month-item active">{{this.year}}年{{this.month}}月</div>
      <div
        class="month-item"
        @click="changeMonth(1)"
      >{{offsetMonth(1).year}}年{{offsetMonth(1).month}}月</div>
      <div
        class="month-item"
        @click="changeMonth(2)"
      >{{offsetMonth(2).year}}年{{offsetMonth(2).month}}月</div>
      <div class="btn" @click="preMouth" title="下个月">
        <font-awesome-icon
          :style="styleObject"
          icon="chevron-right"
        />
      </div>
    </div>
    <div class="date-week">
      <div class="week-header">
        <div
          class="week-item"
          v-for="weekItem in week"
          :key="weekItem"
        >
          <week-box :week="weekItem"></week-box>
        </div>
      </div>
      <div class="week">
        <div
          class="week-row"
          v-for="(week,index) in weekData"
          :key="index"
        >
          <day-box
            v-for="(weekItem,index) in week"
            :key="index"
            :data="weekItem"
            @chooseDay="handleChooseDay"
          >{{weekItem}}</day-box>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DayBox from './components/DayBox'
import WeekBox from './components/WeekBox'
export default {
  components: {
    DayBox,
    WeekBox
  },
  props: {
    Festivals: {
      type: Object,
      default: null
    },
    metaInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      year: '',
      month: '',
      week: ['日', '一', '二', '三', '四', '五', '六'],
      weekData: [],
      chooseDayMap: new Map()
    }
  },
  created() {
    this.initData()
  },
  computed: {

  },
  methods: {
    changeMonth(num) {
      let data = this.offsetMonth(num)
      this.year = data.year
      this.month = data.month
      this.generateWeekData()
    },
    offsetMonth(num) {
      if (num > 0 && this.month + num > 12) {
        return {
          year: this.year + 1,
          month: this.month + num - 12
        }
      } else if (num < 0 && this.month + num < 1) {
        return {
          year: this.year - 1,
          month: 13 + num
        }
      } else {
        return {
          year: this.year,
          month: this.month + num
        }
      }
    },
    initData() {
      this.year = new Date().getFullYear()
      this.month = new Date().getMonth() + 1
      this.generateWeekData()
    },
    preMouth() {
      if (this.month == 1) {
        this.year -= 1;
        this.month = 12;
      } else {
        this.month--;
      }
      this.generateWeekData()
    },
    nextMouth() {
      if (this.month == 12) {
        this.year += 1;
        this.month = 1;
      } else {
        this.month++;
      }
      this.generateWeekData()
    },
    nextDate(date) {
      var nextDate = new Date(date.getTime() + 24 * 60 * 60 * 1000);
      return nextDate
    },
    handleChooseDay(date, isChoose) {
      if (isChoose) {
        this.chooseDayMap.set(date, true)
      } else {
        this.chooseDayMap.delete(date)
      }
      this.$emit('input', [...this.chooseDayMap.keys()].sort((a, b) => new Date(a) - new Date(b)))
    },
    generateWeekData() {
      //初始化数据
      this.weekData = []
      let date = new Date(`${this.year}-${this.month}-01`)
      //从星期天开始匹配，到下个月结束
      let offsetDay = date.getDay()
      let tempWeekData = []
      for (let i = 0; i < offsetDay; i++) {
        tempWeekData.push({ full_date: null, day: null, active: false })
      }
      let isNextMouth = false

      //判断是否是下个月
      while (!isNextMouth) {

        tempWeekData.push({
          full_date: `${this.year}-${this.month}-${date.getDate()}`,
          date: date.getDate(),
          day: date.getDay(),
          active: Boolean(this.chooseDayMap.get(`${this.year}-${this.month}-${date.getDate()}`))
        })

        //七天为一组，
        if (tempWeekData.length == 7) {
          this.weekData.push(tempWeekData)
          tempWeekData = []
        }

        date = this.nextDate(date)
        if (date.getMonth() + 1 != this.month) {
          isNextMouth = true
        }
      }
      if (tempWeekData.length != 0) {
        // week补空格
        for (let i = tempWeekData.length; i < 7; i++) {
          tempWeekData.push({ day: null })
        }
      }

      this.weekData.push(tempWeekData)
      // console.log(this.weekData)
    }
  }
}
</script>

<style lang="less" scoped>
.btn{
  cursor: pointer;
  width: 40px;
}
.my—date-picker {
  width: 100%;
  border: 1px solid #ddd;
  box-shadow: 0 0 100px #ddd;
  .week-header {
    display: flex;
    .week-item {
      flex-grow: 1;
    }
  }
  .week {
    .week-row {
      display: flex;
      .week-item {
        flex-grow: 1;
      }
    }
  }
  .month-choose {
    display: flex;
    height: 40px;
    align-items: center;
    background: #e4e4e4;
    .month-item {
      flex-grow: 1;
      line-height: 40px;
      font-size: 16px;
      cursor: pointer;
      &.active {
        color: #fff;
        background: #ff5c5d;
      }
    }
  }
}
</style>

