<template>
  <v-dialog v-model="dialog" persistent width="360">
    <v-card-title class="headline primary pl-4 pr-3 white--text">
      Update Macros
      <v-spacer></v-spacer>
      <v-btn icon dark @click="close">
        <v-icon>close</v-icon>
      </v-btn>
    </v-card-title>
    <v-card class="macros">
      <form action="">
        <p>Change macros below:</p>
        <v-layout>
          <v-flex xs4>Protein</v-flex>
          <v-flex xs4>
            <v-text-field
              name="Protein"
              v-model="macros.protein"
              type="number"
              v-validate="'required'"
              :error-messages="errors.collect('Protein')"></v-text-field>
          </v-flex>
          <v-flex xs4>{{ proteinPorcentage }}%</v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs4>Carbohydrate</v-flex>
          <v-flex xs4>
            <v-text-field
              name="Carbohydrate"
              v-model="macros.carbohydrate"
              type="number"
              v-validate="'required'"
              :error-messages="errors.collect('Carbohydrate')"></v-text-field>
          </v-flex>
          <v-flex xs4>{{ carbohydratePorcentage }}%</v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs4>Fat</v-flex>`
          <v-flex xs4>
            <v-text-field
              name="Fat"
              v-model="macros.fat"
              type="number"
              v-validate="'required'"
              :error-messages="errors.collect('Fat')"></v-text-field>
          </v-flex>
          <v-flex xs4>{{ fatPorcentage }}%</v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs4>Calories</v-flex>
          <v-flex xs4>
            <v-text-field 
              v-model="macros.calories"
              type="number"
              v-validate="'required'"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <div class="text-xs-center"><v-btn color="primary" @click="setMacros()">Update Macros</v-btn></div>
      </form>
    </v-card>
  </v-dialog>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  name: "Macros",
  props: {
    userId: String,
    macrosDialog: {
      type: Boolean,
      default: false
    },
    macros: Object

  },
  data() {
    return {
      // macros: {
      //   protein: 200,
      //   carbohydrate: 390,
      //   fat: 70,
      //   calories: 4500
      // }
    }
  },
  computed: {
    dialog: {
      get() {
        return this.macrosDialog;
      },
      set(value) {
        this.$emit("update:macrosDialog", value);
      }
    },
    proteinPorcentage() {
      return (parseInt(this.macros.protein) / (parseInt(this.macros.protein) + parseInt(this.macros.carbohydrate) + parseInt(this.macros.fat)) * 100).toFixed(2)
    },
    carbohydratePorcentage() {
      return (parseInt(this.macros.carbohydrate) / (parseInt(this.macros.protein) + parseInt(this.macros.carbohydrate) + parseInt(this.macros.fat)) * 100).toFixed(2)
    },
    fatPorcentage() {
      return (parseInt(this.macros.fat) / (parseInt(this.macros.protein) + parseInt(this.macros.carbohydrate) + parseInt(this.macros.fat)) * 100).toFixed(2)
    }
  },
  methods: {
    ...mapActions("admin", {
      updateMacros: "updateMacros",
    }),
    setMacros() {
      var params = 
      {
        userId: this.userId,
        protein: this.macros.protein,
        carbohydrate: this.macros.carbohydrate,
        fat: this.macros.fat,
        calories: this.macros.calories
      }

      return this.updateMacros(params).then(result => {
        this.$toast.success('Successfully updated');
        this.close();
      }).catch( e => {
        console.log(e);
      });
    },
    close() {
      this.dialog = false
      this.$emit('update:macrosDialog', false);
    }
  }
}
</script>

<style lang="stylus">
.macros
  .v-text-field
    padding-top: 0
    margin-top: -10px
    margin-right: 25px
</style>