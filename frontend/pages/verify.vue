<template>
  <div class="container">
    <br>
    <br>
    <br>
    <v-row>
      <v-col
        v-for="n in cards"
        :key="n.name"
        cols="12"
        sm="4"
      >
        <vericard :name="n.name" :empid="n.emdId" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import vericard from '../components/veriCard'

export default {
  components: {
    vericard
  },
  data: () => ({
    cards: [
      {
        name: 'A',
        empID: '1'
      },
      {
        name: 'B',
        empID: '2'
      },
      {
        name: 'C',
        empID: '3'
      },
      {
        name: 'C',
        empID: '3'
      },
      {
        name: 'C',
        empID: '3'
      }
    ]
  })
}
</script>

<style>

</style>
