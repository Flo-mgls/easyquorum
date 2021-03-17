<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Resolution/>
  </div>
</template>

<script>
import Resolution from './components/Resolution.vue'

export default {
  name: 'App',
  components: {
    Resolution
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
