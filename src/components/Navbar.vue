<template>
  <div>
    <nav class="navbar is-light">
      <div class="navbar-brand">
        <template v-if="this.$store.state.isAuthenticated == false">
          <router-link to="/login" class="navbar-item">
            <strong
              ><i class="fas fa-paste"></i>&nbsp; CadastraUser</strong
            ></router-link
          >
        </template>
        <template v-else>
          <router-link to="/user" class="navbar-item">
            <strong
              ><i class="fas fa-paste"></i>&nbsp; CadastraUser</strong
            ></router-link
          >
        </template>

        <a
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navabar-menu"
          @click="showMobileMenu = !showMobileMenu"
        >
          <!-- Gera as listrinhas do link -->
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
        <!-- essa div eh fechada aqui para que quando tiver celular, nao ficar feio -->
      </div>

      <!-- fazemos alias para td que escrevmos abaixo -->
      <div
        class="navbar-menu"
        id="navbar-menu"
        v-bind:class="{ 'is-active': showMobileMenu }"
      >
        <!--coloca no lado direito -->
        <div class="navbar-end">
          <!-- cria espaçamento nos items do menu que envolve essa div -->
          <div class="navbar-item">
            <!-- cria espaçamento nos botões -->
            <div class="buttons">
              <template v-if="this.$store.state.isAuthenticated == false">
                <template v-if="this.$route.name === 'SignUp'">
                  <router-link to="/login" class="button is-success"
                    >Login</router-link
                  >
                </template>

                <template v-else-if="this.$route.name === 'LogIn'">
                  <router-link to="/signup" class="button is-danger"
                    >Registrar</router-link
                  >
                </template>
              </template>
              <div class="dropdown is-right is-hoverable">
                <div class="dropdown-trigger">
                  <button
                    class="button"
                    aria-haspopup="true"
                    aria-controls="dropdown-menu4"
                  >
                    <i class="fas fa-cog fa-lgs"></i>
                    <span class="icon is-small">
                      <i class="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </button>
                </div>
                <div class="dropdown-menu" id="dropdown-menu4" role="menu">
                  <div class="dropdown-content">
                    <div class="dropdown-item">
                      <Modal :name="modal_about" :msg="msg_about" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import Modal from "./Modal.vue";

export default {
  name: "Navbar",
  components: { Modal },
  data() {
    return {
      showMobileMenu: "false",
      modal_about: "Sobre",
      msg_about: "Sistema de Cadastro de Usuários.",
    };
  },
};
</script>

<style scoped>
router-link {
  padding-left: 10px;
}
</style>