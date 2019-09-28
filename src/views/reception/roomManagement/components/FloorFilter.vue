<template>
  <div class="floor-filter">
    <!-- <a-radio-group defaultValue="全选" buttonStyle="solid" v-model="radio" @change="handleChange">
        <a-radio-button value="option" v-for="option in getFloorOptions" :key="option">
          {{option}}
        </a-radio-button>
    </a-radio-group>-->
    <a-checkbox :indeterminate="indeterminate" @change="onCheckAllChange" :checked="checkAll">全选</a-checkbox>
    <a-checkbox-group :options="getFloorOptions" v-model="checkedList" @change="onChange" />
  </div>
</template>
<script>
let defaultCheckedList = [];
export default {
  components: {},
  data() {
    return {
      indeterminate: false,
      checkedList: [],
      checkAll: false
    };
  },
  created() {
  },
  methods: {
    onChange(checkedList) {
      this.indeterminate =
        !!checkedList.length &&
        checkedList.length < this.getFloorOptions.length;
      this.checkAll = checkedList.length === this.getFloorOptions.length;

      if (this.checkAll === true) {
        this.$store.dispatch(
          "updateFloorFilter",
          this.$store.state.RoomManagement.floorOptions
        );
      } else {
        // let floor = parseInt(this.radio)
        // let array = []
        // array.push(floor)
        this.$store.dispatch(
          "updateFloorFilter",
          this.checkedList.map(ele => parseInt(ele))
        );
      }
    },
    onCheckAllChange(e) {
      Object.assign(this, {
        checkedList: e.target.checked ? this.getFloorOptions : [],
        indeterminate: false,
        checkAll: e.target.checked
      });
    }
  },
  computed: {
    getFloorOptions() {
      let option = [];
      this.$store.state.RoomManagement.floorOptions.forEach(ele => {
        option.push(`${ele}F`);
      });
      return option;
    }
  },
};
</script>
