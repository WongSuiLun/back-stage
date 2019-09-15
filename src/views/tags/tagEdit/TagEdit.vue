<template>
  <div class="content-warp">
     <a-select
    mode="tags"
    style="width: 80%"
    @change="handleSelectChange"
    placeholder="Tags Mode"
  >
    <a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">{{(i + 9).toString(36) + i}}</a-select-option>
  </a-select>
    <a-divider></a-divider>
      <a-spin :spinning="spinning">
    <a-transfer
      :dataSource="mockData"
      showSearch
      :listStyle="{
      width: ' calc(50% - 28px)',
      height: '600px',
    }"
      :targetKeys="[]"
      @change="handleChange"
      :render="renderItem"
    ></a-transfer>
      </a-spin>
  </div>
</template>

<script>
import { setTimeout } from 'timers';
import { getGoods } from "@/api/good";
export default {
  data() {
    return {
      mockData: [],
      targetKeys: [],
      spinning:false
    };
  },
  created() {

    getGoods().then(res=>{
      this.getMock(res.data.data.data);
      console.log(123)
      console.log(this.mockData)
    })
  },
  methods: {
    getMock(dataList) {
      const targetKeys = [];
      const mockData = [];
      for (let i = 0; i < dataList.length; i++) {
        const data = {
          key: i.toString(),
          title: `content${i + 1}`,
          description: `description of content${i + 1}`,
          chosen: Math.random() * 2 > 1,
          ...dataList[i]
        };
        if (data.chosen) {
          targetKeys.push(data.key);
        }
        mockData.push(data);
      }
      this.mockData = mockData;
      this.targetKeys = targetKeys;
    },
    renderItem(item) {
      const customLabel = (
        <span class="custom-item">
          <img src="http://test.00800.com.cn/data/upload/2017/1108/17/5a02d5496434953a6481.jpg"/>
          {item.name} - {item.description}
        </span>
      );

      return {
        label: customLabel, // for displayed item
        value: item.title // for title and filter matching
      };
    },
    handleChange(targetKeys, direction, moveKeys) {
      console.log(targetKeys, direction, moveKeys);
      this.targetKeys = targetKeys;
    },
    handleSelectChange(value) {
      console.log(`selected ${value}`);
      this.spinning = true
      setTimeout(()=>{
        this.spinning = false
      },1500)
    },
  }
};
</script>>

<style>
</style>