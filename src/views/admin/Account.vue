<template>
  <v-container grid-list-xl class="account-page">
    <div class="text-xs-center" v-if="isLoading">
      <v-progress-circular
        :size="70"
        :width="7"
        v-bind:color="$vuetify.theme['progressColor']"
        indeterminate
      ></v-progress-circular>
    </div>
    <v-form ref="form" v-model="valid" lazy-validation v-else>
      <v-text-field v-model="user.firstName" label="First name" readonly></v-text-field>

      <v-text-field v-model="user.lastName" label="Last name" readonly></v-text-field>

      <v-text-field v-model="user.email" label="Email" readonly></v-text-field>

      <v-switch v-model="user.gender" :label="user.gender ? 'Male' : 'Male'" readonly></v-switch>

      <v-text-field v-model="user.occupation" label="Occupation" readonly></v-text-field>

      <v-btn :disabled="!valid" color="white" @click="$router.push({ name: 'AdminSummary' })">Close</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import ResetPassword from "@/components/account/ResetPassword";
import DropzoneAvatar from "@/components/widgets/DropzoneAvatar";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "Account",
  data() {
    return {
      valid: null,
      dialog: true,
      userCode: null,
      groupId: null,
      user: {
        firstName: "",
        lastName: "",
        email: "",
        age: "",
        gender: false,
        postCode: "",
        occupation: "",
        userType: "User",
        groupId: ""
      },
      firstNameRules: [v => !!v || "First name is required"],
      lastNameRules: [v => !!v || "Last name is required"],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      ageRules: [
        v => !!v || "Age is required",
        v => /^\d+$/.test(v) || "Age must be valid"
      ],
      occupationRules: [v => !!v || "Occupation is required"],
      postCodeRules: [v => !!v || "Post code is required"],
      isLoading: false,
      isUserDataExist: false
    };
  },
  components: {},
  methods: {
    ...mapActions("app", {
      _postUser: "postUser",
      _disableNotification: "disableNotification"
    }),
    ...mapActions("admin", {
      getUser: "getUser"
    }),
    ...mapActions("auth", {
      signin: "login",
      _updateUser: "updateUser",
      updateCurrentUserData: "getMe",
      _getUserCode: "getUserCode",
    }),
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },

    submit() {
      if (this.$refs.form.validate()) {
        let data = {
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          occupation: this.user.occupation,
          postCode: this.user.postCode,
          age: this.user.age,
          gender: this.user.gender ? "Male" : "Female",
          email: this.user.email,
          password: this.user.password,
          userType: 'Admin',
          // groupId: this.user.groupId,
          // userAccessCode: this.getCurrentUserCode
        };

        this._updateUser(data)
          .then(res => {
            this.$toast.success(`Successfully updated`);
          })
          .catch(err => {
            console.log("update failed");
          });
      }
    }
  },
  computed: {
    ...mapGetters("auth", {
      getDataUserProfile: "getDataUserProfile",
      getCurrentUserCode: "getCurrentUserCode"
    }),
    ...mapGetters("app", {
      getNotificationStatus: "getNotificationStatus"
    }),
    getNotification: {
      get() {
        return this.dialog | this.getNotificationStatus
      },
      set(val) {
        
      }
    }
  },
  mounted() {
    this.user = Object.assign({}, this.getDataUserProfile);
    if (this.user.gender == "Male") {
      this.user.gender = true;
    } else {
      this.user.gender = false;
    }
    // this.user.groupId = res.groupId;
  }
};
</script>

<style lang="stylus" scoped>
form {
  text-align: center;
}

.hidden {
  display: none;
}

.dropzone .dz-preview .dz-image {
  z-index: 5;
}

.v-card__actions {
  justify-content: flex-end;
}

>>>.v-dialog
  max-width 50%
  @media (max-width: 500px) {
    max-width 90%
    line-height 18px
    .v-card {
      padding 10px
    }

    .v-card__title, .v-card__text {
      padding 5px
    }

    .v-card__title {
      padding-bottom 15px
    }
  }

  @media (max-width: 500px) {
    max-width 90%
    line-height 18px

    .v-card__title {
      padding-bottom 15px
      font-size 20px!important
    }
  }

</style>