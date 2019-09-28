<template>
  <div>
    <a-input-search placeholder="搜索标签" style="width: 200px" @search="onSearch" />
    <a-button type="primary" style="margin-left:8px;">多标签操作</a-button>
    <a-button type="primary" style="margin-left:8px;" @click="addTag">新增标签</a-button>
    <a-modal
      title="新建标签"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form>
        <a-form-item label="标签名" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
          <a-input v-model="tagName" />
        </a-form-item>
        <a-form-item label="顏色" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
          <colorPicker v-model="color" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      visible: false,
      formLayout: "horizontal",
      tagName: "",
      color: "#ff0000"
    };
  },
  methods: {
    addTag() {
      this.visible = true;
    },
    handleCancel() {
      this.visible = false;
    },
    handleOk() {
      let tag = {
        tagName:this.tagName,
        color:this.color
      }
      alert('tag')
      this.$store.commit("ADD_TAG",tag);
      this.visible = false
    },
    onSearch(){

    }
  }
};
</script>

<style scoped>
.tag-cover {
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 800;
}
</style>