import { createStore } from 'vuex'

export default createStore({
  state: {
    isAuthenticated: false,
    token: '',
    user_cpf: ''
  },
  mutations: {
    initializeApp(state){
      
      // checacmos se ja existe token no localstorage
      if (localStorage.getItem('token')){
        state.token = localStorage.getItem('token')
        state.user_cpf = localStorage.getItem('user_cpf')
        state.isAuthenticated = true
      } else {
        state.token = ''
        state.isAuthenticated = false
      }
    },
    //estado q vamos mudar mais o parametro se houver
    setToken(state, token, user_cpf){
      if(token !== undefined){
      state.token = token
      }
      state.isAuthenticated = true
      state.user_cpf = user_cpf
    },
    removeToken(state){
      state.token = ''
      state.user_cpf = ''
      state.isAuthenticated = false
    }
  },
  actions: {
  },
  modules: {
  }
})
