<template>
  <div>
    <v-combobox
      v-model="chips"
      :items="items"
      chips
      clearable
      label="Filter Specialization"
      multiple
      prepend-icon="filter_list"
      solo
    >
      <template v-slot:selection="{ attrs, item, select, selected }">
        <v-chip
          v-bind="attrs"
          :input-value="selected"
          close
          @click="select"
          @click:close="remove(item)"
        >
          <strong>{{ item }}</strong>&nbsp;
          <span>(Specialization)</span>
        </v-chip>
      </template>
    </v-combobox>
  </div>
</template>

<script>
export default {

  data () {
    return {
      chips: [],
      items: ['Blockchain', 'AI', 'Javascript']
    }
  },
  watch: {
    chips () {
      console.log(this.chips)
    }
  },

  methods: {
    remove (item) {
      this.chips.splice(this.chips.indexOf(item), 1)
      this.chips = [...this.chips]
    }
  }
}
</script>

<style>

</style>
