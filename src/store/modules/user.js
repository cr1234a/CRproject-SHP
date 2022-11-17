import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter, asyncRoute, anyRoute, constantRoutes } from '@/router'
import router from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    routes: [],
    buttons: [],
    roles: [],
    // 异步路由
    asyncRoutes: [],
    // 最终的路由
    Aroutes: []
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
  USER_USERINFO: (state, data) => {
    state.name = data.name
    state.avatar = data.avatar
    state.routes = data.routes
    state.buttons = data.buttons
    state.roles = data.roles
  },
  SET_ASYNCROUTE: (state, route) => {
    state.asyncRoutes = route
    state.Aroutes = constantRoutes.concat(state.asyncRoutes, anyRoute)
    router.addRoutes(state.Aroutes)
  },
  // GET:(state,asyncRoutes)=>{
  //      router.addRoutes(state.routes)
  // }
}

// 对比路由的函数
function getResRoute(asyncRoute, route) {
  return asyncRoute.filter(item => {
    if (route.indexOf(item.name) != -1) {
      if (item.children && item.children.length) {
        item.children = getResRoute(item.children, route)
      }
      return true
    }
  })
}
const actions = {
  // user login
  async login({ commit }, userInfo) {
    const { username, password } = userInfo
    let res = await login({ username: username.trim(), password: password })
    if (res.code == 20000) {
      commit('SET_TOKEN', res.data.token)
      setToken(res.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('失败'))
    }
    // return new Promise((resolve, reject) => {
    //   login({ username: username.trim(), password: password }).then(response => {
    //     const { data } = response
    //     commit('SET_TOKEN', data.token)
    //     setToken(data.token)
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },
  // async againlogin({
  //   dispatch, commit }, hebing) {
  //   try {
  //     if (hebing) {
  //       commit('GET', constantRoutes.concat(asyncRoutes))
  //       return hebing
  //     }
  //   } catch (err) {
  //     console.log(err)
  //   }
  // },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        commit('USER_USERINFO', data)
        // 异步路由对比
        commit('SET_ASYNCROUTE', getResRoute(asyncRoute, data.routes))
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
        resetRouter()
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

