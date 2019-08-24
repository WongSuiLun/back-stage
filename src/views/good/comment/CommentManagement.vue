<template>
  <div>
    <a-card :bordered="false" class="ant-pro-components-tag-select">
      <a-form :form="form" layout="inline">
        <standard-form-row title="模式" block style="padding-bottom: 11px;">
          <a-radio-group defaultValue="card" buttonStyle="solid" v-model="mode">
            <a-radio-button value="card">卡片</a-radio-button>
            <a-radio-button value="table">表格</a-radio-button>
          </a-radio-group>
        </standard-form-row>
        <standard-form-row title="所属类目" block style="padding-bottom: 11px;"></standard-form-row>

      </a-form>
    </a-card>
    <div class="content-warp">
    <div v-show="mode=='card'">
      <comment-card :data="data"></comment-card>
    </div>
    <div v-show="mode=='table'">
      <comment-table :data="data"></comment-table>
    </div>
    </div>
  </div>
</template>
<script>
import CommentCard from "./components/CommentCard";
import CommentTable from "./components/CommentTable";
import { TagSelect, StandardFormRow, Ellipsis, AvatarList } from "@/components";
export default {
  components: {
    CommentCard,
    CommentTable,
    TagSelect,
    StandardFormRow,
    Ellipsis,
    AvatarList
  },
  data() {
    return {
      mode: "table",
      data: [],
      form: this.$form.createForm(this),
      loading: true,
      data: [
        {
          image: [
            "http://test.00800.com.cn/data/upload/2019/0704/21/5d1dfa9e593da147b03c.jpeg",
            "http://test.00800.com.cn/data/upload/2019/0704/21/5d1dfa9e593da147b03c.jpeg",
            "http://test.00800.com.cn/data/upload/2019/0704/21/5d1dfa9e77d9e8c421e9.jpeg"
          ],
          evaluate_id: 436,
          uid: 311114,
          type: "",
          level_data: {
            total: "5",
            service: "5",
            hygiene: "5",
            facilities: "5"
          },
          content: "早餐的意粉可以再进步就好了，基本上没啥味道。",
          ctime: "2019-07-21 10:53:42",
          is_anonymous: 1,
          table: "order",
          attach_id: null,
          is_show: 1,
          user_info: {
            uid: 311114,
            realname: "陈颖欣",
            phone: "13798915422",
            account: null,
            login_salt: null,
            uname: "100%Wing",
            email: null,
            sex: 1,
            location: null,
            is_audit: 1,
            is_active: 1,
            is_cert: 1,
            is_init: 1,
            domain: null,
            province: 0,
            city: 0,
            area: 0,
            reg_ip: "223.104.65.225",
            lang: "zh-cn",
            timezone: "PRC",
            is_del: 0,
            first_letter: "#",
            intro: "",
            last_login_time: 1562567747,
            last_feed_id: 0,
            last_post_time: 0,
            search_key: "100%Wing",
            invite_code: null,
            feed_email_time: null,
            send_email_time: null,
            openid: "omeSM1BinZHH7BYSuNPwgUmt4f8I",
            input_city: null,
            is_fixed: 1,
            creator: null,
            ctime: 1545466282,
            mender: null,
            rtime: 1545466282,
            type: 0,
            birth: "1992/05/24",
            cert_no: null,
            identity: 0,
            personal_sign: null,
            from_type: 0,
            cert_auth_time: 1562501624,
            tel_fax_qq: null,
            com_linkman: null,
            area_code: null,
            avatar_original:
              "http://test.00800.com.cn/data/upload/avatar/44/db/cc/original.jpg",
            avatar_big:
              "http://test.00800.com.cn/data/upload/avatar/44/db/cc/original_200_200.jpg?v1545466282",
            avatar_middle:
              "http://test.00800.com.cn/data/upload/avatar/44/db/cc/original_100_100.jpg?v1545466282",
            avatar_small:
              "http://test.00800.com.cn/data/upload/avatar/44/db/cc/original_50_50.jpg?v1545466282",
            avatar_tiny:
              "http://test.00800.com.cn/data/upload/avatar/44/db/cc/original_30_30.jpg?v1545466282",
            avatar_url:
              "http://www.00800.com.cn/cnhs/wqproject/index.php?app=public&mod=Attach&act=avatar&uid=311114",
            space_url:
              "http://www.00800.com.cn/cnhs/wqproject/index.php?app=public&mod=Profile&act=index&uid=311114",
            space_link:
              "<a href='http://www.00800.com.cn/cnhs/wqproject/index.php?app=public&mod=Profile&act=index&uid=311114' target='_blank' uid='311114' event-node='face_card'>100%Wing</a>",
            space_link_no:
              "<a href='http://www.00800.com.cn/cnhs/wqproject/index.php?app=public&mod=Profile&act=index&uid=311114' title='100%Wing' target='_blank'>100%Wing</a>",
            medals: [],
            api_user_group: {
              "288": {
                user_group_id: 288,
                user_group_name: "普通用户",
                user_group_sign: "customer",
                user_group_icon: "-1",
                user_group_type: 0,
                company_id: 66,
                app_name: "public",
                is_authenticate: 0,
                is_del: 0,
                is_sys: 0,
                creator: 106,
                ctime: 1493017041,
                mender: 106,
                rtime: 1493017041,
                type: "company",
                row_id: 66,
                is_level_role: 1,
                level: 0
              }
            },
            user_group: {
              "288": {
                user_group_id: 288,
                user_group_name: "普通用户",
                user_group_sign: "customer",
                user_group_icon: "-1",
                user_group_type: 0,
                company_id: 66,
                app_name: "public",
                is_authenticate: 0,
                is_del: 0,
                is_sys: 0,
                creator: 106,
                ctime: 1493017041,
                mender: 106,
                rtime: 1493017041,
                type: "company",
                row_id: 66,
                is_level_role: 1,
                level: 0
              }
            },
            group_icon_only: {
              user_group_id: 288,
              user_group_name: "普通用户",
              user_group_sign: "customer",
              user_group_icon: "-1",
              user_group_type: 0,
              company_id: 66,
              app_name: "public",
              is_authenticate: 0,
              is_del: 0,
              is_sys: 0,
              creator: 106,
              ctime: 1493017041,
              mender: 106,
              rtime: 1493017041,
              type: "company",
              row_id: 66,
              is_level_role: 1,
              level: 0
            },
            group_icon: "",
            credit_info: {
              credit: {
                experience: { value: 3, alias: "经验" },
                score: { value: 6, alias: "积分" }
              },
              creditType: { experience: "经验", score: "积分" },
              level: {
                level: 1,
                name: "LV1",
                image: "72",
                start: "0",
                end: "10",
                level_type: "experience",
                nextNeed: 7,
                nextName: "LV2",
                src:
                  "http://test.00800.com.cn/data/upload/2015/0715/18/55a6380e408a3.png"
              }
            }
          },
          reply: [
            {
              id: 9,
              evaluate_id: 436,
              reply_content:
                "尊敬的宾客：真诚感谢您提出宝贵的意见，我们会更注重此方面的细节，为了您下次的到来，我们将会做得更好！",
              is_del: 0,
              reply_mid: 370319,
              reply_time: "2019-07-26 14:03:24"
            }
          ],
          order_no: "1907073129"
        },
        {
          image: [
            "http://test.00800.com.cn/data/upload/2019/0704/21/5d1dfa9e593da147b03c.jpeg",
            "http://test.00800.com.cn/data/upload/2019/0704/21/5d1dfa9e593da147b03c.jpeg",
            "http://test.00800.com.cn/data/upload/2019/0704/21/5d1dfa9e77d9e8c421e9.jpeg"
          ],
          evaluate_id: 436,
          uid: 311114,
          type: "",
          level_data: {
            total: "5",
            service: "5",
            hygiene: "5",
            facilities: "5"
          },
          content: "早餐的意粉可以再进步就好了，基本上没啥味道。",
          ctime: "2019-07-21 10:53:42",
          is_anonymous: 1,
          table: "order",
          attach_id: null,
          is_show: 1,
          user_info: {
            uid: 311114,
            realname: "陈颖欣",
            phone: "13798915422",
            account: null,
            login_salt: null,
            uname: "100%Wing",
            email: null,
            sex: 1,
            location: null,
            is_audit: 1,
            is_active: 1,
            is_cert: 1,
            is_init: 1,
            domain: null,
            province: 0,
            city: 0,
            area: 0,
            reg_ip: "223.104.65.225",
            lang: "zh-cn",
            timezone: "PRC",
            is_del: 0,
            first_letter: "#",
            intro: "",
            last_login_time: 1562567747,
            last_feed_id: 0,
            last_post_time: 0,
            search_key: "100%Wing",
            invite_code: null,
            feed_email_time: null,
            send_email_time: null,
            openid: "omeSM1BinZHH7BYSuNPwgUmt4f8I",
            input_city: null,
            is_fixed: 1,
            creator: null,
            ctime: 1545466282,
            mender: null,
            rtime: 1545466282,
            type: 0,
            birth: "1992/05/24",
            cert_no: null,
            identity: 0,
            personal_sign: null,
            from_type: 0,
            cert_auth_time: 1562501624,
            tel_fax_qq: null,
            com_linkman: null,
            area_code: null,
            avatar_original:
              "http://test.00800.com.cn/data/upload/avatar/44/db/cc/original.jpg",
            avatar_big:
              "http://test.00800.com.cn/data/upload/avatar/44/db/cc/original_200_200.jpg?v1545466282",
            avatar_middle:
              "http://test.00800.com.cn/data/upload/avatar/44/db/cc/original_100_100.jpg?v1545466282",
            avatar_small:
              "http://test.00800.com.cn/data/upload/avatar/44/db/cc/original_50_50.jpg?v1545466282",
            avatar_tiny:
              "http://test.00800.com.cn/data/upload/avatar/44/db/cc/original_30_30.jpg?v1545466282",
            avatar_url:
              "http://www.00800.com.cn/cnhs/wqproject/index.php?app=public&mod=Attach&act=avatar&uid=311114",
            space_url:
              "http://www.00800.com.cn/cnhs/wqproject/index.php?app=public&mod=Profile&act=index&uid=311114",
            space_link:
              "<a href='http://www.00800.com.cn/cnhs/wqproject/index.php?app=public&mod=Profile&act=index&uid=311114' target='_blank' uid='311114' event-node='face_card'>100%Wing</a>",
            space_link_no:
              "<a href='http://www.00800.com.cn/cnhs/wqproject/index.php?app=public&mod=Profile&act=index&uid=311114' title='100%Wing' target='_blank'>100%Wing</a>",
            medals: [],
            api_user_group: {
              "288": {
                user_group_id: 288,
                user_group_name: "普通用户",
                user_group_sign: "customer",
                user_group_icon: "-1",
                user_group_type: 0,
                company_id: 66,
                app_name: "public",
                is_authenticate: 0,
                is_del: 0,
                is_sys: 0,
                creator: 106,
                ctime: 1493017041,
                mender: 106,
                rtime: 1493017041,
                type: "company",
                row_id: 66,
                is_level_role: 1,
                level: 0
              }
            },
            user_group: {
              "288": {
                user_group_id: 288,
                user_group_name: "普通用户",
                user_group_sign: "customer",
                user_group_icon: "-1",
                user_group_type: 0,
                company_id: 66,
                app_name: "public",
                is_authenticate: 0,
                is_del: 0,
                is_sys: 0,
                creator: 106,
                ctime: 1493017041,
                mender: 106,
                rtime: 1493017041,
                type: "company",
                row_id: 66,
                is_level_role: 1,
                level: 0
              }
            },
            group_icon_only: {
              user_group_id: 288,
              user_group_name: "普通用户",
              user_group_sign: "customer",
              user_group_icon: "-1",
              user_group_type: 0,
              company_id: 66,
              app_name: "public",
              is_authenticate: 0,
              is_del: 0,
              is_sys: 0,
              creator: 106,
              ctime: 1493017041,
              mender: 106,
              rtime: 1493017041,
              type: "company",
              row_id: 66,
              is_level_role: 1,
              level: 0
            },
            group_icon: "",
            credit_info: {
              credit: {
                experience: { value: 3, alias: "经验" },
                score: { value: 6, alias: "积分" }
              },
              creditType: { experience: "经验", score: "积分" },
              level: {
                level: 1,
                name: "LV1",
                image: "72",
                start: "0",
                end: "10",
                level_type: "experience",
                nextNeed: 7,
                nextName: "LV2",
                src:
                  "http://test.00800.com.cn/data/upload/2015/0715/18/55a6380e408a3.png"
              }
            }
          },
          reply: [
            {
              id: 9,
              evaluate_id: 436,
              reply_content:
                "尊敬的宾客：真诚感谢您提出宝贵的意见，我们会更注重此方面的细节，为了您下次的到来，我们将会做得更好！",
              is_del: 0,
              reply_mid: 370319,
              reply_time: "2019-07-26 14:03:24"
            }
          ],
          order_no: "1907073129"
        },
        {
          image: [
            "http://test.00800.com.cn/data/upload/2019/0704/21/5d1dfa9e593da147b03c.jpeg",
            "http://test.00800.com.cn/data/upload/2019/0704/21/5d1dfa9e593da147b03c.jpeg",
            "http://test.00800.com.cn/data/upload/2019/0704/21/5d1dfa9e77d9e8c421e9.jpeg"
          ],
          evaluate_id: 436,
          uid: 311114,
          type: "",
          level_data: {
            total: "5",
            service: "5",
            hygiene: "5",
            facilities: "5"
          },
          content: "早餐的意粉可以再进步就好了，基本上没啥味道。",
          ctime: "2019-07-21 10:53:42",
          is_anonymous: 1,
          table: "order",
          attach_id: null,
          is_show: 1,
          user_info: {
            uid: 311114,
            realname: "陈颖欣",
            phone: "13798915422",
            account: null,
            login_salt: null,
            uname: "100%Wing",
            email: null,
            sex: 1,
            location: null,
            is_audit: 1,
            is_active: 1,
            is_cert: 1,
            is_init: 1,
            domain: null,
            province: 0,
            city: 0,
            area: 0,
            reg_ip: "223.104.65.225",
            lang: "zh-cn",
            timezone: "PRC",
            is_del: 0,
            first_letter: "#",
            intro: "",
            last_login_time: 1562567747,
            last_feed_id: 0,
            last_post_time: 0,
            search_key: "100%Wing",
            invite_code: null,
            feed_email_time: null,
            send_email_time: null,
            openid: "omeSM1BinZHH7BYSuNPwgUmt4f8I",
            input_city: null,
            is_fixed: 1,
            creator: null,
            ctime: 1545466282,
            mender: null,
            rtime: 1545466282,
            type: 0,
            birth: "1992/05/24",
            cert_no: null,
            identity: 0,
            personal_sign: null,
            from_type: 0,
            cert_auth_time: 1562501624,
            tel_fax_qq: null,
            com_linkman: null,
            area_code: null,
            avatar_original:
              "http://test.00800.com.cn/data/upload/avatar/44/db/cc/original.jpg",
            avatar_big:
              "http://test.00800.com.cn/data/upload/avatar/44/db/cc/original_200_200.jpg?v1545466282",
            avatar_middle:
              "http://test.00800.com.cn/data/upload/avatar/44/db/cc/original_100_100.jpg?v1545466282",
            avatar_small:
              "http://test.00800.com.cn/data/upload/avatar/44/db/cc/original_50_50.jpg?v1545466282",
            avatar_tiny:
              "http://test.00800.com.cn/data/upload/avatar/44/db/cc/original_30_30.jpg?v1545466282",
            avatar_url:
              "http://www.00800.com.cn/cnhs/wqproject/index.php?app=public&mod=Attach&act=avatar&uid=311114",
            space_url:
              "http://www.00800.com.cn/cnhs/wqproject/index.php?app=public&mod=Profile&act=index&uid=311114",
            space_link:
              "<a href='http://www.00800.com.cn/cnhs/wqproject/index.php?app=public&mod=Profile&act=index&uid=311114' target='_blank' uid='311114' event-node='face_card'>100%Wing</a>",
            space_link_no:
              "<a href='http://www.00800.com.cn/cnhs/wqproject/index.php?app=public&mod=Profile&act=index&uid=311114' title='100%Wing' target='_blank'>100%Wing</a>",
            medals: [],
            api_user_group: {
              "288": {
                user_group_id: 288,
                user_group_name: "普通用户",
                user_group_sign: "customer",
                user_group_icon: "-1",
                user_group_type: 0,
                company_id: 66,
                app_name: "public",
                is_authenticate: 0,
                is_del: 0,
                is_sys: 0,
                creator: 106,
                ctime: 1493017041,
                mender: 106,
                rtime: 1493017041,
                type: "company",
                row_id: 66,
                is_level_role: 1,
                level: 0
              }
            },
            user_group: {
              "288": {
                user_group_id: 288,
                user_group_name: "普通用户",
                user_group_sign: "customer",
                user_group_icon: "-1",
                user_group_type: 0,
                company_id: 66,
                app_name: "public",
                is_authenticate: 0,
                is_del: 0,
                is_sys: 0,
                creator: 106,
                ctime: 1493017041,
                mender: 106,
                rtime: 1493017041,
                type: "company",
                row_id: 66,
                is_level_role: 1,
                level: 0
              }
            },
            group_icon_only: {
              user_group_id: 288,
              user_group_name: "普通用户",
              user_group_sign: "customer",
              user_group_icon: "-1",
              user_group_type: 0,
              company_id: 66,
              app_name: "public",
              is_authenticate: 0,
              is_del: 0,
              is_sys: 0,
              creator: 106,
              ctime: 1493017041,
              mender: 106,
              rtime: 1493017041,
              type: "company",
              row_id: 66,
              is_level_role: 1,
              level: 0
            },
            group_icon: "",
            credit_info: {
              credit: {
                experience: { value: 3, alias: "经验" },
                score: { value: 6, alias: "积分" }
              },
              creditType: { experience: "经验", score: "积分" },
              level: {
                level: 1,
                name: "LV1",
                image: "72",
                start: "0",
                end: "10",
                level_type: "experience",
                nextNeed: 7,
                nextName: "LV2",
                src:
                  "http://test.00800.com.cn/data/upload/2015/0715/18/55a6380e408a3.png"
              }
            }
          },
          reply: [
            {
              id: 9,
              evaluate_id: 436,
              reply_content:
                "尊敬的宾客：真诚感谢您提出宝贵的意见，我们会更注重此方面的细节，为了您下次的到来，我们将会做得更好！",
              is_del: 0,
              reply_mid: 370319,
              reply_time: "2019-07-26 14:03:24"
            }
          ],
          order_no: "1907073129"
        },
        {
          image: [
            "http://test.00800.com.cn/data/upload/2019/0704/21/5d1dfa9e593da147b03c.jpeg",
            "http://test.00800.com.cn/data/upload/2019/0704/21/5d1dfa9e593da147b03c.jpeg",
            "http://test.00800.com.cn/data/upload/2019/0704/21/5d1dfa9e77d9e8c421e9.jpeg"
          ],
          evaluate_id: 436,
          uid: 311114,
          type: "",
          level_data: {
            total: "5",
            service: "5",
            hygiene: "5",
            facilities: "5"
          },
          content: "早餐的意粉可以再进步就好了，基本上没啥味道。",
          ctime: "2019-07-21 10:53:42",
          is_anonymous: 1,
          table: "order",
          attach_id: null,
          is_show: 1,
          user_info: {
            uid: 311114,
            realname: "陈颖欣",
            phone: "13798915422",
            account: null,
            login_salt: null,
            uname: "100%Wing",
            email: null,
            sex: 1,
            location: null,
            is_audit: 1,
            is_active: 1,
            is_cert: 1,
            is_init: 1,
            domain: null,
            province: 0,
            city: 0,
            area: 0,
            reg_ip: "223.104.65.225",
            lang: "zh-cn",
            timezone: "PRC",
            is_del: 0,
            first_letter: "#",
            intro: "",
            last_login_time: 1562567747,
            last_feed_id: 0,
            last_post_time: 0,
            search_key: "100%Wing",
            invite_code: null,
            feed_email_time: null,
            send_email_time: null,
            openid: "omeSM1BinZHH7BYSuNPwgUmt4f8I",
            input_city: null,
            is_fixed: 1,
            creator: null,
            ctime: 1545466282,
            mender: null,
            rtime: 1545466282,
            type: 0,
            birth: "1992/05/24",
            cert_no: null,
            identity: 0,
            personal_sign: null,
            from_type: 0,
            cert_auth_time: 1562501624,
            tel_fax_qq: null,
            com_linkman: null,
            area_code: null,
            avatar_original:
              "http://test.00800.com.cn/data/upload/avatar/44/db/cc/original.jpg",
            avatar_big:
              "http://test.00800.com.cn/data/upload/avatar/44/db/cc/original_200_200.jpg?v1545466282",
            avatar_middle:
              "http://test.00800.com.cn/data/upload/avatar/44/db/cc/original_100_100.jpg?v1545466282",
            avatar_small:
              "http://test.00800.com.cn/data/upload/avatar/44/db/cc/original_50_50.jpg?v1545466282",
            avatar_tiny:
              "http://test.00800.com.cn/data/upload/avatar/44/db/cc/original_30_30.jpg?v1545466282",
            avatar_url:
              "http://www.00800.com.cn/cnhs/wqproject/index.php?app=public&mod=Attach&act=avatar&uid=311114",
            space_url:
              "http://www.00800.com.cn/cnhs/wqproject/index.php?app=public&mod=Profile&act=index&uid=311114",
            space_link:
              "<a href='http://www.00800.com.cn/cnhs/wqproject/index.php?app=public&mod=Profile&act=index&uid=311114' target='_blank' uid='311114' event-node='face_card'>100%Wing</a>",
            space_link_no:
              "<a href='http://www.00800.com.cn/cnhs/wqproject/index.php?app=public&mod=Profile&act=index&uid=311114' title='100%Wing' target='_blank'>100%Wing</a>",
            medals: [],
            api_user_group: {
              "288": {
                user_group_id: 288,
                user_group_name: "普通用户",
                user_group_sign: "customer",
                user_group_icon: "-1",
                user_group_type: 0,
                company_id: 66,
                app_name: "public",
                is_authenticate: 0,
                is_del: 0,
                is_sys: 0,
                creator: 106,
                ctime: 1493017041,
                mender: 106,
                rtime: 1493017041,
                type: "company",
                row_id: 66,
                is_level_role: 1,
                level: 0
              }
            },
            user_group: {
              "288": {
                user_group_id: 288,
                user_group_name: "普通用户",
                user_group_sign: "customer",
                user_group_icon: "-1",
                user_group_type: 0,
                company_id: 66,
                app_name: "public",
                is_authenticate: 0,
                is_del: 0,
                is_sys: 0,
                creator: 106,
                ctime: 1493017041,
                mender: 106,
                rtime: 1493017041,
                type: "company",
                row_id: 66,
                is_level_role: 1,
                level: 0
              }
            },
            group_icon_only: {
              user_group_id: 288,
              user_group_name: "普通用户",
              user_group_sign: "customer",
              user_group_icon: "-1",
              user_group_type: 0,
              company_id: 66,
              app_name: "public",
              is_authenticate: 0,
              is_del: 0,
              is_sys: 0,
              creator: 106,
              ctime: 1493017041,
              mender: 106,
              rtime: 1493017041,
              type: "company",
              row_id: 66,
              is_level_role: 1,
              level: 0
            },
            group_icon: "",
            credit_info: {
              credit: {
                experience: { value: 3, alias: "经验" },
                score: { value: 6, alias: "积分" }
              },
              creditType: { experience: "经验", score: "积分" },
              level: {
                level: 1,
                name: "LV1",
                image: "72",
                start: "0",
                end: "10",
                level_type: "experience",
                nextNeed: 7,
                nextName: "LV2",
                src:
                  "http://test.00800.com.cn/data/upload/2015/0715/18/55a6380e408a3.png"
              }
            }
          },
          reply: [
            {
              id: 9,
              evaluate_id: 436,
              reply_content:
                "尊敬的宾客：真诚感谢您提出宝贵的意见，我们会更注重此方面的细节，为了您下次的到来，我们将会做得更好！",
              is_del: 0,
              reply_mid: 370319,
              reply_time: "2019-07-26 14:03:24"
            }
          ],
          order_no: "1907073129"
        },
        {
          image: [
            "http://test.00800.com.cn/data/upload/2019/0704/21/5d1dfa9e593da147b03c.jpeg",
            "http://test.00800.com.cn/data/upload/2019/0704/21/5d1dfa9e593da147b03c.jpeg",
            "http://test.00800.com.cn/data/upload/2019/0704/21/5d1dfa9e77d9e8c421e9.jpeg"
          ],
          evaluate_id: 436,
          uid: 311114,
          type: "",
          level_data: {
            total: "5",
            service: "5",
            hygiene: "5",
            facilities: "5"
          },
          content: "早餐的意粉可以再进步就好了，基本上没啥味道。",
          ctime: "2019-07-21 10:53:42",
          is_anonymous: 1,
          table: "order",
          attach_id: null,
          is_show: 1,
          user_info: {
            uid: 311114,
            realname: "陈颖欣",
            phone: "13798915422",
            account: null,
            login_salt: null,
            uname: "100%Wing",
            email: null,
            sex: 1,
            location: null,
            is_audit: 1,
            is_active: 1,
            is_cert: 1,
            is_init: 1,
            domain: null,
            province: 0,
            city: 0,
            area: 0,
            reg_ip: "223.104.65.225",
            lang: "zh-cn",
            timezone: "PRC",
            is_del: 0,
            first_letter: "#",
            intro: "",
            last_login_time: 1562567747,
            last_feed_id: 0,
            last_post_time: 0,
            search_key: "100%Wing",
            invite_code: null,
            feed_email_time: null,
            send_email_time: null,
            openid: "omeSM1BinZHH7BYSuNPwgUmt4f8I",
            input_city: null,
            is_fixed: 1,
            creator: null,
            ctime: 1545466282,
            mender: null,
            rtime: 1545466282,
            type: 0,
            birth: "1992/05/24",
            cert_no: null,
            identity: 0,
            personal_sign: null,
            from_type: 0,
            cert_auth_time: 1562501624,
            tel_fax_qq: null,
            com_linkman: null,
            area_code: null,
            avatar_original:
              "http://test.00800.com.cn/data/upload/avatar/44/db/cc/original.jpg",
            avatar_big:
              "http://test.00800.com.cn/data/upload/avatar/44/db/cc/original_200_200.jpg?v1545466282",
            avatar_middle:
              "http://test.00800.com.cn/data/upload/avatar/44/db/cc/original_100_100.jpg?v1545466282",
            avatar_small:
              "http://test.00800.com.cn/data/upload/avatar/44/db/cc/original_50_50.jpg?v1545466282",
            avatar_tiny:
              "http://test.00800.com.cn/data/upload/avatar/44/db/cc/original_30_30.jpg?v1545466282",
            avatar_url:
              "http://www.00800.com.cn/cnhs/wqproject/index.php?app=public&mod=Attach&act=avatar&uid=311114",
            space_url:
              "http://www.00800.com.cn/cnhs/wqproject/index.php?app=public&mod=Profile&act=index&uid=311114",
            space_link:
              "<a href='http://www.00800.com.cn/cnhs/wqproject/index.php?app=public&mod=Profile&act=index&uid=311114' target='_blank' uid='311114' event-node='face_card'>100%Wing</a>",
            space_link_no:
              "<a href='http://www.00800.com.cn/cnhs/wqproject/index.php?app=public&mod=Profile&act=index&uid=311114' title='100%Wing' target='_blank'>100%Wing</a>",
            medals: [],
            api_user_group: {
              "288": {
                user_group_id: 288,
                user_group_name: "普通用户",
                user_group_sign: "customer",
                user_group_icon: "-1",
                user_group_type: 0,
                company_id: 66,
                app_name: "public",
                is_authenticate: 0,
                is_del: 0,
                is_sys: 0,
                creator: 106,
                ctime: 1493017041,
                mender: 106,
                rtime: 1493017041,
                type: "company",
                row_id: 66,
                is_level_role: 1,
                level: 0
              }
            },
            user_group: {
              "288": {
                user_group_id: 288,
                user_group_name: "普通用户",
                user_group_sign: "customer",
                user_group_icon: "-1",
                user_group_type: 0,
                company_id: 66,
                app_name: "public",
                is_authenticate: 0,
                is_del: 0,
                is_sys: 0,
                creator: 106,
                ctime: 1493017041,
                mender: 106,
                rtime: 1493017041,
                type: "company",
                row_id: 66,
                is_level_role: 1,
                level: 0
              }
            },
            group_icon_only: {
              user_group_id: 288,
              user_group_name: "普通用户",
              user_group_sign: "customer",
              user_group_icon: "-1",
              user_group_type: 0,
              company_id: 66,
              app_name: "public",
              is_authenticate: 0,
              is_del: 0,
              is_sys: 0,
              creator: 106,
              ctime: 1493017041,
              mender: 106,
              rtime: 1493017041,
              type: "company",
              row_id: 66,
              is_level_role: 1,
              level: 0
            },
            group_icon: "",
            credit_info: {
              credit: {
                experience: { value: 3, alias: "经验" },
                score: { value: 6, alias: "积分" }
              },
              creditType: { experience: "经验", score: "积分" },
              level: {
                level: 1,
                name: "LV1",
                image: "72",
                start: "0",
                end: "10",
                level_type: "experience",
                nextNeed: 7,
                nextName: "LV2",
                src:
                  "http://test.00800.com.cn/data/upload/2015/0715/18/55a6380e408a3.png"
              }
            }
          },
          reply: [
            {
              id: 9,
              evaluate_id: 436,
              reply_content:
                "尊敬的宾客：真诚感谢您提出宝贵的意见，我们会更注重此方面的细节，为了您下次的到来，我们将会做得更好！",
              is_del: 0,
              reply_mid: 370319,
              reply_time: "2019-07-26 14:03:24"
            }
          ],
          order_no: "1907073129"
        },
        {
          image: [
            "http://test.00800.com.cn/data/upload/2019/0704/21/5d1dfa9e593da147b03c.jpeg",
            "http://test.00800.com.cn/data/upload/2019/0704/21/5d1dfa9e593da147b03c.jpeg",
            "http://test.00800.com.cn/data/upload/2019/0704/21/5d1dfa9e77d9e8c421e9.jpeg"
          ],
          evaluate_id: 436,
          uid: 311114,
          type: "",
          level_data: {
            total: "5",
            service: "5",
            hygiene: "5",
            facilities: "5"
          },
          content: "早餐的意粉可以再进步就好了，基本上没啥味道。",
          ctime: "2019-07-21 10:53:42",
          is_anonymous: 1,
          table: "order",
          attach_id: null,
          is_show: 1,
          user_info: {
            uid: 311114,
            realname: "陈颖欣",
            phone: "13798915422",
            account: null,
            login_salt: null,
            uname: "100%Wing",
            email: null,
            sex: 1,
            location: null,
            is_audit: 1,
            is_active: 1,
            is_cert: 1,
            is_init: 1,
            domain: null,
            province: 0,
            city: 0,
            area: 0,
            reg_ip: "223.104.65.225",
            lang: "zh-cn",
            timezone: "PRC",
            is_del: 0,
            first_letter: "#",
            intro: "",
            last_login_time: 1562567747,
            last_feed_id: 0,
            last_post_time: 0,
            search_key: "100%Wing",
            invite_code: null,
            feed_email_time: null,
            send_email_time: null,
            openid: "omeSM1BinZHH7BYSuNPwgUmt4f8I",
            input_city: null,
            is_fixed: 1,
            creator: null,
            ctime: 1545466282,
            mender: null,
            rtime: 1545466282,
            type: 0,
            birth: "1992/05/24",
            cert_no: null,
            identity: 0,
            personal_sign: null,
            from_type: 0,
            cert_auth_time: 1562501624,
            tel_fax_qq: null,
            com_linkman: null,
            area_code: null,
            avatar_original:
              "http://test.00800.com.cn/data/upload/avatar/44/db/cc/original.jpg",
            avatar_big:
              "http://test.00800.com.cn/data/upload/avatar/44/db/cc/original_200_200.jpg?v1545466282",
            avatar_middle:
              "http://test.00800.com.cn/data/upload/avatar/44/db/cc/original_100_100.jpg?v1545466282",
            avatar_small:
              "http://test.00800.com.cn/data/upload/avatar/44/db/cc/original_50_50.jpg?v1545466282",
            avatar_tiny:
              "http://test.00800.com.cn/data/upload/avatar/44/db/cc/original_30_30.jpg?v1545466282",
            avatar_url:
              "http://www.00800.com.cn/cnhs/wqproject/index.php?app=public&mod=Attach&act=avatar&uid=311114",
            space_url:
              "http://www.00800.com.cn/cnhs/wqproject/index.php?app=public&mod=Profile&act=index&uid=311114",
            space_link:
              "<a href='http://www.00800.com.cn/cnhs/wqproject/index.php?app=public&mod=Profile&act=index&uid=311114' target='_blank' uid='311114' event-node='face_card'>100%Wing</a>",
            space_link_no:
              "<a href='http://www.00800.com.cn/cnhs/wqproject/index.php?app=public&mod=Profile&act=index&uid=311114' title='100%Wing' target='_blank'>100%Wing</a>",
            medals: [],
            api_user_group: {
              "288": {
                user_group_id: 288,
                user_group_name: "普通用户",
                user_group_sign: "customer",
                user_group_icon: "-1",
                user_group_type: 0,
                company_id: 66,
                app_name: "public",
                is_authenticate: 0,
                is_del: 0,
                is_sys: 0,
                creator: 106,
                ctime: 1493017041,
                mender: 106,
                rtime: 1493017041,
                type: "company",
                row_id: 66,
                is_level_role: 1,
                level: 0
              }
            },
            user_group: {
              "288": {
                user_group_id: 288,
                user_group_name: "普通用户",
                user_group_sign: "customer",
                user_group_icon: "-1",
                user_group_type: 0,
                company_id: 66,
                app_name: "public",
                is_authenticate: 0,
                is_del: 0,
                is_sys: 0,
                creator: 106,
                ctime: 1493017041,
                mender: 106,
                rtime: 1493017041,
                type: "company",
                row_id: 66,
                is_level_role: 1,
                level: 0
              }
            },
            group_icon_only: {
              user_group_id: 288,
              user_group_name: "普通用户",
              user_group_sign: "customer",
              user_group_icon: "-1",
              user_group_type: 0,
              company_id: 66,
              app_name: "public",
              is_authenticate: 0,
              is_del: 0,
              is_sys: 0,
              creator: 106,
              ctime: 1493017041,
              mender: 106,
              rtime: 1493017041,
              type: "company",
              row_id: 66,
              is_level_role: 1,
              level: 0
            },
            group_icon: "",
            credit_info: {
              credit: {
                experience: { value: 3, alias: "经验" },
                score: { value: 6, alias: "积分" }
              },
              creditType: { experience: "经验", score: "积分" },
              level: {
                level: 1,
                name: "LV1",
                image: "72",
                start: "0",
                end: "10",
                level_type: "experience",
                nextNeed: 7,
                nextName: "LV2",
                src:
                  "http://test.00800.com.cn/data/upload/2015/0715/18/55a6380e408a3.png"
              }
            }
          },
          reply: [
            {
              id: 9,
              evaluate_id: 436,
              reply_content:
                "尊敬的宾客：真诚感谢您提出宝贵的意见，我们会更注重此方面的细节，为了您下次的到来，我们将会做得更好！",
              is_del: 0,
              reply_mid: 370319,
              reply_time: "2019-07-26 14:03:24"
            }
          ],
          order_no: "1907073129"
        }
      ]
    };
  }
};
</script>
<style>
</style>