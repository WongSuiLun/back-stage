<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { AppDeviceEnquire } from '@/utils/mixin'
export default {
  name: 'app',
  mixins: [AppDeviceEnquire],
}
</script>
<style>
</style>
