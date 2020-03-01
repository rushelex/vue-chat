export const state = () => ({})

export const actions = {
  SOCKET_newMessage(cts, data) {
    console.log('Message received', data)
  }
}
