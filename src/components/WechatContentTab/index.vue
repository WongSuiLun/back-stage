<template>
  <div>
    <div class="weui-desktop-reply-content">
      <a-tabs :defaultActiveKey="data.dataType" @change="handleTabChange">
        <a-tab-pane :key="typeEnum.media">
          <span slot="tab">
            <my-icon type="icon-weixintuwenxiaoxi"></my-icon>图文消息
          </span>
          <div style="display: block;">
            <pic-text-message :data="picTextMessageData"></pic-text-message>
          </div>
        </a-tab-pane>
        <a-tab-pane :key="typeEnum.text">
          <span slot="tab">
            <a-icon type="font-size" />文字
          </span>
          <div style="display: block;">
            <div class="emoion_editor_wrp">
              <div class="emotion_editor">
                <div class="editor_area" contenteditable="true" @input="changeText">{{innerText}}</div>
              </div>
              <div class="editor_toolbar">
                <div class="emoji_select">
                  <a href="#" @click="visible=!visible">
                    <a-icon type="smile" />
                  </a>
                </div>
                <div class="text_warn">
                  <span>还可以输入600字，按下Enter键换行</span>
                </div>
              </div>
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane :key="typeEnum.pic">
          <span slot="tab">
            <a-icon type="picture" />图片
          </span>
          <div class="picture_select">
            <a-row :gutter="{ xs: 8, sm: 16, md: 24}">
              <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="12">
                <UploadBaseButton text="从素材库中选择"></UploadBaseButton>
              </a-col>
              <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="12">
                <UploadBaseButton></UploadBaseButton>
              </a-col>
            </a-row>
          </div>
        </a-tab-pane>
        <a-tab-pane :key="typeEnum.voice">
          <span slot="tab">
            <a-icon type="sound" />语音
          </span>
          功能未开发
        </a-tab-pane>
        <a-tab-pane :key="typeEnum.video">
          <span slot="tab">
            <a-icon type="camera" />视频
          </span>
          功能未开发
        </a-tab-pane>
        <a-tab-pane :key="typeEnum.coupon">
          <span slot="tab">
            <a-icon type="credit-card" />卡券
          </span>
          功能未开发
        </a-tab-pane>
      </a-tabs>
    </div>
    <picker set="emojione" class="emoji_picker" @select="addEmoji" v-show="visible" />
  </div>
</template>

<script>
import { Icon } from "ant-design-vue";
const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_799157_trqlwrrcap.js" // 在 iconfont.cn 上生成
});

import { Picker } from "emoji-mart-vue";
import { UploadBaseButton } from "@/components";
import PicTextMessage from "./components/PicTextMessage";
import { mkdir } from "fs";
export default {
  components: {
    Picker,
    UploadBaseButton,
    MyIcon,
    PicTextMessage
  },
  props: {
    data: {
    
    }
  },
  data() {
    return {
      innerText: "123123",
      visible: false,
      lastEditRange: null,
      typeEnum: {
        media: "media",
        text: "text",
        pic: "pic",
        voice: "voice",
        video: "video",
        coupon: "coupon"
      }
    };
  },
  computed:{
    picTextMessageData(){
      if(this.data.type == this.typeEnum.media){
        return this.data.contentData
      }
      return null
    }
  },
  created(){
    
  },
  methods: {
    changeText(e) {
      console.log(e);
      this.lastEditRange = window.getSelection();
    },
    addEmoji(emoji) {
      console.log(emoji);
      this.innerText += emoji.native;
    },
    handleTabChange() {
      this.visible = fasle;
    }
  }
};
</script>
<style lang="less">
.weui-desktop-reply-content {
  background: #fff;
  .ant-tabs-bar {
    margin: 0;
  }
}
</style>

<style lang="less" scoped>
.weui-desktop-reply-content {
  margin-top: 24px;
  border: 1px solid #e4e8eb;
  position: relative;
}

.editor_area {
  padding: 14px 20px;
  outline: 0;
  color: #353535;
  word-wrap: break-word;
  -webkit-hyphens: auto;
  -ms-hyphens: auto;
  hyphens: auto;
  word-break: break-all;
  background-color: #ffffff;
  height: 188px;
  overflow-y: auto;
}
.editor_toolbar {
  padding: 0 20px;
  line-height: 36px;
  background-color: #ffffff;
  border-top: 1px solid #e4e8eb;
  display: flex;
  justify-content: space-between;
  .emoji_select {
    font-size: 18px;
  }
  .text_warn {
    color: #9a9a9a;
  }
}
.weui-desktop_control {
  margin-top: 40px;
  padding-bottom: 50px;
}
</style>

