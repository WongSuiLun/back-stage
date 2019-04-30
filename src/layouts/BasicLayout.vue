<template>
  <a-layout class="layout">
    <a-layout id="components-layout-demo-custom-trigger">
      <a-layout-sider
        :trigger="null"
        collapsible
        width="240"
        v-model="collapsed"
      >
        <global-logo/>
        <global-menu/>
      </a-layout-sider>
      <a-layout>
        <global-header :collapsed="collapsed" @toggle="toggle"></global-header>
        <multi-tab></multi-tab>
        <div class="layout-content">
          <router-view></router-view>
        </div>
        <a-layout-footer>
          <global-footer />
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
import { GlobalHeader,GlobalFooter,GlobalMenu,GlobalLogo,MultiTab } from '@/components'
export default {
  components: {
    GlobalHeader,
    GlobalFooter,
    GlobalMenu,
    GlobalLogo,
    MultiTab
  },
  data () {
    return {
      collapsed: false
    }
  },
  methods: {
    toggle () {
      this.collapsed = !this.collapsed
    }
  }
}
</script>
<style scoped lang="less">
  @import "../styles/themeMenu.less";
  .layout {
    height: 100%;
    .layout-content{
      padding: 10px 20px;
    }
  }
</style>
