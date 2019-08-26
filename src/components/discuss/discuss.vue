<template>
    <cube-scroll ref="scroll" class="discuss" :options="scrollOptions">
        <div class="head">
            <div class="left">
                <div class="score">{{seller.score}}</div>
                <div class="title">综合评分</div>
                <div class="rank">高于周边商家{{seller.rankRate}}%</div>
            </div>
            <div class="right">
                <div class="score-wrapper">
                    <span class="score-title">服务态度</span>
                    <star :size="36" :score="seller.serviceScore"></star>
                    <span class="score1">{{seller.serviceScore}}</span>
                </div>
                <div class="score-wrapper">
                    <span class="score-title">商品评分</span>
                    <star :size="36" :score="seller.foodScore"></star>
                    <span class="score1">{{seller.foodScore}}</span>
                </div>
                <div class="time-wrapper">
                    <span class="score-title">送达时间</span>
                    <span class="time">{{seller.deliveryTime}}分钟</span>
                </div>
            </div>
        </div>
        <div class="split"></div>
        <discuss-select
                @select="onSelect"
                @toggle="onToggle"
                :selectType="selectType" :onlyContent="onlyContent" :ratings="ratings"></discuss-select>
        <div class="foot">
            <ul style="list-style-type: none">
                <li v-for="(rating,index) in computedRatings" :key="index" class="rating-item">
                    <div class="avatar">
                        <img width="28" height="28" :src="rating.avatar" class="img">
                    </div>
                    <div class="content">
                        <h1 class="name">{{rating.username}}</h1>
                        <div class="star-wrapper">
                            <star :size="24" :score="rating.score"></star>
                            <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
                        </div>
                        <p class="foot-text">{{rating.text}}</p>
                        <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                            <span class="icon-thumb_up"></span>
                            <span class="item" v-for="(item,index) in rating.recommend" :key="index">{{item}}</span>
                        </div>
                        <div class="Datetime">
                            {{format(rating.rateTime)}}
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </cube-scroll>
</template>

<script>
    import {getRatings} from "../../api";
    import {getSeller} from "../../api";
    import DiscussSelect from "../disuss-select/discuss-select"
    import discussMixin from "../../common/mixins/discuss"
    import star from "../star/star"
    import moment from 'moment'

    export default {
        name: "discuss",
        mixins:[discussMixin],
        props:{
               data:{
                   type:Object
               },
            },
        data(){
            return {
                ratings:[],
                seller:[],
                scrollOptions:{
                    click: false,
                    directionLockThreshold:0
            }
        }
},
        created() {
            getRatings().then(res=>{
                this.ratings = res;
            });
            getSeller().then(res1=>{
                this.seller=res1;
             })
        },
        methods:{
            format(time){
                return moment(time).format('YYYY-MM-DD hh:mm')
            },
        },
        watch: {
            selectType () {
                this.$nextTick(() => {
                    this.$refs.scroll.refresh()
                })
            }
        },
        components: {DiscussSelect,star},
    }
</script>

<style lang="stylus" scoped>
    @import "../../common/stylus/icon.styl"
    .discuss{
        position: relative;
        text-align: left;
        white-space: normal;
        height: 100%;
    }
    .head{
        display: flex;
        padding: 18px 0;
    }
    .left{
        flex: 0 0 137px;
        padding: 6px 0;
        width: 137px;
        border-right: 1px solid rgba(7,17,27,0.2);
        text-align: center;
        }
    .score{
        margin-bottom: 6px;
        line-height: 28px;
        font-size: 24px;
        color:#fc9153;
    }
    .title{
        margin-bottom: 8px;
        line-height: 12px;
        font-size: 12px;
        color:#333333;
    }
    .rank{
        line-height: 10px;
        font-size: 10px;
        color:#999999;
    }
    .right{
        flex:1;
        padding: 6px 0 6px 24px;
    }
    .score-wrapper{
        display: flex;
        align-items: center;
        margin-bottom: 8px;
    }
    .score-title{
        line-height: 18px;
        font-size: 12px;
    }
    .six-star{
        margin: 0 12px;
    }
    .score1{
        line-height: 18px;
        font-size: 12px;
        color:#fc9153;
    }
    .time{
        margin-left: 12px;
        font-size: 12px;
        color: #999999;
    }
    .split{
        width: 100%;
        height: 16px;
        border-top: 1px solid rgba(7,17,27,0.1);
        border-bottom: 1px solid rgba(7,17,27,0.1);
        background: #f3f5f7;
    }
    .foot{
        padding: 0 18px;
    }
    .rating-item{
        display: flex;
        padding: 18px 0;
    }
    .avatar{
        flex: 0 0 28px;
        width: 28px;
        margin-right: 12px;
    }
    .img{
        height: auto;
        border-radius: 50%;
    }
    .content{
        position: relative;
        flex: 1;
    }
    .name{
        margin-bottom: 4px;
        line-height: 12px;
        font-size: 10px;
        color: #333333;
    }
    .star-wrapper{
        margin-bottom: 6px;
        display: flex;
        align-items: center;
    }
    .delivery{
        font-size: 10px;
        color: #999999;
    }
    .foot-text{
        margin-bottom: 8px;
        line-height: 18px;
        color: #333333;
        font-size: 12px;
    }
    .recommend{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        line-height: 16px;
    }
    .item{
        padding: 0 6px;
        border: 1px solid rgba(7,17,27,0.1);
        border-radius: 1px;
        color: #999999;
        background: #ffffff;
    }
    .icon-thumb_up,.item{
        margin: 0 8px 4px 0;
        font-size: 10px;
    }
    .icon-thumb_up{
        color:rgb(0,160,220);
    }
    .icon-check_circle{
        font-size large;
        margin-right 4px;
    }
    .Datetime{
        position absolute;
        top:0;
        right 0;
        line-height 12px
        font-size small
        color:#999999
    }
</style>