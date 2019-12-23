const getters = {
  userId: state => state.user.userId,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  phone: state => state.user.phone,
  userName: state => state.user.userName,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  leftOpened: state => state.app.leftOpened
}
export default getters
