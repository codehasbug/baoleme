<template>
  <div id="app">
   <shop_car></shop_car>
    <shop_car-list></shop_car-list>
  </div>
</template>

<script>
  import shop_car from "./components/shop_car";
  import shop_carList from "./components/shop_carList";

  export default {
    name: 'app',
    components: {
        // eslint-disable-next-line vue/no-unused-components
      shop_carList,
      shop_car,
    }
  }
</script>

<style lang="stylus">

</style>
