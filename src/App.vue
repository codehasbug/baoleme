<template>
  <div id="app">
    <seller></seller>
  </div>
</template>

<script>
  import seller from "./components/seller/seller";
  export default {
    name: 'app',
    data(){

    },
    components: {
      seller
    },

  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
