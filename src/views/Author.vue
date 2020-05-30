<template>
  <div class="home">
    <br />
    <div class="intro text-left">
      <b-row class="my-1 authorRow">
        <b-col sm="8">
          <div class="name">
            <h3>{{ author.name | capitalize }}</h3>
          </div>
          <div class="bio" v-html="author.desc"></div>
        </b-col>
        <b-col sm="4" class="text-right">
          <b-img
            v-bind:src="author.picture"
            width="150px"
            height="150px"
            class="m1"
            rounded="circle"
            alt="Circle image"
          ></b-img>
        </b-col>
      </b-row>
    </div>
    <br />
    <div>
      <b-card
        no-body
        tag="article"
        style="max-width: 20rem;"
        class="mb-4 mr-4"
        v-for="item in articles"
        :key="item.id"
      >
        <b-card-img v-bind:src="item.picture" width="360px" height="223px" alt="Image" img-top></b-card-img>
        <b-card-body>
          <router-link v-bind:to="`/article/${item.id}`">
            <b-card-title class="title">{{item.title }}</b-card-title>
          </router-link>
          <b-card-text class="category text-center">{{ item.category }}</b-card-text>
          <b-card-text class="text-muted text-truncate">{{ item.desc }}</b-card-text>
          <blockquote class="text-muted">
            <b-img
              v-bind:src="item.authorPicture"
              width="30px"
              height="30px"
              class="m1"
              rounded="circle"
              alt="Circle image"
            ></b-img>
            By {{ item.author }}
          </blockquote>
        </b-card-body>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Author",
  data: () => {
    return {
      author: null,
      articles: null
    };
  },
  created() {
    const authorId = this.$route.params.id;
    const data = JSON.parse(localStorage.getItem("__data"));
    this.author = data.author.find(person => person.id === authorId);
    this.articles = data.articles.filter(
      article => article.authorId === authorId
    );
  }
};
</script>

<style lang="scss">
a {
  color: #2c3e50;
  text-decoration: none;

  &:hover {
    color: #f8b147;
    text-decoration: none;
  }
}
.intro {
  background: #191c1d;
  padding: 50px 50px;
  margin: 0 6%;
  position: relative;

  .name {
    color: #f8b147;
  }
  .bio {
    color: white;
  }

  a {
    color: #f8b147 !important;
    text-decoration: none;
  }
}

.authorRow::after {
  content: "";
  position: absolute;
  top: 0;
  transform: skewX(10deg);
  width: 30px;
  right: 25%;
  height: 100%;
  background: #e9ebee;
  box-sizing: inherit;
}
</style>
