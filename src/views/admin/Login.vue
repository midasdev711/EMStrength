<template>
  <v-card class="elevation-1 pa-3">
    <v-card-text>
      <div class="layout column align-center">
        <img 
        height="144"
        src="/img/icons/icon-e@3x.png"
        class="auth__logo" alt="Vue Material Admin" />
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
        <a class="right mb-4">Forgot Password?</a>
      </v-form>
    </v-card-text>
    <v-btn block color="primary" @click="login" :loading="loading">Login</v-btn>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data: () => ({
    loading: false,
    model: {
      UserName: "", //"admin@em.app",
      Password: "", //"T3mp0r4ryEM@"
    }
  }),

  computed: {
    ...mapGetters("auth", {
      // checkoutStatus: "getCheckoutStatus",
      // dataWeight: "getDataWeight"
    })
  },
  methods: {
    ...mapActions("auth", {
      signin: "adminLogin"
    }),
    login() {
      this.loading = true;
      const formData = {
        userName: this.model.UserName,
        password: this.model.Password
      };
      
      this.signin(formData).then(res => {
        this.loading = false;
        this.$router.push("/admin");
      }).catch(err => {
        console.log(err)
        this.loading = false;
        this.$toast.error('Incorrect username or password');
      })
      
    }
  }
}
</script>

<style lang="stylus">
.auth__logo
  border-radius: 50%
</style>
