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
  getters: {
    getTask: state => id => {
      for (const column of state.board.columns) {
        const task = column.tasks.find(task => task.id === id)
        if (task) return task
      }
    },
  },
}

export default new Vuex.Store(store)
