<template>
  <div>
    <a-table
      :columns="columns"
      :dataSource="goodList"
      :bordered="true"
      :loading="loading"
      :pagination="pagination"
      :rowSelection="rowSelection"
    >
      <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
      <!-- 操作单元格 -->
      <div slot="operator" slot-scope="text, record">
          <a-button
          type="default"
          size="small"
          style="margin-right:8px;background:#33CCFF;color:#fff"
        >上架</a-button>
        <!-- <a-button
          type="default"
          size="small"
          style="margin-right:8px;background:#990033;color:#fff"
        >下架</a-button> -->
        <a-button
          type="default"
          size="small"
          style="margin-right:8px;background:#9933FF;color:#fff"
          @click="jumpToEdit(record)"
        >编辑</a-button>
        <a-button
          type="default"
          size="small"
          style="margin-right:8px;background:#FF0066;color:#fff"
        >添加限购</a-button>
        <a-button
          type="default"
          size="small"
          style="margin-right:8px;background:#FFFF66;color:#000"
        >销售数据</a-button>
        <a-popconfirm title="你确定要删除此商品吗?" @confirm="deleteGoodByNo(record.no)" okText="Yes" cancelText="No">
            <a-button type="danger" size="small" style="margin-right:8px;">删除</a-button>
        </a-popconfirm>
        
      </div>

      <div
        slot="filterDropdown"
        slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
        class="custom-filter-dropdown"
      >
        <a-input
          v-ant-ref="c => searchInput = c"
          :placeholder="`搜索 ${column.dataIndex}`"
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
        >搜索</a-button>
        <a-button @click="() => handleReset(clearFilters)" size="small" style="width: 90px">重置</a-button>
      </div>
      <a-icon
        slot="filterIcon"
        slot-scope="filtered"
        type="search"
        :style="{ color: filtered ? '#108ee9' : undefined }"
      />
      <template slot="customRender" slot-scope="text">
        <span v-if="searchText">
          <template
            v-for="(fragment, i) in text.toString().split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
          >
            <mark
              v-if="fragment.toLowerCase() === searchText.toLowerCase()"
              :key="i"
              class="highlight"
            >{{fragment}}</mark>
            <template v-else>{{fragment}}</template>
          </template>
        </span>
        <template v-else>{{text}}</template>
      </template>
    </a-table>
  </div>
</template>

<script>
import { getGoods,deleteGood  } from "@/api/good";
export default {
  components: {},
  data() {
    return {
      searchText: "",
      searchInput: null,
      columns: [
        {
          title: "商品名称",
          dataIndex: "name",
          scopedSlots: { customRender: "name" },
          key: "1",
          scopedSlots: {
            filterDropdown: "filterDropdown",
            filterIcon: "filterIcon",
            customRender: "customRender"
          },
          onFilter: (value, record) => {
            this.searchParam.name = value;
            return true;
          },
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              }, 0);
            }
          }
        },
        {
          title: "房间类型",
          dataIndex: "type",
          key: "2"
        },
        {
          title: "门市价",
          dataIndex: "unit_price",
          key: "3"
        },
        {
          title: "商品类型",
          dataIndex: "type_id",
          key: "4"
        },
        {
          title: "上架时间",
          dataIndex: "up_shelves_time",
          key: "5"
        },
        {
          title: "下架时间",
          dataIndex: "down_shelves_time",
          key: "6"
        },
        {
          title: "最近修改人",
          dataIndex: "updated_admin_no",
          key: "7"
        },
        {
          title: "操作",
          key: "8",
          scopedSlots: { customRender: "operator" }
        }
      ],
      goodList: [],
      selectedRowKeys: [],
      loading: false,
      searchParam: {
        name:"",
        is_downShelves:1,
        sort:-1,
      },
      pagination: {
        position: "top",
        current: 1,
        showSizeChanger: true,
        showQuickJumper: true,
        defaultPageSize: 20,
        total: 0,
        onChange: (page, pageSize) => {
          this.getGoodsData(page, pageSize, this.searchParam);
        },
        onShowSizeChange: (current, size) => {
          this.getGoodsData(current, size, this.searchParam);
        }
      }
    };
  },
  computed: {
    rowSelection() {
      const { selectedRowKeys } = this;
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            "selectedRows: ",
            selectedRows
          );
        },
        getCheckboxProps: record => ({
          props: {
            disabled: record.name === "Disabled User", // Column configuration not to be checked
            name: record.name
          }
        })
      };
    }
  },
  created() {
    this.init();
  },
  methods: {
    /**
            初始化方法
            步骤：
            1.拉取商品数据
         */
    init() {
      this.getGoodsData(1,20,this.searchParam);
    },
    //获取商品数据
    getGoodsData(page, limit = 20, searchParam) {
      this.loading = true;
      getGoods(page, limit, searchParam).then(res => {
        if (res.data.status == "success") {
          this.loading = false;
          this.pagination.current = res.data.data.current_page;
          this.goodList = res.data.data.data;
          this.pagination.total = res.data.data.total;
          // this.$set(this.pagination,total,)
        }
      });
    },
    //处理搜索
    handleSearch(selectedKeys, confirm) {
      this.searchText = selectedKeys[0];
      this.searchParam.name = this.searchText;
      this.getGoodsData(
        this.pagination.current,
        this.pagination.pageSize,
        this.searchParam
      );
      confirm();
    },
    //处理重置
    handleReset(clearFilters) {
      clearFilters();
      this.searchText = "";
      this.searchParam.name = this.searchText;
      this.getGoodsData(
        this.pagination.current,
        this.pagination.pageSize,
        this.searchParam
      );
    },
    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    jumpToEdit(record){
        this.$router.push({name:'add-good',params: {good:record}})
    },
    deleteGoodByNo(no){
        deleteGood(no).then(res=>{
            this.getGoodsData(
                this.pagination.current,
                this.pagination.pageSize,
                this.searchParam
            );
        })
    }
  },
  watch: {
    $route: function(newVal) {
      this.init();
    }
  }
  
};
</script>
<style scoped>
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