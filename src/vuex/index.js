import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        addDialogVisible: false,
        editDialogVisible: false
    },
    mutations: {
        addVisible: (state) => {
            state.addDialogVisible = true
        },
        editVisible: (state) => {
            state.editDialogVisible = true
        },
        addInvisible: (state) => {
            state.addDialogVisible = false
        },
        editInvisible: (state) => {
            state.editDialogVisible = false
        }
    }
})

export default store
