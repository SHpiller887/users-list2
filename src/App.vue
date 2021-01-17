<template>
  <div id="app">
    <SideBar></SideBar>
    <router-view></router-view>
  </div>
</template>

<script>

import SideBar from './components/SideBar.vue'

import Vue from 'vue'
import VueRouter from 'vue-router'
import {BootstrapVue} from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(VueRouter)

export default {
  name: 'App',
  components: {
    SideBar
  }
}
</script>

<style lang="scss">
#app {
  -webkit-box-align: stretch;
  align-items: stretch;
  display: -webkit-box;
  display: flex;
  overflow: hidden;
  width: 100%;
  position: relative;
  //
  //font-family: Avenir, Helvetica, Arial, sans-serif;
  //-webkit-font-smoothing: antialiased;
  //-moz-osx-font-smoothing: grayscale;
  //text-align: center;
  //color: #2c3e50;
  //margin-top: 60px;
}

#app:before {
  width: 100%;
  height: 130px;
  position: absolute;
  top: 0;
  left: 0;
  background: #153d77;
  content: " ";
}
</style>
