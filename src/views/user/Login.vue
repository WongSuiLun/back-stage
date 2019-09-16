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
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
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
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          size="large"
          v-show="false"
          v-decorator="[
          'captch',
          { rules: [{ required: true, message: '请通过滑块验证！' }] }
        ]"
        >
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input>
        <div class="captch-tip" @click="getScrollCaptch" :class="{'success':isCaptcha}">
          <div class="captch-text">
            <span v-show="!isCaptcha">
              <a-icon type="lock" />&nbsp;&nbsp;点击完成验证&nbsp;&nbsp;
            </span>
            <span v-show="isCaptcha">
              <a-icon type="check" style="color:#52ccba;" />&nbsp;&nbsp;验证成功&nbsp;&nbsp;
            </span>
          </div>
        </div>
        <!-- <a-button
          type="primary"
          html-type="submit"
          class="login-button"
          @click="getScrollCaptch"
        >滑动验证</a-button>-->
      </a-form-item>
      <!-- <a-row :gutter="16">
        <a-col class="gutter-row" :span="14">
          <a-form-item style="margin:5px 0">
            <a-input
              size="large"
              type="text"
              placeholder="验证码"
              v-decorator="['captcha_code', {rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}]"
            >
              <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>
        </a-col>
        <a-col class="gutter-row" :span="10">
          <img :src="captchaImg" class="img-captcha" title="点击切换" alt="暂无图片" @click="getCaptch" />
        </a-col>
      </a-row>-->
      <a-form-item style="margin:0">
        <a-checkbox v-decorator="['rememberMe']" :defaultChecked="rememberMeDefaultChecked">自动登录</a-checkbox>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" class="login-button">进入</a-button>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" class="login-button" v-on:click="toggleForm">切换账号</a-button>
      </a-form-item>
    </a-form>
    <a-form v-show="!toggleFormVisible" class="user-layout-login">
      <a-form-item>
        <a-input
          size="large"
          type="text"
          placeholder="手机号"
          v-decorator="['mobile', {rules: [{ required: true, pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号' }], validateTrigger: 'change'}]"
        >
          <a-icon slot="prefix" type="mobile" :style="{ color: 'rgba(0,0,0,.25)' }" />
        </a-input>
      </a-form-item>

      <a-row :gutter="16">
        <a-col class="gutter-row" :span="16">
          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="验证码"
              v-decorator="['captcha_code', {rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}]"
            >
              <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>
        </a-col>
        <a-col class="gutter-row" :span="8">
          <a-button class="getCaptcha" tabindex="-1" v-text=" '获取验证码' "></a-button>
        </a-col>
      </a-row>
      <a-form-item>
        <a-button type="primary" html-type="submit" class="login-button">进入</a-button>
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          class="login-button"
          v-on:click="toggleForm"
        >切换账号</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { authorizations, captchas,getContactCompany } from "@/api/auth";
import Cookies from "js-cookie";
export default {
  data() {
    return {
      toggleFormVisible: true,
      captchaImg: "",
      captchaKey: "",
      rememberMeDefaultChecked: true,
      isCaptcha: false,
      form:  this.$form.createForm(this)
    };
  },
  created() {
   
  },
  mounted() {
    this.initCookieAccount();
  },
  methods: {
    // 获取腾讯的人机验证机制
    getScrollCaptch() {
      if (this.isCaptcha) {
        return;
      }
      let form = this.form;
      let that = this;
      var captcha1 = new TencentCaptcha("2074164461", function(res) {
        /* callback */
        form.setFieldsValue({ captch: "true" });
        that.isCaptcha = true;
      });
      // this.form.setFieldsValue({captch:"123"})
      captcha1.show(); // 显示验证码
    },
    //获取图片验证码（已启用）
    getCaptch() {
      captchas().then(res => {
        console.log(res);
        this.captchaImg = res.data.captcha_image_content;
        this.captchaKey = res.data.captchaKey;
      });
    },
    /**
     * 处理登录
     * 1.验证表单
     * 2.成功，处理token和路由跳转
     * 3.失败
     */
    handleSubmit(e) {
      e.preventDefault();
      // this.$router.push({ name: "company-choose" });
      if(!this.isCaptcha){
        this.getScrollCaptch()
      }
      this.form.validateFields((err, values) => {
        if (!err) {
          // console.log("Received values of form: ", values);
          values.captchaKey = this.captchaKey;
          authorizations(values)
            .then(res => {
              this.setCookieAcount(values);
              if (res.data) {
                let token = `${res.data.token_type} ${res.data.access_token}`;
                let expires_in = res.data.expires_in;
                console.log(res);
                let permissions = res.data.data;
                this.$store.commit("SET_TOKEN", token);
                this.$ls.set("Access-Token", token, expires_in * 1000);
                this.$ls.set("PERMISSIONS", permissions, expires_in * 1000);
                this.$router.push({ name: "company-choose" });
               
              }
            })
            .catch(err => {
              console.log(err);
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
    // 初始化cookie中保存账号密码
    initCookieAccount() {
      if (Cookies.get("rememberMe")) {
        this.form.setFieldsValue({
          username: Cookies.get("username"),
          password: Cookies.get("password"),
          rememberMe: true
        });
        this.rememberMeDefaultChecked = true;
      } else {
        this.rememberMeDefaultChecked = false;
      }
    },
    /**
     * 1.若记住密码，设置账号密码
     * 2.初始化checkedBox
     */
    setCookieAcount(values) {
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
.captch-tip {
  height: 40px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 2px;
  border: 1px solid #e4e7eb;
  background-color: #f7f9fa;
  overflow: hidden;
  &.success {
    border-color: #52ccba;
    background-color: #d2f4ef;
    color: #52ccba;
  }
}
.captch-tip {
  text-align: center;
  color: #45494c;
}
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
