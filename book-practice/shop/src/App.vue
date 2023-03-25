<template>
  <div>
    <router-view name="header"></router-view>
    <router-view name="menu"></router-view>
    <router-view ></router-view>
    <router-view name="footer"></router-view>
  </div>
</template>

<script>
import { provide } from 'vue'
import { useAuth } from './compositions/useAuth.js'
export default {
  name: 'App',
  components: {
    
  },

  setup() {
    const {
      myinfo, isAuthorized, isAdmin, isMember,
      signin
    } = useAuth()

    provide("myinfo", myinfo)
    provide("isAuthorized", isAuthorized)
    provide("isAdmin", isAdmin)
    provide("isMember", isMember)
    provide("signin", signin)
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
