<template>
  <v-card
    class="mx-auto"
    max-width="344"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-title class="headline mb-1">
        {{ name }}
      </v-list-item-title>
      </v-list-item-content>

      <v-list-item-avatar
        size="80"
        color="grey"
      >
        <v-img src="https://randomuser.me/api/portraits/men/88.jpg" />
      </v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn color="error">
        Reject
      </v-btn>
      <v-btn color="success">
        Approve
      </v-btn>
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
    empid: {
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
