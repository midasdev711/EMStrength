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
                    alt="EM Sign up"
                  />
                  <h1 class="flex my-4 primary--text">Sign Up</h1>
                </div>
                <v-form>
                  <v-text-field
                    append-icon="person"
                    name="login"
                    label="User Code"
                    type="text"
                    v-model="userCode"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <div class="login-btn">
                <v-spacer></v-spacer>
                <v-btn block color="primary" @click="login" :loading="loading">Sign up</v-btn>
                <p class="text-xs-center mt-5">Already have an account?<br><a href="/auth/login"> Login here</a> </p>
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
  name: "Signup",
  data() {
      return {
        loading: false,
        userCode: "" 
    }
  },
  methods: {
    ...mapActions("auth", {
       _getUserCode: "getUserCode",
    }),

    login () {
      //if (this.$refs.form.validate()) 
      {
        this._getUserCode(this.userCode).then(res => {
          console.log(res);
          if (res.userId) {
            this.$toast.warning(`User code invalid or claimed`);
            return
          }
          this.$router.push({ name: 'AccountDetails', query: { code: this.userCode }});
            
        }).catch(err => {
          this.$toast.warning(`User code invalid or claimed`);
          // this.$toast.warning(err.errors[0].errorMessage);
        });
      }

      
    }
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
