<template>
    <a-spin :spinning="spinning">
        <div class="form-lottery-item">
            <a-form :form="form" >
                <div class="form-block">
                    <div class="title">奖品设置</div>
                    <a-divider :style="{'margin': '15px 0'}" />

                    <div class="value">
                        <a-form-item label="活动名称" v-bind="formItemLayout">
                            <a-input v-decorator="['lotteryName', config.nameConfig]" />
                        </a-form-item>
                    </div>
                </div>
                <div class="form-block">
                    <div class="title">未中奖设置</div>
                    <a-divider :style="{'margin': '15px 0'}" />

                    <div class="value">
                        <a-form-item label="活动名称" v-bind="formItemLayout">
                            <a-input v-decorator="['lotteryName', config.nameConfig]" />
                        </a-form-item>
                    </div>
                </div>
<!--                <div class="form-block">-->
<!--                    <div class="title">参与送积分</div>-->
<!--                    <a-divider :style="{'margin': '15px 0'}" />-->

<!--                    <div class="value">-->
<!--                        <a-form-item label="活动名称" v-bind="formItemLayout">-->
<!--                            <a-input v-decorator="['lotteryName', config.nameConfig]" />-->
<!--                        </a-form-item>-->
<!--                    </div>-->
<!--                </div>-->
            </a-form>
        </div>
    </a-spin>
</template>

<script>
    export default {
        name: "FormLotteryItem",
        props: {
            check: Boolean
        },
        data() {
            return {
                spinning: false,
                formItemLayout: {
                    labelCol: {
                        xs:  { span: 24 },
                        sm:  { span: 24 },
                        md:  { span: 8  },
                        lg:  { span: 7  },
                        xl:  { span: 6  },
                        xxl: { span: 5  },
                    },
                    wrapperCol: {
                        xs:  { span: 24 },
                        sm:  { span: 24 },
                        md:  { span: 16 },
                        lg:  { span: 15 },
                        xl:  { span: 14 },
                        xxl: { span: 13 },
                    },
                },
                form: this.$form.createForm(this, {
                    name: 'form_lottery_item'
                }),
                config: {
                    nameConfig: { rules: [{ required: true, message: '请输入活动名称!' }] }
                },
            }
        },
        watch: {
            check(check) {
                console.log(check)
                if(check) {
                    this.form.validateFields((err, values) => {
                        console.log(err)
                        if(!err) {
                            this.$emit("checkSuccess")
                        } else {
                            this.$emit("checkFailed")
                        }
                    })
                }
            }
        },
    }
</script>

<style scoped>

</style>