<template>
  <v-container grid-list-xl>
    <v-layout wrap>
        <v-flex xs12 sm3>
          <v-btn class="" @click="backToDashboard">Back to Dashboard</v-btn>
          
        </v-flex>

        <v-flex xs12 sm9>
          <h1>Account / {{ $route.query.user }}</h1>
        </v-flex>
    </v-layout>
    
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
          <p>Full name: {{user.fullName}} </p><!--  ({{user.gender}}) -->
          <p>Email: {{user.email}}</p>
          <p>
            Password: * * * * * * *
            <v-btn class="v-btn--inline" @click.sync="passwordDialog = true">RESET</v-btn>
            <ResetPassword :userId="userId" :password-dialog.sync="passwordDialog" @close="passwordDialog = false"></ResetPassword>
          </p>
          <p>Group: {{user.groupName}}</p>
          <p>Measurement preference: Metric (cms/ kgs)</p>
          <v-select
            v-model="user.measure"
            :items="unitOfMeasurement"
            title="option"
            item-value="id"
            item-name="text"
            label="Unit of Measure"
            @change="saveUnit()"
          >
          </v-select>
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
import ResetPassword from "@/components/account/ResetPassword"
import DropzoneAvatar from "@/components/widgets/DropzoneAvatar";

import { mapActions, mapGetters } from 'vuex'

const blob_uri = 'https://ctmdevblobstore.blob.core.windows.net';

export default {
  name: "UserAccount",
  data() {
    return {
      userId: "3c2692a0-8768-4472-b9de-3fcb57fde1d9", //TODO: set userId on open  
      user: {
        id: "",
        fullName: "",
        email: "",
        gender: "Male",
        groupName: "",
        measure: 0,
        avatarURL: '',
        profile: {
          protein: 0,
          carbohydrate: 0,
          fat: 0,
          calories: 0
        }
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
        "userId": this.userId,
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
      console.log(this.$route.query);
      this.$router.push({ name: 'DashboardAdmin', query: { userId: this.$route.query.userId, user: this.$route.query.user } });
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
    var routeQuery = this.$route.query;
    if (routeQuery && routeQuery.userId && routeQuery.userId.length > 0) {
      this.userId = routeQuery.userId;
      this.getUser(this.userId).then(data => {
        this.user = data;
      });
    }
    if (this.getDataUserProfile.userRoles.indexOf("Admin") == -1) {
      this.isUser = true;
    }

  } 
}
</script>

<style lang="stylus">
  .hidden
    display none
</style>