<template>
  <div>
    <a-table bordered :dataSource="dataSource" :columns="columns">
      <template slot="name" slot-scope="text, record"></template>
      <template slot="operation" slot-scope="text, record">
        <a-popconfirm
          v-if="dataSource.length"
          title="Sure to delete?"
          @confirm="() => onDelete(record.key)"
        >
          <a href="javascript:;">订单详情</a>|
           <a href="javascript:;">回复  </a>|
          <a href="javascript:;">隐藏</a>
         
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      dataSource: this.data,
      count: 2,
      columns: [
        {
          title: "uid",
          dataIndex: "uid",
         
        },
        {
          title: "内容",
          dataIndex: "content",
          
        },
        {
          title: "评分",
          dataIndex: "uid",
      
        },
        {
          title: "发布时间",
          dataIndex: "ctime",
    
        },
        {
          title: "订购人",
          dataIndex: "uid",

        },
        {
          title: "电话",
          dataIndex: "uid",

        },
        {
          title: "是否匿名",
          dataIndex: "uid",

        },
        {
          title: "是否隐藏",
          dataIndex: "uid",

        },
        {
          title: "address",
          dataIndex: "address"
        },
        {
          title: "operation",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" }
        }
      ]
    };
  },
  props: {
    data: Array
  },
  created() {
    console.log(this.data);
    console.log(`1`);
    console.log(this.dataSource);
  },
  methods: {
    onCellChange(key, dataIndex, value) {
      const dataSource = [...this.dataSource];
      const target = dataSource.find(item => item.key === key);
      if (target) {
        target[dataIndex] = value;
        this.dataSource = dataSource;
      }
    },
    onDelete(key) {
      const dataSource = [...this.dataSource];
      this.dataSource = dataSource.filter(item => item.key !== key);
    },
    handleAdd() {
      const { count, dataSource } = this;
      const newData = {
        key: count,
        name: `Edward King ${count}`,
        age: 32,
        address: `London, Park Lane no. ${count}`
      };
      this.dataSource = [...dataSource, newData];
      this.count = count + 1;
    }
  }
};
</script>
<style>
.editable-cell {
  position: relative;
}

.editable-cell-input-wrapper,
.editable-cell-text-wrapper {
  padding-right: 24px;
}

.editable-cell-text-wrapper {
  padding: 5px 24px 5px 5px;
}

.editable-cell-icon,
.editable-cell-icon-check {
  position: absolute;
  right: 0;
  width: 20px;
  cursor: pointer;
}

.editable-cell-icon {
  line-height: 18px;
  display: none;
}

.editable-cell-icon-check {
  line-height: 28px;
}

.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}

.editable-cell-icon:hover,
.editable-cell-icon-check:hover {
  color: #108ee9;
}

.editable-add-btn {
  margin-bottom: 8px;
}
</style>