import { login, logout, getInfo } from '@/api'
import { getToken, setToken, removeToken } from '@/utils/auth'

const getDefaultState = () => {
  return {
    token: getToken(),
    uid: 0,
    name: '',
    avatar: '',
    loginDialog: false
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_UID: (state, uid) => {
    state.uid = uid
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_LOGIN_DIALOG: (state, loginDialog) => {
    state.loginDialog = loginDialog
  },
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password, captcha, captcha_id } = userInfo
    return new Promise((resolve, reject) => {
      login({ phone: username, pwd: password, captcha: "123" }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const {id, name} = data
        commit('SET_UID', id)
        commit('SET_NAME', name)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },

  showLogin({ commit }){
    return new Promise( resolve =>{
      commit('SET_LOGIN_DIALOG',!state.loginDialog)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

