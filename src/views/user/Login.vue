<template>
  <div class="main">
    <a-form
      id="components-form-demo-normal-login"
      :form="form"
      class="user-layout-login"
      @submit="handleSubmit"
      v-show="toggleFormVisible"
    >
      <a-form-item>
        <a-input
          size="large"
          v-decorator="[
          'username',
          { rules: [{ required: true, message: '请输入您的用户名!' }] }
        ]"
          placeholder="用户名"
        >
          <a-icon
            slot="prefix"
            type="user"
            style="color: rgba(0,0,0,.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          size="large"
          v-decorator="[
          'password',
          { rules: [{ required: true, message: '请输入您的密码！' }] }
        ]"
          type="password"
          placeholder="密码"
        >
          <a-icon
            slot="prefix"
            type="lock"
            style="color: rgba(0,0,0,.25)"
          />
        </a-input>
      </a-form-item>
      <a-row :gutter="16">
        <a-col
          class="gutter-row"
          :span="14"
        >
          <a-form-item style="margin:5px 0">
            <a-input
              size="large"
              type="text"
              placeholder="验证码"
              v-decorator="['captcha_code', {rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}]"
            >
              <a-icon
                slot="prefix"
                type="mail"
                :style="{ color: 'rgba(0,0,0,.25)' }"
              />
            </a-input>
          </a-form-item>
        </a-col>
        <a-col
          class="gutter-row"
          :span="10"
        >
          <img
            :src="captchaImg"
            class="img-captcha"
            title="点击切换"
            alt="暂无图片"
            @click="getCaptch"
          >
        </a-col>
      </a-row>
      <a-form-item style="margin:0">
        <a-checkbox v-decorator="['rememberMe']" :defaultChecked="rememberMeDefaultChecked">自动登录</a-checkbox>
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          class="login-button"
        >
          进入
        </a-button>
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          class="login-button"
          v-on:click="toggleForm"
        >
          切换账号
        </a-button>
      </a-form-item>
    </a-form>
    <a-form
      v-show="!toggleFormVisible"
      class="user-layout-login"
    >
      <a-form-item>
        <a-input
          size="large"
          type="text"
          placeholder="手机号"
          v-decorator="['mobile', {rules: [{ required: true, pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号' }], validateTrigger: 'change'}]"
        >
          <a-icon
            slot="prefix"
            type="mobile"
            :style="{ color: 'rgba(0,0,0,.25)' }"
          />
        </a-input>
      </a-form-item>

      <a-row :gutter="16">
        <a-col
          class="gutter-row"
          :span="16"
        >
          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="验证码"
              v-decorator="['captcha_code', {rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}]"
            >
              <a-icon
                slot="prefix"
                type="mail"
                :style="{ color: 'rgba(0,0,0,.25)' }"
              />
            </a-input>
          </a-form-item>
        </a-col>
        <a-col
          class="gutter-row"
          :span="8"
        >
          <a-button
            class="getCaptcha"
            tabindex="-1"
            v-text=" '获取验证码' "
          ></a-button>
        </a-col>
      </a-row>
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          class="login-button"
        >
          进入
        </a-button>
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          class="login-button"
          v-on:click="toggleForm"
        >
          切换账号
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { authorizations, captchas } from "@/api/auth";
import Cookies from "js-cookie";
export default {
  data() {
    return {
      toggleFormVisible: true,
      captchaImg: "",
      captcha_key: "",
      rememberMeDefaultChecked:true
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  created() {
    this.getCaptch();
  },
  mounted() {
    this.setCookieAccount();
  },
  methods: {
    getCaptch() {
      captchas().then(res => {
        console.log(res);
        this.captchaImg = res.data.captcha_image_content;
        this.captcha_key = res.data.captcha_key;
      });
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          values.captcha_key = this.captcha_key;
          authorizations(values)
            .then(res => {
              this.saveAcount(values);
              // this.$store.commit("SET_TOKEN", res.data.result.token);
              this.$ls.set("Access-Token", "123", "1000");
              this.$router.push({ name: "dashboard" });
            })
            .catch(err => {
              console.log(err.response);
              this.$notification["error"]({
                message: "登陆失败",
                description: err.response ? err.response.data.message : ""
              });
            });
        }
      });
    },
    toggleForm() {
      this.toggleFormVisible = !this.toggleFormVisible;
    },
    setCookieAccount() {
      console.log(document.cookie);
      if (Cookies.get("rememberMe")) {
        this.form.setFieldsValue({
          username: Cookies.get("username"),
          password: Cookies.get("password"),
          rememberMe: true
        });
        this.rememberMeDefaultChecked = true
      }else{
        this.rememberMeDefaultChecked = false
      }
    },
    saveAcount(values) {
      if (values.rememberMe) {
        Cookies.set("username", values.username, { expires: 7 });
        Cookies.set("password", values.password, { expires: 7 });
        Cookies.set("rememberMe", values.rememberMe, { expires: 7 });
      } else {
        Cookies.remove("username");
        Cookies.remove("password");
        Cookies.remove("rememberMe");
      }
    }
  }
};
</script>

<style>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>
<style lang="less" scoped>
.user-layout-login {
  .img-captcha {
    cursor: pointer;
  }
  overflow: hidden;
  label {
    font-size: 14px;
  }
  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }
}
</style>
