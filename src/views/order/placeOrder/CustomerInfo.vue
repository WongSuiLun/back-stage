<template>
  <div class="customer-info">
    <under-line lineColor="red">
      <div slot="left">
        入住人
      </div>
    </under-line>
    <div class="customer-list">
      <a-popover
        title="添加入住人"
        class="add-customer"
        trigger="click"
        v-model="addCustomerPopoverVisible"
      >
        <template slot="content">
          <a-form
            :form="form"
            @submit="handleSubmit"
          >
            <a-form-item
              label="姓名"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-input v-decorator="[
          'name',
          {rules: [{ required: true, message: '姓名不能为空!' }]}
        ]" />
            </a-form-item>
            <a-form-item
              label="电话名"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
            >
              <a-input v-decorator="[
          'phone',
          {rules: [{ required: true, message: '手机不能为空!' }]}
        ]" />
            </a-form-item>
            <a-form-item :wrapper-col="{ span:24 }">
              <div style="display: flex;justify-content: flex-end;">
                <a-button
                  type="danger"
                  @click="addCustomerPopoverVisible=false"
                  ghost
                  style="margin-right:10px;"
                >
                  关闭
                </a-button>
                <a-button
                  type="primary"
                  html-type="submit"
                >
                  添加
                </a-button>
              </div>
            </a-form-item>
          </a-form>
        </template>

        <a-button
          type="primary"
          shape="circle"
          icon="plus"
          @click="addCustomerPopoverVisible=true"
          style="background:red;border:0"
        />
      </a-popover>
      <a-checkbox-group
        class="check-list"
        :options="customerOption"
        v-model="checkedList"
        @change="onChange"
      />
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
      formLayout: "horizontal",
      form: this.$form.createForm(this),
      addCustomerPopoverVisible: false,
      checkedList: [],
      customerOption: ["刘光光 15919289957", "刘光业 15919289957"]
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.customerOption.push(values.name + " " + values.phone);
          console.log("Received values of form: ", values);
        }
      });
    },
    onChange(checkedList) {
      console.log(checkedList);
    }
  }
};
</script>

<style lang="less" scoped>
.customer-info {
  .customer-list {
    display: flex;
    margin-top: 10px;
    margin-left: 10px;
    .add-customer {
      min-width: 32px;
    }
    .check-list {
      margin: 5px 20px;
    }
  }
  .action {
    display: flex;
    justify-content: flex-end;
  }
}
</style>

