<template>
  <div class="mp-body">
    <div class="weui-desktop-layout__main">
      <h2 class="weui-desktop-page__title">关键词回复</h2>
      <div id="weui-tabs">
        <a-tabs defaultActiveKey="1">
          <a-tab-pane tab="关键词回复" key="1">
            <keyword-response></keyword-response>
          </a-tab-pane>
          <a-tab-pane tab="收到消息回复" key="2" forceRender>
            <message-response></message-response>
          </a-tab-pane>
          <a-tab-pane tab="被关注回复" key="3">
            <attention-response></attention-response>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import KeywordResponse from "./components/KeywordResponse";
import MessageResponse from "./components/MessageResponse";
import AttentionResponse from "./components/AttentionResponse";
export default {
  components: {
    KeywordResponse,
    MessageResponse,
    AttentionResponse
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
.mp-body {
  padding: 40px 0 80px;
  .weui-desktop-layout__main {
    width: 90%;
    max-width: 1600px;
    margin-left: auto;
    margin-right: auto;
  }
  .weui-tabs {
  }
}
.weui-desktop-page__title {
  font-size: 26px;
  font-weight: 400;
  line-height: 1;
  margin-bottom: 20px;
}
</style>

