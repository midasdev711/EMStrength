<template>
  <v-card class="mt-4 pa-0">
    <v-container class="pa-2">
      <v-progress-linear
          :indeterminate="query"
          :query="true"
          v-model="value"
          :active="show"
        ></v-progress-linear>
      <v-layout overflow-hidden pl-5 mb-2>
        <v-flex
          xs12
          md9
        >
          <h2>Group name: {{groupName}}</h2>
        </v-flex>
        <!-- <v-flex
          xs12
          md3
        >
          <v-text-field
            @input="searchInput"
            append-icon="search"
            label="Search message"
            single-line
            hide-details
            class="add-item__search">
          </v-text-field>
        </v-flex> -->
      </v-layout>
      <v-layout overflow-hidden wrap messages__list pl-5 pr-2>
        <!-- LIST OF MESSAGES -->
        <v-flex
          xs9
          v-for="(message, index) in messages"
          :key="index"
          class="messages__list__message-info"
          :class="{ 'offset-xs2 mr-5' : message.me}">
          <v-avatar v-if="message.me" class="messages__list__avatar messages__list__avatar--right" size="35px"><img v-bind:src="getAvatarPath(message.senderUser)" alt="recipient"></v-avatar>
          <v-avatar v-else class="messages__list__avatar messages__list__avatar--left" size="35px"><img v-bind:src="getAvatarPath(message.senderUser)" alt="sender"></v-avatar>
          <time class="ml-4">{{ message.time | fromNow }} <span v-if="!message.me"><small>{{getUserName(message.senderUser)}}</small></span> </time> 
          <div class="messages__list__message">{{ message.content }}
          </div>
        </v-flex>
      </v-layout>

      <!-- ADDING A MESSAGE -->
      <v-layout class="messages__form">
        <v-flex xs8 sm9>
          <v-textarea
            outline
            v-model="message"
            :rows="2"
            class="messages__form__message"
          ></v-textarea>
        </v-flex>
        <v-flex xs4 sm3 class="pr-3 pl-1">
          <v-btn
            type="submit"
            color="secondary"
            class="messages__btn"
            block
            :disabled="message===``"
            @click="addMessage()"
            :loading="loading">
            Send
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>

  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import moment from 'moment';
import debounce from "debounce";

import { getChatById } from "@/api/chat"
import { getUserById } from "@/api/user"

export default {
  name: `Messages`,
  data() {
    return {
      message: ``,
      groupName: 'unknown',
      messages: [
        {
          me: false,
          time: '2019-10-30T04:51:57.08+00:00',
          senderUser: {
            id: 0,
            userName: "jenny@theblock",
            fullName: "Jenny Smith",
            avatarURL: '/static/avatar/man_4.jpg'
          },
          recipientUser: {
            id: 1,
            userName: "ian@nus",
            fullName: "Ian Coach",
            avatarURL: '/static/avatar/man_2.jpg'
          },
          content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
          me: true,
          time: '2019-10-30T03:51:57.08+00:00',
          content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
          ,senderUser: {
            id: 0,
            userName: "jenny@theblock",
            fullName: "Jenny Smith",
            avatarURL: '/static/avatar/man_4.jpg'
          },
          recipientUser: {
            id: 1,
            userName: "ian@nus",
            fullName: "Ian Coach",
            avatarURL: '/static/avatar/man_2.jpg'
          },
        }
      ],
      loading: false,
      searchKeyword: '',
      showMobileUserList: false,
      //Query progress
      value: 0,
      query: false,
      show: true,
      interval: 0
    };
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
      }
      let chat = getChatById(this.$route.params.uuid)
      return Object.assign(chatOrigin, chat)
    },
    computeHeight() {
      return {
        height: this.height || ""
      }
    }
  },
  filters: {
    fromNow(time) {
      const date = moment(time)
      return date.fromNow();
    }  
  },
  watch: {
    searchKeyword: function(newProps, oldProps){
      console.log(this.searchKeyword);
    }
  },
  methods: {
    ...mapActions("app", {
      getMessages: "getMessages",
      sendMessage: "sendMessage",
    }),

    searchInput: debounce(function (e) {
      this.searchKeyword = e;
    }, 300),

    getMessagesData() {
      const params = {
        weekNo: null
      }
      this.getMessages(params).then(result => {
        console.log(result);
        this.messages = result;
        this.query = false;
        this.show = false;
      }) 
    },
    getAvatar(uid) {
      return getUserById(uid).avatar
    },
    addMessage(){
      this.loading = true;
      const formData = {
        userId: null, // "c9473729-a419-454b-afd4-e0d0fd31dd17", // temporary until FK fixed
        message: this.message
      };
      console.log("addMessage called", formData);
      this.sendMessage(formData).then(result => {
        this.message = "";
        this.loading = false;
        // let tmp = Object.assign({}, result);
        // tmp['me'] = true;
        // // this.messages.push(tmp);
        setTimeout(() => this.scrollToTheLast(), 1)

      }).catch( e => {
        console.log(e);
      });
    },
    scrollToTheLast(){
      // Scroll to the last message
      const messageBox = this.$el.querySelector('.messages__list');
      if (messageBox !== null) {
        messageBox.scrollTop = messageBox.scrollHeight;
      }
    },
    getAvatarPath(user) {
      if (user && user.avatarURL) 
        return user.avatarURL;
      else
        return '/static/avatar/man_2.jpg';
    },
    getUserName(user) {
      if (user && user.userName) 
      {
        if (user.fullName)
          return user.fullName;
        else
          return user.userName;
      }
      else
        return 'You';
    },
    queryAndIndeterminate () {
        this.query = true
        this.show = true
        this.value = 0
        this.query = false

        this.interval = setInterval(() => {
          if (this.query == true)
          { 
            if (this.value === 100) {
              clearInterval(this.interval)
              this.show = false
              return setTimeout(this.queryAndIndeterminate, 2000)
            }
          }
          this.value += 25
        }, 1000)
    }
    //message.senderUser.userName
  },
  mounted() {
    console.log("MOUNTED: get Messages");
    this.queryAndIndeterminate();
    this.userId = this.getDataUserProfile.id;
    this.groupName = this.getDataUserProfile.groupName;
    this.getMessagesData();

    setTimeout(() => this.scrollToTheLast(), 2000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>

<style lang="stylus" scoped>
@media (max-width: 600px)
  .messages__form
    width 100%
</style>