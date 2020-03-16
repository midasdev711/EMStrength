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
            v-validate="'required'"
            >
          </v-select>
          <v-text-field
            name="Qty"
            label="Qty"
            v-model="qty"
            type="number"
            :rules="rules"
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
      groupId: null, 
      qty: 1,
      loading: false,
      rules: [
        v => !!v || 'Required',
        v => v > 0 || 'Quantity should be bigger than 0',
      ],
    }
  },
  computed: {
    ...mapGetters("admin", {
      getGroupData: "getGroupData",
    }),
  },
  methods: {
    ...mapActions("admin", {
      _postGenerateUserCodes: "postGenerateUserCodes"
    }),
    save() {
      // Validate before submit
      const formData = {
        groupId: this.groupId,
        qty: this.qty
      };

      if (this.groupId == null ) {
        this.$toast.warning("Please select a group");
        return;
      }

      if (this.qty < 1) {
        this.$toast.warning("Please input valid quantity");
        return;
      }

      this.loading = true;

      return this._postGenerateUserCodes(formData).then(result => {
        this.loading = false;
        this.$toast.success('Generated User codes for group');
        console.log(result);

      }).catch( e => {
        this.$toast.error(e);
      });
    },
    postGenerateUserCodesErrorCallback(error) {
      var err = Array.isArray(error) ? error[0] : error;
      this.$toast.error(err.errorMessage);
    }
  }
}
</script>