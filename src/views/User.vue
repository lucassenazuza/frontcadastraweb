<template>
  <div class="home">
    <div class="columns">
      <div class="column is-8 is-offset-4 mb-12">
        <h1 class="title mb-6">Página do Usuário</h1>
        <h1 class="subtitle">
          Olá! <b>{{ this.name }} </b>, Seja Bem-Vindo!
        </h1>
        <p><b>Cpf</b>: {{ this.cpf }}</p>
        <p><b>Email</b>: {{ this.email }}</p>
        <p><b>Pis</b>: {{ this.pis }}</p>
        <p><b>País</b>: {{ this.country }}</p>
        <p><b>Estado</b>: {{ this.state }}</p>
        <p><b>Cidade</b>: {{ this.city }}</p>
        <p><b>CEP</b>: {{ this.zipcode }}</p>
        <p><b>Rua</b>: {{ this.street }}</p>
        <p><b>Número</b>: {{ this.number }}</p>
        <p><b>Complemento</b>: {{ this.complement }}</p>
        <div class="columns is-flex mt-6">
          <div class="column is-2">
            <button @click="edit()" class="button is-info">Editar Dados</button>
          </div>
          <div class="column is-1">
            <button @click="logout()" class="button is-danger">Log Out</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "User",
  data() {
    return {
      user_cpf: "",
      router_data: "",
      name: "",
      cpf: "",
      pis: "",
      email: "",
      city: "",
      country: "",
      state: "",
      zipcode: "",
      number: "",
      complement: "",
      street: "",
      token: ""
    };
  },
  methods: {
    logout() {
      axios.defaults.headers.common["Authorization"] = "";
      localStorage.removeItem("token");
      localStorage.removeItem("user_cpf");
      this.$store.commit("removeToken");
      this.$router.push("/login");
    },
    edit() {
      this.$router.push("/edit");
    },
  },
  mounted() {
    document.title = "Tela Usuário";

    this.token = localStorage.getItem("token");
    this.user_cpf = localStorage.getItem("user_cpf");
    // axios.defaults.headers.common["Authorization"] = "Token " + this.token;
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
