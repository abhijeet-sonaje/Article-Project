<template>
  <b-container fluid>
    <div id="app">
      <b-navbar toggleable="sm" type="light" variant="light">
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-navbar-brand>
          <router-link to="/">Article Project</router-link>
        </b-navbar-brand>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item href="#" v-if="isLoggedIn">
              <router-link to="/Dashboard">Dashboard</router-link>
            </b-nav-item>
            <b-nav-item-dropdown text="Articles" right>
              <b-dropdown-item v-for="item of category" :key="item.id" href="#">
                <router-link :to="`/category/${item.id}`">{{ item.name }}</router-link>
              </b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item href="#" v-if="isLoggedIn">
              <p @click="logout">Logout</p>
            </b-nav-item>
            <b-nav-item href="#" v-if="!isLoggedIn">
              <router-link to="/login">Login</router-link>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <router-view />
    </div>
  </b-container>
</template>

<script>
import data from "./assets/data.json";
if (!localStorage.getItem("__data")) {
  data.articles = data.articles.sort((a, b) => b.publishDate - a.publishDate);
  localStorage.setItem("__data", JSON.stringify(data));
}

if (localStorage.getItem("__isLoggedIn") === "true") {
  localStorage.setItem("__isLoggedIn", true);
} else {
  localStorage.setItem("__isLoggedIn", false);
}

export default {
  name: "App",
  data: () => {
    return {
      isLoggedIn: localStorage.getItem("__isLoggedIn") === "true",
      category: JSON.parse(localStorage.getItem("__data")).category
    };
  },
  created() {
    this.$bus.$on("__loggedIn", this.loggedIn);
  },
  methods: {
    loggedIn(value) {
      this.isLoggedIn = value;
    },
    logout() {
      localStorage.setItem("__isLoggedIn", false);
      this.isLoggedIn = false;
      this.$router.push("/");
    }
  },
  destroyed() {
    this.$bus.$off("__loggedIn", this.loggedIn);
  }
};
</script>

<style lang="scss">
@import "node_modules/bootstrap/scss/bootstrap";
@import "node_modules/bootstrap-vue/src/index.scss";
@import "./assets/sass/main.scss";
body {
  background-color: #e9ebee;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #f8b147;
    }
  }

  #app {
    font-family: medium-content-sans-serif-font, "Lucida Grande",
      "Lucida Sans Unicode", "Lucida Sans", Geneva, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
}
</style>
