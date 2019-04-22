<template>
  <div class="user-warpper">
    <div class="content-box">
      <span class="action">
        <a-badge count="12">
          <a-icon
            style="font-size: 16px; padding: 4px"
            type="bell"
          />
        </a-badge>
      </span>
      <a-dropdown>
        <span class="action ant-dropdown-link user-dropdown-menu">
          <a-avatar class="avatar" />
          <span class="nickname">{{`蔡思佳`}}</span>
        </span>
        <a-menu
          slot="overlay"
          class="user-dropdown-menu-wrapper"
        >
          <a-menu-item key="0">
            <router-link :to="{ name: 'center' }">
              <a-icon type="user" />
              <span>个人中心</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="1">
            <router-link :to="{ name: 'settings' }">
              <a-icon type="setting" />
              <span>账户设置</span>
            </router-link>
          </a-menu-item>
          <a-menu-item
            key="2"
            disabled
          >
            <a-icon type="setting" />
            <span>测试</span>
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item key="3">
            <a
              href="javascript:;"
              @click="handleLogout"
            >
              <a-icon type="logout" />
              <span>退出登录</span>
            </a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    handleLogout () {
      const that = this

      this.$confirm({
        title: '提示',
        content: '真的要注销登录吗 ?',
        onOk () {
          return that.Logout({}).then(() => {
            window.location.reload()
          }).catch(err => {
            that.$message.error({
              title: '错误',
              description: err.message
            })
          })
        },
        onCancel () {
        }
      })
    }
  }
};
</script>

<style lang="less" scoped>
.user-warpper {
  padding: 0 20px;
}

.action {
  cursor: pointer;
  padding: 0 12px;
  display: inline-block;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  height: 100%;
  color: rgba(0, 0, 0, 0.65);
  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }
}
.user-dropdown-menu {
  .nickname {
    padding: 0 15px;
    font-size: 16px;
  }
}
</style>

