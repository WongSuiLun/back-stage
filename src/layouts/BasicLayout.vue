<template>
  <a-layout class="layout">
    <a-layout id="components-layout-demo-custom-trigger">
      <a-layout-sider
        :trigger="null"
        collapsible
        width="240"
        v-model="collapsed"
      >
        <div class="logo" />
        <a-menu
          theme="dark"
          mode="inline"
          :defaultSelectedKeys="['1']"
        >
          <a-menu-item key="1">
            <a-icon type="user" />
            <span>nav 1</span>
          </a-menu-item>
          <a-menu-item key="2">
            <a-icon type="video-camera" />
            <span>nav 2</span>
          </a-menu-item>
          <a-menu-item key="3">
            <a-icon type="upload" />
            <span>nav 3</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <global-header :collapsed="collapsed" @toggle="toggle"></global-header>
        <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
          Content
        </a-layout-content>
        <a-layout-footer>
          <global-footer />
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
import { GlobalHeader, GlobalFooter } from '@/components'
export default {
  components: {
    GlobalHeader,
    GlobalFooter
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
  }
</style>
