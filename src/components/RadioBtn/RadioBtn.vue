<template>
  <div class="radio-button" ref="bar">
    <base-button
      v-for="(item,index) in items"
      :type="index==activeIndex?'red':'default'"
      :key="item"
      @click.native="selectItem(index)"
    >{{item}}</base-button>
  </div>
</template>

<script>
import BaseButton from "@/components/BaseButton";
export default {
  components: {
    BaseButton
  },
  data() {
    return {
      activeIndex:0
    };
  },
  props: {
    items: Array,
    value:String ,
    size: String
  },
  created(){
    if(!this.items.includes(this.value)){
      this.radioValue = this.items[0]
    }else{
      this.activeIndex = this.items.indexOf(this.radioValue)
    }
  },
  mounted(){
    console.log(this.$refs)
  },
  computed: {
    radioValue: {
      get: function() {
        return this.value;
      },
      set: function(newValue) {
        this.$emit("input", newValue);
      }
    }
  },
  methods: {
    selectItem(index){
      this.activeIndex = index
      this.radioValue = this.items[index]
    }
  }
};
</script>

<style lang="less">
.radio-button {
  width: 100%;
  display: flex;
  overflow: auto;
}
</style>

