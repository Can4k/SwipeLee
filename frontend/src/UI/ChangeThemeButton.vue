<template>
  <div @click="this.$store.commit('changeTheme')" class="theme">
    <img v-show="this.$store.state.theme === 'black'" src="@/pictures/sun.svg">
    <img v-show="this.$store.state.theme === 'white'" src="@/pictures/moon.svg">
  </div>
</template>

<script>
import WideButton from "@/UI/WideButton.vue";

export default {
  name: "ChangeThemeButton",
  components: {WideButton}
}
</script>

<style scoped>
.theme {
  z-index: 5;
  border-radius: 100%;
  height: 35px;
  user-select: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>