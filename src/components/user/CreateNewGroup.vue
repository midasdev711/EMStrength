<template>
  <v-card>
    <h2>Create new group</h2>
    <form>
      <v-layout wrap mb-3>
        <v-flex xs12>
          <v-text-field
            name="Name"
            label="Name"
            v-model="title"
            v-validate="'required'"
            :error-messages="errors.collect('Name')"></v-text-field>
        </v-flex>
        <div class="ma-auto">
          <v-btn color="primary" @click="save" :loading="loading">Add group</v-btn>
        </div>
      </v-layout>
    </form>
  </v-card>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  name: "CreateNewGroup",
  data() {
    return {
      title: "",
      loading: false
    }
  },
  methods: {
    ...mapActions("admin", {
      createGroup: "createGroup"
    }),
    save() {
      // Validate before submit
      const formData = {
        title: this.title
      };
      this.loading = true;
      return this.createGroup(formData).then(result => {
        this.loading = false;
        if(!result.data) {
          this.createGroupErrorCallback(result.errors);
          return;
        }
        this.$emit('switchTab');
        this.title = "";
        this.$toast.success('Group added');
      }).catch( e => {
        console.log(e);
      });
    },
    createGroupErrorCallback(error) {
      var err = Array.isArray(error) ? error[0] : error;
      this.$toast.error(err.errorMessage);
    }
  }
}
</script>