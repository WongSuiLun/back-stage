<template>
  <div class="content-warp">
    <a-tabs defaultActiveKey="1" >
      <a-tab-pane tab="用户列表" key="1">
        <user-list></user-list>
      </a-tab-pane>
      <a-tab-pane tab="添加用户" key="2" forceRender>
        <add-user></add-user>
      </a-tab-pane>
    </a-tabs>

    <!-- <div class="account-settings-info-main" :class="device">
      <div class="account-settings-info-left">
        <a-menu
          :mode="device == 'mobile' ? 'horizontal' : 'inline'"
          :style="{ border: '0', width: device == 'mobile' ? '560px' : 'auto'}"
          :selectedKeys="selectedKeys"
          type="inner"
          @openChange="onOpenChange"
        >
          <a-menu-item key="/company/user/management/list">
            <router-link :to="{ name: 'user-list' }">用户列表</router-link>
          </a-menu-item>
          <a-menu-item key="/company/user/management/add">
            <router-link :to="{ name: 'add-user' }">添加用户</router-link>
          </a-menu-item>
        </a-menu>
      </div>
      <div class="account-settings-info-right">
        <div class="account-settings-info-title">
          <span>{{ $route.meta.title }}</span>
        </div>
        <router-view></router-view>
      </div>
    </div>-->
  </div>
</template>

<script>
import { mixinDevice } from "@/utils/mixin.js";
import AddUser from "./components/AddUser";
import UserList from "./components/UserList";
export default {
  components: {
    AddUser,
    UserList
  },
  mixins: [mixinDevice],
  data() {
    return {
      mode: "inline",
      openKeys: [],
      selectedKeys: [],
      // cropper
      preview: {},
      option: {
        img: "/avatar2.jpg",
        info: true,
        size: 1,
        outputType: "jpeg",
        canScale: false,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 180,
        autoCropHeight: 180,
        fixedBox: true,
        // 开启宽度和高度比例
        fixed: true,
        fixedNumber: [1, 1]
      },
      pageTitle: ""
    };
  },
  created() {
    this.updateMenu();
  },
  methods: {
    onOpenChange(openKeys) {
      this.openKeys = openKeys;
    },
    updateMenu() {
      const routes = this.$route.matched.concat();
      this.selectedKeys = [routes.pop().path];
    }
  },
  watch: {
    $route(val) {
      this.updateMenu();
    }
  }
};
</script>

<style lang="less" scoped>
</style>
<style lang="less" scoped>
.account-settings-info-main {
  width: 100%;
  display: flex;
  height: 100%;
  overflow: auto;
  &.mobile {
    display: block;
    .account-settings-info-left {
      border-right: unset;
      border-bottom: 1px solid #e8e8e8;
      width: 100%;
      height: 50px;
      overflow-x: auto;
      overflow-y: scroll;
    }
    .account-settings-info-right {
      padding: 20px 40px;
    }
  }
  .account-settings-info-left {
    border-right: 1px solid #e8e8e8;
    width: 224px;
  }
  .account-settings-info-right {
    flex: 1 1;
    padding: 8px 40px;
    .account-settings-info-title {
      color: rgba(0, 0, 0, 0.85);
      font-size: 20px;
      font-weight: 500;
      line-height: 28px;
      margin-bottom: 12px;
    }
    .account-settings-info-view {
      padding-top: 12px;
    }
  }
}
</style>