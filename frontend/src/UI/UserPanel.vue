<template>
  <div id="panel">
    <ChangeThemeButton/>
    <LoginButton/>
  </div>
</template>

<script>
import ChangeThemeButton from "@/UI/ChangeThemeButton.vue";
import LoginButton from "@/UI/LoginButton.vue";
export default {
  name: "UserPanel",
  components: {
    LoginButton,
    ChangeThemeButton
  }
}
</script>

<style scoped>
#panel {
  display: flex;
  align-items: center;
  padding: 2px 10px;
  border-radius: 10px;
  border: 1px solid #42b983;
}
</style>