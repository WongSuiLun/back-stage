<template>
  <div class="company-choose">
    <a-card
      title="选择公司"
      :bordered="false"
    >
      <template slot="extra">

        <a-input-search
          placeholder="搜索公司"
          style="width: 200px;margin-right:8px"
          @search="onSearch"
        />

        <a-button type="primary">创建公司</a-button>
      </template>
      <a-row
        :gutter="16"
        class="company-row"
      >
        <a-col
          :md="24"
          :lg="12"
          :xl="8"
        >
          <a-card title="中国英德宝晶宫国际旅游度假村">
            <a-button
              type="danger"
              ghost
              slot="extra"
              @click="selectCompany"
            >进公司</a-button>
            <p>主体信息：英德天鹅湖有限公司</p>
            <p>状态：<a-tag color="#87d068">运营中</a-tag>
            </p>
            <p>有效期至：2020年10月17日</p>
          </a-card>
        </a-col>
        <a-col
          :md="24"
          :lg="12"
          :xl="8"
        >
          <a-card title="中国英德宝晶宫国际旅游度假村">
            <a-button
              type="danger"
              ghost
              slot="extra"
            >进公司</a-button>
            <p>主体信息：英德天鹅湖有限公司</p>
            <p>状态：<a-tag color="#87d068">运营中</a-tag>
            </p>
            <p>有效期至：2020年10月17日</p>
          </a-card>
        </a-col>
        <a-col
          :md="24"
          :lg="12"
          :xl="8"
        >
          <a-card title="中国英德宝晶宫国际旅游度假村">
            <a-button
              type="danger"
              ghost
              slot="extra"
            >进公司</a-button>
            <p>主体信息：英德天鹅湖有限公司</p>
            <p>状态：<a-tag color="#ccc">未营业</a-tag>
            </p>
            <p>有效期至：2020年10月17日</p>
          </a-card>
        </a-col>
      </a-row>
      <a-row
        :gutter="16"
        class="company-row"
      >
        <a-col
          :md="24"
          :lg="12"
          :xl="8"
        >
          <a-card title="中国英德宝晶宫国际旅游度假村">
            <a-button
              type="danger"
              ghost
              slot="extra"
            >进公司</a-button>
            <p>主体信息：英德天鹅湖有限公司</p>
            <p>状态：<a-tag color="#87d068">运营中</a-tag>
            </p>
            <p>有效期至：2020年10月17日</p>
          </a-card>
        </a-col>
        <a-col
          :md="24"
          :lg="12"
          :xl="8"
        >
          <a-card title="中国英德宝晶宫国际旅游度假村">
            <a-button
              type="danger"
              ghost
              slot="extra"
            >进公司</a-button>
            <p>主体信息：英德天鹅湖有限公司</p>
            <p>状态：<a-tag color="#87d068">运营中</a-tag>
            </p>
            <p>有效期至：2020年10月17日</p>
          </a-card>
        </a-col>
        <a-col
          :md="24"
          :lg="12"
          :xl="8"
        >
          <a-card title="中国英德宝晶宫国际旅游度假村">
            <a-button
              type="danger"
              ghost
              slot="extra"
            >进公司</a-button>
            <p>主体信息：英德天鹅湖有限公司</p>
            <p>状态：<a-tag color="#87d068">运营中</a-tag>
            </p>
            <p>有效期至：2020年10月17日</p>
          </a-card>
        </a-col>
      </a-row>
      <div class="pagination">
        <a-pagination
          v-model="current"
          :total="50"
        />
      </div>
    </a-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 1
    };
  },
  methods: {
    onSearch() {
      console.log("search");
    },
    selectCompany(){
      this.$router.push('/dashboard')
    }
  }
};
</script>
<style lang="less" scoped>
.company-choose {
  max-width: 1120px;
  width: 80%;
  margin: 0 auto;
  .company-row {
    margin: 15px 0;
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
