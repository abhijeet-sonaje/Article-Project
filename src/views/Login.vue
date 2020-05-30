<template>
  <div class="container d-flex height-75">
    <b-row class="mx-auto align-self-center">
      <b-card class="text-left">
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-form-group id="input-group-1" label="Email address:" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="form.email"
              type="email"
              required
              placeholder="Enter email"
              @focus="onFocus"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Enter Password:" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="form.password"
              type="password"
              required
              placeholder="Enter Password"
              @focus="onFocus"
            ></b-form-input>
          </b-form-group>

          <p class="text-danger">{{ form.message }}</p>

          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
      </b-card>
    </b-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
        message: ""
      },
      show: true
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      const adminData = JSON.parse(localStorage.getItem("__data")).admin;
      if (
        this.form.email === adminData.email &&
        this.form.password === adminData.password
      ) {
        localStorage.setItem("__isLoggedIn", true);
        this.$bus.$emit("__loggedIn", true);
        this.$router.push("/dashboard");
      } else {
        this.form.message = "Wrong Credentials!";
        this.$bvToast.toast("Wrong Credentials!", {
          title: `Error`,
          variant: "danger",
          toaster: "b-toaster-bottom-left",
          solid: true
        });
      }
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.message = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    onFocus(evt) {
      evt.preventDefault();
      this.form.message = "";
    }
  }
};
</script>

<style lang="scss">
.card {
  color: #2c3e50;
}

.height-75 {
  height: 75vh;
}

.btn {
  margin: 0 1rem 0 0;
}
</style>