<template>
  <div class="footer">
    <div class="links">
      <a
        href="https://pro.loacg.com/"
        target="_blank"
      >御温泉</a>
      <a href="https://ant.design/">励邦科技</a>
      <a href="https://vue.ant.design/">ant.design-vue</a>
    </div>
    <div class="copyright">
      Copyright
      <a-icon type="copyright" /> 2018 <span>励邦英雄技术组出品</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GlobalFooter',
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.footer {
  padding: 0 16px;
  margin: 48px 0 24px;
  text-align: center;

  .links {
    margin-bottom: 8px;

    a {
      color: rgba(0, 0, 0, 0.45);

      &:hover {
        color: rgba(0, 0, 0, 0.65);
      }

      &:not(:last-child) {
        margin-right: 40px;
      }
    }
  }
  .copyright {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }
}
</style>
