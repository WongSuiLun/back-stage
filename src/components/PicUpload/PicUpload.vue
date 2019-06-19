<template>
  <div class="pic-upload">
    <div class="preview-list">
      <template v-for="(img,index) in imgList" @mouseleave="handleMouseLeave(img)">
        <div
          class="preset-box"
          @mouseout="handleMouseLeave(img)"
          v-show="img.leftShow"
          :key="`left`+index"
          @drop="leftDrop(index)"
          @dragover="allowDrop"
        ></div>
        <div
          class="preview-img"
          @dragstart="handleDragStart($event, img,index)"
          @dragend="handleDragEnd($event,img)"
          @dragover="allowDrop($event,img,index)"
          @mouseleave="handleMouseLeave(img)"
          draggable="true"
          :key="index"
        >
          <img :src="img.src" alt="user image" @mouseenter="img.hover = true">
          <div class="img-action" v-show="img.hover" @mouseleave="img.hover = false">
            <a @click="preview(img.src)" title="预览图片">
              <a-icon type="eye"/>
            </a>
            <a @click="deleteImg(index)">
              <a-icon type="delete"/>
            </a>
          </div>
        </div>
        <div
          class="preset-box"
          v-show="img.rightShow"
          :key="`right`+index"
          @drop="rightDrop(index)"
          @dragover="allowDrop"
        ></div>
      </template>
      <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
        <img style="width: 100%" :src="previewSrc">
      </a-modal>
    </div>
    <div class="upload-action" v-if="imgList.length<max">
      <input
        type="file"
        v-show="false"
        @change="imgInputChange"
        ref="input-img"
        multiple
        accept="image/png, image/jpeg, image/gif, image/jpg"
      >
      <button class="upload-btn" @click="clickUpload">上传图片</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgList: [],
      previewVisible: false,
      previewSrc: "",
      onDrapIndex: 0
    };
  },
  props: {
    max: {
      type: Number,
      required: false,
      default: 999
    },
    value: {
      type: Array,
      required: true
    }
  },
  watch: {
    imgList(val) {
      let imgValue = val.map(element => {
        return element.src;
      });
      this.$emit("input", imgValue);
    }
  },
  methods: {
    handleMouseLeave(img) {
      img.leftShow = false;
      img.rightShow = false;
    },
    leftDrop(index) {
      let temp = this.imgList[this.onDrapIndex];
      this.$set(this.imgList, this.onDrapIndex, this.imgList[index]);
      this.$set(this.imgList, index, temp);
    },
    rightDrop(index) {
      let temp = this.imgList[this.onDrapIndex];
      this.$set(this.imgList, this.onDrapIndex, this.imgList[index]);
      this.$set(this.imgList, index, temp);
    },
    allowDrop(event, img, index) {
      event.preventDefault();
      if (img == undefined) {
        return;
      }
      if (index != this.onDrapIndex) {
        if (index != this.onDrapIndex + 1 && !img.leftShow) {
          img.leftShow = true;
        }
        if (index != this.onDrapIndex - 1 && !img.rightShow) {
          img.rightShow = true;
        }
      }
    },
    drag() {
      console.log("drag");
    },
    handleDragStart($event, img, index) {
      this.onDrapIndex = index;
      console.log(img);
      // img.leftShow = true
      // this.imgList.splice(index,1)
    },
    handleDragEnd($event, img) {
      this.handleMouseLeave(img);
    },
    preview(src) {
      console.log(src);
      this.previewVisible = true;
      this.previewSrc = src;
    },
    deleteImg(index) {
      this.imgList.splice(index, 1);
    },
    handleCancel() {
      this.previewVisible = false;
    },
    clickUpload() {
      this.$refs["input-img"].click();
      console.log(this.$refs);
    },
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
    }
  }
};
</script>

<style lang="less" scoped>
#div1 {
  width: 198px;
  height: 66px;
  padding: 10px;
  border: 1px solid #aaaaaa;
}
.pic-upload {
  .preview-list {
    .preset-box {
      width: 104px;
      height: 104px;
      border: 1px dashed #d9d9d9;
      margin: 5px;
      float: left;
    }
    .preview-img {
      width: 104px;
      height: 104px;
      margin: 5px;
      padding: 8px;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
      float: left;
      position: relative;
      img {
        width: 84px;
        height: 84px;
      }
      .img-action {
        position: absolute;
        background: rgba(0, 0, 0, 0.5);
        width: 84px;
        height: 84px;
        top: 8px;
        left: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        a {
          display: block;
          opacity: 1;
          color: #fff;
          margin: 5px;
          font-size: 16px;
        }
      }
    }
  }
  .upload-action {
    .upload-btn {
      margin: 5px;
      display: inline-block;
      border: 1px dashed #d9d9d9;
      border-radius: 4px;
      height: 104px;
      width: 104px;
      background: #fafafa;
      cursor: pointer;
      outline: none;
      &:hover {
        border-color: #1890ff;
      }
    }
  }
}
</style>
