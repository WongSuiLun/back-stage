<template>
  <div class="portable_editor">
    <div class="global_info">
      <h4>{{viewData.globalInfo}}</h4>
      <a v-if="isMenuActive">删除菜单</a>
      <a v-if="!isMenuActive">删除子菜单</a>
    </div>
    <div class="menu_form">
      <a-form layout="horizontal" class="ant-menu_form" v-model="menuItemForm">
        <a-form-item label="子菜单名称" help="仅支持中英文和数字，字数不超过8个汉字或16个字母">
          <a-input id="error" v-model="menuItemForm.name"/>
        </a-form-item>
        <a-form-item label="子菜单内容">
          <a-radio-group name="radioGroup" :defaultValue="typeEnum.view_limited" v-model="subMenuContentType">
            <a-radio :value="typeEnum.view_limited">发送消息</a-radio>
            <a-radio :value="typeEnum.view">跳转网页</a-radio>
            <a-radio :value="typeEnum.miniprogram">跳转小程序</a-radio>
          </a-radio-group>
        </a-form-item>
        <div>
          <div v-show="subMenuContentType==typeEnum.view_limited">
            <wechat-content-tab></wechat-content-tab>
          </div>
          <div v-if="subMenuContentType==typeEnum.view">
            <div style="background:#fff;padding:16px 20px;">
              <div>订阅者点击该子菜单会跳到以下链接</div>
              <a-form-item label="页面地址">
                <a-input id="error" v-model="viewTypeData.url"/>
              </a-form-item>
              <a>从公众号图文消息中选择</a>
            </div>
          </div>
        </div>
      </a-form>
    </div>
  </div>
</template>
<script>
import { WechatContentTab } from "@/components";
import { mapGetters, mapState } from "vuex";
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
      viewData: {
        globalInfo: "食宿泡指南"
      },
      subMenuContentType: 1,
      menuItemForm:{
          name:""
      },
      typeEnum:{
          view_limited:"view_limited",//图文消息
          view:"view",
          miniprogram:"miniprogram"

      },
      viewTypeData:{
          url:''
      }
    };
  },
  computed: {
    ...mapGetters(["getActiveMenuItemSetting"]),
    ...mapState({
      menu: state => state.customizeMenu.menu,
      isMenuActive: state => state.customizeMenu.isMenuActive,
      subMenuActiveIndex: state => state.customizeMenu.subMenuActiveIndex,
      menuActiveIndex: state => state.customizeMenu.menuActiveIndex
    })
  },
  watch:{
      getActiveMenuItemSetting:{
          handler:function(val,oldVal){
            this.menuItemForm.name = val.name
            console.log(val)
            console.log(val.hasOwnProperty('type'))
            if(val.hasOwnProperty('type')){
                this.subMenuContentType = val.type
                this.$set(this.viewTypeData,'url',val.url)
            }
          }
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
