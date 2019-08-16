<template>
  <div class="content-warp">
    <a-tabs defaultActiveKey="1" >
      <a-tab-pane tab="房型列表" key="1">
          <room-type-list></room-type-list>
      </a-tab-pane>
      <a-tab-pane tab="添加房型" key="2" forceRender>
          <add-room-type></add-room-type>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import RoomTypeList from './components/RoomTypeList'
import AddRoomType from './components/AddRoomType'
export default {
    components:{
        RoomTypeList,
        AddRoomType
    }
};
</script>

<style>
</style>
