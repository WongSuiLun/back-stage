<template>
  <div class="warp">
    <div class="btn-control">
      <a-button type="primary" class="btn">搜索</a-button>
      <a-button type="primary" class="btn">核销选中订单</a-button>
      <a-button type="primary" class="btn">撤销核销记录</a-button>
      <a-button type="primary" class="btn">导出订单</a-button>
      <a-button type="primary" class="btn">酒店前台输出接口文档</a-button>
      <a-checkbox>不显示已取消订单</a-checkbox>
    </div>
    <a-table
      bordered
      size="middle"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      @change="handleTableChange"
      :columns="columns"
      :dataSource="dataSource"
      :pagination="paginationConfig"
    >
      <div
        slot="filterDropdown"
        slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
        class="custom-filter-dropdown"
      >
        <a-input
          v-ant-ref="c => searchInput = c"
          :placeholder="`查询 ${column.title}`"
          :value="selectedKeys[0]"
          @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
          @pressEnter="() => handleSearch(selectedKeys, confirm)"
          style="width: 188px; margin-bottom: 8px; display: block;"
        />
        <a-button
          type="primary"
          @click="() => handleSearch(selectedKeys, confirm)"
          icon="search"
          size="small"
          style="width: 90px; margin-right: 8px"
        >查询</a-button>
        <a-button @click="() => handleReset(clearFilters)" size="small" style="width: 90px">重置</a-button>
      </div>
      <a-icon
        slot="filterIcon"
        slot-scope="filtered"
        type="search"
        :style="{ color: filtered ? '#108ee9' : undefined }"
      />

      <span slot="order_type" slot-scope="order_type">
        <a-tag :color="setTagColorByOrderType(order_type.substring(0,2))">{{order_type.substring(0,2)}}</a-tag>
      </span>
      <span slot="shop_name" slot-scope="detail">{{getGoodName(detail)}}</span>
      <span slot="unpaid" slot-scope="order">{{order.total-order.payed_sum}}</span>
      <span slot="people" slot-scope="order">
        <p style="margin:0">
          <a-tag :color="setTagColorByCustomerType('普通')">普通</a-tag>
          {{order}}
        </p>
        <p style="margin:0">
          <a-tag :color="setTagColorByCustomerType('白银')">普通</a-tag>
          {{order}}
        </p>
        <p style="margin:0">
          <a-tag :color="setTagColorByCustomerType('黄金')">普通</a-tag>
          {{order}}
        </p>
        <p style="margin:0">
          <a-tag :color="setTagColorByCustomerType('铂金')">普通</a-tag>
          {{order}}
        </p>
      </span>
      <span slot="action" slot-scope>
        <a href="javascript:;">总核销</a>
        <a-divider type="vertical"/>
        <a href="javascript:;">核销</a>
        <a-divider type="vertical"/>
        <a href="javascript:;">更多</a>
        <!-- <a href="javascript:;">详情</a>
        <a-divider type="vertical"/>
        <a href="javascript:;">退款</a> 
       <a-divider type="vertical"/> 
        <a href="javascript:;">取消</a>-->
      </span>
    </a-table>
  </div>
</template>
<script>
import { getOrders } from "@/api/order";
// 表格分页配置
const paginationConfig = {
  showQuickJumper: true,
  defaultCurrent: 1
};
// 表格配置项
const columns = [
  {
    title: "订单号",
    dataIndex: "no",
    sorter: true,
    searchText: "",
    searchInput: null,
    scopedSlots: {
      filterDropdown: "filterDropdown",
      filterIcon: "filterIcon"
    }
  },
  {
    title: "类型",
    dataIndex: "order_type",
    key: "order_type",
    filters: [
      { text: "保留单", value: "保留单" },
      { text: "官网下单	", value: "官网下单" }
    ],
    scopedSlots: { customRender: "order_type" }
  },
  {
    title: "商品名称",
    dataIndex: "detail",
    key: "shop_name",
    scopedSlots: { customRender: "shop_name" }
  },
  {
    title: "入住时间",
    dataIndex: "detail[0].use_time",
    scopedSlots: {
      filterDropdown: "filterDropdown",
      filterIcon: "filterIcon"
    }
  },
  {
    title: "数量",
    dataIndex: "detail[0].quantity"
  },
  {
    title: "订购人",
    dataIndex: "customer",
    scopedSlots: {
      filterDropdown: "filterDropdown",
      filterIcon: "filterIcon"
    }
  },
  {
    title: "入住人",
    dataIndex: "customer",
    scopedSlots: {
      customRender: "people",
      filterDropdown: "filterDropdown",
      filterIcon: "filterIcon"
    }
  },
  {
    title: "电话",
    dataIndex: "phone",
    scopedSlots: {
      filterDropdown: "filterDropdown",
      filterIcon: "filterIcon"
    }
  },
  {
    title: "状态",
    dataIndex: "state",
    scopedSlots: {
      filterDropdown: "filterDropdown",
      filterIcon: "filterIcon"
    }
  },
  {
    title: "总额",
    dataIndex: "total"
  },
  {
    title: "待支付",
    key: "unpaid",
    scopedSlots: { customRender: "unpaid" }
  },
  {
    title: "支付方式",
    dataIndex: "pay_type",
    scopedSlots: {
      filterDropdown: "filterDropdown",
      filterIcon: "filterIcon"
    }
  },
  {
    title: "下单员",
    dataIndex: "operator_id"
  },
  {
    title: "是否处理",
    dataIndex: "is_deal"
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" }
  }
];

const orderTypeConfig = {
  '官网':'orange',
  '保留':'blue',
  '积分':'purple'
}

const customerVipConfig = {
  '普通':'#2db7f5',
  '白银':'#c0c0c0',
  '黄金':'#CC9900',
  '铂金':'#8886dc'
}

export default {
  data() {
    return {
      columns,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      dataSource: [],
      goodSource: [],
      paginationConfig
    };
  },
  computed: {
    hasSelected() {}
  },
  created() {
    this.initData();
  },
  computed: {
    getGoodName() {
      return function(details) {
        if (this.goodSourceLength > 0) {
          let goodNames = ``;
          details.forEach(detail => {
            let name = `${this.goodSource[detail.goods_no].name}`;
            goodNames += name;
            console.log(this.goodSource[detail.goods_no]);
          });
          return goodNames;
        }
        return "";
      };
    },
    goodSourceLength() {
      return Object.keys(this.goodSource).length;
    }
  },
  methods: {
    initData() {
      let defaultQuery = { use_time: 1539100800, page: 1 };
      getOrders(defaultQuery).then(res => {
        console.log(res);
        this.dataSource = res.data.data;
        this.goodSource = res.data.meta.goods;
        console.log(this.dataSource);
      });
    },
    handleTableChange(pagination, filters, sorter) {
      console.log(filters);
    },
    start() {
      this.loading = true;
      // ajax request after empty completing
      setTimeout(() => {
        this.loading = false;
        this.selectedRowKeys = [];
      }, 1000);
    },
    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    setTagColorByOrderType(order_type){
      return orderTypeConfig[order_type]
    },
    setTagColorByCustomerType(customer_type){
      return customerVipConfig[customer_type]
    }
  }
};
</script>
<style lang="less" scoped>
.warp {
  background: #fff;
  padding: 15px 25px;
  .btn-control {
    padding: 5px 0 15px 0;
    .btn {
      margin-right: 8px;
    }
  }
}
.custom-filter-dropdown {
  padding: 8px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.highlight {
  background-color: rgb(255, 192, 105);
  padding: 0px;
}
</style>