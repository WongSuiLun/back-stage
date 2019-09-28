<template>
  <div>
    <under-line lineColor="#000">
      <span slot="left">客人资料</span>
    </under-line>
    <div class="customer-profile">
      <div class="avator">
        <img
          src="https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike150%2C5%2C5%2C150%2C50/sign=3bac7d4c851001e95a311c5dd9671089/8cb1cb1349540923453457db9a58d109b3de4931.jpg"
          width="100"
          height="100"
        />
      </div>
      <div class="profile-item">
        <el-form
          :model="profileForm"
          label-width="80px"
          size="mini"
        >
          <el-col :span="8">
            <el-form-item label="姓名:">
              <a-input v-model="profileForm.customerName"></a-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件类型:">
              <a-input v-model="profileForm.customerName"></a-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件号:">
              <a-input v-model="profileForm.customerName"></a-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电话:">
              <a-input v-model="profileForm.customerName"></a-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="特殊要求:">
              <a-input v-model="profileForm.customerName"></a-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <a-button
              type="warning"
              size="mini"
            >清除客人资料</a-button>
          </el-col>
        </el-form>
      </div>
    </div>
    <under-line lineColor="#000">
      <span slot="left">订单信息</span>
    </under-line>
    <under-line lineColor="#000">
      <span slot="left">房间信息</span>
    </under-line>
    <div class="dialog-footer">
      <span >
        <a-button
          @click="dialogVisible = false"
          size="small"
          type="danger"
        >取 消</a-button>
        <a-button
          type="primary"
          @click="dialogVisible = false"
          size="small"
        >确 定</a-button>
      </span>
    </div>
  </div>
</template>
<script>
import UnderLine from '@/components/UnderLine/UnderLine'
export default {
  components: {
    UnderLine
  },
  data () {
    return {
      profileForm: {
        customerName: ''
      }
    }
  }
}
</script>
<style lang="less" scoped>
.customer-profile {
  padding: 5px;
  display: flex;
  justify-content: flex-start;
  .profile-item {
    width: -webkit-fill-available;
    max-width: 100%;
  }
}
.dialog-footer{
  margin: 8px;
}
</style>

