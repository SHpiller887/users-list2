<template>
  <div class="user-page">
    <main class="main">
      <div class="main-page-header">
        <div class="main-page-header-title">
          <h1>{{user.name}}</h1>
        </div>
        <nav>
          <ol class="main-page-header-breadcrumb">
            <li class="main-page-header-breadcrumb-item">
              <a href="/">main</a>
            </li>
            <li class="main-page-header-breadcrumb-item">
              <p>/ server 1</p>
            </li>
            <li class="main-page-header-breadcrumb-item">
              <p>/ {{user.id}}</p>
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
                <tr><th>User Name</th><th><input v-model="user.username" :disabled="user.disabled"></th><th></th></tr>
                <tr><th>Phone</th><th><input v-model="user.phone" :disabled="user.disabled"></th><th></th></tr>
                <tr><th>Email</th><th><input v-model="user.email" :disabled="user.disabled"></th><th></th></tr>
                <tr><th>Website</th><th><input v-model="user.website" :disabled="user.disabled"></th><th></th></tr>
                <tr><th>
                  Company
                  <span v-if="!user.disabled" @click="showInputsCompany = true">
                    <i class="align-middle ml-2 fas fa-fw fa-plus" @click="showInputsCompany = true"></i>
                  </span>
                </th><th></th><th></th></tr>
                <tr v-for="title in tempArrayCompany" v-bind:key="title">
                  <th class="main-page-row-card-body-row-post">{{title[0]}}</th>
                  <th class="main-page-row-card-body-row-post"><input v-model="title[1]" :disabled="user.disabled"></th>
                  <th><span @click="removeCompanyParameter(title[0])"><i  class="align-middle ml-2 fas fa-fw fa-minus"></i></span></th></tr>
                <tr v-if="showInputsCompany">
                  <th><input placeholder="input parameter name" v-model="inputText" @blur="addCompanyParameter()" @change="addCompanyParameter()"></th>
                  <th><input disabled="true"></th>
                  <th><span @click="showInputsCompany = false"><i  class="align-middle ml-2 fas fa-fw fa-minus"></i></span></th>
                </tr>
                <tr><th>
                  Address
                  <span v-if="!user.disabled" @click="showInputsAddress = true">
                    <i  class="align-middle ml-2 fas fa-fw fa-plus"></i>
                  </span>
                  </th><th></th><th></th></tr>
                <tr v-for="title in tempArrayAddress" v-bind:key="title">
                  <th class="main-page-row-card-body-row-post">{{title[0]}}</th>
                  <th class="main-page-row-card-body-row-post"><input v-model="title[1]" :disabled="user.disabled"></th>
                  <th><span @click="removeAddressParameter(title[0])"><i  class="align-middle ml-2 fas fa-fw fa-minus"></i></span></th></tr>
                <tr v-if="showInputsAddress">
                  <th><input placeholder="input parameter name" v-model="inputText" @blur="addAddressParameter()" @change="addAddressParameter()"></th>
                  <th><input disabled="true"></th>
                  <th><span @click="showInputsAddress = false"><i  class="align-middle ml-2 fas fa-fw fa-minus"></i></span></th>
                </tr>
              </table>
            </div>
            <div class="main-page-row-card-body-end">
              <button @click="updateUser()" :disabled="user.disabled">
                Update user
              </button>
              <button @click="removeUser()" style="color: red" :disabled="user.disabled">
                Remove user
              </button>
              <p v-if="user.disabled" style="color: red;">You can't update users on this server!</p>
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
name: "profilePage",
  data() {
    return{
      user: User,
      tempArrayCompany: [],
      tempArrayAddress: [],
      inputText: '',
      showInputsCompany: false,
      showInputsAddress: false,
    }
  },
  mounted() {
    // this.getHeaderTitles();
    this.user = transitionalService.getUser();
    this.tempArrayCompany = this.getHeaderTitles(this.user.company);
    this.tempArrayAddress = this.getHeaderTitles(this.user.address);
  },
  methods: {
    getHeaderTitles(innerData) {
     return Object.entries(innerData);
    },
    addAddressParameter(){
      if(this.inputText !== '') {
        let added = [this.inputText, ''];
        this.inputText = '';
        this.showInputsAddress = false;
        this.tempArrayAddress.push(added);
      }
    },
    addCompanyParameter(){
      if(this.inputText !== '') {
        let added = [this.inputText, ''];
        this.inputText = '';
        this.showInputsCompany = false;
        this.tempArrayCompany.push(added);
      }
    },
    removeAddressParameter(title) {
      let array = [];
      this.tempArrayAddress.forEach(param => {
        if(param[0] !== title) {
          array.push(param);
        }
      })
      this.tempArrayAddress = array;
    },
    removeCompanyParameter(title) {
      let array = [];
      this.tempArrayCompany.forEach(param => {
        if(param[0] !== title) {
          array.push(param);
        }
      })
      this.tempArrayCompany = array;
    },
    updateUser(){
      let user = this.user;
      user.company = Object.fromEntries(this.tempArrayCompany);
      user.address = Object.fromEntries(this.tempArrayAddress);
      let users = transitionalService.getArrayWithUsersFromServer1();
      apiSevice.runApiServerMoc('update_user', user).then(resp => {
        if(resp.status === 200) {
          if(!user.id) {
            user.id = users.length+1;
          }
          let indexForUpdate = undefined;
          for(let i = 0; i < users.length; i++){
            if(users[i].id === user.id) {
              indexForUpdate = i;
              users[i] = user;
            }
          }
          if(indexForUpdate === undefined) {
            users.push(user);
          }
          transitionalService.saveArrayWithUsersFromServer1(users);
          this.$router.push('/');

        } else {
          console.log('error', resp.message);
        }
      });

    },

    removeUser() {
      let user = this.user;
      let users = transitionalService.getArrayWithUsersFromServer1();
      let newUsersArray = [];
      apiSevice.runApiServerMoc('update_user', user).then(resp => {
        if(resp.status === 200) {
          if(!user.id) {
            this.$router.push('/');
          }
          users.forEach(user1 => {
            if(user1.id !== user.id) {
              newUsersArray.push(user1);
            }
          })
          transitionalService.saveArrayWithUsersFromServer1(newUsersArray);
          this.$router.push('/');
        } else {
          console.log('error', resp.message);
        }
      });
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
            &-post {
              font-size: 8px;
              color: #153d77;
            }
          }
          &-end {
            font-size: 8px;

            button {
              border: .5px solid #adb5bd;
              border-radius: 3px;
              color: #6c757d;
              background-color: white;
              margin-right: 20px;
            }

          }
        }
      }
    }
  }

}

</style>
