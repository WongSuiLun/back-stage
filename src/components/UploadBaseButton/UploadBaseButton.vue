<template>
  <div class="pic-upload">
    <div class="upload-action">
      <input
        type="file"
        v-show="inputVisible"
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
    return {
      inputVisible:false
    };
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
  methods: {
    imgInputChange(e) {
      let _this = this;
      var files = e.target.files[0];
      this.$refs["input-img"].value = null;
      if (!e || !window.FileReader) return; // 看支持不支持FileReader
      let reader = new FileReader();
      reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
      reader.onloadend = function() {
        _this.imgList.push({
          src: this.result,
          hover: false,
          leftShow: false,
          rightShow: false
        });
      };
    },
    clickUpload(e){
      
    }
  }
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
