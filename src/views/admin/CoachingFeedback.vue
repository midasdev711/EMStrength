<template>
  <div>
    <v-btn color="primary right mb-3 mt-0 mr-4" dark @click.native.prevent="archiveThread()" :loading="archiveLoading">Archive</v-btn>
    <h1
      class="mt-4 ml-4"
    >Coaching Feedback / {{ $route.query.user }} {{userName}}</h1>
    <v-card class="mt-4">
      <h2 v-if="$route.query.group">Group name: {{groupName}}</h2>

      <v-layout overflow-hidden wrap messages__list pl-5>
        <!-- LIST OF MESSAGES -->
        <v-flex
          xs9
          v-for="(message, index) in messages"
          :key="index"
          class="messages__list__message-info"
          :class="{ 'offset-xs2 mr-5' : message.me}"
        >
          <v-avatar
            v-if="message.me"
            class="messages__list__avatar messages__list__avatar--right"
            size="35px"
          >
            <img :src="getAvatarPath(message.senderUser)" alt />
          </v-avatar>
          <v-avatar v-else class="messages__list__avatar messages__list__avatar--left" size="35px">
            <img :src="getAvatarPath(message.senderUser)" alt />
          </v-avatar>
          <time class="ml-4">{{ message.time | fromNow }} <span v-if="!message.me"><small>{{getUserName(message.senderUser)}}</small></span></time>
          <div
            class="messages__list__message"
          >{{ message.content }}</div>
        </v-flex>
      </v-layout>

      <!-- ADDING A MESSAGE -->
      <form class="messages__form">
        <v-container grid-list-xl>
          <v-layout>
            <v-flex xs7 sm9>
              <v-textarea outline v-model="message" :rows="2" class="messages__form__message"></v-textarea>
            </v-flex>
            <v-flex xs4 sm3>
              <v-btn
                type="submit"
                color="secondary"
                class="messages__btn"
                block
                :disabled="message===``"
                :loading="loading"
                @click.native.prevent="addMessage()"
              >Send</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </form>
    </v-card>
  </div>
</template>

<script>
import { getChatById } from "@/api/chat";
import { getUserById } from "@/api/user";

import moment from "moment";

import { mapActions, mapGetters } from "vuex";

export default {
  name: `Messages`,
  data() {
    return {
      threadUserId: "", //TODO: set userId on select
      weekNo: "", //TODO: set on select
      userName: "", //TODO: set from selected user
      message: ``,
      groupName: ``,
      groupId: "",
      loading: false,
      archiveLoading: false,
      messages: [
        {
          me: false,
          time: "2 days ago",
          senderUser: {
            id: 0,
            userName: "",
            fullName: "Jenny Smith",
            avatarUrl: "/static/avatar/man_4.jpg"
          },
          content:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
          me: true,
          time: "2 days ago",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
          me: false,
          time: "2 days ago",
          senderUser: {
            id: 1,
            userName: "",
            fullName: "Ian Coach",
            avatarUrl: "/static/avatar/man_2.jpg"
          },
          content:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
          me: true,
          time: "2 days ago",
          senderUser: {
            id: 0,
            userName: "",
            fullName: "Jenny Smith",
            avatarUrl: "/static/avatar/man_4.jpg"
          },
          content: "Mollitia quibusdam repellat repellendus suscipit ullam!"
        }
      ],
      showMobileUserList: false
    };
  },
  watch: {
    "$route.query"(newQuery, oldQuery) {
      if (
        this.getDataUserProfile.userRoles &&
        this.getDataUserProfile.userRoles.indexOf("Coach") > -1
      ) {
        this.isCoach = true;
      } else {
        this.isCoach = false;
      }
      if (newQuery && newQuery.userId && newQuery.userId.length > 0) {
        if (this.userId != newQuery.userId) {
          var today = new Date();
          this.threadUserId = newQuery.userId;
          this.userName = newQuery.user;
          this.groupId = newQuery.group;
          this.getMessageData();
        }
      }
    }
  },
  computed: {
    ...mapGetters("auth", {
      getDataUserProfile: "getDataUserProfile"
    }),
    chat() {
      let chatOrigin = {
        title: "Chat",
        users: [],
        messages: []
      };
      let chat = getChatById(this.$route.params.uuid);
      return Object.assign(chatOrigin, chat);
    },
    computeHeight() {
      return {
        height: this.height || ""
      };
    }
  },
  filters: {
    fromNow(time) {
      const date = moment(time);
      return date.fromNow();
    }
  },
  methods: {
    ...mapActions("admin", {
      sendMessage: "sendMessage",
      messagesArchive: "messagesArchive",
      getMessageThread: "getMessageThread"
    }),
    getMessageData() {
      const params = {
        userId: this.threadUserId,
        weekNo: null
      };
      console.log(params);
      this.getMessageThread(params).then(result => {
        console.log(result);

        this.messages = result;
      });
    },
    getAvatar(uid) {
      return getUserById(uid).avatar;
    },
    addMessage() {
      const formData = {
        message: this.message,
        userId: this.threadUserId,
        weekNo: moment().isoWeek()
      };
      this.loading = true;
      this.sendMessage(formData)
        .then(result => {
          
          this.message = "";
          // result.me = true;
          // this.messages.push(result);
          this.loading = false;
          setTimeout(() => this.scrollToTheLast(), 1);
        })
        .catch(e => {
          console.log(e);
        });
    },
    archiveThread() {
      this.archiveLoading = true;
      return this.messagesArchive(this.threadUserId)
        .then(result => {
          this.archiveLoading = false;
          this.$toast.success('Successfully archived');
          this.$router.push({ name: 'CoachingFeedbackAdmin' });
          this.messages = [];
        })
        .catch(e => {
          console.log(e);
        });
    },
    scrollToTheLast() {
      // Scroll to the last message
      const messageBox = document.querySelector(".messages__list");
      if (messageBox !== null) {
        messageBox.scrollTop = messageBox.scrollHeight;
      }
    },
    getAvatarPath(user) {
      if (user && user.avatarURL) return user.avatarURL;
      else return "/static/avatar/man_2.jpg";
    },
    getUserName(user) {
      if (user && user.userName) {
        if (user.fullName) return user.fullName;
        else return user.userName;
      } else return "You";
    }
  },
  mounted() {
    console.log("Coaching Feedback MOUNTED");
    console.log(this.$route.query);
    this.threadUserId = this.$route.query.userId;

    this.getMessageData();
    setTimeout(() => this.scrollToTheLast(), 2000);
  }
};
</script>
