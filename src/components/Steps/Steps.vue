<template>
    <div class="steps">
        <div class="step-item" :class="{'active': idx <= active}" v-for="(item, idx) in steps" :key="idx" >{{item.title}}</div>
    </div>
</template>

<script>
    export default {
        name: "Steps",
        props: {
            steps: {
                type: Array,
                default() {
                    return [
                        {title: '1'},
                        {title: '2'},
                        {title: '3'}
                    ]
                }
            },
            active: {
                type: Number,
                default: 0
            }
        }
    }
</script>

<style scoped lang="less">
    @import "~@/styles/global.less";

    @steps-background: #fff;
    @item-height: 50px;
    @item-color-default: #eee;
    @item-color-active: @base-green;
    @item-angel: calc(@item-height / 4);
    @item-gap: 6px;

    .steps {
        display: flex;
        align-items: stretch;
        height: @item-height;
        background: @steps-background;

        .step-item {
            flex: 1;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            background: @item-color-default;
            color: black;

            &:after {
                content: '';
                position: absolute;
                left: 100%;
                top: 0;
                z-index: 10;
                display: block;
                border-width: calc(@item-height / 2) 0 calc(@item-height / 2) @item-angel;
                border-style: solid;
                border-color: transparent transparent transparent @item-color-default;
            }

            &:last-of-type:after {
                display: none;
            }

            & + .step-item {
                margin-left: @item-gap;

                &:before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    z-index: 9;
                    display: block;
                    border-width: calc(@item-height / 2) 0 calc(@item-height / 2) @item-angel;
                    border-style: solid;
                    border-color: transparent transparent transparent @steps-background;
                }
            }

            &.active {
                background: @item-color-active;
                color: white;
                cursor: pointer;

                &:after {
                    border-left-color: @item-color-active;
                }

                &:hover {
                    opacity: 0.9;
                    z-index: 9;

                    & + .step-item:before {
                        z-index: 8;
                    }
                }
            }
        }
    }
</style>