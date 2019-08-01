<template>
  <div class="base-info-item" @click="filter" :class="{active:isActiveClass}">
    <div
      :style="{background:info.color}"
      style="display:block;width:15px;height:15px;border:1px solid #888;margin-right:5px"
    ></div>
    {{info.infoName}} {{info.infoValue}}
    <!-- <div>
      <el-input v-model="info.infoValue" :disabled="true" size="mini"></el-input>
    </div>-->
  </div>
</template>
<script>
export default {
  props: {
    info: Object
  },
  data () {
    return {
      isActive: false
    }
  },
  computed: {
    isActiveClass () {
      let otherTypeFilter = this.$store.state.RoomManagement.otherTypeFilter
      return otherTypeFilter.isNeedFilter && otherTypeFilter.typeName === this.info.infoType
    }
  },
  methods: {
    filter () {
      let otherTypeFilter = {}
      if (!this.isActiveClass) {
        otherTypeFilter = {
          isNeedFilter: true,
          filterType: this.info.infoType,
          typeName: this.info.infoType,
          emphasizeColor: this.info.color
        }
        this.isActive = true
      } else {
        this.isActive = false
        otherTypeFilter = {
          isNeedFilter: false,
          filterType: '',
          typeName: '',
          emphasizeColor: ''
        }
      }
      this.$store.dispatch('updateOtherTypeFilter', otherTypeFilter)
    }
  }
}
</script>
<style lang="less" scoped>
.base-info-item {
  border: 1px solid #333;
  padding: 5px;
  margin: 5px 15px 5px 0;
  border-radius: 6px;
  color: #000;
  font-size: 14px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background: #c4c4c4;
  }
  &.active {
    background: #11b3cf;
    color: #fff;
  }
}
</style>
<style>
.base-info-item .el-input__inner {
  background-color: #ffffff !important;
  border-color: #e4e7ed;
  text-align: center;
  color: #000000 !important;
  cursor: not-allowed;
}
</style>


