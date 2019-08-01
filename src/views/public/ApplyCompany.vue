<template>
  <div class="warp">
    <div class="form-warp">
      <div class="company-form">
        <a-form>
          <a-form-item
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            label="手机"
            validate-status="validating"
            help="作为登录账号，请填写正确的手机号"
          >
            <a-input id="validating" placeholder="I'm the content is being validated" />
          </a-form-item>

          <a-form-item
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            label="手机验证码"
            validate-status="validating"
            help="手机短信验证码"
          >
            <a-row :gutter="8">
              <a-col :span="12">
                <a-input
                  v-decorator="[
              'captcha',
              {rules: [{ required: true, message: 'Please input the captcha you got!' }]}
            ]"
                />
              </a-col>
              <a-col :span="12">
                <a-button>获取验证码</a-button>
              </a-col>
            </a-row>
          </a-form-item>

          <a-form-item
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            label="邮箱"
            validate-status="validating"
            help="手机短信验证码"
          >
            <a-input id="validating" placeholder="I'm the content is being validated" />
          </a-form-item>

          <a-form-item
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            label="酒店名称"
            validate-status="validating"
            help="填写酒店全称"
          >
            <a-input id="validating" placeholder="I'm the content is being validated" />
          </a-form-item>

          <a-form-item
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            label="所在地"
            validate-status="validating"
          >
            <a-select
              :defaultValue="provinceData[0]"
              style="width: 120px"
              @change="handleProvinceChange"
              v-model="provinceValue"
            >
              <a-select-option v-for="province in provinceData" :key="province.id" >{{province.fullname}}</a-select-option>
            </a-select>
            <a-select v-model="cityValue" style="width: 120px"  @change="handleCityChange">
              <a-select-option v-for="city in cityData" :key="city.id" >{{city.fullname}}</a-select-option>
            </a-select>
             <a-select v-model="secondCity" style="width: 120px" v-if="districtData.length>0">
              <a-select-option v-for="district in districtData" :key="district.id" >{{district.fullname}}</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            label="营业执照号码"
            validate-status="validating"
            help="如换新证，填写三证合一号码"
          >
            <a-input id="validating" placeholder="I'm the content is being validated" />
          </a-form-item>

          <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="上传营业执照照片">
            <a-upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              :fileList="fileList"
              @preview="handlePreview"
              @change="handleChange"
            >
              <div v-if="fileList.length < 3">
                <a-icon type="plus" />
                <div class="ant-upload-text">Upload</div>
              </div>
            </a-upload>
            <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
              <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>
          </a-form-item>
          <a-form-item>
            <a-checkbox v-decorator="['agreement', {valuePropName: 'checked'}]">
              <a href>我同意并遵守《温泉复合业态平台服务协议》</a>
            </a-checkbox>
          </a-form-item>
        </a-form>
      </div>
      <div class="to-login">
        <p>
          <span>已有账号？</span>
          <a>立即登录</a>
        </p>
        <div>
          <base-button type="red" color="#19a9f0">
            <a-icon type="qq" />QQ登录
          </base-button>
          <base-button type="red" color="#01bb00">
            <a-icon type="wechat" />微信登录
          </base-button>
          <base-button type="red" color="#ed2b2f">
            <a-icon type="weibo" />微博登录
          </base-button>
        </div>
      </div>
    </div>
    <div class="action-warp">
      <base-button type="red" color="#009805">提交订单</base-button>
      <base-button type="red" color="#7f7f7f">取消</base-button>
    </div>
  </div>
</template>

<script>
import { BaseButton } from "@/components";
import { MAP_QQ_KEY } from "@/constant";
import {getDistrict} from '@/api/addGood'
import {province_list,city_list,county_list} from '@/utils/area'
export default {
  components: {
    BaseButton
  },
  data() {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      },
      previewVisible: false,
      previewImage: "",
      fileList: [
        {
          uid: "-1",
          name: "xxx.png",
          status: "done",
          url:
            "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        }
      ],
      areaData:[],
      provinceData:[],
      cityData:[],
      districtData:[],
      provinceValue:'',
      cityValue:'',
      cities:'',
      secondCity: ''
    };
  },
  created() {
    getDistrict().then(res=>{
      this.areaData = res.data.result
      this.provinceData = this.areaData[0]
    })
  },
  methods: {
    handleCancel() {
      this.previewVisible = false;
    },
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      this.fileList = fileList;
    },
    handleProvinceChange(value) {
      let prefix = value.toString().substr(0,2)
         console.log(value)
      console.log(prefix)
      this.cityData = this.areaData[1].filter((v,index)=>{
        return v.id.indexOf(prefix)==0;
      })
      console.log(this.cityData)
    },
    handleCityChange(value){
       let prefix = value.toString().substr(0,4)
         console.log(value)
      console.log(prefix)
      this.districtData = this.areaData[2].filter((v,index)=>{
        console.log(v.id.indexOf(prefix))
        return v.id.indexOf(prefix)==0;
      })
      console.log(this.districtData)
    }
  }
};
</script>

<style lang="less" scoped>
.warp {
  background: #fff;
  width: 80vw;
  margin: 0 auto;
  min-height: 50vh;

  padding: 40px;
  .form-warp {
    display: flex;
    .company-form {
      border-right: 1px solid #e4e0e0;
      height: 100%;
      width: 50%;
    }
  }
  .to-login {
    margin-left: 40px;
  }
  .action-warp {
    display: flex;
    justify-content: center;
    margin-top: 20px;

    .action {
      margin-right: 8px;
    }
  }
}
</style>

