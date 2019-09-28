<template>
  <div class="logo">
    <img src="./logo.png" width="35" height="60"/>
    <span v-if="isDesktop()&&!sidebar">御温泉度假村</span>
    
    <!-- <a-dropdown>
      <a-menu slot="overlay">
        <a-menu-item key="1">
          <a-icon type="user" />店1</a-menu-item>
        <a-menu-item key="2">
          <a-icon type="user" />店1</a-menu-item>
        <a-menu-item key="3">
          <a-icon type="user" />3rd item</a-menu-item>
      </a-menu>
      <a-tag color="#87d068">切换
        <a-icon type="down" />
      </a-tag>
    </a-dropdown> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mixinDevice } from "@/utils/mixin";
export default {
  mixins: [mixinDevice],
  computed:{
     ...mapState({
      sidebar: state => state.app.sidebar
    })
  }
};
</script>
<style lang="less" scoped>
.logo {
  height: 64px;
  // background: #fff;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  // margin: 0;
}
</style>

