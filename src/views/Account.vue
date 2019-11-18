<template>
  <v-container grid-list-xl class="account-page">
    <v-card>
      <v-layout wrap>
        <v-flex xs12 sm5 text-xs-center>
          <div class="mb-3">
            <v-avatar size="150px">
              <img v-bind:src="user.avatarURL" alt />
            </v-avatar>
            <DropzoneAvatar ref="dropzone" />
          </div>
          <v-btn @click="saveImage()" :loading="isUploadingAvatar">Change</v-btn>
        </v-flex>
        <v-flex xs12 sm7>
          <h2>Account Details</h2>
          <p>Full name: {{user.name}} ({{user.gender}})</p>
          <p>Email: {{user.email}}</p>
          <p>
            Password: * * * * * * *
            <v-btn class="v-btn--inline" @click.sync="passwordDialog = true">RESET</v-btn>
            <ResetPassword :password-dialog.sync="passwordDialog" @close="passwordDialog = false"></ResetPassword>
          </p>
          <p>Group:{{user.groupName}}</p>
          <p>Measurement preference: {{user.profile && user.profile.measure}}</p>
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
import ResetPassword from "@/components/account/ResetPassword";
import DropzoneAvatar from "@/components/widgets/DropzoneAvatar";

import { mapActions, mapGetters } from "vuex";

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
        avatarURL: '',
        // avatarURL: '/static/avatar/default.png',
        profile: {}
      },
      passwordDialog: false,
      signOutLoading: false,
      isUser: true,
      isUploadingAvatar: false
    };
  },
  components: {
    ResetPassword,
    DropzoneAvatar
  },
  methods: {
    ...mapActions("app", {
      uploadImage: "uploadImage",
      updateAvatar: "updateAvatar"
    }),
    ...mapActions("admin", {
      getUser: "getUser",
      updateAvatarAdmin: "updateAvatar"
    }),
    ...mapActions("auth", {
      updateCurrentUserData: "getMe",
    }),

    async saveImage() {
      this.isUploadingAvatar = true;
      let files = this.$refs.dropzone.getFiles();
      let file = files[0];

      var newAvatarURL = await this.uploadImage(file);
      var data = {
        "userId": this.user.id,
        "avatar": newAvatarURL
      }

      var callback = () => {
        this.user.avatarURL = newAvatarURL;
        this.$toast.success('Successfully saved', {});
        this.updateCurrentUserData();
        this.$refs.dropzone.removeAllFiles();
        this.isUploadingAvatar = false;
      };

      if(this.isAdmin){
        this.updateAvatarAdmin(data).then(res => {
          callback();
        });
      }
      else {
        this.updateAvatar(data).then(res => {
          callback();
        });
      }
    },

    signOut() {
      this.signOutLoading = true;
      setTimeout(() => {
        this.$router.push(`/auth/login`);
      }, 1000);
    },
    backToDashboard() {
      this.$router.push({ name: "Dashboard" });
    }
  },
  computed: {
    ...mapGetters("auth", {
      getDataUserProfile: "getDataUserProfile",
      isAdmin: "getIsAdmin"
    })
  },
  mounted() {
    this.userId = this.getDataUserProfile.id;

    this.user["name"] = this.getDataUserProfile.userName;
    this.user["email"] = this.getDataUserProfile.email;
    this.user["avatarURL"] = this.getDataUserProfile.avatarURL;
    console.log("Avatar:" + this.user["avatarURL"]);
    this.user["groupName"] = this.getDataUserProfile.groupName;
    this.user.profile["measure"] = this.getDataUserProfile.profile.measure;
    console.log("Measure:" + this.user.profile["measure"]);
    this.userId = this.getDataUserProfile.id;
  }
};
</script>

<style scoped>
.hidden {
  display: none;
}

.dropzone .dz-preview .dz-image {
  z-index: 5;
}
</style>