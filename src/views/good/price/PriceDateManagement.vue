<template>
  <div class="card-list" ref="content">
    <a-list :grid="{gutter: 24, lg: 3, md: 2, sm: 1, xs: 1}" :dataSource="dataSource">
      <a-list-item slot="renderItem" slot-scope="item">
        <template v-if="item==null">
          <a-button class="new-btn" type="dashed" @click="onAddPriceDateRule">
            <a-icon type="plus" />新增规则
          </a-button>
        </template>
        <template v-if="item!=null">
          <a-card :hoverable="true">
            <a-card-meta>
              <div style="margin-bottom: 3px" slot="title">{{item.rule_name}}</div>
              <a-avatar
                shape="square"
                size="large"
                slot="avatar"
                :style="{backgroundColor: item.color, verticalAlign: 'middle'}"
              >{{item.shortName}}</a-avatar>

              <div class="meta-content" slot="description">
                <div v-if="item.type==1">
                  <div>日期:{{generateWeekData(item.items)}}</div>
                </div>
                <div v-if="item.type==2">
                  <div>
                    日期：<a @click="previewDateData(item.id)">预览{{item.id}}</a>
                  </div>
                </div>

                <div>有效日期：{{item.start_date}}~{{item.end_date}}</div>
              </div>
            </a-card-meta>
            <template class="ant-card-actions" slot="actions">
              <a>编辑</a>
              <a @click="deleteDateRulesById(item.id)">删除</a>
            </template>
          </a-card>
        </template>
      </a-list-item>
    </a-list>
    <a-drawer
      title="新建日期规则"
      :width="520"
      @close="onClose"
      :visible="visible"
      :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}"
    >
      <a-form :form="form" layout="vertical" hideRequiredMark>
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="规则名称">
              <a-input v-model="rule_name" placeholder="请输入规则名称" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="有效日期">
              <a-select style="width: 100%" placeholder="选择有效年份" v-model="date">
                <a-select-option v-for="i in yearSelectOption" :key="i">{{i}}年</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <a-form-item label="星期选择">
              <a-select mode="multiple" style="width: 100%" placeholder="请选择" v-model="weekSelect">
                <a-select-option v-for="(i,index) in weekSelectOption" :key="i" :value="index">{{i}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <a-form-item label="日期选择">
              <a-row>
                <a-tag
                  closable
                  v-for="(date,index) in dateList"
                  :key="date"
                  @close="deleteDateTag(index)"
                  style="margin-bottom:8px"
                >{{date}}</a-tag>
              </a-row>
              <div>
                <a-date-picker
                  @openChange="handleOpenChange1"
                  @panelChange="handlePanelChange1"
                >
                  <template slot="dateRender" slot-scope="current, today">
                    <div
                      @click="handleDateClick(current)"
                      class="ant-calendar-date"
                      :style="getCurrentStyle(current, today)"
                    >{{current.date()}}</div>
                  </template>
                </a-date-picker>
                <a-button type="danger" style="margin-left:8px" @click="deleteAllDate">清除按钮</a-button>
              </div>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="描述">
              <a-textarea
                v-decorator="['description', {
                  rules: [{ required: true, message: 'Please enter url description' }]
                }]"
                :rows="4"
                placeholder="please enter url description"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <div
        :style="{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
        }"
      >
        <a-button :style="{marginRight: '8px'}" @click="onClose">取消</a-button>
        <a-button @click="handleSubmit" type="primary">提交</a-button>
      </div>
    </a-drawer>
    <a-drawer
      :title="previewData.rule_name"
      :width="1050"
      @close="onPreviewClose"
      :visible="previewVisible"
      :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}"
    >
      <a-row type="flex" justify="space-between" style="padding-bottom:50px;">
        <div
          v-for="item in previewDateOption"
          :key="item.toString()"
          :style="{ width: '300px', border: '1px solid #d9d9d9', borderRadius: '4px', margin:'10px 0' }"
        >
          <a-calendar :value="item" :fullscreen="false" @panelChange="onPanelChange" >
            <template  slot="dateFullCellRender" slot-scope="value">
              <div  :style="getPreviewCurrentStyle(value,item)" style="text-align:center">
                {{value.date()}}
              </div>
            </template>
          </a-calendar>
        </div>
      </a-row>
      <div
        :style="{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
        }"
      >
        <a-button :style="{marginRight: '8px'}" @click="onClose">取消</a-button>
        <a-button @click="handleSubmit" type="primary">提交</a-button>
      </div>
    </a-drawer>
  </div>
</template>

<script>
const weekSelectOption = [
  "周日",
  "周一",
  "周二",
  "周三",
  "周四",
  "周五",
  "周六"
];
let nowYear = new Date().getFullYear();
const yearSelectOption = [];
for (let i = 0; i < 10; i++) {
  yearSelectOption.push(nowYear + i);
}
class Rule {
  constructor(type = "week", value = "0") {
    this.type = type;
    this.value = value;
  }
}
import { postDaterules, getDaterules, deleteDaterules } from "@/api/addGood";
export default {
  name: "CardList",
  data() {
    return {
      daterulesData: [],
      visible: false,
      previewVisible: false,
      newRuleList: [],
      weekSelectOption,
      yearSelectOption,
      form: this.$form.createForm(this),
      rule_name: "",
      date: "",
      weekSelect: [],
      dateList: [],
      previewId:'',
      previewData:{},
      previewDateOption:[]
    };
  },
  created() {
    this.initDaterulesData();
    // this.initPreviewDateOption();
  },
  computed: {
    dataSource() {
      let dataSource = this.daterulesData.map(ele => {
        if (ele === null) {
          return ele;
        } else {
          ele.color = this.getRandomColor();
          if (ele.rule_name != null) {
            ele.shortName = ele.rule_name.substr(0, 4);
          }
          return ele;
        }
      });
      dataSource.unshift(null);
      console.log(dataSource);
      return dataSource;
    }
  },
  methods: {
    initPreviewDateOption(){
      let start_date = this.previewData.start_date;
      let end_date = this.previewData.end_date;
      let start = new Date(start_date)
      let end = new Date(end_date)
      this.previewDateOption=[]
      for(let year = start.getFullYear();year<=end.getFullYear();year++){
        for(let month = year==start.getFullYear()?start.getMonth()+1:1 ; (year==end.getFullYear()&&month<=end.getMonth()+1)||(year!=end.getFullYear()&&month<=12);month++){
          this.previewDateOption.push(this.$moment(new Date(`${year}-${month}-01`)))
        }
      }

    },
    initDaterulesData() {
      getDaterules().then(res => {
        this.daterulesData = res.data.data;
      });
    },
    //根据信息生成周几、周几
    generateWeekData(items) {
      let weeks = items.map(ele => {
        return this.weekSelectOption[ele.day];
      });
      return weeks.join("、");
    },
    previewDateData(id) {
  
      this.previewId = id;
      this.daterulesData.forEach(ele=>{
        if(ele.id == this.previewId){
          this.previewData = ele
        }
      })
      this.initPreviewDateOption()
      this.previewVisible = true;
    },
    onPanelChange(value, mode) {
      console.log(value, mode);
    },
    //深色
    getRandomColor() {
      var col = "#"; //这个字符串第一位为# 颜色的格式
      for (var i = 0; i < 6; i++) {
        col += parseInt(Math.random() * 11).toString(16);
        //rondom*16后的随机值即为0-1*16==0-16;   toString(16)为转化为16进制
      }
      return col; //最后返回一个七位的值 格式即为#nnnnnn 颜色的格式
    },

    changeValue() {
      const index = UserList.indexOf(this.avatarValue);
      this.avatarValue =
        index < UserList.length - 1 ? UserList[index + 1] : UserList[0];
      this.color =
        index < colorList.length - 1 ? colorList[index + 1] : colorList[0];
    },
    onAddPriceDateRule() {
      this.visible = true;
    },
    handleAddRule() {
      this.newRuleList.push(new Rule("week", "0"));
    },
    onClose() {
      this.visible = false;
    },
    onPreviewClose() {
      this.previewVisible = false;
    },
    getPreviewCurrentStyle(value,item){
      const style = {};
      let currentDate = this.previewData.items.map(ele=>{
        return this.$moment(new Date(ele.year+"-"+ele.month+"-"+ele.day)).format("YY-MM-DD")
      })
      // console.log(currentDate)
      if(value.month()==item.month()){
        // console.log(currentDate.includes(value.format("YY-MM-DD")))
        if(currentDate.includes(value.format("YY-MM-DD"))){
          style.background = 'red'
          style.color = '#fff'
        }
      }else{
        style.color = '#00000040'

      }
      return style;
    },
    getCurrentStyle(current, today) {
      const style = {};
      if (this.dateList.includes(current.format("YY-MM-DD"))) {
        style.border = "1px solid #1890ff";
        style.borderRadius = "50%";
      }
      return style;
    },
    handleOpenChange1(open) {
      if (open) {
        this.mode1 = "time";
      }
    },

    handlePanelChange1(value, mode) {},
    handleDateClick(date) {
      // console.log(this.dateList.indexOf(date.format("YY-MM-DD")));
      if (this.dateList.indexOf(date.format("YY-MM-DD")) == -1) {
        this.dateList.push(date.format("YY-MM-DD"));
      } else {
        this.$delete(
          this.dateList,
          this.dateList.indexOf(date.format("YY-MM-DD"))
        );
      }
    },
    deleteAllDate() {
      this.dateList = [];
    },
    deleteDateTag(index) {
      this.$delete(this.dateList, index);
      // console.log(this.dateList);
    },
    handleSubmit() {
      console.log(this.dateList);
      let level = 0;
      let type = 1;
      let start_date = this.$moment(new Date(this.date + "-1-1")).format(
        "YYYY-MM-DD"
      );
      let end_date = this.$moment(new Date(this.date+ "-12-31")).format(
        "YYYY-MM-DD"
      );
      let item = [];
      if (this.weekSelect.length > 0) {
        this.level = 0;
        this.type = 1;
        item = this.weekSelect;
      } else {
        this.level = 1;
        this.type = 2;
        item = this.dateList;
      }
      const data = {
        rule: {
          rule_name: this.rule_name,
          start_date: start_date,
          end_date: end_date,
          level: level,
          type: type
        },
        item: item
      };
      postDaterules(data).then(res => {
        this.$message.success("添加成功");
        this.initDaterulesData();
      });
    },
    deleteDateRulesById(id) {
      deleteDaterules(id).then(res => {
        this.$message.success("删除成功");
        this.initDaterulesData();
      });
    }
  }
};
</script>

<style lang="less" scoped>
.card-avatar {
  width: 48px;
  height: 48px;
  border-radius: 48px;
}
.ant-card-actions {
  background: #f7f9fa;
  li {
    float: left;
    text-align: center;
    margin: 12px 0;
    color: rgba(0, 0, 0, 0.45);
    width: 50%;
    &:not(:last-child) {
      border-right: 1px solid #e8e8e8;
    }
    a {
      color: rgba(0, 0, 0, 0.45);
      line-height: 22px;
      display: inline-block;
      width: 100%;
      &:hover {
        color: #1890ff;
      }
    }
  }
}
.new-btn {
  background-color: #fff;
  border-radius: 2px;
  width: 100%;
  height: 188px;
}
.meta-content {
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  height: 64px;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>