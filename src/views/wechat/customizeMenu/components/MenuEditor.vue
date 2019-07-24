<template>
  <div>
    <div class="portable_editor">
      <div class="global_info">
        <h4>{{getActiveMenuItemSetting?getActiveMenuItemSetting.name:"菜单名"}}</h4>
        <a v-show="isMenuActive">删除菜单</a>
        <a v-show="!isMenuActive">删除子菜单</a>
      </div>
      <div class="menu_form" v-show="!isMenuActive">
        <a-form layout="horizontal" class="ant-menu_form" v-model="menuItemForm">
          <a-form-item label="子菜单名称" help="仅支持中英文和数字，字数不超过8个汉字或16个字母">
            <a-input id="error" v-model="menuItemForm.name" />
          </a-form-item>
          <a-form-item label="子菜单内容">
            <a-radio-group
              name="radioGroup"
              :defaultValue="typeEnum.view_limited"
              v-model="subMenuContentType"
            >
              <a-radio :value="typeEnum.media_id">发送消息</a-radio>
              <a-radio :value="typeEnum.view">跳转网页</a-radio>
              <a-radio :value="typeEnum.miniprogram">跳转小程序</a-radio>
            </a-radio-group>
          </a-form-item>
          <div>
            <div v-show="subMenuContentType==typeEnum.media_id">
              <wechat-content-tab :data="settingData"></wechat-content-tab>
            </div>
            <div v-show="subMenuContentType==typeEnum.view">
              <div style="background:#fff;padding:16px 20px;">
                <div>订阅者点击该子菜单会跳到以下链接</div>
                <a-form-item label="页面地址">
                  <a-input id="error" v-model="viewTypeData.url" />
                </a-form-item>
                <a>从公众号图文消息中选择</a>
              </div>
            </div>
          </div>
        </a-form>
      </div>
      <div v-show="isMenuActive">
        <p
          v-show="isActiveHasSubMenu"
        >已为“{{getActiveMenuItemSetting?getActiveMenuItemSetting.name:"菜单名"}}”添加了{{activeMenuSubMenuLength}}个子菜单，无法设置其他内容</p>
        <a-form layout="horizontal" class="ant-menu_form" v-model="menuForm">
          <a-form-item label="菜单名称" help="仅支持中英文和数字，字数不超过4个汉字或8个字母">
            <a-input id="error" v-model="menuForm.name" />
          </a-form-item>
          <div v-show="!isActiveHasSubMenu">
            <a-form-item label="菜单内容">
              <a-radio-group
                name="radioGroup"
                :defaultValue="typeEnum.view_limited"
                v-model="subMenuContentType"
              >
                <a-radio :value="typeEnum.media_id">发送消息</a-radio>
                <a-radio :value="typeEnum.view">跳转网页</a-radio>
                <a-radio :value="typeEnum.miniprogram">跳转小程序</a-radio>
              </a-radio-group>
            </a-form-item>
            <div>
              <div v-show="subMenuContentType==typeEnum.media_id">
                <wechat-content-tab :data="settingData"></wechat-content-tab>
              </div>
              <div v-show="subMenuContentType==typeEnum.view">
                <div style="background:#fff;padding:16px 20px;">
                  <div>订阅者点击该子菜单会跳到以下链接</div>
                  <a-form-item label="页面地址">
                    <a-input id="error" v-model="viewTypeData.url" />
                  </a-form-item>
                  <a>从公众号图文消息中选择</a>
                </div>
              </div>
            </div>
          </div>
        </a-form>
      </div>
    </div>
    <div style="display:flex;padding:10px;;justify-content:center">
      <a-button style="background-color:#44b549;color:#fff">保存并发布</a-button>
    </div>
  </div>
</template>
<script>
import { WechatContentTab } from "@/components";
import { mapGetters, mapState } from "vuex";
import { getMaterial } from "@/api/wechat";
export default {
  components: {
    WechatContentTab
  },
  data() {
    return {
      labelCol: {
        xs: { span: 3 },
        sm: { span: 3 }
      },
      wrapperCol: {
        xs: { span: 18 },
        sm: { span: 18 }
      },
      subMenuContentType: 1,
      menuItemForm: {
        name: ""
      },
      menuForm: {
        name: ""
      },
      typeEnum: {
        media_id: "media_id", //素材
        view: "view",
        miniprogram: "miniprogram"
      },
      viewTypeData: {
        url: ""
      },
      preview: "",
      settingData: {
        dataType: "media"
      }
    };
  },
  computed: {
    ...mapGetters(["getActiveMenuItemSetting"]),
    ...mapState({
      menu: state => state.customizeMenu.menu,
      isMenuActive: state => state.customizeMenu.isMenuActive,
      subMenuActiveIndex: state => state.customizeMenu.subMenuActiveIndex,
      menuActiveIndex: state => state.customizeMenu.menuActiveIndex,
    }),
    activeMenuSubMenuLength() {
      let length = -1;
      if(!this.getActiveMenuItemSetting){
        return 
      }
      if (this.getActiveMenuItemSetting.hasOwnProperty("sub_button")) {
        return this.getActiveMenuItemSetting.sub_button.list.length || -1;
      }
      return length;
    },
    isActiveHasSubMenu() {
      return this.activeMenuSubMenuLength > 0;
    }
  },
  watch: {
    getActiveMenuItemSetting: {
      handler: function(val, oldVal) {
        if (this.isMenuActive) {
          this.menuForm.name = val.name;
        } else {
          this.menuItemForm.name = val.name;
        }
        let type = val.type;
          switch (type) {
            case "media_id": {
              this.subMenuContentType = val.type;
              this.getMaterialByList(val.media_id);
              break;
            }
            case "view": {
              this.subMenuContentType = val.type;
              this.$set(this.viewTypeData, "url", val.url);
              break;
            }
          }
          if (val.hasOwnProperty("type")) {
          } else if (val.hasOwnProperty("media_id")) {
          }
      }
    }
  },
  methods: {
    getMaterialByList(media_id) {
      let mediaList = [];
      mediaList.push(media_id);
      console.log(media_id);
      let id = 3;
      getMaterial(id, mediaList).then(res => {
        console.log(res);
        this.preview = res.data[0].news_contents[0].content;
        this.settingData = {
          type: "media",
          contentData: res.data[0]
        };
      });
    }
  }
};
</script>
<style lang="less">
.ant-menu_form {
  text-align: left !important;
}
</style>

<style lang="less" scoped>
.portable_editor {
  padding: 0 20px 5px;
  background-color: #f4f5f9;
  border: 1px solid #e7e7eb;
  border-radius: 0;
  -moz-border-radius: 0;
  -webkit-border-radius: 0;
  box-shadow: none;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
  width: 100%;
  min-height: 100%;
  .global_info {
    padding: 9px 0 0 0;
    border-bottom: 1px solid #e7e7eb;
    display: flex;
    justify-content: space-between;
  }
}
</style>
