<template>
  <v-app>
    <navbar />
    <div class="container">
      <nuxt />
    </div>
  </v-app>
</template>

<script>
import navbar from '../components/navBar'
export default {
  components: {
    navbar
  }
}

</script>

<style>
</style>
