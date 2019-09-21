<template>
  <v-app>
    <div class="backdrop" />
    <div class="container cardContainer">
      <v-card
        class="mx-auto card"
        max-width="450"
        min-height="450"
        raised
        elevation="6"
      >
        <v-progress-linear
          :active="loading"
          indeterminate
          color="blue"
          height="3"
        />
        <div class="container">
          <br>
          <h1>
            Blockifier
          </h1>
          <br>
          <div class="container">
            <v-text-field
              v-model="email"
              label="email"
              solo
              type="email"
              :error-messages="errorMessages"
              :error="error"
              rounded
              required
            />
            <br>
            <v-text-field
              v-model="password"
              :append-icon="show ? 'visibility' : 'visibility_off'"
              :rules="[rules.required]"
              :type="show ? 'text' : 'password'"
              label="password"
              :error-messages="errorMessages"
              :error="error"
              solo
              rounded
              required
              @click:append="show = !show"
            />
          </div>
          <v-btn
            color="primary"
            elevation="3"
            rounded
            @click="login"
          >
            Login
          </v-btn>
        </div>
      </v-card>
    </div>
  </v-app>
</template>

<script>
export default {
  layout: 'blank',
  data: () => ({
    show: false,
    error: false,
    errorMessages: '',
    loading: false,
    selection: 1,
    active: true,
    users: '',
    email: '',
    password: '',
    rules: {
      required: value => !!value || 'Required.'
    },
    methods: {
      login () {
        if (!this.$refs.form.validate()) {
          this.snackbar = true
        } else {
          this.$router.push({ path: '/' })
        }
      }
    }
  })

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
