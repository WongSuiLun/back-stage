<template>
  <div>
    <div class="table-page-search-wrapper">
      <a-form layout="horizontal">
        <a-row :gutter="12" type="flex">
          <a-col :md="5" :sm="24">
            <a-form-item :label="`真实姓名`" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
              <a-input
                v-decorator="[
                ` `,
                {
                  rules: [{
                    required: true,
                    message: 'Input something!',
                  }],
                }
              ]"
                placeholder="请填写用户真实姓名"
              />
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="24">
            <a-form-item :label="`手机电话`" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
              <a-input
                v-decorator="[
                ` `,
                {
                  rules: [{
                    required: true,
                    message: 'Input something!',
                  }],
                }
              ]"
                placeholder="请填写用户真实姓名"
              />
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="24">
            <a-form-item :label="`用户名`" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
              <a-input
                v-decorator="[
                ` `,
                {
                  rules: [{
                    required: true,
                    message: 'Input something!',
                  }],
                }
              ]"
                placeholder="placeholder"
              />
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="24">
            <a-form-item :label="`旧卡号`" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
              <a-input
                v-decorator="[
                ` `,
                {
                  rules: [{
                    required: true,
                    message: 'Input something!',
                  }],
                }
              ]"
                placeholder="placeholder"
              />
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="24">
            <a-form-item :label="`注册时间`" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
              <a-range-picker />
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="24">
            <a-form-item :label="`实名时间`" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
              <a-range-picker />
            </a-form-item>
          </a-col>
          <a-col :md="3" :sm="24" offset="1">
            <a-form-item>
              <a-button type="primary" style="margin-right:8px">查询</a-button>
              <a-button>重置</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <a-table
      :dataSource="tableData"
      :columns="columns"
      :loading="tableLoading"
      :rowSelection="rowSelection"
    >
      <div
        slot="filterDropdown"
        slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
        class="custom-filter-dropdown"
      >
        <a-input
          v-ant-ref="c => searchInput = c"
          :placeholder="`搜索 ${column.title}`"
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
        <a-button @click="() => handleReset(clearFilters)" size="small" style="width: 90px">Reset</a-button>
      </div>
      <div slot="action" >
        <!-- <a-button size="small" style="margin-right:5px;margin-top:5px;">查看</a-button>
      <a-button size="small" style="margin-right:5px;margin-top:5px;background:#009804;color:#fff;border:0">编辑</a-button>
      <a-button size="small" style="margin-right:5px;margin-top:5px;background:#ff3d3d;color:#fff;border:0">删除</a-button>
      <a-button size="small" type="primary" style="margin-right:5px;margin-top:5px;">权限配置</a-button>
      <a-button size="small"  style="margin-right:5px;margin-top:5px;background:#ccc;color:#fff;border:0">禁用</a-button>
      <a-button size="small" style="margin-right:5px;margin-top:5px;background:#6699FF;color:#fff;border:0">入职</a-button>
      <a-button size="small" style="margin-right:5px;margin-top:5px;background:#CC6666;color:#fff;border:0">积分变更</a-button>
      <a-button size="small" style="margin-right:5px;margin-top:5px;background:#9900FF;color:#fff;border:0">积分明细</a-button>
        <a-button size="small" style="margin-right:5px;margin-top:5px;background:#CC9900;color:#fff;border:0">余额变更</a-button>-->
        <a href="javascript:;">查看</a>
        <a-divider type="vertical" />
        <a href="javascript:;">编辑</a>
        <a-divider type="vertical" />
        <a href="javascript:;">删除</a>
        <a-divider type="vertical" />
        <a-dropdown>
          <a class="ant-dropdown-link">
            更多操作
            <a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a>权限配置</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">禁用</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">入职</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">积分变更</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">积分明细</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">余额变更</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
        <!-- <a href="javascript:;">权限配置</a>
      <a-divider type="vertical" />
    <a href="javascript:;">禁用</a>
      <a-divider type="vertical" />
    <a href="javascript:;">入职</a>
      <a-divider type="vertical" />
    <a href="javascript:;">积分变更</a>
      <a-divider type="vertical" />
    <a href="javascript:;">积分明细</a>
      <a-divider type="vertical" />
    <a href="javascript:;">余额变更</a>
        -->
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
    <permission-config></permission-config>
  </div>
</template>

<script>
import PermissionConfig from './PermissionConfig';
export default {
  components:{
    PermissionConfig
  },
  data() {
    return {
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      tableData: [
        {
          uid: 193315,
          realname: null,
          phone: null,
          uname: "小绿",
          account: null,
          email: null,
          sex_id: 2,
          location: null,
          province: 0,
          city: 0,
          area: 0,
          birth: null,
          from_type: "用户创建",
          reg_time: "2019-08-05 00:21:15",
          cert_auth_time: "",
          openid: "ozp2Qs6Yr9GFNC76ycWO_7-CIK4s",
          unionid: "oEh0p1rqKqzbsb6JKAs7v36CEN5I",
          user_group_id: "288",
          rule_id: "7",
          area_code: null,
          credit_id: 235451,
          hc: 0,
          cc: 0,
          oc: null,
          status: 0,
          ct: null,
          info: null,
          eid: null,
          eno: null,
          ename: null,
          avatar:
            "http://i-wq.net/wqproject_company/data/upload/avatar/8d/18/68/original.jpg",
          sex: "女",
          identity: "用户",
          emp_apply: 0,
          usergroup: "普通会员",
          usergroupid: { "66": "288_7" },
          haveOpenid: "是",
          perm: {
            entry: true,
            dimission: true,
            userEdit: true,
            staffEdit: true,
            userDelete: true,
            staffDelete: true,
            userPermConfig: true,
            staffPermConfig: true,
            disable: true,
            creditHistory: true,
            balanceOpt: true,
            creditOpt: true,
            staffApply: true
          }
        },
        {
          uid: 193314,
          realname: null,
          phone: null,
          uname: "小麻花不换",
          account: null,
          email: null,
          sex_id: 0,
          location: null,
          province: 0,
          city: 0,
          area: 0,
          birth: null,
          from_type: "用户创建",
          reg_time: "2019-08-04 23:21:17",
          cert_auth_time: "",
          openid: "ozp2Qs4oXRjsc8VnOot0u5bvvNlw",
          unionid: "oEh0p1nPPz8-NVq5fXPpO61PBqG0",
          user_group_id: "288",
          rule_id: "7",
          area_code: null,
          credit_id: 235450,
          hc: 0,
          cc: 0,
          oc: null,
          status: 0,
          ct: null,
          info: null,
          eid: null,
          eno: null,
          ename: null,
          avatar:
            "http://i-wq.net/wqproject_company/data/upload/avatar/0e/56/e4/original.jpg",
          sex: "未知",
          identity: "用户",
          emp_apply: 0,
          usergroup: "普通会员",
          usergroupid: { "66": "288_7" },
          haveOpenid: "是",
          perm: {
            entry: true,
            dimission: true,
            userEdit: true,
            staffEdit: true,
            userDelete: true,
            staffDelete: true,
            userPermConfig: true,
            staffPermConfig: true,
            disable: true,
            creditHistory: true,
            balanceOpt: true,
            creditOpt: true,
            staffApply: true
          }
        },
        {
          uid: 193313,
          realname: null,
          phone: null,
          uname: "丁芬",
          account: null,
          email: null,
          sex_id: 2,
          location: null,
          province: 0,
          city: 0,
          area: 0,
          birth: null,
          from_type: "用户创建",
          reg_time: "2019-08-04 20:36:47",
          cert_auth_time: "",
          openid: "ozp2QszT7dnKPoVxcSs7fjLxLQdo",
          unionid: "oEh0p1l_HRZhB7QO3K4uXCqDQybM",
          user_group_id: "288",
          rule_id: "7",
          area_code: null,
          credit_id: 235449,
          hc: 0,
          cc: 0,
          oc: null,
          status: 0,
          ct: null,
          info: null,
          eid: null,
          eno: null,
          ename: null,
          avatar:
            "http://i-wq.net/wqproject_company/data/upload/avatar/cc/5e/99/original.jpg",
          sex: "女",
          identity: "用户",
          emp_apply: 0,
          usergroup: "普通会员",
          usergroupid: { "66": "288_7" },
          haveOpenid: "是",
          perm: {
            entry: true,
            dimission: true,
            userEdit: true,
            staffEdit: true,
            userDelete: true,
            staffDelete: true,
            userPermConfig: true,
            staffPermConfig: true,
            disable: true,
            creditHistory: true,
            balanceOpt: true,
            creditOpt: true,
            staffApply: true
          }
        },
        {
          uid: 193312,
          realname: null,
          phone: null,
          uname: "詩",
          account: null,
          email: null,
          sex_id: 0,
          location: null,
          province: 0,
          city: 0,
          area: 0,
          birth: null,
          from_type: "用户创建",
          reg_time: "2019-08-04 19:13:22",
          cert_auth_time: "",
          openid: "ozp2Qs47X1drKZ2hqDmD4L_9-ud0",
          unionid: "oEh0p1uBKhQtqZ4VpUpm3v1Zafpk",
          user_group_id: "288",
          rule_id: "7",
          area_code: null,
          credit_id: 235448,
          hc: 0,
          cc: 0,
          oc: null,
          status: 0,
          ct: null,
          info: null,
          eid: null,
          eno: null,
          ename: null,
          avatar:
            "http://i-wq.net/wqproject_company/data/upload/avatar/ec/d2/89/original.jpg",
          sex: "未知",
          identity: "用户",
          emp_apply: 0,
          usergroup: "普通会员",
          usergroupid: { "66": "288_7" },
          haveOpenid: "是",
          perm: {
            entry: true,
            dimission: true,
            userEdit: true,
            staffEdit: true,
            userDelete: true,
            staffDelete: true,
            userPermConfig: true,
            staffPermConfig: true,
            disable: true,
            creditHistory: true,
            balanceOpt: true,
            creditOpt: true,
            staffApply: true
          }
        },
        {
          uid: 193311,
          realname: null,
          phone: null,
          uname: "酣月九",
          account: null,
          email: null,
          sex_id: 2,
          location: null,
          province: 0,
          city: 0,
          area: 0,
          birth: null,
          from_type: "用户创建",
          reg_time: "2019-08-04 19:13:19",
          cert_auth_time: "",
          openid: "ozp2Qs6Eo7lHHAlTAJekJ3n9h9uQ",
          unionid: "oEh0p1rkPAXd8WsAdgVSGZsvwR8k",
          user_group_id: "288",
          rule_id: "7",
          area_code: null,
          credit_id: 235447,
          hc: 0,
          cc: 0,
          oc: null,
          status: 0,
          ct: null,
          info: null,
          eid: null,
          eno: null,
          ename: null,
          avatar:
            "http://i-wq.net/wqproject_company/data/upload/avatar/a3/c9/33/original.jpg",
          sex: "女",
          identity: "用户",
          emp_apply: 0,
          usergroup: "普通会员",
          usergroupid: { "66": "288_7" },
          haveOpenid: "是",
          perm: {
            entry: true,
            dimission: true,
            userEdit: true,
            staffEdit: true,
            userDelete: true,
            staffDelete: true,
            userPermConfig: true,
            staffPermConfig: true,
            disable: true,
            creditHistory: true,
            balanceOpt: true,
            creditOpt: true,
            staffApply: true
          }
        },
        {
          uid: 193310,
          realname: null,
          phone: null,
          uname: "balso",
          account: null,
          email: null,
          sex_id: 1,
          location: null,
          province: 0,
          city: 0,
          area: 0,
          birth: null,
          from_type: "用户创建",
          reg_time: "2019-08-04 18:35:21",
          cert_auth_time: "",
          openid: "ozp2Qs0a4vYSYdf7yl6NUpH74dU0",
          unionid: "oEh0p1p--dEJVrIUGzTo42AzykxQ",
          user_group_id: "288",
          rule_id: "7",
          area_code: null,
          credit_id: 235446,
          hc: 0,
          cc: 0,
          oc: null,
          status: 0,
          ct: null,
          info: null,
          eid: null,
          eno: null,
          ename: null,
          avatar:
            "http://i-wq.net/wqproject_company/data/upload/avatar/29/12/2c/original.jpg",
          sex: "男",
          identity: "用户",
          emp_apply: 0,
          usergroup: "普通会员",
          usergroupid: { "66": "288_7" },
          haveOpenid: "是",
          perm: {
            entry: true,
            dimission: true,
            userEdit: true,
            staffEdit: true,
            userDelete: true,
            staffDelete: true,
            userPermConfig: true,
            staffPermConfig: true,
            disable: true,
            creditHistory: true,
            balanceOpt: true,
            creditOpt: true,
            staffApply: true
          }
        },
        {
          uid: 193309,
          realname: null,
          phone: null,
          uname: "💃`浮生若梦`💃",
          account: null,
          email: null,
          sex_id: 2,
          location: null,
          province: 0,
          city: 0,
          area: 0,
          birth: null,
          from_type: "用户创建",
          reg_time: "2019-08-04 17:28:01",
          cert_auth_time: "",
          openid: "ozp2Qs-_6p_nq8D6w1yYYo_EdCcg",
          unionid: "oEh0p1tpEw-vDOmiVMXIrUkHB3yk",
          user_group_id: "288",
          rule_id: "7",
          area_code: null,
          credit_id: 235445,
          hc: 0,
          cc: 0,
          oc: null,
          status: 0,
          ct: null,
          info: null,
          eid: null,
          eno: null,
          ename: null,
          avatar:
            "http://i-wq.net/wqproject_company/data/upload/avatar/32/05/91/original.jpg",
          sex: "女",
          identity: "用户",
          emp_apply: 0,
          usergroup: "普通会员",
          usergroupid: { "66": "288_7" },
          haveOpenid: "是",
          perm: {
            entry: true,
            dimission: true,
            userEdit: true,
            staffEdit: true,
            userDelete: true,
            staffDelete: true,
            userPermConfig: true,
            staffPermConfig: true,
            disable: true,
            creditHistory: true,
            balanceOpt: true,
            creditOpt: true,
            staffApply: true
          }
        },
        {
          uid: 193308,
          realname: null,
          phone: null,
          uname: "XY儿 💫",
          account: null,
          email: null,
          sex_id: 2,
          location: null,
          province: 0,
          city: 0,
          area: 0,
          birth: null,
          from_type: "用户创建",
          reg_time: "2019-08-04 17:20:31",
          cert_auth_time: "",
          openid: "ozp2Qs5vf0CsQQhcNooHiKgcItyo",
          unionid: "oEh0p1lvk0_6weEs10BPcCL3G4h8",
          user_group_id: "288",
          rule_id: "7",
          area_code: null,
          credit_id: 235444,
          hc: 0,
          cc: 0,
          oc: null,
          status: 0,
          ct: null,
          info: null,
          eid: null,
          eno: null,
          ename: null,
          avatar:
            "http://i-wq.net/wqproject_company/data/upload/avatar/de/71/55/original.jpg",
          sex: "女",
          identity: "用户",
          emp_apply: 0,
          usergroup: "普通会员",
          usergroupid: { "66": "288_7" },
          haveOpenid: "是",
          perm: {
            entry: true,
            dimission: true,
            userEdit: true,
            staffEdit: true,
            userDelete: true,
            staffDelete: true,
            userPermConfig: true,
            staffPermConfig: true,
            disable: true,
            creditHistory: true,
            balanceOpt: true,
            creditOpt: true,
            staffApply: true
          }
        },
        {
          uid: 193307,
          realname: null,
          phone: null,
          uname: "L-凤（兴盈会计）",
          account: null,
          email: null,
          sex_id: 2,
          location: null,
          province: 0,
          city: 0,
          area: 0,
          birth: null,
          from_type: "用户创建",
          reg_time: "2019-08-04 16:02:51",
          cert_auth_time: "",
          openid: "ozp2Qs8KHeCI1O5OvVViNIPWWQ-E",
          unionid: "oEh0p1i6k_aAfxStbhwXpijCu8dQ",
          user_group_id: "288",
          rule_id: "7",
          area_code: null,
          credit_id: 235443,
          hc: 0,
          cc: 0,
          oc: null,
          status: 0,
          ct: null,
          info: null,
          eid: null,
          eno: null,
          ename: null,
          avatar:
            "http://i-wq.net/wqproject_company/data/upload/avatar/63/4e/e9/original.jpg",
          sex: "女",
          identity: "用户",
          emp_apply: 0,
          usergroup: "普通会员",
          usergroupid: { "66": "288_7" },
          haveOpenid: "是",
          perm: {
            entry: true,
            dimission: true,
            userEdit: true,
            staffEdit: true,
            userDelete: true,
            staffDelete: true,
            userPermConfig: true,
            staffPermConfig: true,
            disable: true,
            creditHistory: true,
            balanceOpt: true,
            creditOpt: true,
            staffApply: true
          }
        },
        {
          uid: 193306,
          realname: null,
          phone: null,
          uname: "Elaine",
          account: null,
          email: null,
          sex_id: 0,
          location: null,
          province: 0,
          city: 0,
          area: 0,
          birth: null,
          from_type: "用户创建",
          reg_time: "2019-08-04 14:48:57",
          cert_auth_time: "",
          openid: "ozp2Qs6OvJsvPC9rTg5qXG46Zl0s",
          unionid: "oEh0p1i47lxhIhY8vj8IUEtEun3Q",
          user_group_id: "288",
          rule_id: "7",
          area_code: null,
          credit_id: 235442,
          hc: 0,
          cc: 0,
          oc: null,
          status: 0,
          ct: null,
          info: null,
          eid: null,
          eno: null,
          ename: null,
          avatar:
            "http://i-wq.net/wqproject_company/data/upload/avatar/18/7a/18/original.jpg",
          sex: "未知",
          identity: "用户",
          emp_apply: 0,
          usergroup: "普通会员",
          usergroupid: { "66": "288_7" },
          haveOpenid: "是",
          perm: {
            entry: true,
            dimission: true,
            userEdit: true,
            staffEdit: true,
            userDelete: true,
            staffDelete: true,
            userPermConfig: true,
            staffPermConfig: true,
            disable: true,
            creditHistory: true,
            balanceOpt: true,
            creditOpt: true,
            staffApply: true
          }
        }
      ],
      tableLoading: false,
      searchText: "",
      searchInput: null,
      columns: [
        {
          title: "uid",
          dataIndex: "uid",
          key: "uid",
          scopedSlots: {
            filterDropdown: "filterDropdown",
            filterIcon: "filterIcon",
            customRender: "customRender"
          },
          onFilter: (value, record) => {
            console.log(record);
            record.name.toLowerCase().includes(value.toLowerCase());
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
          title: "真实姓名",
          dataIndex: "realname",
          key: "realname",
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
          title: "手机电话",
          dataIndex: "phone",
          key: "phone",
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
          title: "用户名",
          dataIndex: "uname",
          key: "uname",
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
          title: "注册时间",
          dataIndex: "reg_time",
          key: "reg_time",
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
          title: "身份",
          dataIndex: "identity",
          key: "identity",
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
          title: "用户组",
          dataIndex: "usergroup",
          key: "usergroup",
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
          title: "已绑定微信",
          dataIndex: "haveOpenid",
          key: "haveOpenid",
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
          title: "当前积分",
          dataIndex: "cc",
          key: "cc",
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
          title: "旧卡号",
          dataIndex: "oc",
          key: "oc",
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
          title: "操作",
          key: "action",
          fixed: "right",
          width: 250,
          scopedSlots: { customRender: "action" }
        }
      ],
      rowSelection: {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            "selectedRows: ",
            selectedRows
          );
        },
        onSelect: (record, selected, selectedRows) => {
          console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
          console.log(selected, selectedRows, changeRows);
        }
      }
    };
  },
  methods: {
    handleSearch(selectedKeys, confirm) {
      //   confirm();
      this.searchText = selectedKeys[0];
      console.log(selectedKeys);
      console.log(confirm);
    },

    handleReset(clearFilters) {
      clearFilters();
      this.searchText = "";
    },

    tableOption() {
      if (!this.optionAlertShow) {
        this.options = {
          alert: {
            show: true,
            clear: () => {
              this.selectedRowKeys = [];
            }
          },
          rowSelection: {
            selectedRowKeys: this.selectedRowKeys,
            onChange: this.onSelectChange
          }
        };
        this.optionAlertShow = true;
      } else {
        this.options = {
          alert: false,
          rowSelection: null
        };
        this.optionAlertShow = false;
      }
    },
    handleEdit(record) {
      this.$emit("onEdit", record);
    },
    handleOk() {},
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys;
      this.selectedRows = selectedRows;
    },
    toggleAdvanced() {
      this.advanced = !this.advanced;
    },
    resetSearchForm() {
      this.queryParam = {
        date: moment(new Date())
      };
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
.table-page-search-wrapper {
  margin-bottom: 20px;
}
</style>