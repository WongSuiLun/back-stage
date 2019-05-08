<template>
  <a-menu
    theme="dark"
    mode="inline"
    :openKeys.sync="openKeys"
    v-model="currentPath"
    @click="changeMenu"
  >
    <template v-for="menuItem in addRouters[0].children">
      <a-sub-menu :key="menuItem.path">
        <span slot="title">
          <a-icon :type="menuItem.meta.icon" /><span>{{menuItem.meta.title}}</span></span>
        <a-menu-item
          :key="item.path"
          v-for="item in menuItem.children"
        >
          <a-icon type="user" />
          <span>{{item.meta.title}}</span>
        </a-menu-item>
      </a-sub-menu>
    </template>
  </a-menu>
</template>

<script>
import { mapState } from "vuex";
import { mixinDevice } from "@/utils/mixin";
export default {
  data() {
    return {
      openKeys: [
        this.$router.currentRoute.matched[
          this.$router.currentRoute.matched.length - 2
        ].path
      ],
      currentPath: [this.$router.currentRoute.path]
    };
  },
  mixins: [mixinDevice],
  created() {},
  computed: {
    ...mapState({
      addRouters: state => state.permissinon.addRouters
    })
    // generateMenu(){
    //   let menuList = this.addRouters[0].children.map((topmic=>{
    //     let menuItem = {
    //       name:topmic.meta.title,
    //       icon:topmic.meta.icon,

    //     }
    //     console.log(topmic)
    //     topmic.children.forEach(topmicItem=>{
    //       console.log(topmicItem)
    //     })
    //     return menuItem
    //   }))
    //  return menuList
    // },
  },
  methods: {
    changeMenu(e) {
      this.$router.push(e.key);
    }
  },
  watch: {
    $route: function(newVal) {
      this.currentPath = [];
      this.currentPath.push(newVal.path);
      if (!this.isMobile()) {
        this.openKeys = [];
        this.openKeys.push(newVal.matched[newVal.matched.length - 2].path);
      }
    }
  }
};
</script>

<style>
</style>
