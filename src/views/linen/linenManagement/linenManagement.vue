<template>
    <div class="warp">
        <a-tabs defaultActiveKey="1" @change="callback">
            <a-tab-pane tab="布草类型列表" key="1">
                <a-button type="primary">搜索布草类型</a-button>
                
            </a-tab-pane>
            <a-tab-pane tab="添加布草类型" key="2" forceRender>

            </a-tab-pane>
        </a-tabs>
    </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    callback (key) {
      console.log(key)
    },
  },
}
</script>
<style lang="less" scoped>
.warp{
    background:#fff;
    padding: 20px 15px;
    min-height: 50vh;
}
</style>
