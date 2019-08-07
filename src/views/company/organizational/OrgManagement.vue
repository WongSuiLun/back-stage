<template>
  <div class="content-warp">
    <a-tabs defaultActiveKey="1" @change="callback">
      <a-tab-pane tab="机构列表" key="1">
        <organizational-list></organizational-list>
      </a-tab-pane>
      <a-tab-pane tab="机构类别列表" key="2" forceRender>
        <organizational-type-list></organizational-type-list>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import OrganizationalList from "./components/OrganizationalList";
import OrganizationalTypeList from "./components/OrganizationalTypeList";
import { getInstitutions } from "@/api/institutions.js";
export default {
  components: {
    OrganizationalList,
    OrganizationalTypeList
  },
  created() {
    getInstitutions().then(res => {
      console.log(res);
    });
  }
};
</script>

<style lang="less" scoped>
</style>
