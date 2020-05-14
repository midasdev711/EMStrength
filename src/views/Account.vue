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
      <v-text-field v-model="user.firstName" :rules="firstNameRules" label="First name" required></v-text-field>

      <v-text-field v-model="user.lastName" :rules="lastNameRules" label="Last name" required></v-text-field>

      <v-text-field v-model="user.email" :rules="emailRules" label="Email" required></v-text-field>

      <v-text-field v-model="user.phone" :rules="phoneRules" label="Mobile phone number" mask="###############" required></v-text-field>

      <v-text-field v-model="user.age" :rules="ageRules" label="Age" required></v-text-field>

      <v-radio-group v-model="user.gender" row>
        <v-radio
          :label="'Male'"
          :value="false"
        ></v-radio>
        <v-radio
          :label="'Female'"
          :value="true"
        ></v-radio>
      </v-radio-group>

      <v-text-field v-model="user.postCode" :rules="postCodeRules" label="Post code" required></v-text-field>

      <v-text-field v-model="user.occupation" :rules="occupationRules" label="Occupation" required></v-text-field>
      <v-btn color="white" @click="$router.push({ name: 'Recovery'})" v-if="isUserDataExist" class="left">Close</v-btn>
      <v-btn :disabled="!valid" color="white" @click="submit" class="right">{{isUserDataExist? 'Update' : 'Save'}}</v-btn>
    </v-form>
    <v-dialog v-model="getNotification" class="notification-dialog">
      <v-card>
        <v-card-title class="headline">The Energy Health Diagnostic</v-card-title>
        <v-card-text>
          <p>
            Welcome to the first steps in making a positive change to your Energy Health!
             <br><br>
            Based in research, this Diagnostic measures stress and recovery levels, providing information necessary to build a foundation of health for Mental and Physical Wellbeing &amp; Performance.
            <br><br>
            We are thrilled to go on this journey with you, sharing insights on how to get the best out of yourself and your life! 
            <br><br>
            We look forward to seeing you create positive change through improving recovery!
            <br><br>
            Dr Sean &amp; Kate Richardson<br>
            Founders, Energy Health Inc
          </p>
        </v-card-text>

        <v-card-actions>
          <v-btn color="green darken-1" flat="flat" @click="dialog = false;_disableNotification();">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
        phone: "",
        gender: false,
        postCode: "",
        occupation: "",
        userType: "User",
        groupId: ""
      },
      firstNameRules: [v => !!v || "First name is required"],
      lastNameRules: [v => !!v || "Last name is required"],
      lastNameRules: [v => !!v || "Last name is required"],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      phoneRules: [
        v => !!v || "Phone number is required",
        v => /^[0-9]+$/.test(v) || "Phone number must be numbers"
      ],
      ageRules: [
        v => !!v || "Age is required",
        v => /^\d+$/.test(v) || "Age must be valid"
      ],
      occupationRules: [v => !!v || "Occupation is required"],
      postCodeRules: [v => !!v || "Post code is required"],
      isLoading: false,
      isUserDataExist: true
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
          userType: this.user.userType,
          groupId: this.user.groupId,
          userAccessCode: this.getCurrentUserCode
        };

        if (this.isUserDataExist) {
          this._updateUser(data)
            .then(res => {
              this.$toast.success(`Successfully updated`);
              this.$router.push({ name: "Recovery" });
            })
            .catch(err => {
              console.log("update failed");
            });
        } else {
          this._postUser(data)
            .then(res => {
              this.$toast.success(`Please check your inbox for your password.`);
              const formData = new FormData();
              formData.append("Username", this.user.email);
              formData.append("Password", "N123456");
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
            })
            .catch(err => {
              this.$toast.error(err.response.data.errors[0].errorMessage);
              
              return err;
            });
        }
      }
    },
    checkUserDataExist() {
      this.isUserDataExist =
        this.user.firstName ||
        this.user.lastName ||
        this.user.email ||
        this.user.age ||
        this.user.gender ||
        this.user.postCode ||
        this.user.occupation;
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
        return (this.dialog | this.getNotificationStatus) & !this.isUserDataExist
      },
      set(val) {
        if (val == false) this._disableNotification();
      }
    }
  },
  mounted() {
    this.isLoading = true;
    this._getUserCode(this.getCurrentUserCode)
      .then(res => {
        console.log(res)
        // if (!res.userId) {
        //   this.$toast.warning(`User code invalid`);
        //   this.$router.push({ name: "dashboard" });
        // }
        this.user = Object.assign({}, this.getDataUserProfile);
        if (this.user.gender == "Male") {
          this.user.gender = true;
        } else {
          this.user.gender = false;
        }
        this.user.groupId = res.groupId;
        this.checkUserDataExist();
        this.isLoading = false;
      })
      .catch(err => {
        this.$toast.warning(`User code invalid`);
        this.$router.push({ name: "dashboard" });
      });
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