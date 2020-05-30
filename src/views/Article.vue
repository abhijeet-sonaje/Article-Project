<template>
  <div>
    <div class="floatingBox" v-if="article">
      <div class="likeBtn btn" @click="handleLike">
        <p class="h4 mb-2">
          <BIconHandThumbsUp size="lg" />
        </p>
      </div>
      {{ article.likes }}
    </div>
    <br />
    <div class="container d-flex height-100">
      <b-row class="mx-auto align-self-center">
        <b-card class="text-center" v-if="article">
          <h3 class="title">{{ article.title }}</h3>
          <router-link v-bind:to="`/category/${article.categoryId}`">
            <div class="category">{{ article.category }}</div>
          </router-link>
          <br />
          <div class="author">
            <b-img
              v-bind:src="article.authorPicture"
              width="30px"
              height="30px"
              class="m1"
              rounded="circle"
              alt="Circle image"
            ></b-img>By
            <router-link v-bind:to="`/author/${article.authorId}`">{{ article.author }}</router-link>
          </div>
          <br />
          <div class="summary text-muted text-left">{{ article.desc }}</div>
          <br />
          <hr />
          <br />
          <Editor v-bind:editable="false" v-bind:content="`${article.content}`"></Editor>
          <br />
        </b-card>
      </b-row>
    </div>
  </div>
</template>

<script>
import Editor from "./../components/Editor";
import EditableEditor from "./../components/EditableEditor";
export default {
  name: "Article",
  components: { Editor, EditableEditor },
  //   props: ["id"],
  data: () => {
    return {
      article: null
    };
  },
  created() {
    const articleId = this.$route.params.id;
    const articles = JSON.parse(localStorage.getItem("__data")).articles;
    const article = articles.find(
      article => article.id === parseInt(articleId)
    );
    this.article = article;
  },
  methods: {
    handleLike(evt) {
      const articleId = this.$route.params.id;
      const data = JSON.parse(localStorage.getItem("__data"));
      const articleIndex = data.articles.findIndex(
        article => article.id === parseInt(articleId)
      );

      this.article.likes += 1;
      data.articles[articleIndex] = this.article;
      localStorage.setItem("__data", JSON.stringify(data));
    }
  }
};
</script>

<style lang="scss">
a {
  color: #2c3e50;
  //   text-decoration: none;

  &:hover {
    color: #f8b147;
  }
}

.category {
  color: #f8b147;
  font-size: large;
}

.summary {
  line-height: 32px;
  font-size: 20px;
}

.floatingBox {
  position: fixed;
  bottom: 40px;
  left: 40px;

  .likeBtn {
    width: 60px;
    height: 60px;
    background-color: #5e91ff;
    color: #fff;
    border-radius: 50px;
    text-align: center;
    box-shadow: 2px 2px 3px #999;
  }
}
</style>
