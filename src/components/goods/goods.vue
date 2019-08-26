<template>
      <div class="goods">
        <cube-scroll-nav
          :side="true"
          :data="data"
          :options="scrollOptions"
          >
          <cube-scroll-nav-panel
            v-for="item in data"
            :key="item.name"
            :checkTop="true"
            :label="item.name"
            :title="item.name">
            <ul>
              <li v-for="food in item.foods" :key="food.name" class="food-item">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <ul class="btn">
                    <li class="sub icon-remove_circle_outline" v-show="food.count>0" @click="subFood(food)"></li><span v-show="food.count">{{food.count}}</span>
                    <li class="add icon-add_circle" @click="addFood(food)"></li>
                  </ul>
                </div>
              </li>
            </ul>
          </cube-scroll-nav-panel>
        </cube-scroll-nav>
        <div class="shop-cart-wrapper">
          <shop-car :Ps_Price="recentPrice" :SelectFoods="selectedFoods"></shop-car>
        </div>
        
      </div>
</template>

<script type="text/ecmascript-6">
  import {getGoods} from '@/api'
  import ShopCar from '@/components/shop-car/shop-car'

  export default {
    components:{
      ShopCar
    },
    data() {
      return {
        data: [],
        scrollOptions: {
          click: false,
          directionLockThreshold: 0
        },
        recentPrice: 4,
        selectedFoods:[]
      }
    },
    methods: {
      fetch(){
        getGoods().then(res=>{
        this.data = res
      })
      },
      addFood(food){
        if(isNaN(food.count)){
          this.data.map(obj=>{
            obj.foods.map(fObj=>{
              fObj.count = 0
            })
          })
        }
        ++food.count
        let foodsList = []
        this.data.map(obj=>{
          obj.foods.map(fObj=>{
            if(fObj.count > 0)
              foodsList.push(fObj)
          })
        })
        this.selectedFoods = foodsList

      },
      subFood(food){
        --food.count
        let foodsList = []
        this.data.map(obj=>{
          obj.foods.map(fObj=>{
            if(fObj.count > 0)
              foodsList.push(fObj)
          })
        })
        this.selectedFoods = foodsList
      }

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/icon.styl"
.goods
  position: fixed
  text-align: left
  width 33.3333%
  height: 100%
  >>> .cube-scroll-nav-bar
    width: 80px
    white-space: normal
    overflow: hidden
  >>> .cube-scroll-nav-bar-item
    padding: 0 10px
    display: flex
    align-items: center
    height: 56px
    line-height: 14px
  >>> .cube-scroll-nav-panel-title
    padding: 15px
    font-size: 16px
    background-color: #fff
  >>> .cube-sticky-content
    height: 100%
  .food-item
    display: flex
    margin: 18px
    padding-bottom: 18px
    position: relative
    &:last-child
      border-none()
      margin-bottom: 0
    .icon
      flex: 0 0 57px
      margin-right: 10px
      img
        height: auto
    .content
      flex: 1
      .btn
        text-align right 
        float right   
        width 100px
        font-size 20px
        span
          margin 5px
          font-weight 700
        .sub
          display inline
          color rgb(0,160,250)
        .add
          display inline
          color rgb(0,160,250)
      .name
        margin: 2px 0 8px 0
        height: 14px
        line-height: 14px
        font-size: $fontsize-medium
        color: $color-dark-grey
      .desc, .extra
        line-height: 10px
        font-size: $fontsize-small-s
        color: $color-light-grey
      .desc
        line-height: 12px
        margin-bottom: 8px
      .extra
        .count
          margin-right: 12px
      .price
        font-weight: 700
        line-height: 24px
        .now
          margin-right: 8px
          font-size: $fontsize-medium
          color: $color-red
        .old
          text-decoration: line-through
          font-size: $fontsize-small-s
          color: $color-light-grey
  .shop-cart-wrapper
    position: absolute
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 24px
</style>
