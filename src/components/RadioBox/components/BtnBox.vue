<template>
  <div class="check-box-warp" :class="{'active':isActive}">
    <div>{{title}}</div>
    <div>{{subTitle}}</div>
    <div class="check-bg">
     
    </div>
    <div class="check-icon" v-show="isActive">
         <a-icon type="check" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: "",
    subTitle: "",
    isActive: Boolean
  }
};
</script>
<style lang="less" scoped>
@green_color: #009804;
@gray_color: rgb(217, 217, 217);
.check-box-warp {
  border: 1px solid @gray_color;
  width: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #434343;
  font-weight: 600;
  min-height: 40px;
  position: relative;
  cursor: pointer;
  &.active {
    border-color: @green_color;
    color: @green_color;
    .check-bg {
      position: absolute;
      bottom: 0;
      right: 0;
      border-right: 0;
      width: 0px;
      height: 0px;
      border-color: @green_color transparent;
      border-width: 0 0 25px 25px;
      border-style: solid;
    }
    .check-icon {
        position: absolute;
        bottom: 0;
        right: 0;
        color: #fff;
    }
  }
}
</style>

