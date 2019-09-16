<template>
  <div>
    <a-list
      size="large"
      :pagination="pagination"
      :dataSource="data"
       itemLayout="vertical"
       :grid="{ gutter: 8, xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 4}"
    >
      <div slot="header">
        <a-input-search placeholder="搜索优惠券" style="width: 200px" @search="onSearch" />
      </div>
      <a-list-item slot="renderItem" slot-scope="item, index">
        <Coupon></Coupon>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import { Coupon } from "@/components";
const data = [
  {
    title: 'Title 1',
  },
  {
    title: 'Title 2',
  },
  {
    title: 'Title 3',
  },
  {
    title: 'Title 4',
  },
  {
    title: 'Title 5',
  },
  {
    title: 'Title 6',
  },
]
export default {
  components: {
    Coupon
  },
  data() {
    return {
        data,
      pagination: {
        onChange: page => {
          console.log(page);
        },
        pageSize: 12
      },
      actions: [
        { type: "star-o", text: "156" },
        { type: "like-o", text: "156" },
        { type: "message", text: "2" }
      ]
    };
  },
  methods: {
    onSearch() {
      console.log("搜索");
    }
  }
};
</script>

<style>
</style>