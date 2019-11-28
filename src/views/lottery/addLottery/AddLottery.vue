<template>
    <div class="add-lottery">
        <steps :steps="steps" :active="active"></steps>
        <div class="form-list">
            <div class="left">
                <img src="https://img.yzcdn.cn/wscump/lottery/lucky-draw-preview2.png">
            </div>
            <div class="right">
                <form-create
                        v-show="active == 0"
                        :check="active == 0 && tryToChangeStep"
                        @checkSuccess="checkSuccess"
                        @checkFailed="checkFailed">
                </form-create>
                <form-lottery-item
                        v-show="active == 1"
                        :check="active == 1 && tryToChangeStep"
                        @checkSuccess="checkSuccess"
                        @checkFailed="checkFailed">
                </form-lottery-item>
            </div>
        </div>
        <div class="actions" v-if="active >= 0 && active <= steps.length - 1">
            <a-button type="primary" :disabled="active <= 0" @click="handlePrev">上一步</a-button>
            <a-button type="primary" v-if="active < steps.length - 1" @click="handleNext">下一步</a-button>
            <a-button type="primary" v-if="active >= steps.length - 1" @click="handleDone">完成</a-button>
        </div>
    </div>
</template>

<script>
    import Steps from "@/components/Steps"
    import FormCreate from "./components/FormCreate"
    import FormLotteryItem from "./components/FormLotteryItem"

    export default {
        name: "AddLottery",
        components: {FormLotteryItem, FormCreate, Steps},
        data() {
            return {
                steps: [
                    {title: '1. 创建活动'},
                    {title: '2. 奖项设置'},
                    {title: '3. 页面装修'},
                    {title: '4. 完成'}
                ],
                active: 0,
                tryToChangeStep: false,
                tryToChangeWay: ''
            }
        },
        methods: {
            handleNext() {
                this.tryToChangeStep = true
                this.tryToChangeWay = 'next'
            },
            handlePrev() {
                this.active--
                this.tryToChangeStep = false
                this.tryToChangeWay = 'prev'
            },
            handleDone() {

            },
            checkSuccess() {
                if(this.tryToChangeWay == 'next') {
                    this.active++
                } else if(this.tryToChangeWay == 'prev') {
                    this.active--
                }
                this.tryToChangeStep = false
                this.tryToChangeWay = ''
            },
            checkFailed() {
                this.tryToChangeStep = false
                this.tryToChangeWay = ''
            }
        }
    }
</script>

<style scoped lang="less">
    .add-lottery {
        padding: 16px;
        background: #fff;
    }
    .steps {
        margin-bottom: 16px;
    }
    .form-list {
        display: flex;
        justify-content: center;
        padding: 20px;

        .left {
            flex: 4;
            display: flex;
            align-items: flex-start;
            justify-content: flex-end;

            img {
                width: 300px;
                height: auto;
                vertical-align: top;
            }
        }
        .right {
            flex: 7;
            margin-left: 50px;
        }
    }
    .actions {
        display: flex;
        align-items: center;
        justify-content: center;

        /deep/
        .ant-btn + .ant-btn {
            margin-left: 50px;
        }
    }
</style>