<template>
  <div class="content-warp">
    <a-select
      mode="multiple"
      style="width: 80%"
      @change="handleSelectChange"
      placeholder="请选择标签"
      :disabled="selectDisabled"
      :tokenSeparators="[',','，',';','；']"
    >
      <a-icon slot="suffixIcon" type="meh" />
      <a-select-option v-for="i in tagOptions" :key="i.id.toString()">{{i.title}}</a-select-option>
    </a-select>
    <a-divider></a-divider>
    <a-spin :spinning="spinning">
      <a-transfer
        :titles="['未上标签商品', '已上标签商品']"
        :dataSource="mockData"
        showSearch
        :disabled="transferDisabled"
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
import {
  deleteTag,
  getTags,
  getTagsGood,
  addTagGoods,
  deleteTagGood
} from "@/api/tag";
export default {
  data() {
    return {
      mockData: [],
      targetKeys: [],
      tagOptions: [],
      targetTags: [],
      spinning: false,
      selectDisabled: false,
      transferDisabled: true
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.targetKeys = []
      let companyId = this.$ls.get("company").id;
      getGoods(companyId, "all").then(res => {
        this.setData(res.data.data.data);
      });
      getTags().then(res => {
        this.tagOptions = res.data;
        console.log(res);
        console.log(this.tagOptions);
      });
    },
    //设置商品到左边,
    //Todo 如果过滤出含有标签的商品
    setData(dataList) {
      const targetKeys = [];
      const mockData = [];
      for (let i = 0; i < dataList.length; i++) {
        const data = {
          key: dataList[i].no.toString(),
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
      // this.targetKeys = targetKeys;
    },
    renderItem(item) {
      const customLabel = (
        <span class="custom-item">
          <span style="font-size:16 px;font-weight:700">{item.name}</span> -{" "}
          <span>{item.name2}</span>
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
      this.transferDisabled = true;
      this.spinning = true;
      if (direction == "right") {
        addTagGoods({
          type: "goods",
          labels: this.targetTags,
          ids: moveKeys
        }).then(res => {
          this.$message.success("添加成功");
          this.transferDisabled = false;
          this.spinning = false;
        });
      }
      if (direction == "left") {
        deleteTagGood({ type: "goods", labels: this.targetTags, ids: moveKeys })
          .then(res => {
            this.$message.success("删除成功");
          })
          .catch(err => {
            this.$message.error("删除失败");
          })
          .then(res => {
            this.transferDisabled = false;
            this.spinning = false;
          });
      }
    },
    handleSelectChange(value) {
      this.targetTags = value;
      this.spinning = true;
      if (this.targetTags.length == 0) {
        this.selectDisabled = false;
        this.transferDisabled = false;
        this.spinning = false;
        this.init();
      } else {
        getTagsGood({ labels: value }).then(res => {
          this.targetKeys = res.data.map(ele => ele.toString());
          console.log(res.data);
          this.selectDisabled = false;
          this.transferDisabled = false;
          this.spinning = false;
        });
      }
    },
    //处理搜索
    filterOption(inputValue, option) {
      return option.name.indexOf(inputValue) > -1;
    }
  },
  watch: {
    $route: function(newVal) {
      this.init();
    }
  }
};
</script>>

<style>
</style>