<template>
  <el-radio-group v-model="form.lockState">
    <el-radio :label="2">正常状态</el-radio>
    <el-radio :label="1">常开</el-radio>
    <el-radio :label="0">常关</el-radio>
  </el-radio-group>
</template>

<script>
  export default {
    name: 'setLockState',
    data () {
      return {
        form: {
          lockState: 2
        }
      }
    },
    methods: {
      getFormData () {
        return this.form
      }
    }
  }
</script>

<style scoped>

</style>
