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
        </a-form-item>-->

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
            <a-tag
              v-for="tag in tags"
              :key="`tag${tag.name}`"
              :checked="false"
              closable="true"
              color="#f50"
            >{{tag.name}}</a-tag>
            <a-button type="primary">添加标签</a-button>
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
          <PicUpload v-model="imgList" :max="8"></PicUpload>
        </a-form-item>

        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="主图视频">
          <a-row>
            <div v-show="!isMainVideoUpload">
              <a-col :span="6">
                <a-upload-dragger
                  name="file"
                  :data="uploadAddData"
                  :headers="uploadHeader"
                  :multiple="false"
                  :action="uploadUrl"
                  @change="handleMainUploadChange"
                >
                  <p class="ant-upload-drag-icon">
                    <a-icon type="inbox" />
                  </p>
                  <p class="ant-upload-text">添加视频</p>
                </a-upload-dragger>
              </a-col>
              <a-col :span="18">
                <div>
                  <p class="video-tip">1.时长：60秒以内,建议9-30秒</p>
                  <p class="video-tip">2.尺寸：建议1:1，利于卖家在主图位置的视频观看体验</p>
                  <p class="video-tip">3.内容：突出1-2个核心卖点，不建议电子相册式的图片翻页视频</p>
                </div>
              </a-col>
            </div>
            <div v-show="isMainVideoUpload">
              <!-- <video :src="shopVideoPreview" controls="controls">您的浏览器不支持 video 标签。</video> -->
              <video-player
                class="video-player-box video-style"
                style="max-height: 500px;"
                ref="videoPlayer"
                :options="mainPlayerOptions"
                :playsinline="true"
                customEventName="customstatechangedeventname"
              ></video-player>
              <a-button type="danger">删除视频</a-button>
            </div>
          </a-row>
        </a-form-item>

        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="商品视频">
          <a-row>
            <a-col :span="24">
              <a-upload-dragger
                name="file"
                :data="uploadAddData"
                :headers="uploadHeader"
                :multiple="false"
                :action="uploadUrl"
                :beforeUpload="handleUploadVideoBefore"
                @change="handleShopUploadChange"
                v-show="!isShopVideoUpload"
              >
                <div style="display:flex;padding:20px;">
                  <div>
                    <p class="ant-upload-drag-icon">
                      <a-icon type="inbox" />
                    </p>
                    <p class="ant-upload-text">商品视频</p>
                  </div>
                  <div style="text-align:left;margin-left:20px;">
                    <p class="video-tip">1.时长：60秒以内,建议9-30秒</p>
                    <p class="video-tip">2.尺寸：建议1:1，利于卖家在主图位置的视频观看体验</p>
                    <p class="video-tip">3.内容：突出1-2个核心卖点，不建议电子相册式的图片翻页视频</p>
                  </div>
                </div>
              </a-upload-dragger>
              <div v-show="isShopVideoUpload">
                <!-- <video :src="shopVideoPreview" controls="controls">您的浏览器不支持 video 标签。</video> -->
                <video-player
                  class="video-player-box video-style"
                  style="max-height: 500px;"
                  ref="videoPlayer"
                  :options="shopPlayerOptions"
                  :playsinline="true"
                  customEventName="customstatechangedeventname"
                ></video-player>
                <a-button type="danger">删除视频</a-button>
              </div>
            </a-col>
            <a-col :span="0">
              <!-- <div>
                <p class="video-tip">1.时长：60秒以内,建议9-30秒</p>
                <p class="video-tip">2.尺寸：建议1:1，利于卖家在主图位置的视频观看体验</p>
                <p class="video-tip">3.内容：突出1-2个核心卖点，不建议电子相册式的图片翻页视频</p>
              </div>-->
            </a-col>
          </a-row>
        </a-form-item>

        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="预定须知">
          <a-textarea
            placeholder="Autosize height with minimum and maximum number of lines"
            :autosize="{ minRows: 2, maxRows: 6 }"
          />
        </a-form-item>

        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="转增">
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
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="允许评论">
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
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="销售渠道">
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
      </a-form>
    </div>

    <div class="content-item">微信分享</div>
    <div>
      <a-form :form="wechatShareForm">
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="分享标题">
          <a-input id="validating" placeholder />
          <slot name="help">
            <span style="clolr:#ccc">
              微信分享给好友时显示，建议38个字以内
              <span style="color:#009804;">&nbsp;&nbsp;查看示例&nbsp;&nbsp;</span>
            </span>
          </slot>
        </a-form-item>

        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="分享描述">
          <a-input id="validating" placeholder="I'm the content is being validated" />
          <slot name="help">
            <span style="clolr:#ccc">
              微信分享给好友时显示，建议38个字以内
              <span style="color:#009804;">&nbsp;&nbsp;查看示例&nbsp;&nbsp;</span>
            </span>
          </slot>
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
import { mixinGobalState } from "@/utils/mixin";
import { mixinAddGoodState } from "../mixin";
import { videoPlayer } from "vue-video-player";
require("video.js/dist/video-js.css");
require("vue-video-player/src/custom-theme.css");
export default {
  components: {
    PicUpload,
    RadioBox,
    videoPlayer
  },
  mixins: [mixinGobalState, mixinAddGoodState],
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
      wechatShareForm: "",
      uploadUrl: "http://192.168.101.115:8089/api/attach",
      isMainVideoUpload: false, //商品视频是否上传
      mainPlayerOptions: {
        // videojs options
        muted: true,
        language: "cn",
        language: "zh-CN",
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: "video/mp4",
            src: ""
          }
        ]
      },
      isShopVideoUpload: false, //商品视频是否上传
      shopPlayerOptions: {
        // videojs options
        muted: true,
        language: "cn",
        language: "zh-CN",
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: "video/mp4",
            src: ""
          }
        ]
      }
    };
  },
  computed: {
    uploadHeader() {
      return {
        company: this.company
      };
    }
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
    },
    handleMainUploadChange(info) {
      if (info.file.status === "uploading") {
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        this.isMainVideoUpload = info.file.response.data.file_url;
        this.mainPlayerOptions.sources = [
          {
            type: "video/mp4",
            src: info.file.response.data.file_url
          }
        ];
      }
    },
    handleShopUploadChange(info) {
      if (info.file.status === "uploading") {
        return;
      }
      console.log(info);
      if (info.file.status === "done") {
        // Get this url from response in real world.
        this.isShopVideoUpload = true;
        this.shopPlayerOptions.sources = [
          {
            type: "video/mp4",
            src: info.file.response.data.file_url
          }
        ];
      }
    },
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg";
      if (!isJPG) {
        this.$message.error("You can only upload JPG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("Image must smaller than 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleUploadVideoBefore(file, fileList) {
      const isMp4 = file.type === "video/mp4";
      if (!isMp4) {
        this.$message.error("限制上传视频格式：video/mp4!");
      }
      const isLt50M = file.size / 1024 / 1024 < 50;
      if (!isLt50M) {
        this.$message.error("视频文件大小大于50M!");
      }
      if (!(isMp4 && isLt50M)) {
        file.status = "error";
      }
      return isMp4 && isLt50M;
      // const isJPG = file.type === 'image/jpeg'
      // if (!isJPG) {
      //   this.$message.error('You can only upload JPG file!')
      // }
      // const isLt2M = file.size / 1024 / 1024 < 2
      // if (!isLt2M) {
      //   this.$message.error('Image must smaller than 2MB!')
      // }
      // return isJPG && isLt2M
    },
    uploadAddData() {
      return {
        module: "goods"
      };
    }
  }
};
</script>
<style lang="less">
.video-js {
  max-height: 500px;
  display: block;
}
</style>

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
  .video-tip {
    margin: 0;
    margin-left: 15px;
  }
}
</style>

