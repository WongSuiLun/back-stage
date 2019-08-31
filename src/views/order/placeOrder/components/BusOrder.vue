<template>
  <div>
    <under-line lineColor="red">
      <div slot="left">接车信息</div>
    </under-line>
    <div>
      <a-tabs defaultActiveKey="1">
        <a-tab-pane tab="来御温泉" key="1">
          <div class="bus-info-item">
            <a-row>
              <a-col :xs="24" :sm="24" :md="12" :lg="6">
                <div class="input-item">
                  <span class="label">日期:</span>
                  <a-date-picker @change="dateChange"/>
                </div>
              </a-col>
              <a-col :xs="24" :sm="24" :md="12" :lg="6">
                <div class="input-item">
                  <span class="label">路线:</span>
                  <a-select
                    :defaultValue="pathOptions[0].label"
                    style="width: 180px"
                    v-model="pathValue"
                    @change="handleChange"
                  >
                    <a-select-option
                      v-for="path in pathOptions"
                      :value="path.value"
                      :key="path.value"
                    >{{path.label}}</a-select-option>
                  </a-select>
                </div>
              </a-col>
              <a-col :xs="24" :sm="24" :md="12" :lg="6">
                <div class="input-item">
                  <span class="label">时间:</span>
                  <a-select
                    :defaultValue="timeOptions[0]"
                    style="width: 180px"
                    v-model="timeValue"
                    @change="handleChange"
                  >
                    <a-select-option v-for="time in timeOptions" :value="time" :key="time">{{time}}</a-select-option>
                  </a-select>
                </div>
              </a-col>
              <a-col :xs="24" :sm="24" :md="12" :lg="6">
                <div class="center input-item">
                  <span class="label">数量:</span>
                  <a-input-number :min="1" :max="10" v-model="busNum"/>
                  <a-button type="primary" style="margin-left:10px">添加</a-button>
                </div>
              </a-col>
            </a-row>
          </div>
          <div class="bus-info-item">
            <div>
              <span class="label">乘客</span>
              <a-checkbox-group
                class="check-list"
                :options="customerOption"
                v-model="checkedList"
                @change="onChange"
              />
            </div>
          </div>
          <div class="bus-info-item">
            <div>
              <span class="label">路线：</span>
              拱北轻轨站-御温泉
            </div>
            <div>
              <span class="label">乘客：</span>
              刘光光
            </div>
            <div>
              <span class="label">出发时间：</span>
              2019-04-28 11：30
            </div>
            <div>
              <a-button type="primary">删除</a-button>
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane tab="回珠海" key="2" forceRender>Content of Tab Pane 2</a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import { UnderLine } from "@/components";
export default {
  components: {
    UnderLine
  },
  data() {
    return {
      pathValue: "",
      timeValue: "",
      busNum: 1,
      pathOptions: [
        { value: 1, label: "拱北轻轨站-御温泉" },
        { value: 2, label: "香洲港-御温泉" }
      ],
      timeOptions: ["11:30", "2:30", "4:30"],
      checkedList: [],
      customerOption: ["刘光光 15919289957", "刘光业 15919289957"]
    };
  },
  methods: {
    dateChange() {},
    handleChange(e) {
      console.log(e);
    },
    onChange() {}
  }
};
</script>
<style lang="less" scoped>
.bus-info-item {
  border-bottom: 1px solid #ddd;
  padding: 5px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .label {
    font-weight: 700;
    font-size: 16px;
    margin-left: 15px;
    margin-right: 8px;
    line-height: 32px;
  }
}
.center {
  display: flex;
  justify-content: center;
  align-content: center;
}
.input-item {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 250px;
  padding: 15px 0;
}
</style>

