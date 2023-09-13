const getters = {
  token: state => state.user.token,
  uid: state => state.user.uid,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  loginDialog: state => state.user.loginDialog
}
export default getters
