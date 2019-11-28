<template>
    <a-spin :spinning="spinning">
        <div class="form-create">
            <a-form :form="form" @submit="handleSubmit">
                <div class="form-block">
                    <div class="title">基本信息</div>
                    <a-divider :style="{'margin': '15px 0'}" />

                    <div class="value">
                        <a-form-item label="活动名称" v-bind="formItemLayout">
                            <a-input v-decorator="['lotteryName', config.nameConfig]" />
                        </a-form-item>
                        <a-form-item label="活动类型" v-bind="formItemLayout">
                            <a-radio-group v-decorator="['lotteryType', config.typeConfig]">
                                <a-radio value="0">
                                    大转盘
                                </a-radio>
                                <a-radio value="1">
                                    砸金蛋
                                </a-radio>
                            </a-radio-group>
                        </a-form-item>
                        <a-form-item label="活动时间" v-bind="formItemLayout">
                            <a-range-picker
                                    v-decorator="['time', config.timeRangeConfig]"
                                    show-time
                                    format="YYYY-MM-DD HH:mm:ss"
                                    style="width: 100%"
                            />
                        </a-form-item>
                        <a-form-item label="背景图片" v-bind="formItemLayout">
                            <div>
                                <a-upload
                                        :action="uploadUrl"
                                        :data="uploadAddData"
                                        :headers="uploadHeader"
                                        listType="picture-card"
                                        :fileList="fileList"
                                        @preview="handlePreview"
                                        @change="handleChange"
                                        v-decorator="[
                                              'backgroundImagePath'
                                            ]"
                                >
                                    <div v-if="fileList.length < 1">
                                        <a-icon type="plus" />
                                        <div class="ant-upload-text">上传图片</div>
                                    </div>
                                </a-upload>
                                <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                                    <img alt="example" style="width: 100%" :src="previewImage" />
                                </a-modal>
                            </div>
                        </a-form-item>
                        <a-form-item label="参与类型" v-bind="formItemLayout">
                            <a-radio-group v-decorator="['timesType', config.timesTypeConfig]">
                                <a-radio value="0">
                                    N天一次
                                </a-radio>
                                <a-radio value="1">
                                    一人N次
                                </a-radio>
                            </a-radio-group>
                        </a-form-item>
                        <a-form-item label="参与次数" v-bind="formItemLayout" v-if="formData.timesType">
                            <div v-if="formData.timesType + '' == '0'">
                                <a-input-number v-decorator="['times', config.timesConfig]" :min="1" /> 天一次
                            </div>
                            <div v-if="formData.timesType + '' == '1'">
                                一人 <a-input-number v-decorator="['times', config.timesConfig]" :min="1" /> 次
                            </div>
                        </a-form-item>
                        <a-form-item label="是否重置库存" v-bind="formItemLayout">
                            <a-switch v-decorator="['needReload', config.reloadConfig ]" />
                        </a-form-item>
                        <a-form-item label="多久后重置" v-bind="formItemLayout" v-if="formData.needReload">
                            <a-input-number v-decorator="['intervalHours', config.hoursConfig]" :min="1" /> 小时
                        </a-form-item>
                        <a-form-item label="活动详情" v-bind="formItemLayout">
                            <a-textarea placeholder="活动详情" :rows="4" v-decorator="['rule']"/>
                        </a-form-item>







                        <a-form-item
                                :wrapper-col="{
                                        xs:  { span: 24, offset: 0 },
                                        sm:  { span: 24, offset: 0 },
                                        md:  { span: 10, offset: 8 },
                                        lg:  { span: 10, offset: 7 },
                                        xl:  { span: 10, offset: 6 },
                                        xxl: { span: 10, offset: 5 },
                                    }"
                        >
                            <a-button type="primary" html-type="submit">
                                提交
                            </a-button>
                        </a-form-item>
                    </div>
                </div>
            </a-form>
        </div>
    </a-spin>
</template>

<script>
    import { createLottery } from "@/api/lottery"

    export default {
        name: "FormCreate",
        props: {
            check: Boolean
        },
        data() {
            const defaultData = {
                lotteryType: '0',
                timesType: '1',
                times: '1',
                needReload: false,
                intervalHours: '1'
            }
            return {
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
                    name: 'form_create',
                    onValuesChange: (props, values) => {
                        this.watchFields(Object.keys(values)[0], Object.values(values)[0])
                    }
                }),
                config: {
                    nameConfig: { rules: [{ required: true, message: '请输入活动名称!' }] },
                    typeConfig: { rules: [{ required: true, message: '请选择活动类型!' }], initialValue: defaultData.lotteryType },
                    timeRangeConfig: {rules: [{ type: 'array', required: true, message: '请选择时间!' }]},
                    timesTypeConfig: { rules: [{ required: true, message: '请选择参与类型!' }], initialValue: defaultData.timesType },
                    timesConfig: { rules: [{ required: true, message: '请输入参与次数!' }], initialValue: defaultData.times },
                    reloadConfig: {rules: [{ required: true, message: '请选择是否重置!' }], initialValue: defaultData.needReload, valuePropName: 'checked' },
                    hoursConfig: {rules: [{ required: true, message: '请输入时间!' }], initialValue: defaultData.intervalHours },
                },
                formData: defaultData,
                previewVisible: false,
                previewImage: '',
                fileList: [],
                uploadUrl: "http://192.168.101.115:8089/api/attach",
                uploadHeader: {
                    company: this.$ls.get("company").id
                },
                spinning: false
            }
        },
        watch: {
            check(check) {
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
        methods: {
            watchFields(key, val) {
                this.formData[key] = val
            },
            uploadAddData() {
                return {
                    module: "lottery"
                };
            },
            handleCancel() {
                this.previewVisible = false
            },
            handlePreview(file) {
                this.previewImage = file.url || file.thumbUrl
                this.previewVisible = true
            },
            handleChange({ fileList }) {
                this.fileList = fileList
            },
            handleSubmit(e) {
                e.preventDefault()
                this.form.validateFields((err, values) => {
                    if(!err) {
                        values.startTime = values.time[0].format('YYYY/MM/DD HH:mm:ss').valueOf()
                        values.endTime = values.time[1].format('YYYY/MM/DD HH:mm:ss').valueOf()
                        values.backgroundImagePath = values.backgroundImagePath ? values.backgroundImagePath.file.response.data.file_url : ''
                        values.needReload = +values.needReload

                        let form_data = ''
                        for(let key in values) {
                            let val = values[key]
                            form_data += key + '=' + val + '&'
                        }
                        form_data = form_data.slice(0, -1)

                        this.spinning = true
                        createLottery(form_data).then(res => {
                            if(res.data) {
                                this.$message.success(res.data.msg)
                            } else {
                                this.$message.success("添加成功")
                            }
                        }).catch(e => {
                            if(e.response && e.response.data) {
                                this.$message.error(e.response.data.msg)
                            } else {
                                this.$message.error("添加失败")
                            }
                        }).finally(() => {
                            this.spinning = false
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .form-block {
        .title {
            font-weight: bold;
        }
    }

    /deep/
    .ant-upload-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;

        /deep/
        .anticon {
            font-size: 32px;
            color: rgb(153, 153, 153);
        }
        /deep/
        .ant-upload-text {
            margin-top: 8px;
            color: rgb(102, 102, 102);
        }
    }
</style>