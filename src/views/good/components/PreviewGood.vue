<template>
  <drop-fixed-box default-left="80vw" default-top="20vh">
    <div class="preview-good-warp background">
      <div class="title">预览</div>
      <div>
        <a-carousel autoplay>
          <div>
            <img
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564057842089&di=7110070472dadb9528ab0da8ce17f2c6&imgtype=0&src=http%3A%2F%2Fimg.redocn.com%2Fsheying%2F20140731%2Fqinghaihuyuanjing_2820969.jpg"
              style="height:270px;"
            />
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
        </a-carousel>
      </div>
      <div class="module">
        <div class="good-name">{{name}}</div>
        <div class="good-sub-name">{{name1}}</div>
        <div class="tag">
          <a-tag color="red">云来客栈</a-tag>
          <a-tag color="red">大餐庙会</a-tag>
          <a-tag>温泉</a-tag>
          <a-tag>4A景区</a-tag>
        </div>
        <div class="price">
          <div class="price-info">
            <span class="tip">￥</span>
            <span class="price-num">1200.00</span>
          </div>
          <div>
            <base-button type="red">立即购买</base-button>
          </div>
        </div>
      </div>
      <div class="module">
        <div class="tip-row">
          <span class="tip-text">领券：</span>
          <a-tag color="#ff3d3d">400元</a-tag>
          <a-tag color="#ff3d3d">200元</a-tag>
          <a-tag color="#ff3d3d">100元</a-tag>
          <a>去领券>></a>
        </div>
        <div class="tip-row">
          <span class="tip-text">优惠：</span>
          <a-tag color="#ff3d3d">立减</a-tag>
          <span class="tip-text">满1500立减300元，不与其它优惠同享</span>
        </div>
        <div class="tip-row">
          <span class="tip-text">积分：</span>
          <span class="tip-text">购买产品，最少可得1250积分</span>
        </div>
        <div class="tip-row">
          <span class="tip-text">特色：</span>
          <a-tag color="#f1ad33">游记有奖</a-tag>
          <a-tag color="#f1ad33">点评送积分</a-tag>
        </div>
      </div>
      <div class="module">
        <div class="tip-row">
          <span class="tip-text">领券：</span>
          <a-tag color="#ff3d3d">400元</a-tag>
          <a-tag color="#ff3d3d">200元</a-tag>
          <a-tag color="#ff3d3d">100元</a-tag>
          <a>去领券>></a>
        </div>
        <div class="tip-row">
          <span class="tip-text">优惠：</span>
          <a-tag color="#ff3d3d">立减</a-tag>
          <span class="tip-text">满1500立减300元，不与其它优惠同享</span>
        </div>
        <div class="tip-row">
          <span class="tip-text">积分：</span>
          <span class="tip-text">购买产品，最少可得1250积分</span>
        </div>
        <div class="tip-row">
          <span class="tip-text">特色：</span>
          <a-tag color="#f1ad33">游记有奖</a-tag>
          <a-tag color="#f1ad33">点评送积分</a-tag>
        </div>
      </div>
      <div class="module">
        <div class="tip-row">
          <span class="tip-text">领券：</span>
          <a-tag color="#ff3d3d">400元</a-tag>
          <a-tag color="#ff3d3d">200元</a-tag>
          <a-tag color="#ff3d3d">100元</a-tag>
          <a>去领券>></a>
        </div>
        <div class="tip-row">
          <span class="tip-text">优惠：</span>
          <a-tag color="#ff3d3d">立减</a-tag>
          <span class="tip-text">满1500立减300元，不与其它优惠同享</span>
        </div>
        <div class="tip-row">
          <span class="tip-text">积分：</span>
          <span class="tip-text">购买产品，最少可得1250积分</span>
        </div>
        <div class="tip-row">
          <span class="tip-text">特色：</span>
          <a-tag color="#f1ad33">游记有奖</a-tag>
          <a-tag color="#f1ad33">点评送积分</a-tag>
        </div>
      </div>
    </div>
  </drop-fixed-box>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { BaseButton, DropFixedBox } from "@/components";
export default {
  components: {
    BaseButton,
    DropFixedBox
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      storeNo: state => state.addGood.storeNo,
      name: state => state.addGood.name,
      name1: state => state.addGood.name1
    })
  },

  methods: {}
};
</script>
<style scoped>
/* For demo */
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 270px;
  line-height: 270px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
</style>
<style lang="less" scoped>
.background {
  background: #f6f6f6;
}
.module {
  background: #fff;
  margin-bottom: 20px;
  padding: 5px;
}
.module + .module {
  margin-bottom: 20px;
}
.preview-good-warp {
  width: 360px;
  min-height: 600px;
  border-radius: 4px;
  .title {
    background: #e9e9e9;
    color: #b2b2b2;
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    padding: 5px 0;
  }
  .good-name {
    padding: 5px;
    color: #000;
    font-weight: 700;
    font-size: 15px;
  }
  .good-sub-name {
    padding: 2px;
    color: #444;
    font-weight: 500;
    font-size: 13px;
  }
  .tag {
    margin: 10px 5px;
  }
  .price {
    display: flex;
    margin: 10px 5px;
    justify-content: space-between;
    align-items: center;
    color: #ff3d3d;
    .price-info {
      flex-grow: 1;
      display: inline;
      .tip {
        font-size: 24px;
      }
      .price-num {
        font-size: 18px;
      }
    }
  }
  .tip-row {
    margin: 5px;
    .tip-text {
      font-size: 14px;
      margin-left: 8px;
    }
  }
}
</style>
