<template>
  <drop-fixed-box default-left="80vw" default-top="20vh">
    <div class="preview-good-warp background">
      <div class="title">预览</div>
      <div>
        <a-carousel autoplay>
          <div>
            <video-player
              class="video-player-box video-style"
              ref="videoPlayer"
              :options="mainPlayerOptions"
              :playsinline="true"
              customEventName="customstatechangedeventname"
            ></video-player>
          </div>
          <div v-for="(img,index) in goodImgList" :key="index">
            <img :src="img.file_url" style="height:270px;width:100%" />
          </div>
          <div v-show="goodImgList.length==0">
            <h3>上传图片</h3>
          </div>
        </a-carousel>
      </div>
      <div class="module">
        <div class="good-name">{{name}}</div>
        <div class="good-sub-name">{{name2}}</div>
        <div class="tag">
          <a-tag color="red">云来客栈</a-tag>
          <a-tag color="red">大餐庙会</a-tag>
          <a-tag>温泉</a-tag>
          <a-tag>4A景区</a-tag>
        </div>
        <div class="price">
          <div class="price-info">
            <span class="tip">￥</span>
            <span class="price-num">{{unitPrice}}</span>
          </div>
          <div>
            <base-button type="red">立即购买</base-button>
          </div>
        </div>
      </div>
      <div class="module">
        <div class="tip-row">
          <span class="tip-text">领券：</span>
          <a-tag color="#ff3d3d">400元</a-tag>
          <a-tag color="#ff3d3d">200元</a-tag>
          <a-tag color="#ff3d3d">100元</a-tag>
          <a>去领券>></a>
        </div>
        <div class="tip-row">
          <span class="tip-text">优惠：</span>
          <a-tag color="#ff3d3d">立减</a-tag>
          <span class="tip-text">满1500立减300元，不与其它优惠同享</span>
        </div>
        <div class="tip-row">
          <span class="tip-text">积分：</span>
          <span class="tip-text">购买产品，最少可得1250积分</span>
        </div>
        <div class="tip-row">
          <span class="tip-text">特色：</span>
          <a-tag color="#f1ad33">游记有奖</a-tag>
          <a-tag color="#f1ad33">点评送积分</a-tag>
        </div>
      </div>
      <div v-html="shopDetailRenderHtml" class="render-html">
      </div>
    </div>
  </drop-fixed-box>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { BaseButton, DropFixedBox } from "@/components";
import { mixinAddGoodState } from "../mixin";
import { videoPlayer } from "vue-video-player";
require("video.js/dist/video-js.css");
require("vue-video-player/src/custom-theme.css");
export default {
  components: {
    BaseButton,
    DropFixedBox,
    videoPlayer
  },
  mixins: [mixinAddGoodState],
  data() {
    return {
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
  computed: {},
  methods: {},
  watch: {
    goodMainVideo(val) {
      this.mainPlayerOptions.sources = [
        {
          type: "video/mp4",
          src: val.src
        }
      ];
    }
  }
};
</script>
<style lang="less">
.render-html{
  padding: 0 5px;
  background: #fff;
  img {
    max-width:350px;
  }
}
</style>
<style scoped>
/* For demo */
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 270px;
  line-height: 270px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
</style>
<style lang="less" scoped>
.background {
  background: #f6f6f6;
}
.module {
  background: #fff;
  margin-bottom: 20px;
  padding: 5px;
}
.module + .module {
  margin-bottom: 20px;
}
.preview-good-warp {
  width: 360px;
  min-height: 600px;
  border-radius: 4px;
  .title {
    background: #e9e9e9;
    color: #b2b2b2;
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    padding: 5px 0;
  }
  .good-name {
    padding: 5px;
    color: #000;
    font-weight: 700;
    font-size: 15px;
  }
  .good-sub-name {
    padding: 2px;
    color: #444;
    font-weight: 500;
    font-size: 13px;
  }
  .tag {
    margin: 10px 5px;
  }
  .price {
    display: flex;
    margin: 10px 5px;
    justify-content: space-between;
    align-items: center;
    color: #ff3d3d;
    .price-info {
      flex-grow: 1;
      display: inline;
      .tip {
        font-size: 24px;
      }
      .price-num {
        font-size: 18px;
      }
    }
  }
  .tip-row {
    margin: 5px;
    .tip-text {
      font-size: 14px;
      margin-left: 8px;
    }
  }
}
</style>
