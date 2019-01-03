import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        addDialogVisible: false,
        editDialogVisible: false,
        token: window.localStorage.getItem('token')
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
        },
        login: (state, data) => {
            state.token = data
            window.localStorage.setItem('token', data)
        }
    },
    actions: {
        login({ commit }, data){
            commit('login', data)
        }
    }
})

export default store
