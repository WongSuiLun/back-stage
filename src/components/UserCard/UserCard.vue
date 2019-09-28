<template>
  <a-popover title="Title" trigger="hover">
    <template slot="content">
      <a-skeleton :loading="loading" avatar :paragraph="{rows: 3}" style="width:240px">
        <a-popover trigger="hover">
          <template slot="content">
            <a-skeleton :loading="loading" avatar :paragraph="{rows: 3}" style="width:360px">
              <a-card :bordered="false">
                <div class="account-center-avatarHolder">
                  <div class="avatar">
                    <img />
                  </div>
                  <div class="username">{{ }}</div>
                  <div class="bio">个性签名</div>
                </div>
                <div class="account-center-detail">
                  <p>
                    <a-icon type="user" />交互专家
                  </p>
                  <p>
                    <a-icon type="cluster" />御温泉－产品研发部
                  </p>
                  <p>
                    <a-icon type="environment" />
                    <span>广东省</span>
                    <span>珠海市</span>
                  </p>
                </div>
                <a-divider />
                <a-divider :dashed="true" />

                <div class="account-center-team">
                  <div class="teamTitle">团队</div>
                  <a-spin :spinning="teamSpinning">
                    <div class="members"></div>
                  </a-spin>
                </div>
              </a-card>
            </a-skeleton>
          </template>
          <a-button type="primary" @mouseenter="getUserInfo">Hover me</a-button>
        </a-popover>
        <p>Content</p>
      </a-skeleton>
    </template>
    <a-button type="primary" @mouseenter="getUserInfo">Hover me</a-button>
  </a-popover>
</template>

<script>
export default {
  data() {
    return {
      loading,
      tags: ["很有想法的", "专注设计", "辣~", "大长腿", "川妹子", "海纳百川"],
      tagInputVisible: false,
      tagInputValue: "",
      teams: [],
      teamSpinning: true,
      tabListNoTitle: [
        {
          key: "notification",
          tab: "通知"
        },
        {
          key: "message",
          tab: "消息"
        },
        {
          key: "backlog",
          tab: "待办"
        }
      ],
      noTitleKey: "notification"
    };
  }
};
</script>

<style>
</style>