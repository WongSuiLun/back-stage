<template>
  <el-form ref="makeCardForm" :model="form" :rules="form_rules" label-width="100px" label-position="left">
    <el-form-item label="到期时间:" prop="cut_off_date">
      <el-date-picker
        v-model="form.cut_off_date"
        type="datetime"
        value-format="timestamp"
        style="width: 220px"
        placeholder="选择日期时间">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="房卡ID:">
      <el-input
        type="password"
        ref="inpCardNum"
        v-model="inpCardNum"
        style="width: 220px"
        autocomplete="off"
        clearable
        @keyup.enter.native="handleInputCardNum"></el-input>
    </el-form-item>
    <el-form-item label="已读取:" prop="cardList">
      <el-tag
        class="tag"
        v-for="(item, idx) in form.cardList"
        :key="idx"
        closable
        @close="handleCloseTag(item)">
        <!--卡{{idx + 1}}-->
        {{item}}
      </el-tag>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: 'makecard',
    data () {
      function oneYearLater () {
        let d = new Date()
        d.setFullYear(d.getFullYear() + 1, d.getMonth(), d.getDate())
        d.setHours(15, 0, 0, 0)
        return d.getTime()
      }
      let validateCardList = (rule, value, callback) => {
        if (!value || value.length === 0) {
          callback(new Error('卡号不能为空'))
        } else {
          callback()
        }
      }
      let validateCutOffDate = (rule, value, callback) => {
        if (!value || value === '') {
          callback(new Error('截止日期不能为空'))
        } else {
          callback()
        }
      }
      return {
        form: {
          cut_off_date: oneYearLater(),
          cardList: []
        },
        inpCardNum: '',
        form_rules: {
          cardList: [
            { required: true, validator: validateCardList, trigger: 'blur' }
          ],
          cut_off_date: [
            { required: true, validator: validateCutOffDate, trigger: 'blur' }
          ]
        }
      }
    },
    mounted () {
      this.$refs.inpCardNum.focus()
      // let _this = this
      // let interval = setInterval(() => {
      //   if (_this.$refs.inpCardNum) {
      //     _this.$refs.inpCardNum.focus()
      //   } else {
      //     clearInterval(interval)
      //     interval = null
      //   }
      // }, 1000)
    },
    methods: {
      // 输入房卡，添加tag
      handleInputCardNum: function () {
        let cardNum = this.reverseCardNum(this.inpCardNum)
        this.inpCardNum = ''
        if (this.form.cardList.indexOf(cardNum) === -1 && cardNum.length === 8) {
          this.form.cardList.push(cardNum)
        }
      },
      // 反向8位
      reverseCardNum: function (cardNum) {
        cardNum = cardNum + ''
        let list = []
        for (let i = 0; i < cardNum.length; i += 2) {
          list.push(cardNum.substring(i, i + 2))
        }
        return list.reverse().join('').toUpperCase()
      },
      // 删除房卡tag
      handleCloseTag: function (tag) {
        this.form.cardList.splice(this.form.cardList.indexOf(tag), 1)
      },
      getFormData () {
        // return this.form
        let formData
        this.$refs.makeCardForm.validate((valid) => {
          if (valid) {
            this.form.cut_off_date = (this.form.cut_off_date + '').substring(0, 10)
            formData = this.form
          } else {
            formData = null
          }
        })
        return formData
      }
    }
  }
</script>

<style scoped>
  .el-tag {
    margin: 5px 10px 5px 0;
  }
</style>
