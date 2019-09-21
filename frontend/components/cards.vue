<template>
  <v-card>
    <v-card-text>
      <div class="headline mb-2">
        {{ name }}
      </div>
    </v-card-text>

    <v-card-actions>
      <nuxt-link :to="link">
        <v-btn text color="success">
          Go
        </v-btn>
      </nuxt-link>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style>

</style>
