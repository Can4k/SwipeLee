<template>
  <router-link :to="link">
    <div :class="{'picked': picked}" :style="[!picked && this.$store.state.theme === 'black' ? 'color: white' : '']" class="nav-button">
      <slot></slot>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "NavButton",
  props: {
    link: String
  },
  data() {
    return {
      picked: false
    }
  },
  watch: {
    '$route': {
      handler: function(search) {
        this.picked = (search.path === this.link);
      },
    }
  }
}
</script>

<style scoped>
.nav-button {
  font-weight: 400;
  font-size: 20px;
  padding: 2px;
  cursor: pointer;
  margin-right: 15px;
}
.picked {
  color: #42b983;
  text-decoration: 2px #4ece93 underline;
  text-underline-offset: 6px;
}
@media screen and (max-width: 500px){
  .nav-button {
    font-size: 15px;
  }
}
</style>