<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8>
      <v-card min-width="500">
        <v-card-title class="mb-10">
          <h1>Nuxt чат</h1>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="name"
              :counter="16"
              :rules="nameRules"
              label="Ваше имя"
              required
              @keydown.enter="submit"
            ></v-text-field>

            <v-text-field
              v-model="room"
              :rules="roomRules"
              label="Введите комнату"
              required
              @keydown.enter="submit"
            ></v-text-field>

            <v-btn :disabled="!valid" color="primary" @click="submit"
              >Войти</v-btn
            >
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>

    <v-snackbar v-model="snackbar" :timeout="6000" top>
      {{ message }}
      <v-btn color="red" text @click="snackbar = false">
        Закрыть
      </v-btn>
    </v-snackbar>
  </v-layout>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data: () => ({
    valid: true,
    snackbar: false,
    message: '',
    name: '',
    nameRules: [
      (v) => !!v || 'Введите имя',
      (v) => (v && v.length <= 16) || 'Имя не должно превышать 16 символов'
    ],
    room: '',
    roomRules: [(v) => !!v || 'Введите комнату']
  }),

  layout: 'empty',

  sockets: {
    connect() {
      console.log('Client IO connected')
    }
  },

  mounted() {
    const { message } = this.$route.query

    if (message === 'noUser') {
      this.message = 'Ошибка: введите данные'
    } else if (message === 'leftChat') {
      this.message = 'Вы вышли из чата'
    }

    this.snackbar = !!this.message
  },

  methods: {
    ...mapMutations(['setUser']),
    submit() {
      if (this.$refs.form.validate()) {
        const user = {
          name: this.name,
          room: this.room
        }

        this.$socket.emit('userJoined', user, (data) => {
          if (typeof data === 'string') {
            console.error(data)
          } else {
            user.id = data.userId
            this.setUser(user)
            this.$router.push('/chat')
          }
        })
      }
    }
  },

  head() {
    return {
      title: 'Nuxt чат'
    }
  }
}
</script>
