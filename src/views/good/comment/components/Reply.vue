<template>
  <div style="reply">
    <a>{{info.reply_mid}}:</a>
    <span class="time">(回复时间{{info.reply_time}})</span>
    <br />
    {{info.reply_content}}
  </div>
</template>

<script>
export default {
  props: {
    info: Object
  }
};
</script>

<style lang="less" scoped>
.reply {
}
.time {
  color: red;
  margin-left: 8px;
}
</style>