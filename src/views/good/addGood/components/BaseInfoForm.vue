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
            'name2',
            {
              rules: [{ required: true, message: 'name is required!' }],
            }
          ]"
          />
        </a-form-item>

        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="商品标签">
          <a-row>
            <a-tag
              v-for="(tag,index) in tags"
              :key="`tag${tag.name}${index}`"
              closable
              @close="handleTagClose(tag,index)"
              color="#f50"
            >{{tag.name}}</a-tag>
            <a-input
              v-if="tagInputVisible"
              ref="tagInput"
              type="text"
              size="small"
              :style="{ width: '78px' }"
              :value="tagInputValue"
              @change="handleTagInputChange"
              @blur="handleTagInputConfirm"
              @keyup.enter="handleTagInputConfirm"
            />
            <a-tag v-else @click="showTagInput" style="background: #fff; borderStyle: dashed;">
              <a-icon type="plus" />新标签
            </a-tag>
          </a-row>
        </a-form-item>

        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="商品亮点">
          <template v-for="(lightsport,index) in tempLightsports">
            <a-row :key="index">
              <a-col :span="14">
                <a-input v-model="tempLightsports[index]" @change="handleLightsports"></a-input>
              </a-col>
              <a-col :span="4" :offset="1">
                <a-button @click="deleteLightspot(index)">删除</a-button>
              </a-col>
              <a-col :span="3">
                <a-button
                  type="primary"
                  @click="addLightspot"
                  v-if="index==tempLightsports.length-1"
                >添加</a-button>
              </a-col>
            </a-row>
          </template>
        </a-form-item>

        <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          label="商品图片"
          help="建议尺寸：360*270像素，你可以拖拽图片调整顺序，为提升买家的购物体验，图片建议小于500K，最多上传10张"
        >
          <PicUpload
            v-model="imgList"
            :max="8"
            ref="picUpload"
            @swap="handleGoodImgListSwap"
            @change="handleGoodImgListChange"
            @create="handleGoodImgListCreate"
            @delete="handleGoodImgListDelete"
          ></PicUpload>
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
                style="max-height: 400px;"
                ref="videoPlayer"
                :options="mainPlayerOptions"
                :playsinline="true"
                customEventName="customstatechangedeventname"
              ></video-player>
              <a-button type="danger" @click="deleteMainVideo">删除视频</a-button>
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
          v-decorator="[
            'bookNeedKnow',
            {
              rules: [{ required: true, message: 'Username is required!' }],
            }]"
            placeholder="Autosize height with minimum and maximum number of lines"
            :autosize="{ minRows: 2, maxRows: 6 }"
          />
        </a-form-item>

        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="转增">
          <a-select
            v-decorator="[
            'transfer',
            {
              rules: [{ required: true, message: 'Username is required!' }],
            }]"
            style="width: 200px"
          >
            <a-select-option
              v-for="option in transferOption"
              :value="option.value"
              :key="option.value"
            >{{option.label}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="允许评论">
          <a-select
            v-decorator="[
            'comment',
            {
              rules: [{ required: true, message: 'Username is required!' }],
            }]"
            style="width: 200px"
          >
            <a-select-option
              v-for="option in commentOption"
              :value="option.value"
              :key="option.value"
            >{{option.label}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="销售渠道">
          <a-select
            v-decorator="[
            'place',
            {
              rules: [{ required: true, message: 'Username is required!' }],
            }]"
            style="width: 200px"
          >
            <a-select-option
              v-for="place in placeOption"
              :value="place.value"
              :key="place.value"
            >{{place.label}}</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </div>

    <div class="content-item">微信分享</div>
    <div>
      <a-form :form="wechatShareForm">
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="分享标题">
          <a-input id placeholder />
          <!-- <slot name="help">
            <span style="clolr:#ccc">
              微信分享给好友时显示，建议38个字以内
              <span style="color:#009804;">&nbsp;&nbsp;查看示例&nbsp;&nbsp;</span>
            </span>
          </slot>-->
        </a-form-item>

        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="分享描述">
          <a-input id placeholder="I'm the content is being validated" />
          <!-- <slot name="help">
            <span style="clolr:#ccc">
              微信分享给好友时显示，建议38个字以内
              <span style="color:#009804;">&nbsp;&nbsp;查看示例&nbsp;&nbsp;</span>
            </span>
          </slot>-->
        </a-form-item>
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="分享图片">
          <!-- <under-line></under-line> -->
          <PicUpload v-model="imgList" :max="1"></PicUpload>
        </a-form-item>
      </a-form>
      <a-row type="flex" justify="center">
           <a-button  @click="handleNextStep">下一步</a-button>
      </a-row>
       
       
    </div>
  </div>
</template>

<script>
import { PicUpload, RadioBox } from "@/components";
import { mapGetters, mapState } from "vuex";
import { mixinGobalState } from "@/utils/mixin";
import { mixinAddGoodState } from "../mixin";
import { deleteAttach, addAttach, getTags, addTag,addGood} from "@/api/addGood";
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
      imgList: [],
      imgListData: [],
      activeGoodType: "",
      form: {},
      wechatShareForm: {},
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
      },
      tagInputVisible: false,
      tagInputValue: "",
      tagSet: "", //存储已有的tag列表
      //销售渠道选项
      placeOption: [
        {
          value: "0",
          label: "全网"
        },
        {
          value: "1",
          label: "后台"
        },
        {
          value: "3",
          label: "微信"
        }
      ],
      //转增选项
      commentOption: [
        { value: "0", label: "不允许评价" },
        { value: "1", label: "允许评价" }
      ],
      //转增选项
      transferOption: [
        { value: "0", label: "不允许转增" },
        { value: "1", label: "允许转增" }
      ],
      //亮点中间值
      tempLightsports: [""]
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
    this.initForm();
    this.initTagData();
  },

  watch: {
    storeNo(val) {
      this.form.setFieldsValue({ storeNo: val });
    },
    name(val) {
      this.form.setFieldsValue({ name: val });
    },
    imgList(val) {},
    imgListData() {
      this.$store.commit("SET_FORM", { goodImgList: this.imgListData });
    }
  },
  methods: {
    initForm() {
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
            name2: this.$form.createFormField({
              value: this.name2
            }),
            tags: this.$form.createFormField({
              value: this.tags
            }),
            lightspots: this.$form.createFormField({
              value: this.lightspots
            }),
            goodImgList: this.$form.createFormField({
              value: this.goodImgList
            }),
            goodMainVideo: this.$form.createFormField({
              value: this.goodMainVideo
            }),
            goodShopVideo: this.$form.createFormField({
              value: this.goodShopVideo
            }),
            bookingInfo: this.$form.createFormField({
              value: this.bookingInfo
            }),
            transfer: this.$form.createFormField({
              value: this.transfer
            }),
            comment: this.$form.createFormField({
              value: this.comment
            }),
            place: this.$form.createFormField({
              value: this.place
            }),
            bookNeedKnow: this.$form.createFormField({
              value: this.bookNeedKnow
            })
          };
        },
        onValuesChange: (_, values) => {
          // Synchronize to vuex store in real time
          this.$store.commit("SET_FORM", values);
        }
      });
    },

    handleGoodImgListChange(val) {
      this.$store.commit("SET_FORM", { goodImgList: this.imgListData });
    },
    handleGoodImgListCreate(index, file) {
      let data = new FormData();
      data.append("module", "goods");
      data.append("file", file);
      addAttach(data)
        .then(res => {
          this.imgListData.push(res.data.data);
          this.$message.success("上传成功");
        })
        .catch(err => {
          this.$message.error("上传失败");
          this.$refs.picUpload.deleteImg(index);
          this.$delete(this.imgList, index);
          this.$delete(this.imgListData, index);
        });
      // this.$store.commit("SET_FORM", { goodImgList: val });
    },
    handleGoodImgListSwap(index, index2) {
      let temp = this.imgListData[index];
      this.$set(this.imgListData, index, this.imgListData[index2]);
      this.$set(this.imgListData, index2, temp);
      this.$store.commit("SET_FORM", { goodImgList: this.imgListData });
    },
    handleGoodImgListDelete(index) {
      console.log(this.imgListData);
      if (
        this.imgListData[index] &&
        this.imgListData[index].hasOwnProperty("attach_id")
      ) {
        deleteAttach(this.imgListData[index].attach_id).then(res => {
          this.$delete(this.imgListData, index);
        });
      }
    },
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
        this.$store.commit("SET_FORM", {
          goodMainVideo: {
            id: info.file.response.data.attach_id,
            src: info.file.response.data.file_url,
            info: info
          }
        });
      }
    },
    deleteMainVideo() {
      deleteAttach(this.goodMainVideo.id).then(res => {
        this.isMainVideoUpload = false;
        this.$store.commit("SET_FORM", {
          goodMainVideo: null
        });
      });
    },
    handleShopUploadChange(info) {
      if (info.file.status === "uploading") {
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        this.isShopVideoUpload = true;
        this.shopPlayerOptions.sources = [
          {
            type: "video/mp4",
            src: info.file.response.data.file_url
          }
        ];
        this.$store.commit("SET_FORM", {
          goodShopVideo: {
            id: info.file.response.data.attach_id,
            src: info.file.response.data.file_url,
            info: info
          }
        });
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
    },
    handleClose(removedTag) {
      const tags = this.tags.filter(tag => tag !== removedTag);
      console.log(tags);
      this.tags = tags;
    },

    showTagInput() {
      this.tagInputVisible = true;
      this.$nextTick(function() {
        this.$refs.tagInput.focus();
      });
    },

    handleTagInputChange(e) {
      this.tagInputValue = e.target.value;
    },

    handleTagClose(tag, index) {
      let tags = this.tags;
      console.log(tags);
      tags.splice(index, 1);

      this.$store.commit("SET_FORM", { tags: tags });
    },

    handleTagInputConfirm() {
      const inputValue = this.tagInputValue;
      let tags = this.tags;
      let tagNames = this.tags.map(ele => ele.name);

      console.log(tagNames);
      console.log(inputValue);
      console.log(tagNames.indexOf(inputValue));
      if (inputValue && tagNames.indexOf(inputValue) === -1) {
        let id = undefined;
        this.tagSet.forEach(ele => {
          if (ele.name == inputValue) {
            id = ele.id;
          }
        });

        if (!id) {
          //还没有这个标签
          addTag({ tag_name: inputValue }).then(res => {
            console.log(res);
          });
        }
        this.$store.commit("SET_FORM", {
          tags: [...tags, { id, name: inputValue }]
        });
      }
      console.log(tags);
      this.tagInputVisible = false;
      this.tagInputValue = "";
    },

    initTagData() {
      getTags().then(res => {
        this.tagSet = res.data.data;
      });
    },

    addLightspot() {
      this.tempLightsports.push("");
    },
    deleteLightspot(index) {
      if (this.tempLightsports.length == 1) {
        return;
      } else {
        this.tempLightsports.splice(index, 1);
        this.$store.commit("SET_FORM", {
          lightspots: this.tempLightsports.filter(ele => {
            return ele != " ";
          })
        });
      }
    },
    handleLightsports() {
      this.$store.commit("SET_FORM", {
        lightspots: this.tempLightsports.filter(ele => {
          return ele != " ";
        })
      });
    },
    handleNextStep(){
      console.log(this.$store.getters.getImgListAttachIdList)
      addGood({
        store_no:this.storeNo,
        name:this.name,
        name2:this.name2,
        type_id:"I do not know",
        tags:this.tags,
        is_need_address:0,
        is_point:0,
        is_cash:0,

        features:this.lightspots,
        book_need_know:this.bookNeedKnow,
        back_end:this.place,
        is_regifted:this.transfer,
        is_reviewed:this.comment,
        'attach[img]':this.$store.getters.getImgListAttachIdList,
        'attach[shopV]':this.$store.getters.getShopVideoAttachIdList,
        'attach[mainV]':this.$store.getters.getMainVideoAttachIdList
        // storeNo:state => state.addGood.storeNo,
        // storeType:state => state.addGood.storeType,
        // roomType:state => state.addGood.roomType,
        // name:state => state.addGood.name,
        // name2:state => state.addGood.name2,
        // tags:state => state.addGood.tags,
        // lightspots:state => state.addGood.lightspots,
        // goodImgList:state => state.addGood.goodImgList,
        // goodMainVideo:state => state.addGood.goodMainVideo,
        // goodShopVideo:state => state.addGood.goodShopVideo,
        // bookingInfo:state => state.addGood.bookingInfo,
        // transfer:state => state.addGood.transfer,
        // comment:state => state.addGood.comment,
        // place:state => state.addGood.place,
      }).then(res=>{
        
      })
    }
  }
};
</script>
<style lang="less">
.video-js {
  max-width: 360px;
  max-height: 270px;
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

