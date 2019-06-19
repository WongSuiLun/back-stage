<template>
  <div class="pic-upload">
    <div class="upload-action">
      <input
        type="file"
        v-show="false"
        @change="imgInputChange"
        ref="input-img"
        multiple
        accept="image/png, image/jpeg, image/gif, image/jpg"
      >

      <button class="upload-btn" @click="clickUpload">
        <div class="btn-desc">
          <div>
            <a-icon :type="icon" :style="{fontSize:iconSize}"/>
          </div>
          <div>{{text}}</div>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    icon: {
      type: String,
      default: "plus"
    },
    iconSize:{
      type:String,
      default:"36px"
    },
    text: {
      type: String,
      default: "上传图片"
    }
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.pic-upload {
  width: 100%;
  height: 100%;
  .upload-action {
    width: 100%;
    height: 100%;
    .upload-btn {
      margin: 5px;
      display: inline-block;
      border: 2px dotted #e4e8eb;
      border-radius: 4px;
      width: 100%;
      height: 100%;
      background: #fafafa;
      cursor: pointer;
      outline: none;

      &:hover {
        border-color: #1890ff;
      }
      .btn-desc {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 20px 0;
        color: #9A9A9A;
        div+div{
          margin-top: 20px;
        }
      }
    }
  }
}
</style>
