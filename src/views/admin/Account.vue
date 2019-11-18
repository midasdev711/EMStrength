<template>
  <v-container grid-list-xl class="account-page">
    <v-btn class="v-btn--back-link" @click="backToDashboard">Back to Dashboard</v-btn>
    <v-card>
      <v-layout wrap>
        <v-flex xs12 sm5 text-xs-center>
          <div class="mb-3">
            <v-avatar size="150px">
            <img v-bind:src="user.avatarURL" alt="">
            </v-avatar>
            <DropzoneAvatar ref="dropzone"/>
          </div>
          <v-btn @click="saveImage()">Change</v-btn>
        </v-flex>
        <v-flex xs12 sm7>
          <h2>Account Details</h2>
          <p>Full name: {{user.userName}} </p><!--  ({{user.gender}}) -->
          <p>Email: {{user.email}}</p>
          <p>
            Password: * * * * * * *
            <v-btn class="v-btn--inline" @click.sync="passwordDialog = true">RESET</v-btn>
            <ResetPassword :password-dialog.sync="passwordDialog" @close="passwordDialog = false"></ResetPassword>
          </p>
          <p>Group:{{user.groupName}}</p>
          <p>Measurement preference: {{user.profile && user.profile.measure}} </p>
                      <v-select
                        v-model="user.measure"
                        :items="unitOfMeasurement"
                        title="option"
                        item-value="id"
                        item-name="text"
                        label="Unit of Measure"
                      >
                      </v-select>
        </v-flex>
      </v-layout>
      <hr />
      <v-layout wrap text-xs-center mb-3>
        <v-flex xs12 sm6>
          <h2>Policies</h2>
          <v-btn class="mb-3" @click="$router.push({ name: 'TermsConditions' })">
            Terms &amp; Conditions
            <v-icon>keyboard_arrow_right</v-icon>
          </v-btn>
          <v-btn class="mb-3" @click="$router.push({ name: 'PrivacyPolicy' })">
            Privacy Policy
            <v-icon>keyboard_arrow_right</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs12 sm6  v-bind:class="{ 'hidden': isUser }">
          <h2>Macros</h2>
          <v-btn @click="macrosDialog = true">
            Update user's macros
            <v-icon>keyboard_arrow_right</v-icon>
          </v-btn>
          <Macros :macros-dialog.sync="macrosDialog" @close="macrosDialog = false"></Macros>
        </v-flex>
      </v-layout>
      <hr />
      <v-layout wrap text-xs-center>
        <v-flex xs12>
          <v-btn color="primary" :loading="signOutLoading" @click="signOut">Sign out</v-btn>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
import Macros from "@/components/account/Macros"
import ResetPassword from "@/components/account/ResetPassword"
import DropzoneAvatar from "@/components/widgets/DropzoneAvatar";

import { mapActions, mapGetters } from 'vuex'

const blob_uri = 'https://ctmdevblobstore.blob.core.windows.net';

export default {
  name: "Account",
  data() {
    return {
      userId: "3c2692a0-8768-4472-b9de-3fcb57fde1d9", //TODO: set userId on open  
      user: {
        id: "",
        name: "",
        email: "",
        gender: "Male",
        groupName: "",
        measure: "Metric",
        avatarURL: '/static/avatar/default.png',
        profile: {}
      },
      macrosDialog: false,
      passwordDialog: false,
      signOutLoading: false,
      isUser: false,
      unitOfMeasurement: [
        { 
          value: 0,
          text: "Metric"
        },
        { 
          value: 1,
          text: "Imperial"
        }
      ]
    }
  },
  components: {
    Macros,
    ResetPassword,
    DropzoneAvatar
  },
  methods: {
    ...mapActions("app", {
      uploadImage: "uploadImage",
    }),
    ...mapActions("auth", {
      getMe: "getMe"
    }),
    ...mapActions("admin", {
      getUser: "getUser",
      updateAvatar: "updateAvatar",
      updateUnit: "updateUnit"
    }),

    async saveImage() {
      let files = this.$refs.dropzone.getFiles();
      let file = files[0];

      var result = await this.uploadImage(file);
      let temp = Object.assign({}, this.user);
      temp.avatarURL = result;
      this.user.avatarURL = temp.avatarURL;
      var data = {
        "userId": this.user.id,
        "avatar": this.user.avatarURL
      }
      this.updateAvatar(data).then(res => {
        this.$toast.success('Successfully saved', {});
        this.getMe().then(data => {
          this.user = data;
        });
      });
    },

    saveUnit() {
      var data = {
        "userId": this.user.id,
        "measure": this.user.measure
      }
      this.updateUnit(data).then(res => {
        this.$toast.success('Successfully updated unit', {});
      });
    },


    signOut() {
      this.signOutLoading = true
      setTimeout(() => {
        this.$router.push(`/auth/login`)
      },
        1000
      )
    },
    backToDashboard() {
      if (this.isUser == false) {
        this.$router.push({ name: 'DashboardAdmin' });
      }
      else {
        this.$router.push({ name: 'Dashboard' });
      }
    }
  },
  computed: {
    ...mapGetters("auth", {
      getDataUserProfile: "getDataUserProfile"
    }),
    ...mapGetters("admin", {
      getSelectedUser: "getSelectedUser"
    }),

  },
  mounted() {
    this.userId = this.getDataUserProfile.id;
    // if (this.getDataUserProfile.userRoles.indexOf("Admin") == -1) {
    //   this.isUser = true;
    // }
    this.getMe().then(data => {
      this.user = data;
    });
  } 
}
</script>

<style lang="stylus">
  .hidden
    display none
  .account-page
    @media (max-width 600px) {
      margin-top 5em
    }
</style>