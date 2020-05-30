<template>
  <div class="home">
    <br />
    <div>
      <b-card
        no-body
        v-for="item in articles"
        :key="item.id"
        class="overflow-hidden mb-4 mr-4"
        style="max-width: 48%;"
      >
        <router-link v-bind:to="`/edit-article/${item.id}`">
          <b-row no-gutters>
            <b-col md="6">
              <b-card-img
                v-bind:src="item.picture"
                width="360px"
                height="223px"
                alt="Image"
                class="rounded-0"
              ></b-card-img>
            </b-col>
            <b-col md="6">
              <b-card-body>
                <b-card-title class="title">{{ item.title }}</b-card-title>
                <b-card-text class="category text-center">{{ item.category }}</b-card-text>
                <b-card-text class="text-muted text-truncate">{{ item.desc }}</b-card-text>
              </b-card-body>
            </b-col>
          </b-row>
        </router-link>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data: () => {
    return {
      articles: JSON.parse(localStorage.getItem("__data")).articles
    };
  }
};
</script>

<style lang="scss">
a {
  color: #2c3e50;
  text-decoration: none;

  &:hover {
    color: unset;
    text-decoration: none;
  }
}

.category {
  color: #f8b147;
  font-size: small;
}
</style>
