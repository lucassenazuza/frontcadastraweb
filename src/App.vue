<template>
  <!-- wrraper todo conteudo -->
  <div id="wrapper">
    <Navbar />
    <section class="section">
      <router-view />
    </section>
    <Footer />
  </div>
</template>

<script>
import Footer from "./components/Footer.vue";
import Navbar from "./components/Navbar.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    Footer,
    Navbar,
  },
  beforeCreate() {
    this.$store.commit("initializeApp");
    const token = this.$store.state.token;

    if (token) {
      // seta o token global
      axios.defaults.headers.common["Authorization"] = "Token " + token;
    } else {
      axios.defaults.headers.common["Authorization"] = "";
    }
  },
};
</script>

<style lang='scss'>
@import "../node_modules/bulma";

* {
  margin: 0;
  padding: 0;
}
section {
  min-height: 80vh;
}
</style>
