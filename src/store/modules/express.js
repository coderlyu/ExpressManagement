import { toSave, getList, toDelete, toUpdate } from '@/api/express'
const state = {
}
const mutations = {
}
const actions = {
  toSave ({ commit, rootState }, express) {
    return new Promise((resolve, reject) => {
      express.postId = rootState.user.userId
      toSave(express).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getList ({ commit }, express) {
    return new Promise((resolve, reject) => {
      console.log(express)
      getList(express).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  toDelete ({ commit }, express) {
    return new Promise((resolve, reject) => {
      toDelete(express).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  toUpdate ({ commit }, express) {
    return new Promise((resolve, reject) => {
      toUpdate(express).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
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
