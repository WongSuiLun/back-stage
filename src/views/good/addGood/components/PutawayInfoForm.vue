 <template>
  <div>
    <a-form :form="form">
      <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="跳过日历选择">
        <a-switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
      </a-form-item>
      <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="商品上架日期">
        <div class="form-item">
          <a-radio-group>
            <a-radio :style="radioStyle" :value="1">立即上架售卖</a-radio>
            <a-radio :style="radioStyle" :value="2">暂不售卖,放入仓库</a-radio>
            <a-radio :style="radioStyle" :value="3">
              <span class="text">设定在</span>
              <a-range-picker />
              <span class="text">内售卖</span>
            </a-radio>
          </a-radio-group>
        </div>
      </a-form-item>
      <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="起始预定日期">
        <div class="form-item">
          <a-radio-group>
            <a-radio :style="radioStyle" :value="1">长期</a-radio>
            <a-radio :style="radioStyle" :value="2">
              <span class="text">设定在</span>
              <a-range-picker />
              <span class="text">内预定有效</span>
            </a-radio>
          </a-radio-group>
        </div>
      </a-form-item>
      <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="不可预定日期">
        <div class="form-item">
          <a-range-picker />
          <a-button shape="circle" icon="plus" size="small" style="margin-left:5px" />
        </div>
      </a-form-item>
      <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="每日销售时间">
        <div class="form-item">
          <a-radio-group>
            <a-radio :style="radioStyle" :value="1">不限制</a-radio>
            <a-radio :style="radioStyle" :value="2">
              <a-range-picker />
            </a-radio>
          </a-radio-group>
        </div>
      </a-form-item>
      <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="每日销售数量">
        <div class="form-item">
          <a-radio-group>
            <a-radio :style="radioStyle" :value="1">不限制</a-radio>
            <a-radio :style="radioStyle" :value="2">
              每日最多销售
              <a-input-number :min="1" :max="10" />
              <span class="text">份</span>
            </a-radio>
          </a-radio-group>
        </div>
      </a-form-item>
      <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="单用户购买限制">
        <div class="form-item">
          <a-radio-group>
            <a-radio :style="radioStyle" :value="1">不限制</a-radio>
            <a-radio :style="radioStyle" :value="2">
              <span class="text">日期:</span>
              <a-range-picker />
            </a-radio>
            <a-radio :style="radioStyle" :value="3" style="margin-top:10px">
              <span class="text">商品：</span>
              <a-input-number :min="1" :max="10" />
              <span class="text">份</span>
            </a-radio>
          </a-radio-group>
        </div>
      </a-form-item>
      <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="使用有效期">
        <div class="form-item">
          <a-radio-group>
            <a-radio :style="radioStyle" :value="1">购买成功后立即生效</a-radio>
            <a-radio :style="radioStyle" :value="2">
              <span class="text">购买成功后:</span>
              <a-input-number :min="1" :max="10" />
              <span class="text">天有效</span>
            </a-radio>
            <a-radio :style="radioStyle" :value="3" style="margin-top:10px">
              <span class="text">购买成功后：</span>
              <a-range-picker />
              <span class="text">内有效</span>
            </a-radio>
          </a-radio-group>
        </div>
      </a-form-item>
      <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="房间入住人数">
        <div class="form-item">
          <a-input-number :min="1" :max="10" />
        </div>
      </a-form-item>
      <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="允许接车人数">
        <div class="form-item">
          <a-input-number :min="1" :max="10" />
        </div>
      </a-form-item>
      <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="允许现金支付">
        <div class="form-item">
          <a-input-number :min="1" :max="10" :disabled="true" /><span class="text">元</span>
          <a-switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
        </div>
      </a-form-item>
      <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="会员本人价格">
        本人立减
        <a-input-number :min="1" :max="10" :disabled="true" /><span class="text">元</span>
        <a-switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
      </a-form-item>
      <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="允许积分支付">
        <div class="form-item">
          <a-radio-group>
            <a-radio :style="radioStyle" :value="1">不限制</a-radio>
            <a-radio :style="radioStyle" :value="2">
              <span class="text">日期:</span>
              <a-range-picker />
            </a-radio>
            <a-radio :style="radioStyle" :value="3" style="margin-top:10px">
              <span class="text">商品：</span>
              <a-input-number :min="1" :max="10" />
              <span class="text">份</span>
            </a-radio>
          </a-radio-group>
        </div>
      </a-form-item>
      <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="积分限购类型">
        <div class="form-item">
          <a-radio-group>
            <a-radio :style="radioStyle" :value="1">不限购</a-radio>
            <a-radio :style="radioStyle" :value="2">
                <span class="form-item">每日限购</span>
                 <a-input-number :min="1" :max="10" />
                <span class="form-item">份</span>

            </a-radio>
            <a-radio :style="radioStyle" :value="3">
                  <span class="form-item">每天限购</span>
                 <a-input-number :min="1" :max="10" />
                <span class="form-item">份</span>
            </a-radio>
            <a-radio :style="radioStyle" :value="4">商品</a-radio>
          </a-radio-group>
        </div>
      </a-form-item>
      <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="退款政策">
        <div class="form-item">
          <a-radio-group>
            <a-radio :style="radioStyle" :value="1">允许买家申请退款</a-radio>
            <a-radio :style="radioStyle" :value="2">不允许买家申请退款</a-radio>
          </a-radio-group>
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>
 
 <script>
export default {
  data() {
    return {
      form: {},
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
        md: { span: 2 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      },
      radioStyle: {
        display: "block",
        height: "30px",
        lineHeight: "30px",
      }
    };
  }
};
</script>
<style lang="less" scoped>
.form-item {
  padding: 5px;
}
.text {
  margin: 0 5px;
}
</style>