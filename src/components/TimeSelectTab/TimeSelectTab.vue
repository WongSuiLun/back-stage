<template>
  <div class="time-tab-warp">
    <!-- header -->
    <div class="tab-header">
      <div class="header-tab-and-time">
        <!-- {{tabList}} -->
        <div class="header-tab">
          <span
            class="tab-item"
            :class="{active:tab.key === activeKey}"
            v-for="tab in keyList"
            @click="changeTabKey(tab)"
            :key="tab.key"
          >
            {{tab.name}}
          </span>
        </div>
        <a-range-picker @change="onChange" />
      </div>
      <div class="header-setting">
        <a-icon
          type="up"
          class="action"
          style="font-size:20px;line-height:50px;"
          @click.native="toggleShowContent"
        />
        <a-icon
          type="setting"
          class="action"
          style="font-size:20px;line-height:50px;"
        />
      </div>
    </div>
    <!-- content -->
    <div v-show="showContent">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "time-select-tab",
  props: {
    tabList: {
      type: Array,
      required: true
    },
    defaultActiveKey: {
      type: String || Number,
      required: true
    }
  },
  data() {
    return {
      showContent: true,
      activeKey: "1",
      defaultSoltVNode: [],
      keyList: []
    };
  },
  created() {
    // console.log(this);
    this.handleChildrenKeys();
  },
  methods: {
    toggleShowContent() {
      this.showContent = !this.showContent;
    },
    handleChildrenKeys() {
      console.log(this.$slots.default);
      this.defaultSoltVNode = this.$slots.default;
      this.defaultSoltVNode.forEach(vnode => {
        this.keyList.push({
          key:vnode.key,
          name:vnode.componentOptions.propsData.tab
        });
      });
    },
    changeTabKey(tab){
      this.activeKey = tab.key
      // console.log(tab)
    },
    onChange(date, dateString){
      // console.log(date)
      // console.log(dateString)
      this.$emit('timeSelectOnChange',date,dateString)
    }
  }
};
</script>

<style lang="less" scoped>
@header_background: #f0f2f5;
@active_tab_color:#f36a5a;
.action {
  padding: 0 10px;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.time-tab-warp {
  border: 1px solid #eee;
  border-radius: 3px;
  width: 100%;
  display: flex;
  flex-direction: column;
  .tab-header {
    background: @header_background;
    height: 50px;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #eee;
    .header-tab-and-time {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .header-tab {
        height: 50px;
        .tab-item {
          cursor: pointer;
          line-height: 50px;
          padding:12px 16px;
          margin-right:16px;
          font-size: 16px;
          transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
          &.active{
            border-bottom: 3px solid @active_tab_color;
            color:@active_tab_color;
          }
        }
      }
    }
    .header-setting {
      width: 80px;
      display: flex;
      flex-wrap: nowrap;
    }
  }
}
</style>
