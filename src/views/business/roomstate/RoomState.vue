<template>
  <div class="content-warp">
      <a-row type="flex" justify="center">
        <a-range-picker @change="onChange" />
        <div class="search-control">
        <a-button type="primary">查询</a-button>
        </div>
      </a-row>
      <a-row >
        <room-state-table></room-state-table>
      </a-row>
  </div>
</template>

<script>
import RoomStateTable from './components/RoomStateTable'
export default {
    components:{
        RoomStateTable
    },
    methods:{
        onChange(){
            //时间选择Change事件
        }
    }
}
</script>

<style lang="less" scoped>
.search-control{
    margin-left: 8px;
}
</style>