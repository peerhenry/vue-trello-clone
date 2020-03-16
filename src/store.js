import Vue from 'vue'
import Vuex from 'vuex'
import defaultBoard from './default-board.js'

Vue.use(Vuex)

const board = JSON.parse(localStorage.getItem('board')) || defaultBoard

const saveStatePlugin = store =>
  store.subscribe((mutation, state) => {
    localStorage.setItem('board', JSON.stringify(state.board))
  })

const store = {
  plugins: [saveStatePlugin],
  state: {
    board,
  },
}

export default new Vuex.Store(store)
