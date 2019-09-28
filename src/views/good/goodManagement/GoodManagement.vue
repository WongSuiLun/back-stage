<template>
  <div class="content-warp">
    <a-tabs defaultActiveKey="1">
      <a-tab-pane tab="商品列表" key="1">
        <good-list></good-list>
      </a-tab-pane>
      <a-tab-pane tab="下架商品" key="2" forceRender>
        
      </a-tab-pane>
      <a-tab-pane tab="仓库" key="3" forceRender>
        <ware-house></ware-house>
      </a-tab-pane>
    </a-tabs>
   
  </div>
</template>

<script>
import GoodList from "./components/GoodList";
import WareHouse from "./components/WareHouse";

export default {
  components: {
    GoodList,
    WareHouse
  }
};
</script>

<style>
</style>
