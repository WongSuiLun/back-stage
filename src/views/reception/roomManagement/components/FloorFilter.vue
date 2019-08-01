<template>
  <div class="floor-filter">
    <!-- <span style="font-weight:700">选择楼层：</span>
    <div class="all-type-select">
      <el-checkbox
        border
        size="small"
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange"
      >全选</el-checkbox>
    </div>
    <div>
      <el-checkbox-group v-model="checkedfloorTypes" @change="handleCheckedFloorTypesChange">
        <el-checkbox border size="small" v-for="floorType in getFloorOptions" :label="floorType" :key="floorType">{{floorType}}F</el-checkbox>
      </el-checkbox-group>
    </div> -->
    <!-- <radio v-model="radio" size='small' :items="getFloorOptions" @change="handleChange"></radio> -->
     <a-radio-group defaultValue="全选" buttonStyle="solid" v-model="radio" @change="handleChange">
        <a-radio-button value="option" v-for="option in getFloorOptions" :key="option">
          {{option}}
        </a-radio-button>
      </a-radio-group>
  </div>
</template>
<script>
// import Radio from '@/components/Radio/Radio'
export default {
  components: {
    // Radio
  },
  data () {
    return {
      checkAll: true,
      checkedfloorTypes: [],
      isIndeterminate: false,
      radio: '全选'
    }
  },
  // created: function () {
  //   this.initCheckedFloorTypes()
  //   console.log(this.getFloorOptions)
  // },
  methods: {
    handleChange () {
      if (this.radio === '全选') {
        this.$store.dispatch('updateFloorFilter', this.$store.state.RoomManagement.floorOptions)
      } else {
        let floor = parseInt(this.radio)
        let array = []
        array.push(floor)
        this.$store.dispatch('updateFloorFilter', array)
      }
    }
    // initCheckedFloorTypes () {
    //   this.checkedfloorTypes = this.getFloorOptions
    // },
    // handleCheckAllChange (val) {
    //   this.checkedfloorTypes = val ? this.getFloorOptions : []
    //   this.isIndeterminate = false
    //   this.updateFloorFilter()
    // },
    // handleCheckedFloorTypesChange (value) {
    //   let checkedCount = value.length
    //   this.checkAll = checkedCount === this.getFloorOptions.length
    //   this.isIndeterminate = checkedCount > 0 && checkedCount < this.getFloorOptions.length
    //   this.updateFloorFilter()
    // },
    // updateFloorFilter () {
    //   this.$store.dispatch('updateFloorFilter', this.checkedfloorTypes)
    // }
  },
  computed: {
    getFloorOptions () {
      let option = []
      this.$store.state.RoomManagement.floorOptions.forEach((ele) => {
        option.push(`${ele}F`)
      })
      option.unshift('全选')
      return option
    }
  }
}
</script>
<style lang="less" scoped>
.floor-filter{
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
  .all-type-select{
    padding-bottom: 1px;
    padding-left: 5px;
    padding-right: 10px;
  }
}
</style>
