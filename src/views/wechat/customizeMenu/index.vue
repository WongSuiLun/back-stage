<template>
  <div class="mp-body">
    <div class="weui-desktop-layout__main">
      <h2 class="weui-desktop-page__title">自定义菜单</h2>
      <div id="weui-tabs">
        <div class="weui-desktop-panel">
          <a-alert :message="alertMessage.message" :type="alertMessage.type" banner />
          <div class="diy-warp">
            <div class="menu-setting-area">
              <mobile-preview></mobile-preview>
              <div class="menu_setting_editor">
                <menu-editor v-show="!isOnSort"></menu-editor>
                <div class="sort-message" v-show="isOnSort">请通过拖拽左边的菜单进行排序</div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
    </div>
  </div>
</template>

<script>
import MenuEditor from "./components/MenuEditor";
import MobilePreview from "./components/MobilePreview";
import { SlickList, SlickItem } from "vue-slicksort";
import { getWechatMenus } from "@/api/wechat";
import { mapState } from "vuex";
export default {
  components: {
    MenuEditor,
    MobilePreview,
    SlickList, SlickItem
  },
  data() {
    return {
      alertMessage: {
        type: "info",
        message:
          "你已授权给腾讯云、腾讯云官网、米多大数据引擎、企业微信、杭州鹊桥科技微信平台帮助你运营公众号，点击管理已授权的第三方平台"
      },
      maxSubMenuLength: 5,
      items: [
        "Item 1",
        "Item 2",
        "Item 3",
        "Item 4",
        "Item 5",
        "Item 6",
        "Item 7",
        "Item 8"
      ]
    };
  },
  created() {
    this.init();
  },
  computed: {
    ...mapState({
      menu: state => state.customizeMenu.menu,
      isMenuActive: state => state.customizeMenu.isMenuActive,
      subMenuActiveIndex: state => state.customizeMenu.subMenuActiveIndex,
      menuActiveIndex: state => state.customizeMenu.menuActiveIndex,
      isOnSort: state => state.customizeMenu.isOnSort
    }),
    isArrowActive() {
      if (this.isMenuActive) {
        return false;
      }
      return (
        this.menu[this.menuActiveIndex].sub_button.list.length ==
        this.subMenuActiveIndex + 1
      );
    }
  },
  methods: {
    init() {
      let id = 3;
      getWechatMenus(id).then(res => {
        this.$store.commit("SET_MENU", res.data.selfmenu_info.button);
      });
    }
  }
};
</script>
 <style lang="less">
@wexin-color: #44b549;
#weui-tabs {
  .ant-tabs-tab {
    width: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    max-width: 150px;
    font-size: 16px;
    &.ant-tabs-tab-active {
      color: @wexin-color;
    }
  }
  .ant-tabs-nav .ant-tabs-tab:hover {
    color: @wexin-color;
  }
  .ant-tabs-ink-bar {
    background-color: @wexin-color;
  }
}
</style>

<style lang="less" scoped>
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
.mp-body {
  padding: 40px 0 80px;
  .weui-desktop-layout__main {
    width: 90%;
    max-width: 1600px;
    margin-left: auto;
    margin-right: auto;

    .weui-desktop-page__title {
      font-size: 26px;
      font-weight: 400;
      line-height: 1;
      margin-bottom: 20px;
    }
  }
  .weui-desktop-panel {
    margin-top: 20px;
    padding: 24px 40px;
    background-color: #ffffff;
    .diy-warp {
      .menu-setting-area {
        display: flex;
        flex-wrap: wrap;
        margin: 14px 0;

        .menu_setting_editor {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
      }
    }
  }
}
.sort-message{
  text-align: center;
  height: 100%;
  line-height: 580px;
}
</style>

