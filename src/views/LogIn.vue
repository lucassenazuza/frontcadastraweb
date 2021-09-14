<template>
    <div class="page-log-in">
        <div class="columns">
            <div class="column is-4 is-offset-4 mb-12">
                <h2 class="title has-text-dark">Olá Visitante! <i class="fas fa-code"></i></h2>
                <h1 class="title has-text-primary">Login</h1>

                <form @submit.prevent="submitForm">
                    <div class="field">
                        <label>Email, CPF ou PIS</label>
                        <div class="control">
                            <input type="text" class="input" v-model="username">
                        </div>
                    </div>

                    <div class="field">
                        <label>Senha</label>
                        <div class="control">
                            <input type="password" class="input" v-model="password">
                        </div>
                    </div>

                    <div class="notification is-danger" v-if="errors.length">
                        <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                    </div>

                    <div class="field">
                        <div class="control">
                            <button class="button is-dark">Log in</button>
                        </div>
                    </div>

                    <hr>

                    <router-link to="/signup">Clique</router-link> para registrar!
                </form>
            </div>
        </div>

    </div>
</template>

<script>

import axios from 'axios'
export default {
    name: 'LogIn',
    data() {
        return {
            username: '',
            password: '',
            errors: []
        }
    },
    mounted() {
        document.title = 'Login'
    },
    methods: {
        async submitForm() {
            // reseto qualquer authorization salva no broser
            axios.defaults.headers.common["Authorization"] = ""
            // remove token to vuex
            localStorage.removeItem("token")
            const formData = {
                username: this.username,
                password: this.password
            }
            await axios
                .post("/auth/login", formData)
                .then(response => {
                    const token = response.data.access_token
                    const user_cpf = response.data.user_cpf
                    this.$store.commit('setToken', token, user_cpf)
                    
                    axios.defaults.headers.common["Authorization"] = "Token " + token
                    localStorage.setItem("token", token)
                    localStorage.setItem("user_cpf", user_cpf)

                    console.log(JSON.stringify(localStorage.token))
                    this.$router.push('/user')
                })
                .catch(error => {
                    if (error.response) {
                        for (const property in error.response.data) {
                            this.errors.push(`${property}: ${error.response.data[property]}`)
                        }
                    } else {
                        this.errors.push('Something went wrong. Please try again')
                        
                        console.log(JSON.stringify(error))
                    }
                })
        }
    }
}
</script>