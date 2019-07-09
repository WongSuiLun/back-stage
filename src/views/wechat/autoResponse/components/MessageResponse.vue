  <template>
  <div>
    <content-warp>
       <wechat-content-tab></wechat-content-tab>
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
import { UploadBaseButton,WechatContentTab } from "@/components";
export default {
  components: {
    ContentWarp,
    Picker,
    UploadBaseButton,
    WechatContentTab
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

