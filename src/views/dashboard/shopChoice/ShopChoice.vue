<template>
  <div class="shop-choose">
    <a-card title="选择店" :bordered="false">
      <template slot="extra">
        <a-input-search placeholder="搜索店" style="width: 200px;margin-right:8px" @search="onSearch" />

        <a-button type="primary">创建店</a-button>
      </template>
      <a-row :gutter="16">
        <a-col :md="24" :lg="12" :xl="8" v-for="(shop,index) in currentCompanyInfo" :key="index">
          <a-card class="shop-card">
            <div slot="title">
              <a-icon type="shop" style="font-size:30px;color:blue;margin-right:8px" />
              {{shop.name}}
            </div>
            <a-button type="danger" ghost slot="extra" @click="selectShop(shop)">进店</a-button>
            <p
              style="text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;"
            >主体信息：{{shop.main_info}}</p>
            <p>
              状态：
              <a-tag color="#87d068" v-if="shop.status == 'success'">运营中</a-tag>
              <a-tag color="#ccc" v-else>未营业</a-tag>
            </p>
            <p>有效期至：{{shop.indate}}</p>
            <div class="shop-choose-action">
              <a href="#">修改</a>
              <a href="#" @click="showDeleteCompanyModal">删除</a>
            </div>
          </a-card>
        </a-col>
      </a-row>
      <div class="pagination">
        <a-pagination
          v-model="current"
          showSizeChanger
          @change="onPageChange"
          @showSizeChange="onShowSizeChange"
          :total="pageCount"
        />
      </div>
    </a-card>
    <!-- 删除模态框 -->
    <a-modal
      title="提示"
      :visible="deleteModalVisible"
      centered
      @ok="handleDeleteComapny"
      :confirmLoading="confirmDeleteCompanyLoading"
      @cancel="handleCancel"
    >
      <p style="color:red">删除店铺，所有店铺相关信息丢失，店铺购买的应用和业务失效且不予退款，请谨慎操作！</p>
      <p>短信验证码：</p>
      <a-form
        id="components-form-demo-normal-login"
        :form="form"
        class="user-layout-login"
        @submit="handleSubmit"
      >
        <a-row :gutter="16">
          <a-col class="gutter-row" :span="16">
            <a-input
              size="large"
              type="text"
              placeholder="验证码"
              v-decorator="['captcha_code', {rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}]"
            >
              <a-icon slot="prefix" type="message" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-col>
          <a-col class="gutter-row" :span="8">
            <a-button
              type="primary"
              size="large"
              class="getCaptcha"
              tabindex="-1"
              v-text=" '获取验证码'"
            ></a-button>
          </a-col>
        </a-row>
        <a-form-item>
          <a-radio>已知晓删除店铺的风险，确定删除</a-radio>
        </a-form-item>
      </a-form>
      <template slot="footer">
        <a-button key="back" type="danger" @click="handleCancel">删除</a-button>
        <a-button key="submit" type="primary">取消</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
import { getInstitutions } from "@/api/institutions";
export default {
  data() {
    return {
      current: 1,
      page: "",
      pageSize: 10,
      confirmDeleteCompanyLoading: false,
      deleteModalVisible: false,
      shopListBackup: [],
      shopList: []
    };
  },
  /**
   * 1.处理组件初始化，拉取公司数据
   */
  beforeCreate() {
    this.form = this.$form.createForm(this);
    getInstitutions().then(res => {
      this.shopList = res.data.data;
      this.shopListBackup = this.shopList.slice();
    });
  },
  computed: {
    pageCount() {
      return this.shopList.length;
    },
    currentCompanyInfo() {
      let start = (this.current - 1) * this.pageSize;
      let end =
        start + this.pageSize >= this.shopList.length
          ? this.shopList.length
          : start + this.pageSize;
      return this.shopList.slice(start, end);
    }
  },
  methods: {
    onSearch(value) {
      this.shopList = this.shopListBackup.filter(shop => {
        return shop.name.includes(value);
      });
    },
    selectShop(shop) {
      this.$ls.set("shop", shop);
      this.$store.dispatch("ResetRouter").then(res => {
        this.$store.dispatch('setShop',shop)
       
      }).then(res=>{
         this.$router.push("/shop/dashboard");
      });
    },
    showDeleteCompanyModal() {
      this.deleteModalVisible = true;
    },
    onPageChange(page, pageSize) {
      console.log(page);
      console.log(pageSize);
    },
    onShowSizeChange(current, size) {
      this.current = current;
      this.pageSize = size;
    },
    handleDeleteComapny() {},
    handleCancel() {
      this.deleteModalVisible = false;
    },
    handleSubmit() {}
  }
};
</script>
<style lang="less" scoped>
.shop-choose {
  margin: 0 auto;
  .shop-card {
    margin: 15px 0;
    .shop-choose-action {
      a {
        margin: 0 8px;
      }
    }
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
