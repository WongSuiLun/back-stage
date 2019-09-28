<template>
  <div class="room-management-header">
    <ul class="hotkey-list">
      <li>2.更新</li>
      <li>6.刷新房态</li>
      <li>7.信息查询</li>
      <li>8.预定信息</li>
      <li>9.图书说明</li>
      <li>5.会员卡</li>
    </ul>
    <div class="filter-search">
      <span>房型</span>
      <el-select size="mini" v-model="roomType" style="width:100px">
        <el-option label="all" value="all"></el-option>
        <el-option label="大床房" value="yyz"></el-option>
      </el-select>
      <span>楼层</span>
      <el-select size="mini" v-model="floor" style="width:100px">
        <el-option label="all" value="all"></el-option>
        <el-option label="2楼" value="yyz"></el-option>
      </el-select>
    </div>
  </div>
</template>
<script>
export default {
  name: 'room-management-header',
  data () {
    return {
      roomType: 'all',
      floor: 'all'
    }
  }
}
</script>
<style lang="less" scoped>
.room-management-header {
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  .hotkey-list {
    li {
      float: left;
      display: block;
      line-height: 60px;
      padding: 0 15px;
    }
    margin: 0 auto;
    height: 60px;
    overflow: hidden;
  }
  .filter-search{
    line-height: 60px;
    height: 60px;
    min-width: 500px;
  }
}
</style>
