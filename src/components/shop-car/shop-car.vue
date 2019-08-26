<template>
  <div>
    <div class="shop_car">
      <div class="content" >
        <div class="content-left">
          <div class="logo_style">
            <div class="logo" v-bind:class="{ highlightB: Count > 0 }">
              <i
                class="icon-shopping_cart"
                v-bind:class="{ highlightB: Count > 0 }"
              ></i>
            </div>
            <div class="num" v-show="Count > 0">
            </div>
          </div>
          <div class="price" v-bind:class="{ highlight: sum_Price > 0 }">
            ￥{{ sum_Price }}
          </div>
          <div class="ps_price">另需配送费为￥{{Ps_Price}}元</div>
        </div>
        <div class="content-right" @click="Pay">
          <div class="Pay" v-bind:class="PayClass">
            {{ Begging_Pay }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "shop_car",
  props: {
    SelectFoods: {
      type: Array,
      default() {
        return [];
      }
    },
    Ps_Price: { type: Number, default: 4 },
    minPs_Price: { type: Number, default: 20 },
  },
  computed: {
    Count() {
      let count = 0;
      this.SelectFoods.forEach(foods => {
        count = count + foods.count;
      });
      return count;
    },
    sum_Price() {
      let sum = 0;
      this.SelectFoods.forEach(foods => {
        sum = sum + foods.price * foods.count;
      });
      return sum;
    },
    PayClass() {
      if (!this.Count || this.sum_Price < this.minPs_Price) {
        return "not-enough";
      } else {
        return "enough";
      }
    },

    Begging_Pay() {
      if (this.sum_Price === 0) {
        return `￥${this.minPs_Price}元起送`;
      } else if (this.sum_Price < this.minPs_Price) {
        let diff = this.minPs_Price - this.sum_Price;
        return `还差￥${diff}元起送`;
      } else {
        return "结算";
      }
    }
  },
  methods: {
    Pay(a) {
      if (this.sum_Price < this.minPs_Price) {
        return;
      }
      this.$createDialog({
        title: "支付",
        content: `您需要支付${this.sum_Price+this.Ps_Price}元`
      }).show();
      a.stopPropagation();
    },
  },
};
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/icon.styl"
.shop_car 
  height: 100%;
  width 33.33333%
  height: 49px;
  position: fixed;
  left: 0px;
  right: 0px;
  bottom: 0px;

.content 
  display: flex;
  background: #07111b;
  font-size: 0;
  color: #999999;

.ps_price
  display: inline-block;
  vertical-align: top;
  margin: 12px 0 0 12px;
  line-height: 24px;
  font-size: x-small;

.price
  display: inline-block;
  vertical-align: top;
  margin-top: 12px;
  line-height: 24px;
  padding-right: 12px;
  box-sizing: border-box;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  font-weight: 700;
  font-size: medium;

.logo
  width: 100%;
  height: 100%;
  border-radius: 50%;
  text-align: center;
  background: #333333;

.logo_style
  display: inline-block
  vertical-align: top
  position: relative
  top: -10px
  margin: 0 12px
  padding: 6px
  width: 56px
  height: 56px
  box-sizing: border-box
  border-radius: 50%
  background: #07111b
  .highlightB
    background-color rgb(0,160,220)

.Pay 
  height: 48px
  line-height: 48px
  text-align: center
  font-weight: 700
  font-size: small
  color: #999999
  background: #333333

.content-right
  flex: 0 0 105px
  width: 105px

.content-left 
    flex: 1
    .highlight
      color #ffffff

.icon-shopping_cart
    line-height: 44px
    font-size:xx-large
    color:lightgrey

.num 
    position: absolute
    top: 0
    right: 0

.enough
  background-color: #00b43c
  color: #ffffff
</style>