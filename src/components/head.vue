<template>
    <div class="Head" >
        <div class="content" >
            <div class="top">
                <img :src="seller.avatar" height="64px" width="64px" class="img" >
            </div>
            <ul class="ul"><li>
            <div class="title">
                <span class="brand"></span>
                <span class="name">{{seller.name}}</span>
            </div></li>
                <li>
            <div class="description">
                {{seller.description}}/{{seller.deliveryTime}}分钟送达
            </div></li>
                <li>
            <div class="manjian">
                <img>
                <span class="edu">{{seller.supports[0].description}}</span>
            </div></li>
            </ul>
        </div>
        <div class="bottom">
            <span class="bottom-title">公告</span>
            <span class="bottom-text">{{seller.bulletin}}</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="background">
            <img :src="seller.avatar" width="100%" height="100%">
        </div>
    </div>
</template>

<script>
  import {getRatings} from "../api";
  import {getSeller} from "../api";



    export default {
        name: 'Head',

        props: {
        seller: {
          type: Object,
          default() {
            return {}
          }
        }
      },
      methods:{

      },
        components:{

        },
      created() {
        getRatings().then(res=>{
          this.ratings = res;
        });
        getSeller().then(res1=>{
          console.log(res1);
          this.seller=res1;
        })
      },


    }
</script>

<style scoped>

    .Head{
        position: relative;
        overflow: hidden;
    }
    .content{
        position: relative;
        display: flex;
        align-items: center;
        padding: 24px 12px 18px 24px;
    }
    .top{
        flex: 0 0 64px;
        width: 64px;
        margin-right: 16px;
    }
    .img{
        border-radius: 2px;

    }
    .title {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
    }
    .brand {
        width: 30px;
        height: 18px;
        background-size: 30px 18px;
        background-repeat: no-repeat;
    }
    .name {
        margin-left: 6px;
        font-size: 20px;
        font-weight: bold;
    }
    .description{
        margin-bottom: 8px;
        line-height: 12px;
        font-size: 6px;
    }
    .manjian{
        display: flex;
        align-items: center;
    }
    .edu{
        line-height: 12px;
        font-size:6px;
    }
    .icon-keyboard_arrow_right{
        margin-left: 2px;
        line-height: 24px;
        font-size:6px;
    }
    .bottom{
        position: relative;
        display: flex;
        align-items: center;
        height: 28px;
        line-height: 28px;
        padding: 0 8px;
        background-color: rgba(7,17,27,0.2);
    }
    .bottom-title{
        width: 30px;
        background-size: 22px 12px;
        font-size: 12px;
        background-color: rgba(5,15,25,0.1);
    }
    .bottom-text{
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size:6px;
    }
    .background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        filter: blur(10px);
        background: darkgray;
    }
    .ul{
        list-style:none;
    }


</style>