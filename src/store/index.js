import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const apiUrl =
  'https://api.openweathermap.org/data/2.5/weather?appid=fdf871cedaf3413c6a23230372c30a02&units=imperial'

export default new Vuex.Store({
  state: {
    currentCity: {
      data: {},
      error: null,
      status: 'init'
    },
    currentSearch: {
      data: [],
      error: null,
      status: 'init'
    },
    cities: []
  },
  getters: {
    getCurrentCity: state => JSON.parse(JSON.stringify(state.currentCity.data)),
    getCurrentSearch: state =>
      JSON.parse(JSON.stringify(state.currentSearch.data))
  },
  actions: {
    async getCurrentCity({ commit }, params) {
      try {
        const url = `${apiUrl}&lat=${params.lat}&lon=${params.long}`
        commit('GET_CURRENT_CITY_LOAD')
        await fetch(url, { mode: 'cors' })
          .then(async response => {
            if (!response.ok && response.status !== '200') {
              commit('GET_CURRENT_CITY_ERR', response.statusText)
            } else {
              commit('GET_CURRENT_CITY_RES', await response.json())
            }
          })
          .catch(function(error) {
            commit('GET_CURRENT_CITY_ERR', error.TypeError)
          })
      } catch (err) {
        commit('GET_CURRENT_CITY_ERR', err.TypeError)
      }
    },
    async getCurrentSearch({ commit }, params) {
      try {
        const url = `${apiUrl}&q=${params.query}`
        commit('GET_SEARCH_CITY_LOAD')
        await fetch(url, { mode: 'cors' })
          .then(async response => {
            if (!response.ok && response.status !== '200') {
              commit('GET_SEARCH_CITY_ERR', response.statusText)
            } else {
              const result = await response.json()
              commit('GET_SEARCH_CITY_RES', result)
              commit('SET_CITIES', result)
            }
          })
          .catch(function(error) {
            commit('GET_SEARCH_CITY_ERR', error.TypeError)
          })
      } catch (err) {
        commit('GET_SEARCH_CITY_ERR', err.TypeError)
      }
    }
  },
  mutations: {
    GET_CURRENT_CITY_LOAD(state) {
      state.currentCity.status = 'loading'
      state.currentCity.error = null
    },
    GET_CURRENT_CITY_RES(state, payload) {
      state.currentCity.data = payload
      state.currentCity.status = 'success'
      state.currentCity.error = null
    },
    GET_CURRENT_CITY_ERR(state, error) {
      state.currentCity.status = 'error'
      state.currentCity.error = error
      state.currentCity.data = state.data
    },
    GET_SEARCH_CITY_LOAD(state, payload) {
      state.currentSearch.data = payload
      state.currentSearch.status = 'loading'
      state.currentSearch.error = null
    },
    GET_SEARCH_CITY_RES(state, payload) {
      state.currentSearch.data = payload
      state.currentSearch.status = 'success'
      state.currentSearch.error = null
    },
    GET_SEARCH_CITY_ERR(state, error) {
      state.currentSearch.status = 'error'
      state.currentSearch.error = error
    },
    SET_CITIES(state, payload) {
      state.cities = [
        payload,
        ...state.cities.filter(city => city.id !== payload.id)
      ]
    },
    REMOVE_CITY(state, payload) {
      state.cities = [...state.cities.filter(city => city.id === payload.id)]
    }
  }
})
