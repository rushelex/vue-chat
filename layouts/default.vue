<template>
  <v-app app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list subheader>
        <v-subheader>Пользователи в чате</v-subheader>

        <v-list-item v-for="u in users" :key="u.id" @click.prevent>
          <v-list-item-avatar>
            <v-img :src="u.avatar"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ u.name }}</v-list-item-title>
          </v-list-item-content>

          <v-list-item-icon>
            <v-icon :color="u.active ? 'primary' : 'grey'">mdi-message</v-icon>
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
      <div class="ma-12">
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
      drawer: false,
      users: [
        {
          id: 1,
          name: 'User 1',
          active: false
        },
        {
          id: 2,
          name: 'User 2',
          active: true
        },
        {
          id: 3,
          name: 'User 3',
          active: false
        }
      ]
    }
  },

  computed: mapState(['user']),

  methods: {
    ...mapMutations(['clearData']),
    exit() {
      this.$router.push('/?message=leftChat')
      this.clearData()
    }
  }
}
</script>
