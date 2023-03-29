<template>
  <h2 :style="this.$store.state.theme === 'black' ? 'color: white' : 'color: black'">В разработке</h2>
</template>

<script>
export default {
  name: "InDevelopmentWarn"
}
</script>

<style scoped>
h2 {
  text-align: center;
  margin-top: 20px;
}
</style>