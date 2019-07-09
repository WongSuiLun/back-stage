<template>
  <div>
    <!-- 图文消息组件 返回选择的图文消息-->
    <div class="pic-text-inner">
      <div class="pic-text-inner_no_select">
        <div class="msg-btn-select">
          <a-icon type="folder" class="icon-size-40" />
          <span class="msg-btn-select-text">从素材库选择</span>
        </div>
        <div class="msg-btn-select">
          <a-icon type="form" class="icon-size-40" />
           <span class="msg-btn-select-text">自建图文</span>
        </div>
        <div class="msg-btn-select">
          <a-icon type="share-alt" class="icon-size-40" />
          <span class="msg-btn-select-text">转载文章</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.icon-size-40 {
  font-size: 40px;
}
.pic-text-inner {
  min-height: 170px;
  width: 100%;
  padding: 20px;
  .pic-text-inner_no_select {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .msg-btn-select {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    color: #8d8d8d;
    width: 130px;
    justify-content: center;
    align-items: center;
    min-height: 130px;
    cursor: pointer;
    &:hover{
        background-color: #f6f8f9;
    }
    .msg-btn-select-text{
        padding: 8px 0;
    }
  }
}
</style>

