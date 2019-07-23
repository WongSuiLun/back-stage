<template>
  <div>
    <!-- 图文消息组件 返回选择的图文消息-->
    <div class="pic-text-inner">
      <div class="pic-text-inner_no_select" v-if="data==null">
        <div class="msg-btn-select">
          <a-icon type="folder" class="icon-size-40" />
          <span class="msg-btn-select-text">从素材库选择</span>
        </div>
        <div class="msg-btn-select">
          <a-icon type="form" class="icon-size-40" />
          <span class="msg-btn-select-text">自建图文</span>
        </div>
        <div class="msg-btn-select">
          <a-icon type="share-alt" class="icon-size-40" />
          <span class="msg-btn-select-text">转载文章</span>
        </div>
      </div>
      <div class="msg-item-card-media single" v-if="isSingleType">
        <div class="msg-info">{{changeSecondLevelToTime(data.update_time)}}</div>
        <div class="msg-media-card">
          <div>
            <img :src="data.news_contents[0].thumb_url" style="width:100%;" />
          </div>
          <div class="msg-media-card-title">
            <span>{{data.news_contents[0].title}}</span>
          </div>
        </div>
        <a class="delete-btn">删除</a>
      </div>
      <div class="msg-item-card-media more" v-else>
        <div class="msg-info">{{changeSecondLevelToTime(data.update_time)}}</div>
        <div class="msg-media-card">
          <div class="cover">
            <img :src="data.news_contents[0].thumb_url" style="width:100%;" />
            <div class="msg-media-card-title">
              <span>{{data.news_contents[0].title}}</span>
            </div>
          </div>
          <template v-for="(item,index) in data.news_contents">
            <div :key="index" v-if="index>0">
              <media-card-item :itemData="item"></media-card-item>
            </div>
          </template>
        </div>
        <a class="delete-btn">删除</a>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import MediaCardItem from "./MediaCardItem";
export default {
  components: {
    MediaCardItem
  },
  props: {
    data: {
      default: null
    }
  },
  computed: {
    isSingleType() {
      return this.data.news_contents.length == 1;
    }
  },
  created() {
    console.log(this.data);
  },
  methods: {
    changeSecondLevelToTime(time) {
      // 使用moment，给的时间精确到秒，需要传的时间精确到毫秒
      return moment(time * 1000).format("LLL");
    }
  },
  watch: {
    data: {
      handler: function(val) {
        console.log(val);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.icon-size-40 {
  font-size: 40px;
}
.pic-text-inner {
  min-height: 170px;
  width: 100%;
  padding: 20px;
  .pic-text-inner_no_select {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .msg-item-card-media {
    border: 1px solid #e7e7eb;
    position: relative;
    margin-bottom: 20px;
    border: 1px solid #e7e7eb;
    background-color: #fff;
    color: #8d8d8d;
    width: 300px;
    display: flex;
    flex-direction: column;
    .msg-info {
      margin-bottom: 20px;
      text-align-last: auto;
      font-size: 13px;
      line-height: 20px;
      margin: 0 14px;
      padding: 12px 0;
      border-bottom: 1px solid #e7e7eb;
    }
    .msg-media-card {
      padding: 12px 14px;
      .msg-media-card-title {
        padding: 15px;
        color: #353535;
      }
    }
    .delete-btn {
      position: absolute;
      right: -50px;
      z-index: 999;
      bottom: 0;
    }
    &.more {
      .msg-media-card {
        .cover {
          position: relative;
          .msg-media-card-title {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.5);
            color: #fff;
          }
        }
      }
      .delete-btn {
        position: absolute;
        right: -50px;
        z-index: 999;
        bottom: 0;
      }
    }
  }

  .msg-btn-select {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    color: #8d8d8d;
    width: 130px;
    justify-content: center;
    align-items: center;
    min-height: 130px;
    cursor: pointer;
    &:hover {
      background-color: #f6f8f9;
    }
    .msg-btn-select-text {
      padding: 8px 0;
    }
  }
}
</style>

