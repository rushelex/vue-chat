<template>
  <div>
    <div v-if="name === 'admin'" class="system">
      <p class="system__msg">{{ text }}</p>
    </div>
    <div v-else class="wrap">
      <div class="msg" :class="{ 'msg--owner': owner }">
        <small
          ><strong>{{ name }}</strong></small
        >
        <p>{{ text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    owner: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.system {
  margin-bottom: 1rem;

  &__msg {
    max-width: 500px;
    margin: 0 auto;
    margin-bottom: 1rem;
    padding: 5px;
    display: block;
    text-align: center;
    background-color: rgba(#777, 0.4);
    border-radius: 100px;
    font-size: 0.8rem;
    font-weight: 300;
  }
}

.wrap {
  display: flex;
  flex-direction: column;
}

.msg {
  position: relative;
  width: 60%;
  margin: 0 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  box-shadow: 0 1px 0 0 rgba(50, 50, 50, 0.3);
  border-radius: 4px;
  background-color: #1976d2;
  word-break: break-word;

  p {
    margin-bottom: 0;
  }

  &--owner {
    background-color: #ffffff;
    color: #000000;
    align-self: flex-end;
  }
}
</style>
