<template>
  <div>
    <a-list :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 5, xxl: 4 }" :dataSource="data">
      <a-list-item slot="renderItem" slot-scope="item,">
        <a-card>
          <div slot="title" class="between">
            <span>订单:{{item.order_no}}</span>
            <span>
              订购人：
              <a-tag>普通用户</a-tag>陈颖欣
            </span>
          </div>
          <div>
            <div style="display:flex;">
              <div style="width:50px;margin-right:6px;padding-top:6px;">
                <a-avatar icon="user" />
              </div>
              <div>
                <div >
                  <h4 style="margin:0"><span>{{item.user_info.uname}}</span></h4>
                  
                </div>
                <div >
                  <span style="color:#9e9e9e">{{item.ctime}}</span>
                </div>
                <h4 style="padding:0 5px">
                  {{item.content}}
                  <a-list :grid="{ gutter: 1, column: 3 }" :dataSource="item.image">
                    <a-list-item slot="renderItem" slot-scope="sitem">
                      <img :src="sitem" width="100%" height="100" />
                    </a-list-item>
                  </a-list>
                </h4>
                <div style="background:#eee;padding:3px 5px;">
                  <Reply v-for="(reply,index) in item.reply" :info="reply" :key="index" />
                </div>

                <div class="between">
                  <span>
                    总分:
                    <a-rate :defaultValue="2" disabled style="fontSize: 14px" />
                  </span>
                  <span>
                    服务:
                    <a-rate :defaultValue="2" disabled style="fontSize: 14px" />
                  </span>
                </div>
                <div class="between">
                  <span>
                    卫生:
                    <a-rate :defaultValue="2" disabled style="fontSize: 14px" />
                  </span>
                  <span>
                    设施:
                    <a-rate :defaultValue="2" disabled style="fontSize: 14px" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- <div>
              <span>
                总分:
                <a-rate :defaultValue="2" disabled style="fontSize: 14px" />
              </span>
            </div>
            <div>
              <span>
                服务:
                <a-rate :defaultValue="2" disabled style="fontSize: 14px" />
              </span>
            </div>
          </div>
          <div>
            <span>
              卫生:
              <a-rate :defaultValue="2" disabled style="fontSize: 14px" />
            </span>
          </div>
          <div>
            <span>
              设施:
              <a-rate :defaultValue="2" disabled style="fontSize: 14px" />
            </span>
          </div>-->
          <template class="ant-card-actions" slot="actions">
            <div>订单详情</div>
            <div>回复</div>
            <div>隐藏</div>
          </template>
        </a-card>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import Reply from "./Reply";
export default {
  components: {
    Reply
  },
  props: {
    data: Array
  },
  data() {
    return {};
  },
  created() {
    console.log(this.data);
  }
};
</script>
<style lang="less" scoped>
.between {
  display: flex;
  justify-content: space-between;
}
</style>