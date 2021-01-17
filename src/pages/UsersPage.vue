<template>
  <div class="user-page">
    <main class="main">
      <div class="main-page-header">
        <div class="main-page-header-title">
          <h1>List of users</h1>
        </div>
        <nav>
          <ol class="main-page-header-breadcrumb">
            <li class="main-page-header-breadcrumb-item">
              <a href="/">main</a>
            </li>
            <li class="main-page-header-breadcrumb-item">
              <p>/ server 1</p>
            </li>
          </ol>
        </nav>
      </div>
      <div class="main-page-row">
        <div class="main-page-row-card">
          <div class="main-page-row-card-header">
            <h5>Users</h5>
          </div>
          <div class="main-page-row-card-body">
            <div class="main-page-row-card-body-row">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th v-for="title in arrayWithHeaders" v-bind:key="title.index">
                      {{title}}
                    </th>
                  </tr>
                </thead>
                <tr>
                  <th> </th>
                  <th><input v-model="searchText.userName" @blur="searchText.userName = ''; arrayWithUsers = tempArray;" @change="searchInUserName"></th>
                  <th><input v-model="searchText.email" @blur="searchText.email = ''; arrayWithUsers = tempArray;" @change="searchInEmail"></th>
                  <th><input v-model="searchText.phone" @blur="searchText.phone = ''; arrayWithUsers = tempArray;" @change="searchInPhone"></th>
                </tr>

                <tr v-for="title in arrayWithUsers" v-bind:key="title.index" v-on:click="openProfileUser(title.id)">
                  <th>{{ title.id }}</th>
                  <th>{{ title.username }}</th>
                  <th>{{ title.email }}</th>
                  <th>{{ title.phone }}</th>
                </tr>
              </table>
            </div>
            <div class="main-page-row-card-body-end">
              <button  @click="updateList()">
                Update list
              </button>
              <span @click="addNewUser()">
                <i  class="align-middle ml-2 fas fa-fw fa-plus"></i>
                Add new user
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>

import transitionalService from "@/services/transitionalService";
import apiSevice from "@/services/apiSevice";
import {User} from "@/classes/userClasses"



export default {
name: "UsersPage",
  data() {
    return{
      arrayWithHeaders: ['User Name', 'Email', 'Phone'],
      arrayWithUsers: [],
      searchText: new class {userName; email; phone},
      tempArray: [],
    }
  },
  mounted() {
    this.$eventBus.$on('loadList', this.eventFn);
    // this.getHeaderTitles();
    this.arrayWithUsers = transitionalService.getArrayWithUsersFromServer1();

  },
  methods: {
    getHeaderTitles() {
      let data = Object.entries(new User);
      data.forEach(header => {
        this.arrayWithHeaders.push(header[0]);
      })
    },
    eventFn(ev) {
      if(ev === 'data1') {
        this.arrayWithUsers = transitionalService.getArrayWithUsersFromServer1();
        console.log(transitionalService.getArrayWithUsersFromServer1())
      }
    },
    searchInUserName() {
      this.arrayWithUsers = [];
      let array = transitionalService.getArrayWithUsersFromServer1();
      this.tempArray = array;
      array.forEach((user) => {
        if (user.username.toUpperCase().indexOf(this.searchText.userName.toUpperCase()) >= 0) {
          this.arrayWithUsers.push(user);
        }
      })
    },
    searchInEmail() {
      this.arrayWithUsers = [];
      let array = transitionalService.getArrayWithUsersFromServer1();
      this.tempArray = array;
      array.forEach((user) => {
        if (user.email.toUpperCase().indexOf(this.searchText.email.toUpperCase()) >= 0) {
          this.arrayWithUsers.push(user);
        }
      })
    },
    searchInPhone() {
      this.arrayWithUsers = [];
      let array = transitionalService.getArrayWithUsersFromServer1();
      this.tempArray = array;
      array.forEach((user) => {
        if (user.phone.toUpperCase().indexOf(this.searchText.phone.toUpperCase()) >= 0) {
          this.arrayWithUsers.push(user);
        }
      })
    },
    updateList() {
      apiSevice.runApiServer1().then( data => {
          this.arrayWithUsers = data.data;
          transitionalService.saveArrayWithUsersFromServer1(data.data);
        }
      )
    },
    openProfileUser(userId) {
      this.arrayWithUsers.forEach(user => {
        if(user.id === userId) {
          user.disabled = false;
          transitionalService.setUser(user);
        }
      });
      this.$router.push('/profile');
    },
    addNewUser() {
      transitionalService.setUser(new User);
      this.$router.push('/profile');

    }
  }

}
</script>

<style scoped lang="scss">

.user-page {
  width: 100%;
  min-height: 100vh;
  min-width: 0;
  z-index: 1;
  font-size: 12px;
}

.main {
  padding: 0 12px;
  margin-top: 24px;
  &-page {
    width: 100%;
    padding-right: 6px;
    padding-left: 6px;
    margin-right: auto;
    margin-left: auto;
    &-header {
      position: relative;
      margin-bottom: 8px;
      &-title {
        h1 {
          font-size: 13px;
          color: #fff;
        }
      }
      &-breadcrumb {
        display: -webkit-box;
        display: flex;
        flex-wrap: wrap;
        padding: 0;
        margin-bottom: 8px;
        list-style: none;
        background-color: transparent;
        border-radius: 3px;
        &-item {
          color: #dee2e6;
          font-weight: 400;
          a{
            color: #dee2e6;
            font-weight: 400;
          }
          p{
            padding-left: 4px
          }
        }
      }
    }
    &-row {
      display: -webkit-box;
      display: flex;
      flex-wrap: wrap;
      margin-right: -8px;
      margin-left: -8px;


      &-card {
        box-shadow: 0 2px 4px rgba(126,142,177,.12);
        margin-bottom: 16px;
        position: relative;
        display: -webkit-box;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        flex-direction: column;
        min-width: 0;
        word-wrap: break-word;
        background-color: #fff;
        background-clip: border-box;
        border: 0 solid rgba(0,0,0,.125);
        border-radius: 3px;
        width:100%;

        &-header {
          background: transparent;
          padding: 6px 10px;
          margin-bottom: 0;
          //border-bottom: 0 solid rgba(0,0,0,.125)

          h5{
            color: #3e4676;
            font-size: 8px;
            line-height: 1.5;
            margin-bottom: 0;
          }
        }
        &-body {
          -webkit-box-flex: 1;
          flex: 1 1 auto;
          padding: 0px 10px 10px 10px;

          &-row {
            table {
              width: 100%;
              color: #3e4676;
              clear: both;
              margin-top: 6px!important;
              margin-bottom: 6px!important;
              max-width: none!important;
              border-collapse: separate!important;
              border-spacing: 0;
              th {
                border-bottom: solid .5px #adb5bd;
                input {
                  height: 15px;
                  border-radius: 3px;
                  border: solid .5px #adb5bd;
                  font-size: 8px;
                }
              }
              thead{
                display: table-header-group;
                vertical-align: middle;
                border-color: inherit;
                th {
                  color: #3b7ddd;
                  border-bottom: solid 2px #adb5bd;
                  padding-bottom: 5px;
                }
              }
            }
          }
          &-end {
            font-size: 8px;

            button {
              border: .5px solid #adb5bd;
              border-radius: 3px;
              color: #6c757d;
              background-color: white;
            }
          }
        }
      }
    }
  }

}

</style>
