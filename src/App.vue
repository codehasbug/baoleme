<template>
  <div id="app" @touchmove.prevent>
    <div class="header">
      <Head></Head>
    </div>
    <div class="tab-bar">
      <tab :tabs="tabs"></tab>
    </div>
  </div>
</template>

<script>
import Head from "@/components/head/head";
import Tab from "@/components/tab/tab";
import Goods from "@/components/goods/goods";
import Seller from "@/components/seller/seller";
import Disscuss from "@/components/discuss/discuss";
export default {
  name: "app",
  data() {
    return {
      tabs: [
        {
          label: "商品",
          component: Goods
        },
        {
          label: "评论",
          component: Disscuss
        },
        {
          label: "商家",
          component: Seller
        }
      ]
    };
  },
  components: {
    Tab,
    Head
  }
};
</script>

<style>
#app{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
#app .tab-bar{
    position: fixed;
    top: 136px;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>
