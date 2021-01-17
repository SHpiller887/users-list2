<template>
  <nav id="sidebar" class="sidebar">
    <a class="sidebar-brand">
      <img src="~@/assets/icons/some-img.svg">
      Side bar
    </a>
    <div class="sidebar-content">
      <ul class="sidebar-nav">
        <li class="sidebar-header">What you need</li>
        <li class="sidebar-item active">
          <div @click="openServer1()" class="sidebar-link">
            <i class="align-middle mr-2 fas fa-fw fa-users"></i>
            <span>Users from Server</span>
          </div>
        </li>
        <li class="sidebar-item">
          <a href="/" class="sidebar-link">
            <i class="align-middle mr-2 fas fa-fw fa-users"></i>
            <span>Some page</span>
          </a>
        </li>
        <li class="sidebar-item">
          <a href="/" class="sidebar-link">
            <i class="align-middle mr-2 fas fa-fw fa-users"></i>
            <span>Users</span>
          </a>
      </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import apiSevice from "@/services/apiSevice";
import transitionalService from "@/services/transitionalService";
import Vue from 'vue';

Vue.prototype.$eventBus = new Vue();

export default {
  name: "SideBar",
  data() {
    return {
      showSpinner: true,
    }
  },
  mounted() {
    apiSevice.runApiServer1().then(data => {
      transitionalService.saveArrayWithUsersFromServer1(data.data);
      transitionalService.setArrayWithUsers(data.data);
      this.$eventBus.$emit('loadList', 'data1');
    });
  },
  methods: {
    openServer1() {
      transitionalService.setArrayWithUsers(transitionalService.getArrayWithUsersFromServer1());
      this.$eventBus.$emit('loadList', 'data1');
      this.$router.push('/');
    },

  }
}
</script>

<style scoped lang="scss">

.sidebar{
  min-width: 125px;
  max-width: 125px;
  background: transparent;
  border-right: 0;
  box-shadow: 0 0 16px 0 rgba(0,0,0,.05);
  z-index: 1;
  font-size: 8px;

  &-brand {
    padding: 8px;
    background: #153d77;
    font-size: 12px;
    font-weight: 500;
    color: #fff;
    width: 100%;
    display: block;
    text-decoration: none;

    img {
      color: white;
    }
  }

  &-content {
    background: #fff;
    display: -webkit-box;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
  }

  &-nav {
    margin-bottom: 0;
    padding-left: 0;
    list-style: none;
    flex-direction: column;
    -webkit-box-pack: start;
    justify-content: flex-start;
    -webkit-box-flex: 1;
    flex: 1;
  }

  &-header {
    background: transparent;
    color: #adb5bd;
    padding: 3px 12px;
    font-size: 6px;
    font-weight: 500;
    text-transform: none;
  }

  &-item {
    display: list-item;
    text-align: -webkit-match-parent;
    margin: 2px 2px 2px 4px;
  }

  &-link {
    display: block;
    padding: 6px 10px;
    margin: 0 3px;
    color: #6c757d;
    font-weight: 400;
    background: transparent;
    border-radius: 3px;
    -webkit-transition: background .1s ease-in-out;
    transition: background .1s ease-in-out;
    position: relative;
    text-decoration: none;
    cursor: pointer;
  }
}

.active {
  background: #e9ecef;
  border-radius: 3px;
}

</style>
