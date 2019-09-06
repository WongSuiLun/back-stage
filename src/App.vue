<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <router-view></router-view>
    </div>
  </a-locale-provider>
</template>

<script>
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import { AppDeviceEnquire } from "@/utils/mixin";
export default {
  name: "app",
  mixins: [AppDeviceEnquire],
  data() {
    return {
      locale: zhCN
    };
  },
  mounted() {}
};
</script>
<style lang="less">
@import "./styles/global.less";
p {
  margin: 0;
}
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 10px; /*滚动条宽度*/
  height: 8px; /*滚动条高度*/
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 0px rgba(0, 0, 0, 0.5);
  border-radius: 10px; /*滚动条的背景区域的圆角*/
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  /*滚动条的圆角*/
  // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color: #cccccc; /*滚动条的背景颜色*/
}
</style>

