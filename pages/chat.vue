<template>
  <div class="c-wrap">
    <div ref="block" class="c-chat">
      <v-slide-y-reverse-transition group>
        <Message
          v-for="m in messages"
          :key="m.text"
          :name="m.name"
          :text="m.text"
          :owner="m.id === user.id"
        />
      </v-slide-y-reverse-transition>
    </div>
    <div class="c-form">
      <ChatForm />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Message from '@/components/message'
import ChatForm from '@/components/chatForm'

export default {
  middleware: ['chat'],

  components: {
    Message,
    ChatForm
  },

  computed: mapState(['user', 'messages']),

  watch: {
    messages() {
      setTimeout(() => {
        if (this.$refs.block.scrollHeight) {
          this.$refs.block.scrollTop = this.$refs.block.scrollHeight
        }
      })
    }
  },

  head() {
    return {
      title: `Комната ${this.user.room}`
    }
  }
}
</script>

<style lang="scss" scoped>
.c-wrap {
  position: relative;
  height: 100%;
  overflow: hidden;
}

.c-form {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 80px;
  padding: 1rem;
  background-color: #212121;
}

.c-chat {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 80px;
  left: 0;
  padding: 1rem;
  overflow-y: auto;
}
</style>
