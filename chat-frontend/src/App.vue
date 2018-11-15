<template>
  <div id="app">

    <router-view/>
  </div>
</template>
<script>

</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body {
  background-image: url('~@/assets/fon.jpg');
  background-size: cover;
  background-attachment: fixed;      
  display: flex;
  height: 100%;
  *{
    font-family: "Open Sans",'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
</style>
