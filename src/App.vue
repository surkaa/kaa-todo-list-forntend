<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
  outline: 0;
}

body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
