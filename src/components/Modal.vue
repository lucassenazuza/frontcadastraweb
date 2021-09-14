<template>
  <div>
    <a data-target="modal" @click="showModal = !showModal"
      ><strong> {{ name }}</strong></a
    >
    <div class="modal" v-bind:class="{ 'is-active': showModal }">
      <div class="modal-background" @click="closeModal">
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Sobre</p>
            <button class="delete" aria-label="close"></button>
          </header>
          <section class="modal-card-body">{{ msg }}
          </section>
          <footer class="modal-card-foot">
            <!-- <button class="button is-success">Save changes</button>
            <button class="button">Cancel</button> -->
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>s

<script>
export default {
  name: "Modal",
  props: ["name", "msg"],
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    closeModal() {
      if (this.showModal) {
        this.showModal = false;
      }
    },
  },
};
</script>