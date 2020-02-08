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
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      v-else
    >
      <v-text-field
        v-model="user.firstName"
        :rules="firstNameRules"
        label="First name"
        required
      ></v-text-field>

      <v-text-field
        v-model="user.lastName"
        :rules="lastNameRules"
        label="Last name"
        required
      ></v-text-field>

      <v-text-field
        v-model="user.email"
        :rules="emailRules"
        label="Email"
        required
      ></v-text-field>

      <v-text-field
        v-model="user.age"
        :rules="ageRules"
        label="Age"
        required
      ></v-text-field>

      <v-switch
        v-model="user.gender"
        :label="user.gender ? 'Female' : 'Male'"
      ></v-switch>

      <v-text-field
        v-model="user.postCode"
        :rules="postCodeRules"
        label="Post code"
        required
      ></v-text-field>

      <v-text-field
        v-model="user.occupation"
        :rules="occupationRules"
        label="Occupation"
        required
      ></v-text-field>

      <v-btn
        :disabled="!valid"
        color="white"
        @click="submit"
      >
      {{isUserDataExist? 'Update' : 'Done'}}
      </v-btn>
    </v-form>
    <v-dialog
        v-model="dialog"
        max-width="290"
      >
      <v-card>
        <v-card-title class="headline">Tell us about yourself</v-card-title>
        <v-card-text>
          <p>Dr Sean has worked with X clients and achieve ... (credibility factors) <br> To provide quality actionable information to improve your recovery <br> Lorem ipsum dolor sit amet</p>
         
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click="dialog = false"
          >
            OK
          </v-btn>
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
      userCode: "fMvsVLvSf",              // fMvsVLvSf       Zsk5t2JDH              IAFGR1Rfa
      groupId: null,
      user: {
        firstName: "",
        lastName: "",
        email: "",
        age: "",
        gender: false,
        postCode: "",
        occupation: ""
      },
      firstNameRules: [
        v => !!v || 'First name is required',
      ],
      lastNameRules: [
        v => !!v || 'Last name is required',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      ageRules: [
        v => !!v || 'Age is required',
        v => /^\d+$/.test(v) || 'Age must be valid'
      ],
      occupationRules: [
        v => !!v || 'Occupation is required',
      ],
      postCodeRules: [
        v => !!v || 'Post code is required',
      ],
      isLoading: false,
      isUserDataExist: false
    };
  },
  components: {
  },
  methods: {
    ...mapActions("app", {
      _postUserCode: "postUserCode",
      _updateUser: "updateUser",
      _postUser: "postUser"
    }),
    ...mapActions("admin", {
      getUser: "getUser",
    }),
    ...mapActions("auth", {
      updateCurrentUserData: "getMe",
    }),
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },

    submit () {
      if (this.$refs.form.validate()) {
        let data = {
          FirstName: this.user.firstName,
          LastName: this.user.lastName,
          Occupation: this.user.occupation,
          PostCode: this.user.postCode,
          Age: this.user.age,
          Email: this.user.email,
          Password: this.user.password,
          UserType: this.user.userType,
          GroupId: this.groupId,
          UserAccessCode: this.userCode
        };

        console.log(data);

        if (this.isUserDataExist) {
          this._updateUser(data).then(res => {
            this.$toast.success(`Successfully updated`);
            this.$router.push({ name: 'Recovery'});
          });
        } else {
          this._postUser(data).then(res => {
            this.$toast.success(`Successfully updated`);
            this.$router.push({ name: 'Recovery'});
          });
        }

      }
    },
    checkUserDataExist() {

      this.isUserDataExist =  this.user.firstName || this.user.lastName || this.user.email || this.user.age || this.user.gender || this.user.postCode || this.user.occupation;
    }

  },
  computed: {
    ...mapGetters("auth", {
      getDataUserProfile: "getDataUserProfile",
    })
  },
  mounted() {
    this.userCode = this.$route.query.code;
    this.isLoading = true;
    this._postUserCode(this.userCode).then(res => {
      this.user = Object.assign({}, this.getDataUserProfile);
      this.groupId = res.groupId;
      this.checkUserDataExist();
      this.isLoading = false;
    }).catch(err => {
      this.$toast.warning(`User code invalid`);
      this.$router.push({ name: 'dashboard'});
    });
  }
};
</script>

<style lang="stylus" scoped>
form 
  text-align center

.hidden {
  display: none;
}

.dropzone .dz-preview .dz-image {
  z-index: 5;
}

.v-card__actions
  justify-content flex-end
</style>