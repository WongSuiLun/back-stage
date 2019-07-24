<template>
  <div class="warp">
    <div class="mobile_menu_preview">
      <div class="mobile_hd tc">御温泉</div>
      <div class="mobile_bd">
        <div class="pre_menu_list">
          <div
            class="pre_menu_list_item"
            :class="{active:menuIndex === menuActiveIndex,select:isMenuBtnSelect(menuIndex)}"
            v-for="(menuItem,menuIndex) in menu"
            :key="`menuItem_${menuIndex}`"
            @click="handleMenuClick(menuIndex)"
          >
            {{menuItem.name}}
            <div class="sub_menu">
              <ul v-show="!isOnSort">
                <li
                  v-for="(subMenuItem,subMenuIndex) in getSubMenuList(menuItem)"
                  @click.stop="handleSubMenuItemClick(subMenuIndex)"
                  :class="{select:isSubMenuBtnSelect(menuIndex,subMenuIndex)}"
                  :key="`subMenuItem${subMenuIndex}`"
                >{{subMenuItem.name}}</li>
                <li
                  v-if="maxSubMenuLength>getSubMenuListLength(menuItem)"
                  @click="handleAddSubMenu(menuIndex)"
                >
                  <a-icon type="plus" style="color:#777" />
                </li>
              </ul>
              <SlickList lockAxis="y" v-model="sortMenuList[menuIndex]" v-show="isOnSort">
                <SlickItem
                  v-for="(item, index) in sortMenuList[menuIndex]"
                  class="sort-li"
                  :index="index"
                  :key="index"
                >
                  <a-icon type="ordered-list" />
                  {{ item.name }}
                </SlickItem>
              </SlickList>
              <div class="arrow" :class="{select:isArrowActive}">
                <i class="arrow arrow_out"></i>
                <i class="arrow arrow_in"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <a-button style="width:100px;margin-top:20px;" @click="sortMenu">{{isOnSort?"完成":"菜单排序"}}</a-button>
  </div>
</template>

<script>
import { SlickList, SlickItem } from "vue-slicksort";
import { getWechatMenus } from "@/api/wechat";
import { mapState } from "vuex";
export default {
  components: {
    SlickList,
    SlickItem
  },
  data() {
    return {
      maxSubMenuLength: 5,
      items: [
        { name: "Item 4" },
        { name: "Item 5" },
        { name: "Item 1" },
        { name: "Item 2" },
        { name: "Item 3" }
      ],
      sortMenuList: []
    };
  },
  created() {
    this.init();
    this.sortMenuList.push(this.sortItemsOne);
    this.sortMenuList.push(this.sortItemsTwo);
    this.sortMenuList.push(this.sortItemsThree);
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
    },
    getSubMenuList(subMenu) {
      if (subMenu.hasOwnProperty("sub_button")) {
        return subMenu.sub_button.list;
      }
      return null;
    },
    getSubMenuListLength(subMenu) {
      if (subMenu.hasOwnProperty("sub_button")) {
        return subMenu.sub_button.list.length;
      }
      return 0;
    },
    isMenuBtnSelect(index) {
      return index === this.menuActiveIndex && this.isMenuActive;
    },
    isSubMenuBtnSelect(menuIndex, subMenuIndex) {
      return (
        menuIndex === this.menuActiveIndex &&
        subMenuIndex === this.subMenuActiveIndex &&
        !this.isMenuActive
      );
    },
    handleMenuClick(index) {
      this.$store.commit("SET_MENU_ACTIVE_STATE", true);
      this.$store.commit("SET_MENU_ACTIVE_INDEX", index);
    },
    handleSubMenuItemClick(index) {
      this.$store.commit("SET_MENU_ACTIVE_STATE", false);
      this.$store.commit("SET_SUB_MENU_ACTIVE_INDEX", index);
    },
    handleAddSubMenu(menuIndex) {
      console.log(menuIndex);
    },
    sortMenu() {
      this.$store.commit("SET_IS_ON_SORT", !this.isOnSort);
    },
  },
  watch: {
    menu: {
      handler: function(val, oldVal) {
        console.log(val);
        if (val.length > 0) {
          if (val[0].hasOwnProperty("sub_button")) {
            this.sortMenuList[0] = val[0].sub_button.list;
            this.$set(this.sortMenuList, 0, val[0].sub_button.list);
          }
        }
        if (val.length > 1) {
          if (val[1].hasOwnProperty("sub_button")) {
            this.sortMenuList[1] = val[1].sub_button.list;
            this.$set(this.sortMenuList, 1, val[1].sub_button.list);
          }
           this.$set(this.sortMenuList, 1, []);
        }
        if (val.length > 2) {
          if (val[2].hasOwnProperty("sub_button")) {
            this.sortMenuList[2] = val[2].sub_button.list;
            this.$set(this.sortMenuList, 2, val[2].sub_button.list);
          }
        }
      }
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
.warp {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.mobile_menu_preview {
  -webkit-background-size: contain;
  background-size: contain;
  position: relative;
  width: 317px;
  height: 580px;
  background: transparent
    url(https://res.wx.qq.com/mpres/htmledition/images/bg/bg_mobile_head_default3a7b38.png)
    no-repeat 0 0;
  background-position: 0 0;
  border: 1px solid #e7e7eb;
  margin-right: 20px;
  .pre_menu_list {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    border-top: 1px solid #e7e7eb;
    background: transparent
      url(https://res.wx.qq.com/mpres/htmledition/images/bg/bg_mobile_foot_default3a7b38.png)
      no-repeat 0 0;
    background-position: 0 0;
    background-repeat: no-repeat;
    padding-left: 43px;
    margin-top: 20px;
    height: 50px;
    display: flex;
    color: #616161;
    .pre_menu_list_item {
      position: relative;
      border-left: 1px solid #e7e7eb;
      flex-grow: 1;
      line-height: 50px;
      text-align: center;
      cursor: pointer;
      .sub_menu {
        position: absolute;
        left: 0px;
        right: 0px;
        bottom: 60px;
        display: none;
        li,
        .sort-li {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          border-left: 1px solid #e7e7eb;
          border-right: 1px solid #e7e7eb;
          border-top: 1px solid #e7e7eb;
          color: #000;
          &.select {
            border: 1px solid #44b549 !important;
            color: #44b549;
          }
        }
        li:last-child,
        .sort-li:last-child {
          border-bottom: 1px solid #e7e7eb;
        }
        .sort-li {
          border: 1px solid #e7e7eb;
        }
      }
      &.active {
        .sub_menu {
          display: block;
        }
      }
      &.select {
        border: 1px solid #44b549 !important;

        line-height: 48px;
        background-color: #fff;
        color: #44b549;
      }

      //箭头
      .arrow {
        position: absolute;
        bottom: 0;
        &.select {
          .arrow_out {
            border-top-color: #44b549;
          }
        }
        .arrow_out {
          position: absolute;
          left: 45px;
          bottom: -6px;
          display: inline-block;
          width: 0;
          height: 0;
          border-width: 6px;
          border-style: dashed;
          border-color: transparent;
          border-bottom-width: 0;
          border-top-color: #d0d0d0;
          border-top-style: solid;
        }
        .arrow_in {
          position: absolute;
          left: 45px;
          bottom: -5px;
          display: inline-block;
          width: 0;
          height: 0;
          border-width: 6px;
          border-style: dashed;
          border-color: transparent;
          border-bottom-width: 0;
          border-top-color: #fafafa;
          border-top-style: solid;
        }
      }
    }
  }
}
.menu_setting_editor {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
</style>

