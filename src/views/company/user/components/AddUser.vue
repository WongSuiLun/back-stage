<template>
  <a-form layout="vertical" @submit="handleSubmit">
    <div>
      <div class="card-warp">
        <a-divider orientation="left">主要信息</a-divider>

        <a-row type="flex" justify="left">
          <a-col :span="12">
            <a-form-item :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }" :label="`用户类型：`">
              <a-tag color="#f50">用户</a-tag>
            </a-form-item>

            <a-form-item :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }" :label="`真实姓名`">
              <a-input
                v-decorator="[
                `realname`,
                {
                  rules: [{
                    required: true,
                    message: 'Input something!',
                  }],
                }
              ]"
                placeholder="请填写用户真实姓名"
              />
            </a-form-item>

            <a-form-item :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }" :label="`联系方式`">
              <a-input
                v-decorator="[
                `phone_number`,
                {
                  rules: [{
                    required: true,
                    message: 'Input something!',
                  }],
                }
              ]"
                placeholder="placeholder"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </div>
      <div class="card-warp">
        <a-divider orientation="left">身份信息</a-divider>
        <div>
          <a-form-item label="用户组：" :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }">
            <a-radio-group name="radioGroup" :defaultValue="1">
              <a-radio :value="1">A</a-radio>
              <a-radio :value="2">B</a-radio>
              <a-radio :value="3">C</a-radio>
              <a-radio :value="4">D</a-radio>
            </a-radio-group>
          </a-form-item>
        </div>
      </div>
      <div class="card-warp">
        <a-divider orientation="left">基本账户信息</a-divider>
       

        <div class="account-settings-info-view">
          <a-row type="flex" justify="left">
            <a-col :md="12">

                <a-form-item :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }" label=" ">
          <a-upload
            name="avatar"
            listType="picture-card"
            class="avatar-uploader"
            :showUploadList="false"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            :beforeUpload="beforeUpload"
            @change="handleChange"
          >
            <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">头像</div>
            </div>
          </a-upload>
                </a-form-item>
              <a-form-item :label-col="{ span: 3 }" :wrapper-col="{ span: 16 }" label="用户名">
                <a-input placeholder="给自己起个名字" />
              </a-form-item>
              <a-form-item
                :label-col="{ span: 3 }"
                :wrapper-col="{ span: 16 }"
                label="性别"
                v-decorator="[
                `sex`,
                {
                  rules: [],
                }
              ]"
              >
                <a-radio-group v-model="userType">
                  <a-radio :value="1">未知</a-radio>
                  <a-radio :value="1">男</a-radio>
                  <a-radio :value="2">女</a-radio>
                </a-radio-group>
              </a-form-item>

              <a-form-item
                :label-col="{ span: 3 }"
                :wrapper-col="{ span: 16 }"
                label="账号"
                :required="false"
                v-decorator="[
                `account`,
                {
                  rules: [],
                }
              ]"
              >
                <a-input placeholder="exp@admin.com" />
              </a-form-item>
              <a-form-item
                :label-col="{ span: 3 }"
                :wrapper-col="{ span: 16 }"
                label="密码"
                :required="false"
                v-decorator="[
                `password`,
                {
                  rules: [],
                }
              ]"
              >
                <a-input placeholder />
              </a-form-item>
              <a-form-item
                :label-col="{ span: 3 }"
                :wrapper-col="{ span: 16 }"
                label="电子邮箱"
                :required="false"
                v-decorator="[
                `email`,
                {
                  rules: [],
                }
              ]"
              >
                <a-input placeholder />
              </a-form-item>
              <a-form-item
                :label-col="{ span: 3 }"
                :wrapper-col="{ span: 16 }"
                label="生日"
                :required="false"
              >
                <a-date-picker></a-date-picker>
              </a-form-item>
              <a-form-item
                :label-col="{ span: 3 }"
                :wrapper-col="{ span: 16 }"
                label="地址"
                :required="false"
              >
                <a-textarea rows="3" placeholder="You are not alone." />
              </a-form-item>
              <a-form-item>
                <a-button type="primary" html-type="submit" >提交</a-button>
                <a-button style="margin-left: 8px">保存</a-button>
              </a-form-item>
            </a-col>
          </a-row>
        </div>
      </div>
    </div>
  </a-form>
</template>

<script>
const plainOptions = ["Apple", "Pear", "Orange"];
const defaultCheckedList = ["Apple", "Orange"];
import { addUser } from "@/api/user";
export default {
  data() {
    return {
      loading: false,
      expand: false,
      form: this.$form.createForm(this),
      userType: "",
      preview: {},
      option: {
        img: "/avatar2.jpg",
        info: true,
        size: 1,
        outputType: "jpeg",
        canScale: false,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 180,
        autoCropHeight: 180,
        fixedBox: true,
        // 开启宽度和高度比例
        fixed: true,
        fixedNumber: [1, 1]
      },
      checkedList: defaultCheckedList,
      indeterminate: true,
      checkAll: false,
      plainOptions
    };
  },
  computed: {
    count() {
      return this.expand ? 11 : 7;
    }
  },
  methods: {
    handleClick() {
      this.loading = !this.loading;
    },
    handleSearch(e) {
      e.preventDefault();
      this.form.validateFields((error, values) => {
        console.log("error", error);
        console.log("Received values of form: ", values);
      });
    },

    handleReset() {
      this.form.resetFields();
    },

    toggle() {
      this.expand = !this.expand;
    },
    handleSubmit(e) {
      e.preventDefault();
      alert(1);
      
      this.form.validateFields((err, values) => {
        if (!err) {
          let userModel = {
            area_code:86,
            phone_number:13631230698,
            realname:'csj',
            name:'csj',
            account:'csjcsj',
            password:'ywq123',
            sex:1,
            email:'807324068@qq.com'
          }
          console.log(userModel)
          addUser(userModel).then(res=>{
            console.log(res)
          })
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.card-warp {
  margin: 10px 0;
  padding: 0 30px;
}
.avatar-upload-wrapper {
  height: 200px;
  width: 100%;
}
.ant-upload-preview {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 180px;
  border-radius: 50%;
  box-shadow: 0 0 3px #ccc;
  .upload-icon {
    position: absolute;
    top: 0;
    right: 10px;
    font-size: 1.3rem;
    padding: 0.5rem;
    background: rgba(222, 221, 221, 0.7);
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
  .mask {
    opacity: 0;
    position: absolute;
    background: rgba(0, 0, 0, 0.3);
    cursor: pointer;
    transition: opacity 0.3s;
    &:hover {
      opacity: 1;
    }
    i {
      font-size: 2rem;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -1rem;
      margin-top: -1rem;
      color: #d6d6d6;
    }
  }
  img,
  .mask {
    width: 100%;
    max-width: 180px;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
  }
}
</style>

