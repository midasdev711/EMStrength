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
                  <h1 class="flex my-4 primary--text">Create password</h1>
                </div>
                <v-form id="formUser">

                  <p> TOKEN: {{token}} for debug</p>

                  <p>Enter your new password</p>
                    
                  <v-text-field
                    append-icon="lock"
                    name="password"
                    label="Password"
                    id="password"
                    type="password"
                    v-model="model.newPassword"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <div class="login-btn">
                <v-spacer></v-spacer>
                
                <v-btn block color="primary" @click="submit" :loading="loading"  >Set Password</v-btn>
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
  name: "ResetPassword",
  props: {
      token: {
          type: String,
          default: "notset",

      }
  },
  data() {
      return {
        loading: false,
        model: {
            newPassword: "" 
        }
    }
  },
  methods: {
    ...mapActions("app", {
       _postResetPassword: "postResetPassword",
    }),
    submit () {
      //if (this.model.Username.valid()) 
      {
        let data = {
          token: this.$router.currentRoute.query.token,
          newPassword: this.model.newPassword
        };
        console.log(data);
        this._postResetPassword(data).then(res => {
            this.$toast.success(`Your password has been reset`);
            this.$router.push({ name: 'Login'});
        }).catch(err => {
            this.$toast.warning(`Problem resetting password`);
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
