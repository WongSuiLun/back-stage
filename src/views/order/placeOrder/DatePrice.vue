<template>
  <div class="date-price">
    <date-picker></date-picker>
  </div>
</template>

<script>
import { DatePicker } from "@/components";
export default {
  components: {
    DatePicker
  },
  data() {
    return {};
  },
  created() {}
};
</script>

<style lang="less" scoped>
.date-price{
  margin-top:10px;
}
</style>

