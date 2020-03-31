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
                    alt="EM Forgot password"
                  />
                  <h1 class="flex my-4 primary--text">Reset password</h1>
                </div>
                <v-form id="formUser">
                    <p>Enter your email address to receive a link to reset your password</p>
                  <v-text-field
                    append-icon="person"
                    name="login"
                    label="email address"
                    type="text"
                    :rules="emailRules"
                    v-model="model.Username"
                    required
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <div class="login-btn">
                <v-spacer></v-spacer>
                
                <v-btn block color="primary" @click="submit" :loading="loading"  >Reset password</v-btn>
                <p class="text-xs-center mt-5">Know your login and password?<br><a href="/auth/login"> Login here</a> </p>
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
  name: "Forgot",
  data() {
      return {
        loading: false,

        model: {
            Username: "" 
        },

        emailRules: [ 
            v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
      
    }
  },
  methods: {
    ...mapActions("app", {
       _postForgotPassword: "postForgotPassword",
    }),
    submit () {
      //if (this.model.Username.valid()) 
      {
        let data = {
          email: this.model.Username
        };
        console.log(data);
        this._postForgotPassword(data).then(res => {
            this.$toast.success(`Check your inbox for the reset link`);
            this.$router.push({ name: 'Login'});
        }).catch(err => {
            this.$toast.warning(`Username invalid or could not be found`);
            this.$toast.warning(err.errors[0].errorMessage);
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
