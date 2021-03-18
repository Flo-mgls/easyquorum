<template>
  <div id="app">
    <header>
      <img alt="AGA logo" src="./assets/logo.svg" />
      <h1>Assemblée Générale Annuelle</h1>
    </header>
    <main>
      <Resolution />
    </main>
  </div>
</template>

<script>
import Resolution from "./components/Resolution.vue";

export default {
  name: "App",
  components: {
    Resolution,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  img {
    width: 300px;
    height: auto;
  }
  h1 {
    font-family: "Poiret One", cursive;
  }
}
</style>
