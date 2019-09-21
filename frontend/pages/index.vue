<template>
  <v-app>
    <div class="backdrop" />
    <div class="container cardContainer">
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
            <v-text-field
              v-model="name"
              label="User Name"
              required
            />

            <v-text-field
              v-model="pass"
              label="password"
              type="password"
              required
            />

            <br>
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="validate"
            >
              Login
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
  </v-app>
</template>

<script>
export default {
  layout: 'blank',
  data: () => ({
    valid: true,
    name: '',
    show2: false,
    pass: '',
    select: null,
    items: [
      'BlockChain',
      'AI',
      'Web Dev',
      'Mobile App'
    ],
    checkbox: false
  }),
  watch: {
    name () {
      this.$refs.form.resetValidation()
    },
    pass () {
      console.log('testing')
    }
  },

  methods: {
    validate () {
      if (!this.$refs.form.validate()) {
        this.snackbar = true
        console.log('not valid')
      } else {
        this.$router.push({ path: '/user' })
      }
    },
    reset () {
      this.$refs.form.reset()
    }
  }
}
</script>

<style>
h1 {
  font-size: 2.6rem;
}

.cardContainer {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 80%;
  padding: 20px;
  text-align: center;
  overflow: hidden;
  color: white;
  font-family: "Montserrat", "Raleway";
}

.backdrop {
  width: 100vw;
  height: 100vh;
  background-image: url("https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
  overflow-x: hidden;
  filter: blur(3px);
}
</style>
