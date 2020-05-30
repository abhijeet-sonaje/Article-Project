<template>
  <div>
    <br />
    <div class="container d-flex height-100">
      <b-row class="mx-auto align-self-center">
        <b-card class="text-left" v-if="article">
          <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-row class="my-1">
              <b-col sm="3">
                <label for="title">Title :</label>
              </b-col>
              <b-col sm="9">
                <b-form-input id="title" aria-label="Title" required v-model="article.title"></b-form-input>
              </b-col>
            </b-row>
            <br />
            <b-row class="my-1">
              <b-col sm="3">
                <label for="category">Category :</label>
              </b-col>
              <b-col sm="9">
                <b-form-select id="category" v-model="selected" required>
                  <option
                    v-for="option in options"
                    :key="option.id"
                    :value="option.id"
                  >{{ option.name }}</option>
                </b-form-select>
              </b-col>
            </b-row>
            <br />
            <b-row class="my-1">
              <b-col sm="3">
                <label for="author">Author :</label>
              </b-col>
              <b-col sm="9">
                <b-form-select id="author" v-model="authorSelected" required>
                  <option
                    v-for="option in authorOptions"
                    :key="option.id"
                    :value="option.id"
                  >{{ option.name }}</option>
                </b-form-select>
              </b-col>
            </b-row>
            <br />
            <b-row class="my-1">
              <b-col sm="3">
                <label for="desc">Description :</label>
              </b-col>
              <b-col sm="9">
                <b-form-textarea
                  id="desc"
                  class="text-muted"
                  v-model="article.desc"
                  placeholder="Enter something..."
                  rows="3"
                  max-rows="6"
                  required
                ></b-form-textarea>
              </b-col>
            </b-row>
            <br />
            <hr />
            <h5 class="text-center mb-2">Article Content :</h5>
            <EditableEditor :content="`${article.content}`"></EditableEditor>
            <br />
            <b-button class="mr-3" type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
          </b-form>
        </b-card>
      </b-row>
    </div>
  </div>
</template>

<script>
import EditableEditor from "./../components/EditableEditor";
export default {
  name: "EditArticle",
  components: { EditableEditor },
  data: () => {
    return {
      show: true,
      article: null,
      selected: null,
      authorSelected: null,
      options: JSON.parse(localStorage.getItem("__data")).category,
      authorOptions: JSON.parse(localStorage.getItem("__data")).author
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      const categoryDetailsFromId = this.options.find(
        cat => cat.id === this.selected
      );
      this.article.category = categoryDetailsFromId.name;
      this.article.categoryId = categoryDetailsFromId.id;

      const authorDetailsFromId = this.authorOptions.find(
        author => author.id === this.authorSelected
      );
      this.article.author = authorDetailsFromId.name;
      this.article.authorId = authorDetailsFromId.id;
      this.article.authorPicture = authorDetailsFromId.picture;

      this.$bus.$on("__returningEditorData", this.updateArticlesInLocalStorage);
      this.$bus.$emit("__getEditorData");
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      const articleId = this.$route.params.id;
      const articles = JSON.parse(localStorage.getItem("__data")).articles;
      const article = articles.find(
        article => article.id === parseInt(articleId)
      );
      this.article = article;
      this.selected = article.categoryId;
      this.authorSelected = article.authorId;
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    updateArticlesInLocalStorage(contentData) {
      const articleId = this.$route.params.id;
      const data = JSON.parse(localStorage.getItem("__data"));
      const articleIndex = data.articles.findIndex(
        article => article.id === parseInt(articleId)
      );

      this.article.content = contentData;
      data.articles[articleIndex] = this.article;
      localStorage.setItem("__data", JSON.stringify(data));
      this.$router.push("/dashboard");
    }
  },
  created() {
    const articleId = this.$route.params.id;
    const articles = JSON.parse(localStorage.getItem("__data")).articles;
    const article = articles.find(
      article => article.id === parseInt(articleId)
    );
    this.article = article;
    this.selected = article.categoryId;
    this.authorSelected = article.authorId;
  },
  destroyed() {
    this.$bus.$off("__returningEditorData", this.updateArticlesInLocalStorage);
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
</style>
