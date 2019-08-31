<template>
<div>
  <a-table :rowSelection="rowSelection" :columns="columns" :dataSource="data" :bordered="true" :pagination="pagination">
    <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
    <div slot="operator">
      <a>商品详情图</a>
    </div>
  </a-table>
  {{data}}
</div>
</template>
<script>
const columns = [{
  title: '商品名称',
  dataIndex: 'name',
  scopedSlots: { customRender: 'name' },
}, {
  title: '房间类型',
  dataIndex: 'type',
}, {
  title: '门市价',
  dataIndex: 'unit_price',
}, {
  title: '商品类型',
  dataIndex: 'type_id',
}, {
  title: '上架时间',
  dataIndex: 'up_shelves_time',
}, {
  title: '下架时间',
  dataIndex: 'down_shelves_time',
}, {
  title: '最近修改人',
  dataIndex: 'updated_admin_no',
}, {
  title: '操作',
  scopedSlots: { customRender: 'operator' },
}];

export default {
  data() {
    return {
      columns,
    }
  },
  props:{
    data:{
      type:Array,
      default:[]
    },
    pagination:Object
  },
  computed: {
    rowSelection() {
      const { selectedRowKeys } = this;
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
          props: {
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
          }
        }),
      }
    }
  },
}
</script>