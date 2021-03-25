import { login, register, getInfo, getList } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
const state = {
  name: '',
  userName: '',
  userId: getToken() || '',
  avatar: '',
  phone: '',
  introduction: '',
  roles: 1
}
const mutations = {
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_USER_ID: (state, userId) => {
    state.userId = userId
    setToken(userId)
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_PHONE: (state, phone) => {
    state.phone = phone
  },
  SET_USERNAME: (state, userName) => {
    state.userName = userName
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}
const actions = {
  login ({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      /**
       * 替换成后面的真实接口，现在模拟用户切换
       */
      if (username === 'admin' && password === '123456') {
        commit('SET_USER_ID', 'admin')
        commit('SET_USERNAME', username)
        commit('SET_NAME', 'admin')
        commit('SET_ROLES', 2)
        commit('SET_PHONE', 123456789)
        resetRouter()
        resolve(username)
      } else if (username === 'user' && password === '123456') {
        commit('SET_USER_ID', 'user')
        commit('SET_USERNAME', username)
        commit('SET_NAME', 'user')
        commit('SET_ROLES', 1)
        commit('SET_PHONE', 178574873874)
        resetRouter()
        resolve(username)
      } else {
        reject(new Error('用户密码错误'))
      }
      // login({ username: username.trim(), password: password }).then(response => {
      //   const { userId, userName, type, name, phone } = response.extend.data
      //   commit('SET_USER_ID', userId)
      //   commit('SET_USERNAME', userName)
      //   commit('SET_NAME', name)
      //   commit('SET_ROLES', type)
      //   commit('SET_PHONE', phone)
      //   resetRouter()
      //   resolve(response)
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },
  register ({ commit }, userInfo) {
    const { nickname, username, password, phone } = userInfo
    console.log(userInfo)
    return new Promise((resolve, reject) => {
      let user = {
        name: nickname.trim(),
        userName: username.trim(),
        userPassword: password,
        phone,
        type: 1
      }
      register(user).then(data => {
        resolve(data)
        console.log('register', data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  logout ({ commit, state }) {
    return new Promise((resolve, reject) => {
      try {
        commit('SET_USER_ID', '')
        commit('SET_USERNAME', '')
        commit('SET_NAME', '')
        commit('SET_PHONE', '')
        commit('SET_ROLES', 1)
        removeToken()
        resetRouter()
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  },
  async getInfo ({ commit, state }) {
    return new Promise(async (resolve, reject) => {
      getInfo(state.userId).then(async response => {
        const { userName, type, name, phone } = response.extend.data
        await commit('SET_USERNAME', userName)
        await commit('SET_NAME', name)
        await commit('SET_ROLES', type)
        await commit('SET_PHONE', phone)
        resetRouter()
        resolve(response)
      }).catch(err => {
        reject(err)
      })
    })
  },
  getList ({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      console.log(userInfo)
      getList(userInfo).then(data => {
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
