<template>
  <div class="user-info-warp">
    <a-row>
      <a-col
        :xs="24"
        :sm="12"
        :md="5"
      ><span class="info-item">客户名:{{info.name}}</span></a-col>
      <a-col
        :xs="24"
        :sm="12"
        :md="5"
      ><span class="info-item">会员级别:{{info.vipLevel}}</span></a-col>
      <a-col
        :xs="24"
        :sm="12"
        :md="5"
      ><span class="info-item">积分:{{info.points}}</span></a-col>
      <a-col
        :xs="24"
        :sm="12"
        :md="5"
      ><span class="info-item">手机号:{{info.phone}}</span></a-col>

      <a-col
        :xs="24"
        :sm="12"
        :md="4"
      ><span class="info-item">旧卡号:{{info.oldCardNumber}}</span></a-col>
      <a-col
        :xs="24"
        :sm="12"
        :md="5"
      ><span class="info-item">生日:{{info.birthday}}</span></a-col>
      <a-col
        :xs="24"
        :sm="12"
        :md="5"
      ><span class="info-item">信息:{{info.tagInfo}}</span></a-col>
      <a-col
        :xs="24"
        :sm="12"
        :md="5"
      ><span class="info-item">邮箱:{{info.email}}</span></a-col>
      <a-col
        :xs="24"
        :sm="12"
        :md="9"
      ><span class="info-item">地址:{{info.address}}</span></a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  props: {
    info: Object
  }
};
</script>

<style lang="less" scoped>
.user-info-warp{
  .info-item{
    font-size: 16px;
    width: 100%;
    border-bottom: 1px solid #ddd;
    display: block;
    padding: 8px 0;
  }
}
</style>
