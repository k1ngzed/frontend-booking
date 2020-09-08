<template>
  <div id="app">
    <div id="wrapper">
      <Header />
      <router-view />
    </div>
    <footer id="footer"></footer>
  </div>
</template>

<script>
import Header from "./components/Header";
export default {
  components: {
    Header
  }
};
</script>

<style lang="sass">
#app
  display: flex
  flex-direction: column
  height: 100%
  #wrapper
    flex: 1 0 auto
  #footer
    height: 80px
    flex-shrink: 0
    background: $bg-color-grey-lighter
</style>
