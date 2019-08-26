<template >
    <cube-scroll ref="scroll" :option="scrollOptions">
<div>
    <div class="layout">


        <div class="overview">
            <div class="title" style="margin-left: 5px;margin-top: 10px">{{seller.name}}</div>
            <div class="desc ">
<!--                   <el-rate v-model="value" disabled show-score text-color="#ff9900" score-template="{value}" style="text-align: left">-->
<!--                </el-rate>-->
                <star :size="36" :score="seller.score" style="margin-left: 5px">></star>
                <div class="text" style="position:relative;"> 月售{{seller.sellCount}}</div>
            </div>

            <button class="button" @click="favorite=!favorite" style="position: absolute;width: 60px;right: 15px;top: 45px;
                    vertical-align: middle;text-align: center;">
              {{show()}}
            </button>

        </div>










        <br>
        <div class="split"></div>
        <ul class="remark" style="display:flex">

            <li class="block" style="float:left;flex:1">
                <h2 style="text-align: center">起送价</h2>
                <div class="content border-right-1px" style="text-align: center">
                    <span class="stress">{{seller.minPrice}}</span>
                </div>
            </li>
            <li class="block border-right-1px" style="float:left;flex:1">
                <h2 style="text-align: center">商家配送</h2>
                <div class="stress" style="text-align: center"><span>{{seller.deliveryPrice}}</span></div>
            </li>
            <li class="block" style="float:left;flex:1">
                <h2 style="text-align: center">平均配送时间</h2>
                <div class="content" style="text-align: center"><span class="stress">{{seller.deliveryTime}}</span></div>
            </li>
        </ul>
        <div class="split"></div>
        <div class="bulletin">
    <h1 class="title">公告与活动</h1>
    <div class="content-wrapper">
        <p class="content border-bottom-1px">{{seller.bulletin}}
        </p>
        <ul v-if="seller.supports" class="supports">
            <li class="support-item border-bottom-1px"
                v-for="(item,index) in seller.supports"
                :key="index">
                <support-ico :size=4 :type="seller.supports[index].type" ></support-ico>
                <span class="text">{{seller.supports[index].description}}</span>

            </li>
        </ul>

    </div>
</div>
        <div class="split"></div>
        <div class="pics">
            <h1 class="title">商家实景</h1>
            <ul class="pic-list">
                <li class="pic-item " style="float:left;margin-right:6px"
                v-for="(pic,index) in seller.pics"
                :key="index">

                    <img :src="pic" width="66px" height="70px">
                </li>
            </ul>
        </div>
        <br><br><br><br>
        <div class="split"></div>
        <div class="info">
    <h1 class="title border-bottom-1px"> 商家信息</h1>
    <ul>
      <li class="info-item border-bottom-1px"
      v-for="(info,index) in seller.infos"
          :key="index">{{info}}</li>
    </ul>
</div>
    </div>
</div>
    </cube-scroll>

</template>
<script>
     import star from "../star/star"
     import SupportIco from "../support-ico/support-ico"
    // import Split from 'components/split/split'
    import {getSeller} from "../../api";
    // import separation from "../separation";
    //import SupportIco from "../support-ico/support-ico"

    export default {

        data(){
           return{ seller:[],
           favorite:false,
               scrollOptions:{
               click:false,
                   directionLockThreshold:0
               }
               }
           },
        components:{
            //separation
          SupportIco,
            // Star,
            // Split
            star

        },
        computed:{
            favoriteText(){
                return this.favorite?'已收藏':'收藏'
            }
        },
        methods:{
                toggleFavorite(){
                    this.favorite=!this.favorite;
                },
            show(){
                    return this.favorite?'已收藏':'收藏'
            }
        },
            created() {
                getSeller().then(res=>{
                    this.seller=res;
                })
            }

    }

</script>
<style lang="stylus" scoped>
    /*@import "~common/stylus/variable"*/
    /*@import "~common/stylus/mixin"*/
    @import "../../common/stylus/icon.styl"
    .button{
        -webkit-border-radius: 29;
        -moz-border-radius: 29;
        border-radius: 29px;
        text-shadow: 0px 1px 30px #283966;
        font-family:"微软雅黑";
        background :#f2cd00;
        color: #ffffff;
        opacity:0.8;
    }
    .split{
        width: 100%;
        height: 16px;
        border-top: 1px solid rgba(7,17,27,0.1);
        border-bottom: 1px solid rgba(7,17,27,0.1);
        background: #f3f5f7;
    }
    .layout
    {
        position: relative;
        overflow: hidden;
        text-align: left;
    }
    .title{
        /*margin-bottom: 8px;*/
        line-height: 28px;
        font-size: 20px;
        /*color: black;*/
        color: rgb(77,85,93);
    }
    .text{
        margin-right: 12px;
        /*line-height: 36px;*/
        font-size: 12px;

        color :darkgray;
        text-align:center;
    }
    .desc{
        display: flex;
        align-items: center;
        /*padding-bottom: 18px;*/
    }
    .favorite
    {
        position: absolute
        width: 60px
        right: 5px
        top: 75px
        text-align: center
    }
    .icon-favorite
    {
            display: block
            margin-bottom: 0px
            line-height: 24px
            font-size: large
            color: lightgrey
    }
    &.active
    {
        color: red
    }


    .collect{
        line-height: 10px
        font-size: 12px
        color: grey
    }



        .overview
            position: relative
            padding: 18px


                /*.star*/
                /*    margin-right: 8px*/

            .remark
                display: flex
                padding-top: 18px
                position :relative
                .block{
                    flex: 1
                    text-align: center
                    border-right: 1px solid rgba(7,17,27,0.2)
                    font-size :18px
                    color :rgb(147,153,159)
                    float:left;
                }
                    /*&:last-child*/
                    /*    border: none*/
                    h2
                        margin-bottom: 4px
                        line-height: 10px
                        font-size: small
                        color: lightgrey
                    .content{
                        font-size: 24px
                        font-weight :200
                        color: rgb(240,20,20)
                        line-height: 48px
                    }
                    .stress{
                            font-size :48px;
                            font-weight :200;
                            color :rgb(7,17,27);
                            line-height :48px;
                        }


        .bulletin
            padding: 18px 18px 0 18px
            white-space: normal
            .title
                margin-bottom: 8px
                line-height: 14px
                color: black
                font-size: medium
            .content-wrapper
                padding: 0 12px 16px 12px
                .content
                    line-height: 24px
                    font-size: small
                    color: red
            .supports
                .support-item
                    display: flex
                    align-items: center
                    padding: 16px 12px
                    &:last-child
                        border-none()
                .support-ico
                    margin-right: 6px
                .text
                    line-height: 16px
                    font-size: small
                    color: black
        .pics
        {
            padding: 18px
        }


            .title
                margin-bottom: 12px
                line-height: 14px
                color: black
                font-size: medium

            .pic-wrapper
                display: flex
                align-items: center
                .pic-list
                    .pic-item {
                        float:left
                        display: inline-block
                        margin-left: 3px
                        width: 130px
                        height: 130px
                        /*&:last-child*/
                            margin: 0
                    }
        .info
        {
            padding: 18px 18px 0 18px
            color: black
        }

            .title
                padding-bottom: 12px
                line-height: 14px
                font-size: medium
            .info-item
            {
                padding: 16px 12px
                font-size: 12px
                line-height: 16px
                color :black
                font-weight :200
            }

</style>

