<template>
  <div
    :class="type"
    class="btn md-accent"
    :style="{'background-color':color}"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "default"
    },
    color: {
      type: String,
    }
  },
  methods: {
  }
};
</script>

<style>
.btn {
  display: inline-flex;
  min-width: 88px;
  height: 36px;
  margin: 6px 8px;
  font-family: inherit;
  border: 0;
  outline: 0;
  cursor: pointer;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
  0 1px 5px 0 rgba(0, 0, 0, 0.12);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border-radius: 2px;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  color: #fff;
  padding: 0 8px;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
}
.default {
  background-color: #e7e7e7;
  color: #000;
  background-color: var(--md-theme-demo-light-accent, #e7e7e7);
}
.red {
  background-color: #ff5252;
  background-color: var(--md-theme-demo-light-accent, #ff5252);
}
</style>
