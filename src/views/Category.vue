<template>
  <div :key="category.id">
    <br />
    <div class="intro text-center">
      <b-row class="my-1 categoryRow">
        <b-col sm="12">
          <div class="name">
            <h4>{{ category.name | capitalize }}</h4>
          </div>
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
            ></b-img>By
            <router-link v-bind:to="`/author/${item.authorId}`">{{ item.author }}</router-link>
          </blockquote>
        </b-card-body>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Category",
  data: () => {
    return {
      category: null,
      articles: null
    };
  },
  beforeRouteUpdate(to, from, next) {
    const categoryId = to.params.id;
    const data = JSON.parse(localStorage.getItem("__data"));
    this.category = data.category.find(cat => cat.id === categoryId);
    this.articles = data.articles.filter(
      article => article.categoryId === categoryId
    );
    next();
  },
  created() {
    const categoryId = this.$route.params.id;
    const data = JSON.parse(localStorage.getItem("__data"));
    this.category = data.category.find(cat => cat.id === categoryId);
    this.articles = data.articles.filter(
      article => article.categoryId === categoryId
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
}
</style>
