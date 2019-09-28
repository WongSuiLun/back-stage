<template>
  <div class="content-warp">
    <a-row>
      <a-col :span="24">
        <div>
          <span>入住时间：</span>
          <a-range-picker @change="onChange" />
        </div>
        <div style="margin-top:10px">
          <span>会员等级：</span>
          <a-checkbox-group @change="onChange">
            <a-checkbox value="A">普通用户</a-checkbox>

            <a-checkbox value="B">青铜会员</a-checkbox>

            <a-checkbox value="C">白银会员</a-checkbox>

            <a-checkbox value="D">黄金会员</a-checkbox>

            <a-checkbox value="E">铂金会员</a-checkbox>
            <a-checkbox value="F">砖石会员</a-checkbox>
          </a-checkbox-group>
          <a-button type="primary">搜索</a-button>
        </div>
      </a-col>
    </a-row>
    <a-divider></a-divider>
    <div class="send-message">
      <div>
         <a-button
          type="primary"
          style="width:256px;background:rgb(255, 77, 79);border:none"
        >创建短信正文模板</a-button>
        <a-menu
          @click="handleClick"
          style="width: 256px"
          :defaultSelectedKeys="['1']"
          :openKeys.sync="openKeys"
          mode="inline"
        >
          <a-sub-menu key="sub2" @titleClick="titleClick">
            <span slot="title">
              <a-icon type="appstore" />
              <span>Navigation Two</span>
            </span>
            <a-menu-item key="5">Option 5</a-menu-item>
            <a-menu-item key="6">Option 6</a-menu-item>
            <a-sub-menu key="sub3" title="Submenu">
              <a-menu-item key="7">Option 7</a-menu-item>
              <a-menu-item key="8">Option 8</a-menu-item>
            </a-sub-menu>
          </a-sub-menu>
          <a-sub-menu key="sub4">
            <span slot="title">
              <a-icon type="setting" />
              <span>Navigation Three</span>
            </span>
            <a-menu-item key="9">Option 9</a-menu-item>
            <a-menu-item key="10">Option 10</a-menu-item>
            <a-menu-item key="11">Option 11</a-menu-item>
            <a-menu-item key="12">Option 12</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </div>
      <div class="message-box">
        <message-box></message-box>
      </div>
      <div>
        <user-list :data="data"></user-list>
      </div>
    </div>
    <a-row>
      <a-col :span="6">
       
      </a-col>
      <a-col :span="12">
        
      </a-col>
      <a-col :span="6">
        
      </a-col>
    </a-row>
  </div>
</template>

<script>
import UserList from "./components/UserList";
import MessageBox from "./components/MessageBox";
export default {
  components: {
    UserList,
    MessageBox
  },
  data() {
    return {
      current: ["mail"],
      openKeys: ["sub1"],
      data: [
        { uid: 21786, realname: "黄雅婷", phone: "13823047842" },
        { uid: 21788, realname: "张红梅", phone: "13527288412" },
        { uid: 21997, realname: "孙鑫", phone: "13750039047" },
        { uid: 22106, realname: "邓宝根", phone: "13420202838" },
        { uid: 22231, realname: "郭焕斌", phone: "13824463786" },
        { uid: 22322, realname: "苗花", phone: "13600440810" },
        { uid: 22496, realname: "黄瑞麟", phone: "13631231363" },
        { uid: 45286, realname: "麦丽华", phone: "13632646120" },
        { uid: 67773, realname: "傅静雯", phone: "18064635332" },
        { uid: 67828, realname: "李欢", phone: "13823156719" }
      ]
    };
  },
  methods: {
    onChange(date, dateString) {
      console.log(date, dateString);
    },
    handleClick(e) {
      console.log("click", e);
    },
    titleClick(e) {
      console.log("titleClick", e);
    }
  },
  watch: {
    openKeys(val) {
      console.log("openKeys", val);
    }
  }
};
</script>

<style lang="less" scoped>
  .send-message{
    display: flex;
    .message-box{
      flex-grow: 1;
    }
  }
</style>