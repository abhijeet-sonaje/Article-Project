<template>
  <div class="home">
    <b-row class="my-1 text-center">
      <b-col sm="4">
        <b-row class="my-2 mb-2">
          <b-col sm="3">
            <label for="sort">Sort :</label>
          </b-col>
          <b-col sm="9">
            <b-form-select
              size="sm"
              id="sort"
              v-model="selectedSort"
              @change="handleSorting"
              required
            >
              <option value="date-asc">
                What's New
                <BIconArrowDown />
              </option>
              <option value="date-desc">
                Older First
                <BIconArrowUp />
              </option>
              <option value="title-asc">
                Title in Ascending
                <BIconArrowDown />
              </option>
              <option value="title-desc">
                Title in Descending
                <BIconArrowUp />
              </option>
              <option value="likes-desc">Popularity</option>
            </b-form-select>
          </b-col>
        </b-row>
      </b-col>
      <b-col sm="4">
        <b-row class="my-2 mb-2">
          <b-col sm="12">
            <b-nav-form @submit="searchText" @reset="onReset" v-if="show">
              <b-form-input size="sm" class="mr-sm-2" v-model="search_text" placeholder="Search"></b-form-input>
              <b-button size="sm" class="my-2 mr-2 my-sm-0" type="submit">Search</b-button>
              <b-button size="sm" class="my-2 mr-2 my-sm-0" type="reset" variant="danger">Reset</b-button>
            </b-nav-form>
          </b-col>
        </b-row>
      </b-col>
      <b-col sm="4">
        <b-row class="my-2 mb-2">
          <b-col sm="12">
            <b-nav>
              <b-nav-item-dropdown text="Author">
                <b-form-group>
                  <b-form-checkbox-group
                    id="checkbox-group-1"
                    v-model="authorSelected"
                    :options="authorOptions"
                    name="authors-1"
                    stacked
                    @change="handleAuthor"
                  ></b-form-checkbox-group>
                </b-form-group>
              </b-nav-item-dropdown>
              <b-nav-item-dropdown text="Category">
                <b-form-group>
                  <b-form-checkbox-group
                    id="checkbox-group-2"
                    v-model="categorySelected"
                    :options="categoryOptions"
                    name="category-1"
                    stacked
                    @change="handleCategory"
                  ></b-form-checkbox-group>
                </b-form-group>
              </b-nav-item-dropdown>
            </b-nav>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <div v-if="showArticles">
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
          <router-link v-bind:to="`/category/${item.categoryId}`">
            <b-card-text class="category text-center">{{ item.category }}</b-card-text>
          </router-link>
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
          <small class="text-muted">
            {{ diffDate(item.publishDate) }} days ago |
            <BIconHandThumbsUp />
            {{ item.likes }}
          </small>
        </b-card-body>
      </b-card>
    </div>
  </div>
</template>

<script>
const FlexSearch = window.FlexSearch;
const options = {
  tokenize: "forward",
  doc: {
    id: "id",
    field: ["author", "desc", "title", "content", "category"]
  }
};

export default {
  name: "Home",
  data: () => {
    return {
      selectedSort: "date-asc",
      search_text: "",
      index: null,
      show: true,
      showArticles: true,
      authorSelected: [],
      categorySelected: [],
      authorOptions: null,
      categoryOptions: null,
      articles: JSON.parse(localStorage.getItem("__data")).articles
    };
  },
  created() {
    this.index = FlexSearch.create(options);
    this.index.add(this.articles);
    const authors = JSON.parse(localStorage.getItem("__data")).author;
    this.authorOptions = authors.map(auth => {
      return {
        value: auth.id,
        text: auth.name
      };
    });
    const categories = JSON.parse(localStorage.getItem("__data")).category;
    this.categoryOptions = categories.map(item => {
      return {
        value: item.id,
        text: item.name
      };
    });
  },
  methods: {
    diffDate(publishDate) {
      const dateToday = Math.floor(new Date().getTime());
      const dateDiff = dateToday - parseInt(publishDate);
      return Math.floor(dateDiff / 86400000);
    },
    handleSorting(selectedSortOption) {
      switch (selectedSortOption) {
        case "date-asc":
          this.articles = this.articles.sort(
            (a, b) => b.publishDate - a.publishDate
          );
          break;
        case "date-desc":
          this.articles = this.articles.sort(
            (a, b) => a.publishDate - b.publishDate
          );
          break;
        case "title-asc":
          this.articles = this.articles.sort((a, b) => {
            if (a.title < b.title) {
              return -1;
            }
            if (a.title > b.title) {
              return 1;
            }
          });
          break;
        case "title-desc":
          this.articles = this.articles.sort((a, b) => {
            if (a.title < b.title) {
              return 1;
            }
            if (a.title > b.title) {
              return -1;
            }
          });
          break;
        // case "likes-asc":
        //   this.articles = this.articles.sort((a, b) => a.likes - b.likes);
        //   break;
        case "likes-desc":
          this.articles = this.articles.sort((a, b) => b.likes - a.likes);
          break;
      }
      this.showArticles = false;
      this.$nextTick(() => {
        this.showArticles = true;
      });
    },
    searchText(evt) {
      evt && evt.preventDefault();
      if (this.search_text === "") {
        this.articles = JSON.parse(localStorage.getItem("__data")).articles;
      } else {
        this.articles = this.index.search({
          query: this.search_text,
          limit: 30
        });
      }
      if (this.authorSelected.length > 0) {
        this.articles = this.articles.filter(article => {
          return this.authorSelected.indexOf(article.authorId) > -1;
        });
      }
      if (this.categorySelected.length > 0) {
        this.articles = this.articles.filter(article => {
          return this.categorySelected.indexOf(article.categoryId) > -1;
        });
      }
      this.handleSorting(this.selectedSort);
    },
    handleAuthor(evt) {
      const articles = JSON.parse(localStorage.getItem("__data")).articles;
      if (this.search_text !== "") {
        this.articles = this.index.search({
          query: this.search_text,
          limit: 30
        });
      } else {
        this.articles = articles;
      }
      if (evt.length > 0) {
        this.articles = this.articles.filter(article => {
          return evt.indexOf(article.authorId) > -1;
        });
      }
      if (this.categorySelected.length > 0) {
        this.articles = this.articles.filter(article => {
          return this.categorySelected.indexOf(article.categoryId) > -1;
        });
      }
      this.handleSorting(this.selectedSort);
    },
    handleCategory(evt) {
      const articles = JSON.parse(localStorage.getItem("__data")).articles;
      if (this.search_text !== "") {
        this.articles = this.index.search({
          query: this.search_text,
          limit: 30
        });
      } else {
        this.articles = articles;
      }
      if (evt.length > 0) {
        this.articles = this.articles.filter(article => {
          return evt.indexOf(article.categoryId) > -1;
        });
      }
      if (this.authorSelected.length > 0) {
        this.articles = this.articles.filter(article => {
          return this.authorSelected.indexOf(article.authorId) > -1;
        });
      }
      this.handleSorting(this.selectedSort);
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.search_text = "";
      this.searchText();
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
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

.category {
  color: #f8b147;
  font-size: small;
}

.card {
  display: inline-flex !important;

  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>
