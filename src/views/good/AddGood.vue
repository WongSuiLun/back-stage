<template>
  <div class="add-good">
    <a-steps>
      <a-step status="finish" title="编辑基础信息">
        <a-icon type="user" slot="icon"/>
      </a-step>
      <a-step status="finish" title="编辑价格日历">
        <a-icon type="solution" slot="icon"/>
      </a-step>
      <a-step status="process" title="编辑详情页面">
        <a-icon type="loading" slot="icon"/>
      </a-step>
      <a-step status="wait" title="完成">
        <a-icon type="smile-o" slot="icon"/>
      </a-step>
    </a-steps>
    <div class="content">
      <div class="content-item">商品类型</div>
      <div class="content-item">产品基本信息</div>
      <div>
        <a-form>
          <a-form-item
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            label="编号"
            validate-status="error"
            help="Should be combination of numbers & alphabets"
          >
            <a-input id="error" placeholder="unavailable choice"/>
          </a-form-item>

          <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="部门">
            <a-select defaultValue="a1" style="width: 200px">
              <a-select-option
                v-for="i in 25"
                :key="(i + 9).toString(36) + i"
              >{{(i + 9).toString(36) + i}}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="房间类型">
            <a-select defaultValue="a1" style="width: 200px">
              <a-select-option
                v-for="i in 25"
                :key="(i + 9).toString(36) + i"
              >{{(i + 9).toString(36) + i}}</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="商品名称">
            <a-input id="validating" placeholder="I'm the content is being validated"/>
          </a-form-item>
          <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="商品副标题">
            <a-input id="validating" placeholder="I'm the content is being validated"/>
          </a-form-item>
          <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="分享描述">
            <a-input id="validating" placeholder="I'm the content is being validated"/>
          </a-form-item>
          <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="商品图片">
            <!-- <under-line></under-line> -->
            <PicUpload v-model="imgList" :max="8"></PicUpload>
          </a-form-item>  
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
import { PicUpload } from "@/components";
export default {
  components: {
    PicUpload
  },
  data() {
    return {
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
      imgList:[],
      fileList: [
        {
          uid: "-1",
          name: "xxx.png",
          status: "done",
          url:
            "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        }
      ]
    };
  },
  watch:{
    imgList(val){
      console.log(val)
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
.add-good {
  background: #fff;
  min-height: 500px;
  padding: 15px 20px;
  .content {
    .content-item {
      padding: 5px 8px;
      font-size: 18px;
      font-weight: 700;
      background: #eee;
      margin: 8px 0;
    }
  }
}
</style>

