<template>
    <div class="lottery-list">
        <div class="actions">
            <a-button type="primary" @click="handleClickCreate">新建抽奖</a-button>
        </div>
        <a-table
                :columns="columns"
                :dataSource="dataSource"
                :scroll="{x: true}"
                :loading="loading"
                :pagination="pagination"
        >
            <span slot="publish" slot-scope="text">
                <a-tag :color="text ? 'green' : 'red'">
                    {{text ? '已发布' : '未发布'}}
                </a-tag>
            </span>
            <span slot="action" slot-scope="text">
                <a href="javascript:;">查看</a>
                <a-divider type="vertical" />
                <a href="javascript:;">发布</a>
                <a-divider type="vertical" />
                  <a-popconfirm
                          title="确定删除?"
                          okText="确定"
                          cancelText="取消"
                          @confirm="handelDeleteLottery(text.id)"
                  >
                    <a href="javascript:;">删除</a>
                  </a-popconfirm>
            </span>



            <template
                    slot="expandedRowRender"
                    slot-scope="record"
            >
                <a-table
                        v-if="record.lotteryItems.length"
                        :columns="innerColumns"
                        :dataSource="record.lotteryItems"
                        :pagination="false"
                ></a-table>
            </template>
        </a-table>
    </div>
</template>

<script>
    import { getLottery, deleteLotteryById } from "@/api/lottery"

    const columns = [
        // {
        //     title: '编号',
        //     dataIndex: 'id',
        //     key: 'id',
        // },
        {
            title: '活动名称',
            dataIndex: 'lotteryName',
            key: 'lotteryName',
        },
        {
            title: '开始时间',
            dataIndex: 'startTime',
            key: 'startTime',
        },
        {
            title: '结束时间',
            dataIndex: 'endTime',
            key: 'endTime',
        },
        {
            title: '状态',
            dataIndex: 'publish',
            key: 'publish',
            scopedSlots: { customRender: 'publish' },
        },
        {
            title: '操作',
            key: 'action',
            scopedSlots: { customRender: 'action' },
            width: 100,
            // fixed: 'right'
        },
    ]
    const innerColumns = [
        {
            title: '奖项名称',
            dataIndex: 'lotteryItemName',
            key: 'lotteryItemName',
            width: 100
        },
        {
            title: '概率',
            dataIndex: 'probability',
            key: 'probability',
            width: 100
        },
    ]
    export default {
        name: "LotteryList",
        data() {
            return {
                pagination: {
                    current: 1,
                    pageSize: 10,
                    total: 0,
                    onChange: (page, pageSize) => {
                        this.getLottery(page, pageSize);
                    }
                },
                properties: "id",
                columns: columns,
                innerColumns: innerColumns,
                dataSource: [],
                loading: false
            }
        },
        mounted() {
            this.getLottery()
        },
        activated() {
            this.getLottery()
        },
        methods: {
            getLottery(page, pageSize) {
                let params = {
                    page: page != undefined ? page - 1 : this.pagination.current - 1,
                    pageSize: pageSize != undefined ? pageSize : this.pagination.pageSize,
                    properties: this.properties
                }
                this.loading = true
                getLottery(params).then(res => {
                    if(res.data) {
                        if(res.data.code + "" == 200 + "") {
                            res.data.data.content.forEach(item => {
                                item.key = item.id
                                if(item.lotteryItems) {
                                    item.lotteryItems = Object.values(item.lotteryItems)
                                    item.lotteryItems.map(lotteryItems => {
                                        lotteryItems.key = lotteryItems.lotteryItemName
                                    })
                                } else {
                                    item.lotteryItems = []
                                }
                            })
                            this.dataSource = [
                                ...res.data.data.content,
                            ]
                            this.pagination.total = res.data.data.totalElements
                            this.pagination.current = res.data.data.number + 1
                        } else {
                            this.$message.error(res.data.msg)
                        }
                    }
                }).catch(() => {
                    this.$message.error("查询失败")
                }).finally(() => {
                    this.loading = false
                })
            },
            handleClickCreate() {
                this.$router.push({name: 'lottery-add'})
            },
            handelDeleteLottery(id) {
                deleteLotteryById(id).then(res => {
                    if(res.data) {
                        this.$message.success(res.data.msg)
                    } else {
                        this.$message.success("删除成功")
                    }
                    this.getLottery()
                }).catch(e => {
                    if(e.response && e.response.data) {
                        this.$message.error(e.response.data.msg)
                    } else {
                        this.$message.error("删除失败")
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .lottery-list {
        padding: 16px 16px 0;
        background: #fff;

        /deep/
        .ant-table td {
            white-space: nowrap;
        }
    }
    .actions {
        margin-bottom: 16px;
    }
</style>