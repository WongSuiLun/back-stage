<template>
  <div>
    <div style="margin-bottom:10px">
      <a-button type="primary" @click="showDrawer">新增商品类型</a-button>
      <a-drawer
        :title="drawerTitle"
        placement="right"
        :width="420"
        :closable="false"
        @close="onClose"
        :visible="newGoodTypeDrawerVisible"
      >
        <a-form layout="vertical" hideRequiredMark>
          <!-- <a-row :gutter="16">
            <a-col :span="24">
              <a-form-item label="店">
                <a-select style="width: 100%" v-model="typeId">
                  <a-select-option
                    :key="type.id"
                    :value="type.id"
                    v-for="type in institutionTypeOption"
                  >{{type.title}}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>-->
          <a-row :gutter="16">
            <a-col :span="24">
              <a-form-item label="商品类目名称">
                <a-input v-model="typeName" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="24" v-if="!isUpload">
              <a-form-item label="父级类目">
                <a-select style="width: 100%" v-model="parentId">
                  <a-select-option key="0" value="0">无（将作为父级类目）</a-select-option>
                  <a-select-option
                    :key="type.id"
                    :value="type.id"
                    v-for="type in data"
                  >{{type.name}}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24">
              <a-form-item label="上传图片">
                <a-upload
                  name="file"
                  listType="picture-card"
                  class="avatar-uploader"
                  :showUploadList="false"
                  :data="uploadAddData"
                  :headers="uploadHeader"
                  :multiple="false"
                  :action="uploadUrl"
                  @change="handleChange"
                >
                  <img v-if="imageUrl" :src="imageUrl" alt="avatar" style="width:100%;height:110px" />
                  <div v-else>
                    <a-icon :type="loading ? 'loading' : 'plus'" />
                    <div class="ant-upload-text">Upload</div>
                  </div>
                </a-upload>
                <a-button
                  type="danger"
                  @click="deleteImagePic"
                  :disabled="deleteImageButtonDisable"
                >删除图片</a-button>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
        <div
          :style="{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e8e8e8',
          padding: '10px 16px',
          textAlign: 'right',
          left: 0,
          background: '#fff',
          borderRadius: '0 0 4px 4px',
        }"
        >
          <a-button style="marginRight: 8px" @click="onClose">取消</a-button>
          <a-button type="primary" @click="handleAddGoodType">提交</a-button>
        </div>
      </a-drawer>
    </div>
    <a-table :columns="columns" :dataSource="data" bordered>
      <template slot="cover" slot-scope="text, record">
        <img :src="record.image" style="width:100px;height:100px" />
      </template>
      <template slot="operation" slot-scope="text, record">
        <a-button type="link" @click="onEdit(record)">编辑</a-button>
        <a-popconfirm title="Sure to delete?" @confirm="() => onDelete(record.id)">
          <a href="javascript:;">删除</a>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>

<script>
const columns = [
  {
    title: "id",
    dataIndex: "id"
  },
  {
    title: "name",
    dataIndex: "name"
  },
  {
    title: "封面",
    dataIndex: "image",
    scopedSlots: { customRender: "cover" }
  },
  {
    title: "操作",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" }
  }
];
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
import {
  getInstitutions,
  getInstitutionType,
  addInsitutions
} from "@/api/institutions";
import { deleteAttach, addAttach } from "@/api/attach";
import {
  getGoodTypeList,
  addGoodType,
  deleteGoodType,
  updateGoodType
} from "@/api/good";
export default {
  data() {
    return {
      data: [],
      columns,
      newGoodTypeDrawerVisible: false,
      typeTitle: "",
      instituteName: "",
      institutionTypeOption: [],
      loading: false,
      typeId: "",
      parentId: "",
      uploadUrl: "http://192.168.101.115:8089/api/attach",
      imageUrl: "",
      typeName: "",
      shop_id: "",
      company_no: "",
      parent: "",
      image: "",
      image_id: "",
      drawerTitle: "新增商品类目",
      isUpload: false,
      updateId: -1
    };
  },
  created() {
    this.initData();
  },
  computed: {
    uploadHeader() {
      return {
        company: this.$ls.get("company").id
      };
    },
    deleteImageButtonDisable() {
      if (this.image_id) {
        return false;
      }
      return true;
    }
  },
  methods: {
    initData() {
      //   getInstitutions().then(res => {
      //     this.data = res.data.data;
      //   });
      getInstitutionType().then(res => {
        this.institutionTypeOption = res.data.data;
      });
      getGoodTypeList().then(res => {
        this.data = res.data.data;
      });
    },
    showDrawer() {
      this.newGoodTypeDrawerVisible = true;
    },
    onClose() {
      this.newGoodTypeDrawerVisible = false;
      this.isUpload = false;
      this.drawerTitle = "新增商品类目";
      this.resetForm();
    },

    resetForm() {
      this.typeName = "";
      this.shop_id = "";
      this.parent = "";
      this.imageUrl = "";
      this.image = "";
      this.image_id = "";
    },

    //处理提交按钮
    handleAddGoodType() {
      if (this.isUpload) {
        let data = {
          name: this.typeName,
          image: this.image,
          company_no: this.$ls.get("company").id,
          image_id: this.image_id
        };
        updateGoodType(this.updateId,data).then(res => {
          this.$message.success("添加成功");
          this.initData();
          this.resetForm()
          this.newGoodTypeDrawerVisible = false;
        });
      } else {
        let data = {
          name: this.typeName,
          shop_id: this.shop_id,
          company_no: this.$ls.get("company").id,
          parent: this.parentId,
          image: this.image,
          image_id: this.image_id
        };
        addGoodType(data).then(res => {
          console.log(res);
          this.$message.success("添加成功");
          this.initData();
          this.newGoodTypeDrawerVisible = false;
          this.resetForm()
        });
      }
    },

    uploadAddData() {
      return {
        module: "goods"
      };
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
    handleChange(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => {
          this.imageUrl = imageUrl;
          this.loading = false;
        });
        this.image = info.file.response.data.file_url;
        this.image_id = info.file.response.data.attach_id;
      }
    },

    //删除绑定的图片
    deleteImagePic() {
      if (this.image_id) {
        deleteAttach(this.image_id).then(res => {
          this.imageUrl = "";
          this.image = "";
          this.image_id = "";
          this.$message.success("刪除成功");
        });
      }
    },

    onEdit(typeObject) {
      this.drawerTitle = `编辑(id:${typeObject.id},名称：${typeObject.name})`;
      this.newGoodTypeDrawerVisible = true;
      this.isUpload = true;
      this.updateId = typeObject.id;
      this.imageUrl = typeObject.image;
      this.image = typeObject.image;
      this.image_id = typeObject.image_id;
      this.typeName = typeObject.name;
    },
    onDelete(id) {
      deleteGoodType(id).then(res => {
        this.$message.success("删除成功");
        this.initData();
      });
    }
  }
};
</script>

<style>
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>