<template>
  <div class="content">
    <div class="content-item">商品类型</div>
    <div>
      <radio-box :items="items" v-model="activeGoodType"></radio-box>
    </div>
    <div class="content-item">产品基本信息</div>
    <div>
      <a-form :form="form">
        <!-- <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          label="编号"
          validate-status="error"
        >
          <a-input
            id="error"
            placeholder="unavailable choice"
            v-decorator="[
            'storeNo',
            {
              rules: [{ required: true, message: 'Username is required!' }],
            }
          ]"
          />
        </a-form-item> -->

        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="部门">
          <a-select
            defaultValue="a1"
            v-decorator="[
            'storeNo',
            {
              rules: [{ required: true, message: 'Username is required!' }],
            }]"
            style="width: 200px"
          >
            <a-select-option
              v-for="i in 25"
              :key="(i + 9).toString(36) + i"
            >{{(i + 9).toString(36) + i}}</a-select-option>
          </a-select>
          <a-select
            defaultValue="a1"
            v-decorator="[
            'storeNo',
            {
              rules: [{ required: true, message: 'Username is required!' }],
            }]"
            style="width: 200px"
          >
            <a-select-option
              v-for="i in 25"
              :key="(i + 9).toString(36) + i"
            >{{(i + 9).toString(36) + i}}</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="商品类目">
          <a-select
            defaultValue="a1"
            v-decorator="[
            'storeType',
            {
              rules: [{ required: true, message: 'Username is required!' }],
            }]"
            style="width: 200px"
          >
            <a-select-option
              v-for="i in 25"
              :key="(i + 9).toString(36) + i"
            >{{(i + 9).toString(36) + i}}</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="房间类型">
          <a-select
            defaultValue="a1"
            v-decorator="[
            'type_id',
            {
              rules: [{ required: true, message: 'Username is required!' }],
            }]"
            style="width: 200px"
          >
            <a-select-option
              v-for="i in 25"
              :key="(i + 9).toString(36) + i"
            >{{(i + 9).toString(36) + i}}</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="商品名称">
          <a-input
            id="error"
            placeholder="unavailable choice"
            v-decorator="[
            'name',
            {
              rules: [{ required: true, message: 'name is required!' }],
            }
          ]"
          />
        </a-form-item>
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="商品副标题">
          <a-input
            id="error"
            placeholder="商品副标题"
            v-decorator="[
            'name1',
            {
              rules: [{ required: true, message: 'name is required!' }],
            }
          ]"
          />
        </a-form-item>

        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="商品标签">
          <a-row>
            <a-col :span="18">
              <a-tag v-for="tag in tags" :key="`tag${tag.name}`">{{tag.name}}</a-tag>
            </a-col>
            <a-col :span="6">
              <a-row>
                <a-col :span="12">
                  <a-input></a-input>
                </a-col>
                <a-col :span="12">
                  <a-button type="primary">添加标签</a-button>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
        </a-form-item>


        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="商品亮点">
          <a-row>
            <a-col :span="18">
              <a-input></a-input>
            </a-col>
            <a-col :span="6">
              <a-button type="primary">添加</a-button>
            </a-col>
          </a-row>
        </a-form-item>

        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="分享描述">
          <a-input id="validating" placeholder="I'm the content is being validated" />
        </a-form-item>
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="商品图片">
          <!-- <under-line></under-line> -->
          <PicUpload v-model="imgList" :max="8"></PicUpload>
        </a-form-item>
      </a-form>
    </div>
    <div class="content-item">微信分享</div>
    <div>
      <a-form :form="wechatShareForm">
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="分享标题" >
          <a-input id="validating" placeholder="" />
          <slot name="help"><span style="clolr:#ccc">微信分享给好友时显示，建议38个字以内<span style="color:#009804;">&nbsp;&nbsp;查看示例&nbsp;&nbsp;</span></span></slot>
        </a-form-item>

        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="分享描述">
          <a-input id="validating" placeholder="I'm the content is being validated" />
           <slot name="help"><span style="clolr:#ccc">微信分享给好友时显示，建议38个字以内<span style="color:#009804;">&nbsp;&nbsp;查看示例&nbsp;&nbsp;</span></span></slot>
        </a-form-item>
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="分享图片">
          <!-- <under-line></under-line> -->
          <PicUpload v-model="imgList" :max="1"></PicUpload>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import { PicUpload, RadioBox } from "@/components";
import { mapGetters, mapState } from "vuex";
export default {
  components: {
    PicUpload,
    RadioBox
  },
  data() {
    return {
      items: [
        { title: "电子商品", sub_title: "（无需地址）" },
        { title: "实物商品", sub_title: "（需要地址）" },
        { title: "积分商品", sub_title: "" }
      ],
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
        md: { span: 2 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      },
      previewVisible: false,
      previewImage: "",
      imgList: [],
      fileList: [
        {
          uid: "-1",
          name: "xxx.png",
          status: "done",
          url:
            "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        }
      ],
      btnItems: ["1", "2", "3"],
      activeGoodType: "",
      form: "",
      wechatShareForm:""
    };
  },
  created() {
    this.form = this.$form.createForm(this, {
      onFieldsChange: (_, changedFields) => {
        this.$emit("change", changedFields);
      },
      mapPropsToFields: () => {
        return {
          storeNo: this.$form.createFormField({
            value: this.storeNo
          }),
          name: this.$form.createFormField({
            value: this.name
          }),
          name1: this.$form.createFormField({
            value: this.name1
          }),
          tags: this.$form.createFormField({
            value: this.tags
          })
        };
      },
      onValuesChange: (_, values) => {
        console.log(values);
        // Synchronize to vuex store in real time
        this.$store.commit("SET_FORM", values);
      }
    });
  },
  computed: {
    ...mapState({
      storeNo: state => state.addGood.storeNo,
      name: state => state.addGood.name,
      name1: state => state.addGood.name1,
      tags: state => state.addGood.tags
    })
  },
  watch: {
    imgList(val) {
      console.log(val);
    },
    storeNo(val) {
      console.log("this.$store.state.storeNo: ", val);
      this.form.setFieldsValue({ storeNo: val });
    },
    name(val) {
      console.log("this.$store.state.storeNo: ", val);
      this.form.setFieldsValue({ name: val });
    }
  },
  methods: {
    handleCancel() {
      this.previewVisible = false;
    },
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      this.fileList = fileList;
    }
  }
};
</script>

<style lang="less" scoped>
.content {
  .content-item {
    padding: 5px 8px;
    font-size: 16px;
    font-weight: 500;
    color: #000;
    background: #f6f6f6;
    margin: 8px 0;
  }
}
</style>

