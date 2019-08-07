<template>
  <div class="step-warp">
    <div
      class="step-item"
      v-for="(step,index) in stepNames"
      :class="{'active':index==value}"
      :key="`name${step.name}`"
      @click="dumpToStep(index)"
    >{{step.name}}</div>
  </div>
</template>

<script>
export default {
  props: {
    stepNames: {
      type: Array,
      default: []
    },
    value: {
      type: Number,
      default: 0
    }
  },
  methods:{
      dumpToStep(index){
          if(this.stepNames[index].finish||this.stepNames[index-1].finish){
              this.$emit('input',index);
          }else{
               this.$message.warn('请先完成此步骤的填写');
          }
      }
  }

};
</script>

<style lang="less" scoped>
@green_color: #009804;
@gray_color: #e9e9e9;
.step-warp {
  width: 100%;
  background: @gray_color;
  height: 40px;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  .step-item {
    flex-grow: 1;
    text-align: center;
    line-height: 40px;
    position: relative;
    cursor: pointer;
    &.active {
      background: @green_color;
      color: #fff;
      &:not(:last-child)::after {
        content: "";
        position: absolute;
        border-width: 20px 20px 20px 20px;
        border-color: @gray_color @gray_color @gray_color @green_color;
        border-style: dashed;
        right: -40px;
      }
    }
  }
}
</style>
