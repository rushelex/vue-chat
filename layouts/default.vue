<template>
  <v-app app>
    <v-navigation-drawer v-model="drawer" app mobile-break-poink="650">
      <v-list subheader>
        <v-subheader>Пользователи в чате</v-subheader>

        <v-list-item v-for="u in users" :key="u.id" @click.prevent>
          <v-list-item-content>
            <v-list-item-title>{{ u.name }}</v-list-item-title>
          </v-list-item-content>

          <v-list-item-icon>
            <v-icon :color="u.id === user.id ? 'primary' : 'grey'"
              >mdi-message</v-icon
            >
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-btn class="ml-2" icon @click="exit">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title class="ml-2"
        >Чат комнаты {{ user.room }}</v-toolbar-title
      >
    </v-app-bar>

    <v-content>
      <div style="height: 100%;">
        <nuxt />
      </div>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      drawer: true
    }
  },

  computed: mapState(['user', 'users']),

  methods: {
    ...mapMutations(['clearData']),
    exit() {
      this.$socket.emit('userLeft', this.user.id, () => {
        this.$router.push('/?message=leftChat')
        this.clearData()
      })
    }
  }
}
</script>

<style lang="scss">
html {
  overflow: hidden;
}
</style>
