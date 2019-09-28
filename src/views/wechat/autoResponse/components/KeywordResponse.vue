<template>
  <div>
    <content-warp>
      <div class="weui-desktop-panel__bd">
        <div class="weui-desktop-layout">
          <a-input-search placeholder="搜索关键词/规则名称" style="width: 200px"/>
          <a-button type="primary" style="background-color: #1AAD19;border-color: #1AAD19;">添加回复</a-button>
        </div>
        <div>
          <a-table :dataSource="data" :columns="columns" :pagination="pagination">
            <div
              slot="filterDropdown"
              slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
              class="custom-filter-dropdown"
            >
              <a-input
                v-ant-ref="c => searchInput = c"
                :placeholder="`Search ${column.dataIndex}`"
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
              >Search</a-button>
              <a-button
                @click="() => handleReset(clearFilters)"
                size="small"
                style="width: 90px"
              >Reset</a-button>
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
                    :key="i+'1'"
                    class="highlight"
                  >{{fragment}}</mark>
                  <template v-else>{{fragment}}</template>
                </template>
              </span>
              <template v-else>{{text}}</template>
            </template>
          </a-table>
        </div>
      </div>
    </content-warp>
  </div>
</template>

<script>
import ContentWarp from "./ContentWarp";
const data = [
  {
    key: "1",
    name: "港澳电话",
    age: 32,
    address: "New York No. 1 Lake Park"
  },
  {
    key: "2",
    name: "攻略",
    age: "42",
    address: "London No. 1 Lake Park"
  },
  {
    key: "3",
    name: "接送",
    age: 32,
    address: "Sidney No. 1 Lake Park"
  },
  {
    key: "4",
    name: "预定",
    age: 32,
    address: "London No. 2 Lake Park"
  },
];

export default {
  components: {
    ContentWarp
  },
  data() {
    return {
      alertMessage: {
        type: "info",
        message:
          "你已授权给腾讯云、腾讯云官网、米多大数据引擎、企业微信、杭州鹊桥科技微信平台帮助你运营公众号，点击管理已授权的第三方平台"
      },
      data,
      searchText: "",
      searchInput: null,
      columns: [
        {
          title: "规则名称",
          dataIndex: "name",
          key: "name",
          scopedSlots: {
            filterDropdown: "filterDropdown",
            filterIcon: "filterIcon",
            customRender: "customRender"
          },
          onFilter: (value, record) =>
            record.name.toLowerCase().includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              }, 0);
            }
          }
        },
        {
          title: "关键词",
          dataIndex: "age",
          key: "age",
          scopedSlots: {
            filterDropdown: "filterDropdown",
            filterIcon: "filterIcon",
            customRender: "customRender"
          },
          onFilter: (value, record) =>
            record.age.toLowerCase().includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              });
            }
          }
        },
        {
          title: "回复内容",
          dataIndex: "address",
          key: "address",
          scopedSlots: {
            filterDropdown: "filterDropdown",
            filterIcon: "filterIcon",
            customRender: "customRender"
          },
          onFilter: (value, record) =>
            record.address.toLowerCase().includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              });
            }
          }
        },
        {
          title: "操作",
          rowKey:"213",
          scopedSlots: {
            filterDropdown: "filterDropdown",
            filterIcon: "filterIcon",
            customRender: "customRender"
          },
          onFilter: (value, record) =>
            record.address.toLowerCase().includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              });
            }
          }
        }
      ],
      pagination: {
        defaultPageSize: 5,
        showQuickJumper: true
      }
    };
  },
  methods: {
    handleSearch(selectedKeys, confirm) {
      confirm();
      this.searchText = selectedKeys[0];
    },

    handleReset(clearFilters) {
      clearFilters();
      this.searchText = "";
    }
  }
};
</script>
<style lang="less" scoped>
.weui-desktop-panel__bd {
  padding: 16px 0;
  .weui-desktop-layout {
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
  }
}


</style>

