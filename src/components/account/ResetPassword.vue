<template>
  <v-dialog v-model="dialog" persistent width="360">
    <v-card-title class="headline primary pl-4 pr-3 white--text">
      Reset Password
      <v-spacer></v-spacer>
      <v-btn icon dark @click="close">
        <v-icon>close</v-icon>
      </v-btn>
    </v-card-title>
    <v-card class="macros text-xs-center">
      <form action="">
        <p>Enter your email address to receive a link to reset your password.</p>
          <v-text-field
            label="Email address"
            name="email"
            class="mt-3 mb-1 ml-2 mr-2"
            v-model="email"
            v-validate="'required|email'"
            :error-messages="errors.collect('email')"></v-text-field>
        <v-btn color="primary" @click="reset">Reset Password</v-btn>
      </form>
    </v-card>
  </v-dialog>
</template>

<script>

import { mapActions } from 'vuex'


export default {
  name: "ResetPassword",
  props: {
    userId: String,
    passwordDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      email: ''
    }
  },
  computed: {
    dialog: {
      get() {
        return this.passwordDialog;
      },
      set(value) {
        this.$emit("update:passwordDialog", value);
      }
    }
  },
  methods: {
    ...mapActions("admin", {
      resetPassword: "resetPassword",
    }),
    reset() {
      return this.resetPassword(this.email).then(result => {
        this.$toast.success('Successfully updated');
        this.close();
      }).catch( e => {
        console.log(e);
      });
    },
    close() {
      this.dialog = false;
      this.$emit('update:passwordDialog', false);
    }
  }
}
</script>