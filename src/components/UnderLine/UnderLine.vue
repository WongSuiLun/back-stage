<template>
  <div class="underline" v-bind:style="styleObject">
    <slot name="left"></slot>
    <slot name="right"></slot>
  </div>
</template>
<script>
export default {
  props: {
    lineColor: String,
    size: {
      type: Number,
      default: 1
    },
    lineType: {
      type: String,
      default: 'solid'
    }
  },
  data () {
    return {
    }
  },
  computed: {
    styleObject () {
      return {
        borderBottom: `${this.size}px ${this.lineType} ${this.lineColor}`,
        fontSize: '13px',
        color: this.lineColor
      }
    }
  }
}
</script>

<style lang="less" scoped>
.underline{
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding-bottom: 2px;
  line-height: 26px;
}
</style>