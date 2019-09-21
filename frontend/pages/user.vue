<template>
  <div class="container">
    <v-row>
      <v-col
        v-for="n in cards"
        :key="n.name"
        cols="12"
        sm="4"
      >
        <card :name="n.name" :link="n.link" />
      </v-col>
    </v-row>
    <br>
    <blocks />
  </div>
</template>

<script>
import card from '../components/cards'
import blocks from '../components/blocks'

export default {
  components: {
    card,
    blocks
  },
  data: () => {
    return {
      cards: [
        {
          name: 'Create Event',
          link: 'event'
        },
        {
          name: 'Verify',
          link: 'verify'
        },
        {
          name: 'Add Specialization',
          link: 'spec'
        }
      ]
    }
  }
}
</script>

<style>
