<template>
  <v-card>
    <h2>Create new user</h2>
    <v-form v-model="valid">
      <v-layout wrap mb-3>
        <v-flex xs12>
          <v-text-field
            name="Name"
            label="Name"
            v-model="newUser.fullName"
            v-validate="'required'"
            :error-messages="errors.collect('fullName')"></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
          <v-select
            name="User type"
            :items="userTypes"
            item-text="title"
            item-value="title"
            v-model="newUser.userType"
            label="User type"
            v-validate="'required'"
            :error-messages="errors.collect('User type')"></v-select>
        </v-flex>
        <v-flex xs12 sm6>
          <v-radio-group v-model="newUser.gender" row
          :rules="[v => !!v || 'Item is required']" required>
            <v-radio label="Male" value="Male"></v-radio>
            <v-radio label="Female" value="Female"></v-radio>
          </v-radio-group>
        </v-flex>
        <v-flex xs12>
          <v-select
            name="group"
            :items="getGroupData"
            item-text="title"
            item-value="id"
            v-model="newUser.group"
            label="User group"
            v-validate="'required'"
            :error-messages="errors.collect('group')"></v-select>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            name="email"
            label="User email"
            v-model="newUser.email"
            v-validate="'required|email'"
            :error-messages="errors.collect('email')"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field 
            label="User temporary password" 
            type="password"
            :rules="[rules.required, rules.min]"
            name="input-10-1"
            hint="At least 6 characters"
            v-model="newUser.password">
          </v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-select
            :items="unitOfMeasure"
            v-model="newUser.unit"
            item-text="title"
            item-value="title"
            label="Measurement preference"></v-select>
        </v-flex>
        <div class="ma-auto">
          <v-btn color="primary"
            :disabled="!valid"
           @click="addUser" :loading="loading">Add user</v-btn>
        </div>
      </v-layout>
    </v-form>
  </v-card>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

export default {
  name: "CreateNewUser",
  data() {
    return {
      userTypes:[{
          title: "Normal",
          id: 0
        }, {
          title: "Coach",
          id: 1
        }, {
          title: "Admin",
          id: 2
        }],
      unitOfMeasure:[{
          title: "Metric",
          id: 0
        }, {
          title: "Imperial",
          id: 1
        }],
      ///api/admin/user?Email=namvu.itus&Password=N123456&Gender=Male&UserType=Coach&Measure=Metric
      newUser: {
        id: Math.floor(Math.random()*1000000),
        fullName: '',
        userType: 'Normal',//userTypes[0].id,
        gender: null, //gender[0].id,
        group: null,
        email: '',
        password: '',
        dateJoined: new Date(),
        checkbox: false,
        unit: 'Metric', //unitOfMeasure[0].id
      },
      loading: false,
      valid: false,
      group_list: [],
      rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 6 || 'Min 6 characters',
          //symbolNeeded: v => v.search(/[$-/:-?{-~!"^_`\[\]]/) != -1 || 'Symbol required'
      }
    }
  },
  computed: {
    ...mapGetters("admin", {
      getGroupData: "getGroupData",
      getUserData: "getUserData"
    }),
  },
  methods: {
    ...mapActions("admin", {
      createUser: "createUser"
    }),
    addUser() {
      // Validate before submit
      this.loading = true;
      this.$validator.validateAll().then((valid) => {
        if (valid) {
          return this.createUser(this.newUser).then(result => {
              if(!result.data) {
                this.createUserErrorCallback(result.errors);
                this.loading = false;
                return;
              }
              
              this.$emit('switchTab');
              this.newUser.fullName = "";
              this.newUser.email = "";
              this.newUser.password = "";
              this.loading = false;
              this.$toast.success('User added');
            }).catch( e => {
            
              console.log(e);
            });
          this.$emit('switchTab')
        }
      }).catch((error) => {
        console.log(error);
        this.$toast.error(error, {
              // override the global option
            position: 'bottom'
        });
      });
    },
    getGroupList() {
      this.loading = true;
      return new Promise((resolve, reject) => {
        var params = {
          Count: 999,
          Page: 1,
          Search: "",
          Sort: "",
        };
        this.$store
          .dispatch("admin/getgroups", params)
          .then(resp => {
            
            let items = resp.data;
            let total = resp.pagination.total;

            this.loading = false;
            resolve({
              items,
              total
            });
          })
          .catch(err => {
            this.loading = false;
            console.log(err);
          });
      });
    },
    createUserErrorCallback(error) {
      var err = Array.isArray(error) ? error[0] : error;
      this.$toast.error(err.errorMessage);
    }
  },
  mounted() {
    this.getGroupList().then(data => {
      this.group_list = data.items;
    });
  } 
}
</script>