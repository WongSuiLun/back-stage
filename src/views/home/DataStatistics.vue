<template>
  <div>
    <time-select-tab defaultActiveKey="1" :tabList="tabList" @timeSelectOnChange="timeChange">
      <time-select-tab-pane tab="全部" key="1">
        1
      </time-select-tab-pane>
      <time-select-tab-pane tab="云来客栈" key="2">
        2
      </time-select-tab-pane>
      <time-select-tab-pane tab="御瀛庄" key="3">
        2
      </time-select-tab-pane>
      <time-select-tab-pane tab="温泉" key="4">
        2
      </time-select-tab-pane>
      <time-select-tab-pane tab="餐饮" key="5">
        2
      </time-select-tab-pane>
    </time-select-tab>

  </div>
</template>

<script>
import {TimeSelectTab,TimeSelectTabPane} from '@/components'
export default {
  components: {
    TimeSelectTab,
    TimeSelectTabPane
  },
  data () {
    return {
      tabList: [{
        key: 'tab1',
        // tab: 'tab1',
        scopedSlots: { tab: 'customRender'}
      }, {
        key: 'tab2',
        tab: 'tab2',
      }],
      contentList: {
        tab1: 'content1',
        tab2: 'content2',
      },
      tabListNoTitle: [{
        key: 'article',
        tab: 'article',
      }, {
        key: 'app',
        tab: 'app',
      }, {
        key: 'project',
        tab: 'project',
      }],
      key: 'tab1',
      noTitleKey: 'app',
    }
  },
  methods: {
    onTabChange (key, type) {
      console.log(key, type)
      this[type] = key
    },
    timeChange(date,dateString){
      console.log(date)
      console.log(dateString)
    }
  },
};
</script>

<style>
</style>
