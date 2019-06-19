  <template>
  <div>
    <content-warp>
      <div class="weui-desktop-reply-content">
        <a-tabs defaultActiveKey="1" @change="handleTabChange">
          <a-tab-pane key="1">
            <span slot="tab">
              <a-icon type="font-size"/>文字
            </span>
            <div style="display: block;">
              <div class="emoion_editor_wrp">
                <div class="emotion_editor">
                  <div class="editor_area" contenteditable="true" @input="changeText">{{innerText}}</div>
                </div>
                <div class="editor_toolbar">
                  <div class="emoji_select">
                    <a href="#" @click="visible=!visible">
                      <a-icon type="smile"/>
                    </a>
                  </div>
                  <div class="text_warn">
                    <span>还可以输入600字，按下Enter键换行</span>
                  </div>
                </div>
              </div>
            </div>
          </a-tab-pane>
          <a-tab-pane key="2">
            <span slot="tab">
              <a-icon type="picture"/>图片
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
          <a-tab-pane key="3">
            <span slot="tab">
              <a-icon type="sound"/>语音
            </span>
            Tab 2
          </a-tab-pane>
          <a-tab-pane key="4">
            <span slot="tab">
              <a-icon type="camera"/>视频
            </span>
            Tab 2
          </a-tab-pane>
          <a-tab-pane key="5">
            <span slot="tab">
              <a-icon type="credit-card"/>卡券
            </span>
            Tab 2
          </a-tab-pane>
        </a-tabs>
      </div>
      <picker set="emojione" class="emoji_picker" @select="addEmoji" v-show="visible"/>
      <div class="weui-desktop_control">
        <a-button
          type="primary"
          style="background-color: #1AAD19;border-color: #1AAD19;margin-right: 1em;width:102px;height:36px"
        >保存</a-button>
        <a-button
          style="background-color: #FBFBFB;border-color: #E4E8EB;color: #353535;width:102px;height:36px"
        >删除回复</a-button>
      </div>
    </content-warp>
  </div>
</template>

<script>
import ContentWarp from "./ContentWarp";
import { Picker } from "emoji-mart-vue";
import { UploadBaseButton } from "@/components";
export default {
  components: {
    ContentWarp,
    Picker,
    UploadBaseButton
  },
  data() {
    return {
      innerText: "123123",
      visible: false,
      lastEditRange: null
    };
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

