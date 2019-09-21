<template>
  <div>
    <v-toolbar>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <div class="flex-grow-1" />

      <v-toolbar-title class="display-1 font-weight-medium">
        Dashboard
      </v-toolbar-title>

      <div class="flex-grow-1" />

      <v-avatar color="blue lighten-3">
        <v-icon dark>
          mdi-account-circle
        </v-icon>
      </v-avatar>
    </v-toolbar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn color="black" block dark>
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      drawer: null,
      items: [
        { title: 'Dashboard', icon: 'dashboard' },
        { title: 'Account', icon: 'account_box' },
        { title: 'Admin', icon: 'gavel' }
      ]
    }
  }
}
</script>

<style>

</style>
