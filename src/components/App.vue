<template>
  <div id="app">
    <a href="https://github.com/marocchino/vue-advent"><img style="position: absolute; top: 0; right: 0; border: 0;z-index: 1" src="//camo.githubusercontent.com/365986a132ccd6a44c23a9169022c0b5c890c387/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f7265645f6161303030302e706e67" alt="Fork me on GitHub" data-canonical-src="//s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png"></a>
    <img src="../assets/logo.png">
    <header>
      <h1>Advent Calendar 2016</h1>
      <button v-if='!newArticle.username' @click='login'>login</button>
      <button v-if='newArticle.username'
        data-toggle="tooltip" data-placement="bottom" title="로그아웃" @click='logout'>
        <img :src='newArticle.profileImageURL' class="img-circle" width='20' height='20'>
        {{ newArticle.username }}
      </button>
    </header>
    <router-view/>
  </div>
</template>

<script>
import firebase from 'firebase'
import api from '@/api'

const username = localStorage.getItem("username")
const profileImageURL = localStorage.getItem("profileImageURL")
const provider = new firebase.auth.GithubAuthProvider();

export default {
  name: 'app',
  data () {
    return {
      newArticle: {
        username,
        profileImageURL,
        day: 0,
        url: "",
        title: ""
      }
    }
  },

  computed: {
    validation() {
      return {
        title: !!this.newArticle.title.trim()
      }
    },
    isValid() {
      return Object.values(this.validation).every(value => value)
    },
  },

  methods: {
    login() {
      firebase.auth().signInWithPopup(provider).then(function(authData) {
        localStorage.setItem("username", authData.github.username)
        localStorage.setItem("profileImageURL", authData.github.profileImageURL)
        this.loading = false
        this.newArticle.username = authData.github.username
        this.newArticle.profileImageURL = authData.github.profileImageURL
      }).catch(function(error) {
        console.log(error);
      });
    },
    logout: function () {
      localStorage.setItem("username", "")
      localStorage.setItem("profileImageURL", "")
      location.reload(true)
    },
    clearArticle() {
      if (this.isValid) {
        $("#newArticle").modal("hide")
        this.newArticle.day = 0
        this.newArticle.url = ""
        this.newArticle.title = ""
      }
    },
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

a {
  color: #ff4649;
}

header {
  color: #FFFFFF;
  border-color: #910002;
  padding-top: 5px;
  padding-left: 20px;
  padding-bottom: 20px;
  margin-top: 30px;
}

form {
  background: #FFFFFF;
}

h1 {
  font-size: 69px;
  line-height: 50px;
  margin-bottom: 15px;
}

h4 {
  font-size: 22px;
}

h4 cide {
  font-size: 25px;
  font-family: 'Coda', cursive;
}
</style>
