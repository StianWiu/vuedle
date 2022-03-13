<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <!-- <HelloWorld msg="Welcome to Your React.js App" /> -->
  <GameTable />
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import GameTable from "./components/GameTable.vue";

export default {
  name: "App",
  components: {
    GameTable,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
