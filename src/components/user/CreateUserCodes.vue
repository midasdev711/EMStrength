<template>
  <v-card>
    <h2>Create User Codes </h2>
    <form>
      <v-layout wrap mb-3>
        <v-flex xs12>
          <v-select
            v-model="groupId"
          
            :items="getGroupData"
            :item-text="'title'"
            :item-value="'id'"
            >
          </v-select>
          <v-text-field
            name="Qty"
            label="Qty"
            v-model="qty"
            v-validate="'required'"
            :error-messages="errors.collect('Qty')"></v-text-field>
        </v-flex>
        <div class="ma-auto">
          <v-btn color="primary" @click="save" :loading="loading">Create codes</v-btn>
        </div>
      </v-layout>
    </form>
  </v-card>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

export default {
  name: "CreateUserCodes",
  data() {
    return {
      groupId: "",
      qty: 1,
      loading: false
    }
  },
  computed: {
    ...mapGetters("admin", {
      getGroupData: "getGroupData",
    }),
  },
  methods: {
    ...mapActions("admin", {
      _postGenerateUserCodes: "postGenerateUserCodesDownload"
    }),
    save() {
      // Validate before submit
      const formData = {
        groupId: this.groupId,
        qty: this.qty
      };
      this.loading = true;

      return this._postGenerateUserCodes(formData).then(result => {
        this.loading = false;
        this.$toast.success('Generated User codes for group');
        console.log(result);
        
      }).catch( e => {
        console.log(e);
      });

      /*return this._postGenerateUserCodes(formData).then(result => {
        this.loading = false;
        if(!result.data) {
          this.postGenerateUserCodesErrorCallback(result.errors);
          return;
        }
        this.$emit('switchTab');
        this.title = "";
        this.$toast.success('Generated User codes for group');
      }).catch( e => {
        console.log(e);
      });*/
    },
    postGenerateUserCodesErrorCallback(error) {
      var err = Array.isArray(error) ? error[0] : error;
      this.$toast.error(err.errorMessage);
    }
  }
}
</script>