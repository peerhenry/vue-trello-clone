import Vue from 'vue'
import Vuex from 'vuex'
import defaultBoard from './default-board.js'
import uuid from '@/utils/uuid.js'

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
  mutations: {
    CREATE_TASK: (state, { tasks, name }) => tasks.push({ name, id: uuid() }),
    UPDATE_TASK: (state, { task, key, value }) => Vue.set(task, key, value),
    MOVE_TASK: (state, { fromTasks, toTasks, taskIndex }) => {
      const taskToMove = fromTasks.splice(taskIndex, 1)[0]
      toTasks.push(taskToMove)
    },
    MOVE_COLUMN: (state, { fromColumnIndex, toColumnIndex }) => {
      const columnList = state.board.columns
      const colToMove = columnList.splice(fromColumnIndex, 1)[0]
      columnList.splice(toColumnIndex, 0, colToMove)
    },
  },
}

export default new Vuex.Store(store)
