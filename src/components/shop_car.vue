<template>
  <div>
    <div class="shop_car">
      <div class="content" @click="UpList">
        <div class="content-left">
          <div class="logo_style">
            <div class="logo" v-bind:class="{ highlight: Count > 0 }">
              <i
                class="icon-shopping_cart"
                v-bind:class="{ highlight: Count > 0 }"
              ></i>
            </div>
            <div class="num" v-show="Count > 0">
              <bubble v-bind:num="Count"></bubble
              ><!--数量中绑定气泡显示 -->
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
        <div v-for="(ball,index) in balls" :key="index">
            <transition
                    @before-enter="beforeDrop"
                    @enter="dropping"
                    @after-enter="afterDrop">
                <div class="ball" v-show="ball.show">
                    <div class="inner inner-hook"></div>
                </div>
            </transition>
        </div>
    </div>
  </div>
</template>

<script>
    const BALL_LEN = 10
    const innerClsHook = 'inner-hook'
    function createBalls() {
        let balls = []
        for (let i = 0; i < BALL_LEN; i++) {
            balls.push({show: false})
        }
        return balls
    }
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
    sticky: { type: Boolean, default: false }, //实现滚动吸附效果的作用
    fold: { type: Boolean, default: true } //实现折叠的作用
  },
    data() {
        return {
            balls: createBalls(),
            listFold: this.fold
        }
    },
    created() {
        this.dropBalls = []
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
    _showShopCartList() {
      this.shopCartListComp =
        this.shopCartListComp ||
        this.$createShopCartList({
          $props: {
            SelectFoods: "selectFoods"
          },
          $events: {
            leave: () => {
              this._hideShopCartSticky();
            },
            hide: () => {
              this.listFold = true;
            },
            add: el => {
              this.ShopCartStickyComp.drop(el);
            }
          }
        });
      this.shopCartListComp.show();
    },
    _showShopCartSticky(){
      this.ShopCartStickyComp = this.ShopCartStickyComp || this.$createShopCartSticky({
          $props: {
            SelectFoods:'SelectFoods',
            Ps_Price:'Ps_Price',
            minPs_Price: 'minPs_Price',
            fold: "listFold",
            list: this.shopCartListComp
          }
      })
        this.ShopCartStickyComp.show()
    },
    _hideShopCartList(){
        const list =this.sticky ? this.$parent.list : this.shopCartListComp
        list.hide && list.hide()
    },
    _hideShopCartSticky(){
        this.ShopCartStickyComp.hide()
    },
    Pay(a) {
      if (this.sum_Price < this.minPs_Price) {
        return;
      }
      this.$createDialog({
        title: "支付",
        content: "您需要支付${this.sum_Price+this.Ps_Price}元"
      }).show();
      a.stopPropagation();
    },
    UpList() {
      if (this.listFold) {
        if (!this.Count) {
          return;
        }
        this.listFold = false;
        this._showShopCartList();
        this._showShopCartSticky();
      } else {
        this.listFold = true;
        this._hideShopCartList();
      }
    },
    drop(al) {
        for (let i = 0; i < this.balls.length; i++) {
            const ball = this.balls[i]
            if (!ball.show) {
                ball.show = true
                ball.al = al
                this.dropBalls.push(ball)
                return
            }
        }
    },
    beforeDrop(al) {
          const ball = this.dropBalls[this.dropBalls.length - 1]
          const rect = ball.el.getBoundingClientRect()
          const x = rect.left - 32
          const y = -(window.innerHeight - rect.top - 22)
          al.style.display = ''
          al.style.transform = al.style.webkitTransform = `translate3d(0,${y}px,0)`
          const inner = al.getElementsByClassName(innerClsHook)[0]
          inner.style.transform = inner.style.webkitTransform = `translate3d(${x}px,0,0)`
      },
      dropping(al, done) {
          this._reflow = document.body.offsetHeight;
          al.style.transform = al.style.webkitTransform = `translate3d(0,0,0)`
          const inner = al.getElementsByClassName(innerClsHook)[0]
          inner.style.transform = inner.style.webkitTransform = `translate3d(0,0,0)`
          al.addEventListener('transitionend', done)
      },
      afterDrop(al) {
          const ball = this.dropBalls.shift()
          if (ball) {
              ball.show = false
              al.style.display = 'none'
          }
      },
  },
    components:{
        // bubble
    }
};

</script>

<style lang="stylus" scoped>
@import "../src/common/stylus/icon.styl"
.shop_car {
  /*height: 100%;*/
  /*display: flex;*/
  height: 49px;
  position: fixed;
  left: 0px;
  right: 0px;
  bottom: 0px;
}

.content {
  display: flex;
  background: #07111b;
  font-size: 0;
  color: #999999;
}
.ps_price {
  display: inline-block;
  vertical-align: top;
  margin: 12px 0 0 12px;
  line-height: 24px;
  font-size: x-small;
}
.price {
  display: inline-block;
  vertical-align: top;
  margin-top: 12px;
  line-height: 24px;
  padding-right: 12px;
  box-sizing: border-box;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  font-weight: 700;
  font-size: medium;
}
.logo {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  text-align: center;
  background: #333333;
}
.logo_style {
  display: inline-block;
  vertical-align: top;
  position: relative;
  top: -10px;
  margin: 0 12px;
  padding: 6px;
  width: 56px;
  height: 56px;
  box-sizing: border-box;
  border-radius: 50%;
  background: #07111b;
}
.Pay {
  height: 48px;
  line-height: 48px;
  text-align: center;
  font-weight: 700;
  font-size: small;
  color: #999999;
  background: #333333;
}
.content-right {
  flex: 0 0 105px;
  width: 105px;
}
.content-left {
    flex: 1;
}
.icon-shopping_cart{
    line-height: 44px;
    font-size:xx-large;
    color:lightgrey;
}
.num {
    position: absolute;
    top: 0;
    right: 0;
}
</style>
