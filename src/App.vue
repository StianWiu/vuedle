<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
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
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

html {
  background-color: #121213;
  color: #ffffff;
}
</style>
