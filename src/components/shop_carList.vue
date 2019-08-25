<template>
    <transition name="fade" appear>
        <cube-popup
                :mask-closable=true
                v-show="show"
                @mask-click="maskClick"
                position="bottom"
                type="shop-cart-list"
                :z-index=90
        >
            <transition
                    name="move"
                    appear
                    @after-leave="afterLeave"
            >
                <div v-if="show">
                    <div class="list-header">
                        <h1 class="title">购物车</h1>
                        <span class="empty" @click="empty">清空</span>
                    </div>
                    <cube-scroll class="list-content" ref="listContent">
                        <ul>
                            <li
                                    class="food"
                                    v-for="(food,index) in selectFoods"
                                    :key="index"
                            >
                                <span class="name">{{food.name}}</span>
                                <div class="price">
                                    <span>￥{{food.price*food.count}}</span>
                                </div>
                                <div class="cart-control-wrapper">
                                    <cart-control @add="onAdd" :food="food"></cart-control>
                                </div>
                            </li>
                        </ul>
                    </cube-scroll>
                </div>
            </transition>
        </cube-popup>
    </transition>
</template>

<script>
    import popupMixin from '../common/mixins/popup'
    const EVENT_SHOW='show'
    const EVENT_ADD='add'
    const EVENT_LEAVE='leave'
    export default {
        name: "shop_carList",
        mixins:{popupMixin},//用于管理弹出框的遮盖层
        props:{
            SelectFoods:{type:Array,default(){return[]}}
        },
        created() {
            this.$on(EVENT_SHOW,()=>{
                this.$nextTick(()=>{
                    this.$refs.listContent.refresh()
                })
            })
        },
        methods:{
            onAdd(target) {
                this.$emit(EVENT_ADD, target)
            },
            afterLeave() {
                this.$emit(EVENT_LEAVE)
            },
            maskClick() {
                this.hide()
            },
            empty() {
                this.dialogComp = this.$createDialog({
                    type: 'confirm',
                    content: '清空购物车？',
                    $events: {
                        confirm: () => {
                            this.selectFoods.forEach((food) => {
                                food.count = 0
                            })
                            this.hide()
                        }
                    }
                })
                this.dialogComp.show()
            }
        },
        components: {
            // CartControl
        }
    }
</script>

<style lang="stylus" scoped>
    @import "../../src/common/stylus/variable.styl"

</style>