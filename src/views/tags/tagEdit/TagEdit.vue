<template>
  <div class="content-warp">
    <a-select mode="tags" style="width: 80%" @change="handleSelectChange" placeholder="请选择标签">
      <a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">{{(i + 9).toString(36) + i}}</a-select-option>
    </a-select>
    <a-divider></a-divider>
    <a-spin :spinning="spinning">
      <a-transfer
        :titles="['未上标签商品', '已上标签商品']"
        :dataSource="mockData"
        showSearch
        :listStyle="{
      width: ' calc(50% - 28px)',
      height: '600px',
    }"
        :targetKeys="targetKeys"
        @change="handleChange"
        :render="renderItem"
        :filterOption="filterOption"
      ></a-transfer>
    </a-spin>
  </div>
</template>

<script>
import { setTimeout } from "timers";
import { getGoods } from "@/api/good";
export default {
  data() {
    return {
      mockData: [],
      targetKeys: [],
      spinning: false
    };
  },
  created() {
    getGoods(1,'all').then(res => {
      this.setData(res.data.data.data);
    });
  },
  methods: {
    //设置商品到左边,
    //Todo 如果过滤出含有标签的商品
    setData(dataList) {
      const targetKeys = [];
      const mockData = [];
      for (let i = 0; i < dataList.length; i++) {
        const data = {
          key: i.toString(),
          title: dataList[i].name,
          description: dataList[i].description,
          chosen: false,
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
          
          <span style="font-size:16 px;font-weight:700">{item.name}</span> - <span>{item.name2}</span>
        </span>
      );

      return {
        label: customLabel, // for displayed item
        value: item.name // for title and filter matching
      };
    },
    handleChange(targetKeys, direction, moveKeys) {
      console.log(targetKeys, direction, moveKeys);
      this.targetKeys = targetKeys;
    },
    handleSelectChange(value) {
      console.log(`selected ${value}`);
      this.spinning = true;
      setTimeout(() => {
        this.spinning = false;
      }, 1500);
    },
    //处理搜索
    filterOption(inputValue, option) {
      return option.name.indexOf(inputValue) > -1;
    }
  }
};
</script>>

<style>
</style>