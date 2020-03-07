<template>
  <v-text-field
    v-model="text"
    label="Введите сообщение"
    outlined
    @keydown.enter="send"
  />
</template>

<script>
export default {
  data: () => ({
    text: ''
  }),

  methods: {
    send() {
      this.$socket.emit(
        'createMessage',
        {
          text: this.text,
          id: this.$store.state.user.id
        },
        (data) => {
          if (typeof data === 'string') {
            console.error(data)
          } else {
            this.text = ''
          }
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped></style>
