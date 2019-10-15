<template>
  <div>
    <a-list
      :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 6 }"
      itemLayout="vertical"
      size="large"
      :pagination="pagination"
      :dataSource="staffList"
    >
      <a-list-item slot="renderItem" slot-scope="item, index">
        <a-card hoverable>
          <img
            alt="example"
            src="http://test.00800.com.cn/pc/fc97322f333275886ff735f2d2d1214.jpg"
            slot="cover"
            width="100%"
            height="200px"
          />

          <template class="ant-card-actions" slot="actions">
            <a-icon type="setting" />
            <a-icon type="edit" />
            <a-icon type="ellipsis" />
          </template>
          <a-card-meta title="职位：前端组长" description="姓名：黄瑞麟"></a-card-meta>
        </a-card>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import { getStaff } from "@/api/staff";
import { getCompany, getContactCompany, getUserInfo } from "@/api/auth";
export default {
  data() {
    return {
      staffList: [],
      pagination: {
        onChange: page => {
          console.log(page);
        },
        pageSize: 12
      }
    };
  },
  created() {
    getStaff().then(res => {
      this.staffList = res.data.result;
    });
  }
};
</script>

<style>
</style>