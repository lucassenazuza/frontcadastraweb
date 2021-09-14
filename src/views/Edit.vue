<template>
  <div class="page-sign-up">
    <div class="columns">
      <div class="column is-8 is-offset-2">
        <h1 class="title">Editor de Dados</h1>
        <p class="has-text-link is-size-6 has-text-left is-italic">
          *Nome, Cpf e Pis não podem ser alterados. É necessário preencher a
          senha e sua confirmação para editar os dados
        </p>
        <form @submit.prevent="submitFormEdit">
          <div class="field">
            <label>Email</label>
            <div class="control">
              <input
                rules="required|email"
                string-key="email"
                type="text"
                class="input"
                v-model="email"
              />
            </div>
          </div>

          <div class="field">
            <label>Senha*</label>
            <div class="control">
              <input
                class="input"
                v-model="password"
                :type="show ? 'text' : 'password'"
                @click:append="show = !show"
              />
            </div>
          </div>

          <div class="field">
            <label>Repita senha*</label>
            <div class="control">
              <input type="password" class="input" v-model="password2" />
            </div>
          </div>

          <div class="columns">
            <div class="column is-8">
              <div class="field">
                <label>País</label>
                <div class="control">
                  <input type="text" class="input" v-model="country" />
                </div>
              </div>
            </div>
            <div class="column is-4">
              <div class="field">
                <label>Estado</label>
                <div class="control">
                  <input type="text" class="input" v-model="state" />
                </div>
              </div>
            </div>
          </div>

          <div class="columns">
            <div class="column is-4">
              <div class="field">
                <label>Cidade</label>
                <div class="control">
                  <input type="text" class="input" v-model="city" />
                </div>
              </div>
            </div>
            <div class="column is-6">
              <div class="field">
                <label>Rua</label>
                <div class="control">
                  <input type="text" class="input" v-model="street" />
                </div>
              </div>
            </div>
            <div class="column is-2">
              <div class="field">
                <label>Número</label>
                <div class="control">
                  <input type="text" class="input" v-model="number" />
                </div>
              </div>
            </div>
          </div>
          <div class="columns">
            <div class="column is-3">
              <div class="field">
                <label>CEP</label>
                <div class="control">
                  <input type="text" class="input" v-model="zipcode" />
                </div>
              </div>
            </div>
            <div class="column is-9">
              <div class="field">
                <label>Complemento</label>
                <div class="control">
                  <input type="text" class="input" v-model="complement" />
                </div>
              </div>
            </div>
          </div>
          <!-- se tiver nos campos, os mesmosvao aprecer aqui -->
          <div class="notification is-danger" v-if="errors.length">
            <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
          </div>

          <div class="field">
            <div class="control">
              <button class="button is-info">Editar</button>
            </div>
          </div>

          <hr />
        </form>
        <div class="columns is-flex mt-6">
          <div class="column is-1 mp-6">
            <button @click="logout()" class="button is-danger">Log Out</button>
          </div>
          <div class="column is-2">
            <button @click="deleting()" class="button is-link">
              Excluir Conta
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { toast } from "bulma-toast";

export default {
  name: "Edit",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password2: "",
      cpf: "",
      pis: "",
      city: "",
      country: "",
      state: "",
      zipcode: "",
      number: "",
      complement: "",
      street: "",
      errors: [],
      reg: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      show: false,
    };
  },
  methods: {
    async submitFormEdit() {
      this.errors = [];
      if (this.email === "") {
        this.errors.push("Insira um Email");
      } else if (this.reg.test(this.email) ? false : true) {
        this.errors.push("Insira um Email Válido");
      }
      if (this.password !== this.password2) {
        this.errors.push("Senhas Diferentes");
      }

      if (!this.errors.length) {
        const formData = {
          name: this.name,
          password: this.password,
          email: this.email,
          cpf: this.cpf,
          pis: this.pis,
          city: this.city,
          country: this.country,
          state: this.state,
          zipcode: this.zipcode,
          number: this.number,
          complement: this.complement,
          street: this.state,
        };

        await axios
          .put("/auth/update", formData)
          .then((response) => {
            //mensagem
            toast({
              message: "Dados Atualizados",
              type: "is-success",
              dismissible: true,
              pauseOnhover: true,
              duration: 2000,
              position: "bottom-right",
            });
            const token = response.data.access_token;
            const user_cpf = response.data.user_cpf;
            this.$store.commit("setToken", token, user_cpf);
            console.log(JSON.stringify(localStorage.token));
            this.$router.push("/user");
          })
          .catch((error) => {
            if (error.response) {
              for (const property in error.response.data) {
                this.errors.push(
                  `${property}: ${error.response.data[property]}`
                );
              }
              console.log(JSON.stringify(error.response.data));
            } else if (error.message) {
              this.errors.push(
                "Alguma coisa deu errado, por favor, tente novamente"
              );
              console.log(JSON.stringify(error.message));
            }
          });
      }
    },
    logout() {
      axios.defaults.headers.common["Authorization"] = "";
      localStorage.removeItem("token");
      localStorage.removeItem("user_cpf");
      this.$store.commit("removeToken");
      this.$router.push("/login");
    },
    deleting() {
      this.router_data = "/auth/data/" + this.user_cpf;
      axios
        .delete(this.router_data)
        .then((response) => {
          console.log(JSON.stringify(response));
          axios.defaults.headers.common["Authorization"] = "";
          localStorage.removeItem("token");
          localStorage.removeItem("user_cpf");
          this.$store.commit("removeToken");
          this.$router.push("/login");
        })
        .catch((error) => {
          if (error.response) {
            console.log(JSON.stringify("erro carregar dados usuário"));
          }
        });
    },
  },
  mounted() {
    document.title = "Editor de Dados";
    document.title = "Tela Usuário";
    this.user_cpf = localStorage.getItem("user_cpf");
    this.router_data = "/auth/data/" + this.user_cpf;
    axios
      .get(this.router_data)
      .then((response) => {
        console.log(JSON.stringify(response));
        this.name = response.data.name;
        this.cpf = response.data.cpf;
        this.pis = response.data.pis;
        this.email = response.data.email;
        this.city = response.data.city;
        this.country = response.data.country;
        this.state = response.data.state;
        this.zipcode = response.data.zipcode;
        this.number = response.data.number;
        this.complement = response.data.complement;
        this.street = response.data.street;
      })
      .catch((error) => {
        if (error.response) {
          console.log(JSON.stringify("erro carregar dados usuário"));
        }
      });
  },
};
</script>

<style scoped>
.page-sign-up {
  min-height: 70vh;
}
</style>