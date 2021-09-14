<template>
  <div class="page-sign-up">
    <div class="columns">
      <div class="column is-8 is-offset-2">
        <h1 class="title">Registre-se</h1>
        <p class="has-text-link is-size-6 has-text-left is-italic">
          *campos obrigatórios
        </p>
        <form @submit.prevent="submitForm">
          <div class="columns">
            <div class="column is-8">
              <div class="field">
                <label>Nome*</label>
                <div class="control">
                  <input type="text" class="input" v-model="name" />
                </div>
              </div>
            </div>
            <div class="column is-4">
              <div class="field">
                <label>CPF*</label>
                <div class="control">
                  <input
                    type="text"
                    class="input"
                    v-model="cpf"
                    v-maska="'###.###.###-##'"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="columns">
            <div class="column is-8">
              <div class="field">
                <label>Email*</label>
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
            </div>
            <div class="column is-4">
              <div class="field">
                <label>PIS*</label>
                <div class="control">
                  <input
                    type="text"
                    class="input"
                    v-model="pis"
                    v-maska="'###.#####.##-#'"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="field">
            <label>Senha</label>
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
            <label>Repita senha</label>
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
              <button class="button is-dark">Registrar</button>
            </div>
          </div>

          <hr />

          <router-link to="/login">Clique </router-link> para logar!
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { toast } from "bulma-toast";

export default {
  name: "SignUp",
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
    async submitForm() {
      this.errors = [];
      if (this.email === "") {
        this.errors.push("Insira um Email");
      } else if (this.reg.test(this.email) ? false : true) {
        this.errors.push("Insira um Email Válido");
      }
      if (this.password === "" || this.password2 === "") {
        this.errors.push("Senhas Vazias");
      }
      if (this.password !== this.password2) {
        this.errors.push("Senhas Diferentes");
      }
      if (this.cpf.length < 11) {
        this.errors.push("Digite CPF Corretamente");
      }
      if (this.cpf.pis < 11) {
        this.errors.push("Digite CPF Corretamente");
      }

      if (!this.errors.length) {
        const formData = {
          name: this.name,
          password: this.password,
          email: this.email,
          cpf: this.cpf.replace(/[^\d]+/g,''),
          pis: this.pis.replace(/[^\d]+/g,''),
          city: this.city,
          country: this.country,
          state: this.state,
          zipcode: this.zipcode,
          number: this.number,
          complement: this.complement,
          street: this.state
        };

        await axios
          .post("/auth/register", formData)
          .then((response) => {
            //mensagem
            toast({
              message: "Conta Criada",
              type: "is-success",
              dismissible: true,
              pauseOnhover: true,
              duration: 2000,
              position: "bottom-right",
            });
            console.log(JSON.stringify(response));
            this.$router.push("/login");
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
              this.errors.push("Something went wrong. Please Try Again");
              console.log(JSON.stringify(error.message));
            }
          });
      }
    },
  },
  mounted() {
    document.title = "Registro";
  },
};
</script>

<style scoped>
.page-sign-up {
  min-height: 70vh;
}
</style>