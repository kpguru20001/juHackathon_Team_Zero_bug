<template>
  <div class="container">
    <br>
    <br>
    <br>
    <v-card
      min-height="250"
      max-width="344"
      class="mx-auto"
    >
      <div class="container">
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-select
            v-model="select"
            :items="org"
            :rules="[v => !!v || 'Item is required']"
            label="Item"
            required
          />

          <v-select
            v-model="select"
            :items="items"
            :rules="[v => !!v || 'Item is required']"
            label="Item"
            required
          />
          <br>
          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
          >
            Create
          </v-btn>
          <v-btn
            :disabled="!valid"
            color="orange lighten-3"
            class="mr-4"
            @click="reset"
          >
            Reset
          </v-btn>
        </v-form>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    name: '',
    select: null,
    items: [
      'BlockChain',
      'AI',
      'Web Dev',
      'Mobile App'
    ],
    org: [
      'Organization A',
      'Organization B',
      'Organization C',
      'Organization D'
    ],
    checkbox: false
  }),

  watch: {
    name () {
      this.$refs.form.resetValidation()
    },
    email () {
      this.$refs.form.resetValidation()
    }
  },

  methods: {
    validate () {
      if (!this.$refs.form.validate()) {
        this.snackbar = true
      } else {
        this.$router.push({ path: '/' })
      }
    },
    reset () {
      this.$refs.form.reset()
    }
  }

}
</script>

<style>

</style>
