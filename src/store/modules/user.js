import UserService from '@/services/UserService.js'
export const namespaced = true

export const state = {
  users: [],
  usersTotal: 0,
  user: {},
  perPage: 6,
  search: '',
}

export const mutations = {
  ADD_USER(state, user) {
    state.users.push(user)
  },
  SET_USERS(state, users) {
    state.users = users
  },
  SET_USERS_TOTAL(state, usersTotal) {
    state.usersTotal = usersTotal
  },
  SET_USER(state, user) {
    state.user = user
  },
  SET_SEARCH(state, search) {
    state.search = search
  }
}

export const actions = {

  fetchUsers({ commit, dispatch, state }, { page }) {
    return UserService.getUsers(state.perPage, page)
      .then(response => {
        commit('SET_USERS_TOTAL', parseInt(response.headers['x-total-count']))
        commit('SET_USERS', response.data)
      })

  },
  fetchUser({ commit, getters, state }, id,) {
    if (id == state.user.id) {
      return state.user
    }

    var user = getters.getUserById(id)

    if (user) {
      commit('SET_USER', user)
      return user
    } else {
      return UserService.getUser(id).then(response => {
        commit('SET_USER', response.data)
        return response.data
      })
    }
  },
  search({ commit }, search) {
    commit('SET_SEARCH', search)
  }
}
export const getters = {
  getUserById: state => id => {
    return state.users.find(user => user.id === id)
  },
  getUserBySearch: state => {
    return state.users.filter(user => {
      return user.title.toLowerCase().indexOf(state.search.toLowerCase()) > -1
    })
  }
}