<template>
  <WideButton
      :style="this.$store.state.theme === 'black'?
      {color: 'white', backgroundColor: '#003b3b'}
      :
      {color: '#003b3b', backgroundColor: 'white'}"
      @click="this.$store.commit('changeTheme')" class="theme">Тема</WideButton>
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
  position: fixed;
  margin: 0 !important;
  font-size: 12px;
  border-radius: 100%;
  padding: 0 5px;
  height: 35px;
  right: 10px;
  top: 10px;
  user-select: none;
  background: white;
}
</style>