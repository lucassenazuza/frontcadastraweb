<template>
  <div class="home">

    <div class="cloumns is-flex is-justify-content-space-around">
      <div class="column is-one-quarter">
        <router-link to="/info"><Card :img_src="img_src_chart" :alt="alt_chart" /></router-link>
      </div>
      <div class="column is-one-quarter">
        <router-link to="/map"><Card :img_src="img_src_map" :alt="alt_map" /></router-link>
      </div>
      <div class="column is-one-quarter">
        <router-link to="/dashboard"><Card :img_src="img_src_dashboard" :alt="alt_dashboard" /></router-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Home",
  components: {

  },
  data() {
    return {

    };
  },
  methods: {},
};
</script>

