<template>
  <router-link to="/login">
    <img src="@/pictures/log-in.svg">
  </router-link>
</template>

<script>
export default {
  name: "LoginButton"
}
</script>

<style scoped>
img {
  cursor: pointer;
  margin-left: 10px;
}
a {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>