<template>
  <div class="room-filter">
    <a-checkbox :indeterminate="indeterminate" @change="onCheckAllChange" :checked="checkAll">全选</a-checkbox>
    <a-checkbox-group :options="getRoomTypeOption" v-model="checkedList" @change="handleChange" />
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      indeterminate: false,
      checkedList: [],
      checkAll: false,
    };
  },
  created(){

  },
  methods: {
    handleChange() {
      this.indeterminate =
        !!this.checkedList.length &&
        this.checkedList.length < this.getRoomTypeOption.length;
      this.checkAll = this.checkedList.length === this.getRoomTypeOption.length;
      if (this.checkAll === true) {
        this.$store.dispatch(
          "updateTypeFilter",
          this.$store.state.RoomManagement.typeOptions
        );
      } else {
        this.$store.dispatch("updateTypeFilter", this.checkedList);
      }
    },
    onCheckAllChange(e) {
      Object.assign(this, {
        checkedList: e.target.checked ? this.getRoomTypeOption : [],
        indeterminate: false,
        checkAll: e.target.checked
      });
    }
  },
  computed: {
    getRoomTypeOption() {
      let roomTypeOption = this.$store.state.RoomManagement.typeOptions.slice();
      return roomTypeOption;
    }
  },
};
</script>
<style lang="less" scoped>
.room-filter {
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
  .all-type-select {
    padding-bottom: 1px;
    padding-left: 5px;
    padding-right: 10px;
  }
}
</style>
