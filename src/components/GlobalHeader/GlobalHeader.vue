<template>
  <a-layout-header style="background: #fff; padding: 0;border-bottom:2px solid #eee">
    <a-icon
      class="trigger"
      :type="collapsed ? 'menu-unfold' : 'menu-fold'"
      @click="toggle"
    />
    <a-tag
      color="#87d068"
      style="margin-left:8px;"
      @click="jumpToCompanyChoose"
    >切换
    </a-tag>
    <div class="user-menu">
      <user-menu></user-menu>
    </div>
  </a-layout-header>
</template>

<script>
import UserMenu from "@/components/UserMenu/UserMenu";
export default {
  name: "GlobalHeader",
  components: {
    UserMenu
  },
  props: {
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      visible: true,
      oldScrollTop: 0
    };
  },
  methods: {
    toggle() {
      this.$emit("toggle");
    },
    jumpToCompanyChoose(){
      this.$router.push('/company-choose')
    }
  },
  beforeDestroy() {
    document.body.removeEventListener("scroll", this.handleScroll, true);
  }
};
</script>

<style lang="less">
.header-animat {
  position: relative;
  z-index: 999;
}
.showHeader-enter-active {
  transition: all 0.25s ease;
}
.showHeader-leave-active {
  transition: all 0.5s ease;
}
.showHeader-enter,
.showHeader-leave-to {
  opacity: 0;
}
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.user-menu {
  float: right;
}
</style>
