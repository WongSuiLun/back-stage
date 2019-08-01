<template>
  <div>
    <under-line lineColor="#000">
      <span slot="left">团队信息</span>
    </under-line>
    <div class="customer-profile">
      <div class="profile-item">
        <el-form
          :model="profileForm"
          label-width="80px"
          size="mini"
        >
          <el-col :span="12">
            <el-form-item label="团队名:">
              <a-input v-model="profileForm.customerName"></a-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="证件号:">
              <a-input v-model="profileForm.customerName"></a-input>
            </el-form-item>
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
        <el-button
          @click="dialogVisible = false"
          size="small"
          type="danger"
        >取 消</el-button>
        <el-button
          type="primary"
          @click="dialogVisible = false"
          size="small"
        >确 定</el-button>
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

