<template>
  <div class="info-item">
    <base-footer-info-item v-for="(info,index) in getCalculateInputTypeList" :key="index" :info="info">
    </base-footer-info-item>
  </div>
</template>
<script>
import BaseFooterInfoItem from './BaseFooterInfoItem'
import RoomManagementHelper from '@/utils/RoomManagementHelper.js'
export default {
  components: {
    BaseFooterInfoItem
  },
  created () {

  },
  computed: {
    getCalculateType () {
      return this.$store.getters.getCalculateType
    },
    getCalculateInputTypeList () {
      let typeObject = RoomManagementHelper.getAllTypeObject()
      let inputTypeList = []
      RoomManagementHelper.getAllKeys().forEach(key => {
        let inputType = {}
        inputType['infoType'] = typeObject[key].key
        inputType['infoName'] = typeObject[key].label
        inputType['infoValue'] = this.getCalculateType.hasOwnProperty(key) ? this.getCalculateType[key] : typeObject[key].defaultValue
        inputType['color'] = typeObject[key].color
        inputTypeList.push(inputType)
      })
      return inputTypeList
    }
  }
}
</script>
<style lang="less" scoped>
  .info-item{
    min-height: 40px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    overflow: hidden;
  }
</style>
