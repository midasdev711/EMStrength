<template>
  <v-app class="split-bg">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center class="login-layout">
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <img
                    height="144"
                    src="/img/icons/icon-e@3x.png"
                    class="auth__logo img-responsive"
                    alt="Vue Material Admin"
                  />
                  <h1 class="flex my-4 primary--text">Sign In</h1>
                </div>
                <v-form>
                  <v-text-field
                    append-icon="person"
                    name="login"
                    label="Email"
                    type="text"
                    v-model="model.UserName"
                  ></v-text-field>
                  <v-text-field
                    append-icon="lock"
                    name="password"
                    label="Password"
                    id="password"
                    type="password"
                    v-model="model.Password"
                  ></v-text-field>
                  <a class="left mb-4" href="/auth/signup">Not registered?</a>
                  <a class="right mb-4" href="/auth/forgot">Forgot Password?</a>
                </v-form>
              </v-card-text>
              <div class="login-btn">
                <v-spacer></v-spacer>
                <v-btn block color="primary" @click="login" :loading="loading">Login</v-btn>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    loading: false,
    model: {
      UserName: "", //"oldtest1@gmail.com",
      Password: "", //"N123456"
    }
  }),

  computed: {
    ...mapGetters("auth", {
      // login: "login",
      // dataWeight: "getDataWeight"
    })
  },
  methods: {
    ...mapActions("auth", {
      signin: "login",
      mockTestAPI: "mockTestAPI"
    }),

    login() {
      this.loading = true;
      const formData = new FormData();
      formData.append("Username", this.model.UserName);
      formData.append("Password", this.model.Password);
      this.signin(formData)
        .then(res => {
          if (res.status)
            this.$router.push("/");
          else {
            this.$toast.error('Incorrect username or password');
            this.loading = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
  }
};
</script>
<style scoped lang="css">
.split-bg {
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  z-index: 0;
}

@media (max-width: 600px) {
  .login-layout {
    align-items: initial;
  }
}
</style>
