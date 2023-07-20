<template>
  <div id="app" @kaa="reload">
    <router-view v-if="flag"/>
  </div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  data() {
    return {
      flag: true
    }
  },
  provide() {
    return {
      reloadFun: this.reload
    }
  },
  methods: {
    reload() {
      this.flag = false
      this.$nextTick(function () {
        this.flag = true
      })
    }
  }
})
</script>

<style>
* {
  box-sizing: border-box;
  outline: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(45deg, #3d6d9d, #2c3e50);
}
</style>
