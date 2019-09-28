<template>
  <div>
    <a-alert :message="alertMessage.message" :type="alertMessage.type" banner/>
    <div class="weui-desktop-panel">
      <div class="weui-desktop-reply-switch">
        <div class="weui-desktop-reply-switch__bd">
          <div class="weui-desktop-panel__title">自动回复</div>
          <p class="weui-desktop-tips">
            通过编辑内容或关键词规则，快速进行自动回复设置。如具备开发能力，可更灵活地使用该功能。
            <a
              href="javascript:;"
              class="detail_desc"
            >查看详情</a>
          </p>
          <p class="weui-desktop-tips">关闭自动回复之后，将立即对所有用户生效。</p>
        </div>
        <div class="weui-desktop-reply-switch__ft">
          <a-switch defaultChecked />
        </div>
      </div>
      <a-divider/>
      <div class="weui-desktop-panel__bd">
          <slot/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      alertMessage: {
        type: "info",
        message:
          "你已授权给腾讯云、腾讯云官网、米多大数据引擎、企业微信、杭州鹊桥科技微信平台帮助你运营公众号，点击管理已授权的第三方平台"
      },
    };
  },
};
</script>
<style lang="less">
.weui-desktop-reply-switch__ft {
  .ant-switch-checked {
    border-color: #04be02;
    background-color: #04be02;
  }
}
</style>

<style lang="less" scoped>
.weui-desktop-panel {
  margin-top: 20px;
  padding: 24px 40px;
  background-color: #ffffff;
}
.weui-desktop-reply-switch {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .weui-desktop-reply-switch__bd {
    .weui-desktop-panel__title {
      font-family: -apple-system-font, BlinkMacSystemFont, "Helvetica Neue",
        "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei UI",
        "Microsoft YaHei", Arial, sans-serif;
      color: #353535;
      font-size: 20px;
      font-weight: 400;
      line-height: 1;
    }
    .weui-desktop-panel__title + .weui-desktop-tips {
      padding-top: 8px;
    }
    .weui-desktop-tips {
      color: #9a9a9a;
      font-size: 14px;
      margin: 0;
    }
  }
}
</style>

