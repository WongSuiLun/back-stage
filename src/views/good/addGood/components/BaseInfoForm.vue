<template>
  <a-form :form="form">
    <div class="content">
      <div class="content-item">商品类型</div>
      <div>
        <radio-box :items="items" v-model="activeGoodType"></radio-box>
        {{activeGoodType}}
      </div>
      <div class="content-item">产品基本信息</div>
      <div>
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="部门">
          <a-select
            v-decorator="[
            'storeNo',
            {
              rules: [{ required: true, message: '部门是必选的！' }],
            }]"
            style="width: 200px"
            @change="handleInstituteChange"
          >
            <a-select-option
              v-for="i in institution"
              :key="`store—no-${i.id}`"
              :value="i.value.toString()"
            >{{i.label}}</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="商品类目">
          <a-select v-model="goodType" @change="handleGoodTypeChange" style="width: 200px">
            <a-select-option
              v-for="type in goodTypeOptions"
              :key="`type-${type.id}`"
              :value="type.id"
            >{{type.name}}</a-select-option>
          </a-select>
          <a-select
            v-decorator="[
            'storeType',
            {
              rules: [{ required: true, message: 'Username is required!' }],
            }]"
            style="width: 200px"
          >
            <a-select-option
              v-for="subType in subGoodTypeOptions"
              :key="subType.id"
            >{{subType.name}}</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="房间类型">
          <a-select
            v-decorator="[
            'typeId',
            {
              rules: [{ required: true, message: 'Username is required!' }],
            }]"
            style="width: 200px"
            :initialValue="-1"
          >
            <a-select-option
              v-for="roomType in roomTypeOptions"
              :key="roomType.value"
            >{{roomType.label}}</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="商品名称">
          <a-input
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
            placeholder="商品副标题"
            v-decorator="[
            'name2',
            {
              rules: [{ required: true, message: 'name is required!' }],
            }
          ]"
          />
        </a-form-item>

        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="商品单价">
          <a-input-number
            style="width:200px"
            placeholder="商品单价"
            :step="0.01"
            :formatter="value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
            v-decorator="[
            'unitPrice',
            {
              rules: [{ required: true, message: '价格不能为空' }],
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
          <!-- <PicUpload
            v-model="imgList"
            :max="8"
            ref="picUpload"
            @swap="handleGoodImgListSwap"
            @change="handleGoodImgListChange"
            @create="handleGoodImgListCreate"
            @delete="handleGoodImgListDelete"
          ></PicUpload>-->
          <a-upload
            listType="picture-card"
            :fileList="fileList"
            :data="uploadAddData"
            :headers="uploadHeader"
            :multiple="false"
            :action="uploadUrl"
            @preview="handlePreview"
            @change="handleChange"
            :remove="handleImageRemove"
          >
            <div v-if="fileList.length < 8">
              <a-icon type="plus" />
              <div class="ant-upload-text">上传图片</div>
            </div>
          </a-upload>
          <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
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
                <a-button type="danger" @click="deleteShopVedio">删除视频</a-button>
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
              rules: [{ required: true, message: '预订须知是必须的！例子：（）' }],
            }]"
            placeholder="预订须知是必须的！例子：（）"
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
          <a-select v-decorator="[
            'comment',
           ]" style="width: 200px">
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
      </div>
      <div class="content-item">上架信息</div>
      <div>
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="商品上架日期">
          <div class="form-item">
            <a-radio-group v-model="upShelvesStyle">
              <a-radio :style="radioStyle" :value="0">立即上架售卖</a-radio>
              <a-radio :style="radioStyle" :value="1">暂不售卖,放入仓库</a-radio>
              <a-radio :style="radioStyle" :value="2">
                <span class="text">设定在</span>
                <a-range-picker @change="onShelvesStyle" />
                <span class="text">内售卖</span>
              </a-radio>
            </a-radio-group>
          </div>
        </a-form-item>
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="起始预定日期">
          <div class="form-item">
            <a-radio-group v-model="bookableType">
              <a-radio :style="radioStyle" :value="0">长期</a-radio>
              <a-radio :style="radioStyle" :value="1">
                <span class="text">设定在</span>
                <a-range-picker @change="onBookableDateChange" />
                <span class="text">内预定有效</span>
              </a-radio>
            </a-radio-group>
          </div>
        </a-form-item>
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="人数">
          <a-input-number
            v-decorator="[
            'peopleNum',
            {
              rules: [{ required: true, message: 'Username is required!' }],
            }]"
          />
        </a-form-item>
      </div>
      <!-- <div class="content-item">微信分享</div> -->
      <div>
        <!-- <a-form :form="wechatShareForm">
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="分享标题">
          <a-input id placeholder />
        </a-form-item>

        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="分享描述">
          <a-input id placeholder="I'm the content is being validated" />
        </a-form-item>

        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="分享图片">
          <PicUpload v-model="imgList" :max="1"></PicUpload>
        </a-form-item>
        </a-form>-->

        <a-row type="flex" justify="center">
          <a-button @click="handleNextStep" v-if="!isUpload">添加商品</a-button>
          <a-button @click="handleUpload" v-else>保存商品修改</a-button>
        </a-row>
      </div>
    </div>
  </a-form>
</template>

<script>
import { PicUpload, RadioBox } from "@/components";
import { mapGetters, mapState } from "vuex";
import { mixinGobalState } from "@/utils/mixin";
import { mixinAddGoodState } from "../mixin";
import { getTags, addTag, addGood, updateGood } from "@/api/addGood";
import { deleteAttach, addAttach } from "@/api/attach";
import { getGoodTypeList, getGood } from "@/api/good";
import { getRoomTypesByShop } from "@/api/room";
import { getInstitutions } from "@/api/institutions";
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
        { title: "基础商品", sub_title: "（无需地址）", type: "base" },
        { title: "积分商品", sub_title: "", type: "point" },
        { title: "套餐商品", sub_title: "", type: "meal  " }
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
      institution: [
        {
          value: 22,
          name: "不选择房间类型"
        }
      ], //部门
      goodType: "", //类目一级选项
      goodTypeOptions: [], //类目
      subGoodTypeOptions: [], //二级类目
      imgList: [],
      imgListData: [],
      activeGoodType: "",
      form: {},
      wechatShareForm: {},
      uploadUrl: "http://192.168.101.115:8089/api/attach",

      tagInputVisible: false,
      tagInputValue: "",
      tagSet: "", //存储已有的tag列表
      //房间类型Option
      roomTypeOptions: [
        {
          value: -1,
          label: "不选择房间类型"
        }
      ],
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
      tempLightsports: [""],
      upShelvesStyle: 0,
      bookableType: 0,
      //radio样式
      radioStyle: {
        display: "block",
        height: "30px",
        lineHeight: "30px"
      },
      //上传图片的组件
      previewVisible: false,
      previewImage: "",
      fileList: []
    };
  },
  computed: {
    uploadHeader() {
      return {
        company: this.$ls.get("company").id
      };
    },
    isShopVideoUpload() {
      return this.goodShopVideo && this.goodShopVideo.id;
    },
    isMainVideoUpload() {
      return this.goodMainVideo && this.goodMainVideo.id;
    },
    mainPlayerOptions() {
      let src = "";
      if (this.goodMainVideo && this.goodMainVideo.hasOwnProperty("src")) {
        src = this.goodMainVideo.src;
      }
      return {
        // videojs options
        muted: true,
        language: "cn",
        language: "zh-CN",
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: "video/mp4",
            src: src
          }
        ]
      };
    },
    shopPlayerOptions() {
      let src = "";
      if (this.goodShopVideo && this.goodShopVideo.hasOwnProperty("src")) {
        src = this.goodShopVideo.src;
      }
      return {
        // videojs options
        muted: true,
        language: "cn",
        language: "zh-CN",
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: "video/mp4",
            src: src
          }
        ]
      };
    }
  },
  created() {
    this.init();
  },
  mounted() {
    this.$store.commit("SET_FORM", {
      upShelvesTime: this.$moment(new Date())
        .format("L")
        .split("/")
        .join("-"),
      downShelvesTime: ""
    });
    this.$store.commit("SET_FORM", {
      bookableTime: this.$moment(new Date())
        .format("L")
        .split("/")
        .join("-"),
      endBookableTime: ""
    });
  },

  watch: {
    upShelvesTime(val) {
      if (val==null||val == "") {
        this.upShelvesStyle = 1;
      }   else {
        if (this.downShelvesTime) {
          this.upShelvesStyle = 2;
        }else{
          this.upShelvesStyle = 0;
        }
        
      }
    },
    bookableTime(val){
      if(val){
        this.bookableType = 1
      }else{
        this.bookableType = 0
      }
    },
    goodId(val) {
      this.initForm();
      var goodTypeOptions = this.goodTypeOptions;
      f: for (var i = 0; i < goodTypeOptions.length; i++) {
        if (goodTypeOptions[i].hasOwnProperty("children")) {
          let subGoodType = goodTypeOptions[i].children;
          for (var j = 0; j < subGoodType.length; j++) {
            if (subGoodType[j].id == this.storeType) {
              this.goodType = goodTypeOptions[i].id;
              this.subGoodTypeOptions = subGoodType;
              setTimeout(() => {
                this.form.setFieldsValue({
                  storeType: this.storeType
                });
              }, 100);

              break f;
            }
          }
        }
      }
      this.fileList = this.goodImgList;
      this.imgList = this.goodImgList;
      this.imgListData = this.goodImgList;
    },
    lightspots(val) {
      this.tempLightsports = val;
    },
    upShelvesStyle(val) {
      if (val == 0) {
        //立即上架售卖
        this.$store.commit("SET_FORM", {
          upShelvesTime: this.$moment(new Date())
            .format("L")
            .split("/")
            .join("-"),
          downShelvesTime: ""
        });
      } else if (val == 1) {
        //暂不售卖,放入仓库
        this.$store.commit("SET_FORM", {
          upShelvesTime: "",
          downShelvesTime: ""
        });
      } else if (val == 2) {
        //onShelvesStyle 中处理
      }
    },
    bookableType(val) {
      if (val == 0) {
        //长期有效
        this.$store.commit("SET_FORM", {
          bookableTime: this.$moment(new Date())
            .format("L")
            .split("/")
            .join("-"),
          endBookableTime: ""
        });
      } else if (val == 1) {
        //onchange 中处理
      }
    }
  },
  methods: {
    init: async function() {
      this.$store.commit("SET_FORM", {
        loadding: true
      });
      this.initForm();
      this.initTagData()
        .then(() => {
          this.initInstitution();
        })
        .then(() => {
          this.initGoodType();
        })
        .then(() => {
          this.$store.commit("SET_FORM", {
            loadding: false
          });
        });
    },
    handleInstituteChange(value, option) {
      this.$store.commit("SET_FORM", {
        loadding: true
      });
      getRoomTypesByShop(value).then(res => {
        this.$store.commit("SET_FORM", {
          loadding: false
        });
        this.roomTypeOptions = [
          {
            value: -1,
            label: "暂不选择"
          }
        ].concat(
          res.data.data.map(ele => {
            return {
              value: ele.store_id,
              label: ele.type_name
            };
          })
        );
      });
    },
    //初始化类目
    initGoodType: async function() {
      getGoodTypeList().then(res => {
        this.goodTypeOptions = res.data.data;
        this.goodType = this.goodTypeOptions[0].id;

        if (
          this.goodTypeOptions[0].hasOwnProperty("children") &&
          this.goodTypeOptions[0].children.length > 0
        ) {
          this.subGoodTypeOptions = this.goodTypeOptions[0].children;
          this.form.setFieldsValue({
            storeType: this.goodTypeOptions[0].children[0].id
          });
        } else {
          this.subGoodTypeOptions = [];
          this.form.setFieldsValue({
            storeType: ""
          });
        }
      });
    },
    //初始化部门
    initInstitution: async function() {
      getInstitutions().then(res => {
        this.institution = res.data.data.map(ele => {
          return {
            value: ele.id,
            label: ele.name
          };
        });
      });
    },
    onShelvesStyle(date, dateString) {
      this.$store.commit("SET_FORM", {
        upShelvesTime: dateString[0],
        downShelvesTime: dateString[1]
      });
    },
    onBookableDateChange(date, dateString) {
      // this.bookableType = 1;
      this.$store.commit("SET_FORM", {
        bookableTime: dateString[0],
        endBookableTime: dateString[1]
      });
    },
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
            typeId: this.$form.createFormField({
              value: this.typeId
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
            bookNeedKnow: this.$form.createFormField({
              value: this.bookNeedKnow
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
            // upShelvesStyle: this.$form.createFormField({
            //   value: this.upShelvesStyle
            // }),
            upShelvesTime: this.$form.createFormField({
              value: this.upShelvesTime
            }),
            downShelvesTime: this.$form.createFormField({
              value: this.downShelvesTime
            }),
            // bookableType: this.$form.createFormField({
            //   value: this.bookableType
            // }),
            bookableTime: this.$form.createFormField({
              value: this.bookableTime
            }),
            endBookableTime: this.$form.createFormField({
              value: this.endBookableTime
            }),
            peopleNum: this.$form.createFormField({
              value: this.peopleNum
            }),
            unitPrice: this.$form.createFormField({
              value: this.unitPrice
            })
          };
        },
        onValuesChange: (_, values) => {
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
      this.$store.commit("SET_FORM", {
        loadding: true
      });
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
        })
        .then(() => {
          this.$store.commit("SET_FORM", {
            loadding: true
          });
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
    handleImageRemove(file) {
      let attachId;
      if (file.hasOwnProperty("response")) {
        attachId = file.response.data.attach_id;
      } else if (file.hasOwnProperty("attach_id")) {
        attachId = file.attach_id;
      }
      deleteAttach(attachId).then(res => {
        console.log(res);
      });
    },
    handleChange(info) {
      this.fileList = [...info.fileList];
      this.$store.commit("SET_FORM", {
        goodImgList: this.fileList
      });
    },
    handleMainUploadChange(info) {
      if (info.file.status === "uploading") {
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
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
        this.$store.commit("SET_FORM", {
          goodMainVideo: null
        });
      });
    },
    deleteShopVedio() {
      deleteAttach(this.goodShopVideo.id).then(res => {
        this.$store.commit("SET_FORM", {
          goodShopVideo: null
        });
      });
    },
    handleShopUploadChange(info) {
      if (info.file.status === "uploading") {
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
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
      tags.splice(index, 1);

      this.$store.commit("SET_FORM", { tags: tags });
    },

    handleTagInputConfirm() {
      const inputValue = this.tagInputValue;
      let tags = this.tags;
      let tagNames = this.tags.map(ele => ele.name);
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
      this.tagInputVisible = false;
      this.tagInputValue = "";
    },

    initTagData: async function() {
      await getTags().then(res => {
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
    //添加商品or编辑商品
    handleNextStep() {
      addGood({
        store_no: this.storeNo,
        name: this.name,
        name2: this.name2,
        type_id: this.typeId,
        type: this.storeType,
        tags: this.tags.map(ele => ele.id),
        is_need_address: 0,
        is_point: 0,
        is_cash: 0,
        unit_price: this.unitPrice,
        features: this.lightspots,
        book_need_know: this.bookNeedKnow, //预定须知
        back_end: this.place,
        is_regifted: this.transfer,
        is_reviewed: this.comment,
        attachs: {
          img: this.$store.getters.getImgListAttachIdList,
          shopV: this.$store.getters.getShopVideoAttachIdList,
          mainV: this.$store.getters.getMainVideoAttachIdList
        },
        // "attachs[img]": this.$store.getters.getImgListAttachIdList,
        // "attachs[shopV]": this.$store.getters.getShopVideoAttachIdList,
        // "attachs[mainV]": this.$store.getters.getMainVideoAttachIdList,
        up_shelves_time: this.upShelvesTime,
        down_shelves_time: this.downShelvesTime,
        people_num: this.peopleNum,
        bookable_time: this.bookableTime,
        end_bookable_time: this.endBookableTime

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
      })
        .then(res => {})
        .catch(err => {
          this.$message.error({
            content: "添加失败"
          });
        });
    },
    handleUpload() {
      updateGood(this.goodId, {
        store_no: this.storeNo,
        name: this.name,
        name2: this.name2,
        type_id: this.typeId,
        type: this.storeType,
        tags: [], //todo
        is_need_address: 0,
        is_point: 0,
        is_cash: 0,
        unit_price: this.unitPrice,
        features: this.lightspots,
        book_need_know: this.bookNeedKnow, //预定须知
        back_end: this.place,
        is_regifted: this.transfer,
        is_reviewed: this.comment,
        attachs: {
          img: this.$store.getters.getImgListAttachIdList,
          shopV: this.$store.getters.getShopVideoAttachIdList,
          mainV: this.$store.getters.getMainVideoAttachIdList
        },
        // "attachs[img]": this.$store.getters.getImgListAttachIdList,
        // "attachs[shopV]": this.$store.getters.getShopVideoAttachIdList,
        // "attachs[mainV]": this.$store.getters.getMainVideoAttachIdList,
        up_shelves_time: this.upShelvesTime,
        down_shelves_time: this.downShelvesTime,
        people_num: this.peopleNum,
        bookable_time: this.bookableTime,
        end_bookable_time: this.endBookableTime

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
      })
        .then(res => {
          alert("編輯成功");
        })
        .catch(err => {
          this.$message.error({
            content: "添加失败"
          });
        });
    },
    //商品类目联动
    handleGoodTypeChange(value) {
      this.goodTypeOptions.forEach(ele => {
        if (value == ele.id) {
          this.subGoodTypeOptions = ele.children;
          if (ele.hasOwnProperty("children") && ele.children.length > 0) {
            this.form.setFieldsValue({
              storeType: ele.children[0].id
            });
          } else {
            this.form.setFieldsValue({
              storeType: ""
            });
          }
        }
      });
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

