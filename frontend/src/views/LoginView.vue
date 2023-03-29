<template>
  <div class="wrapper">
    <InDevelopmentWarn/>
    <button @click="clear()">Очистить статистику</button>
  </div>
</template>

<script>
import InDevelopmentWarn from "@/UI/InDevelopmentWarn.vue";

export default {
  name: "LoginView",
  components: {InDevelopmentWarn},
  methods: {
    clear() {
      this.$store.commit('clearStat');
      localStorage.hardWords = "[]";
    }
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
button {
  color: black;
  background-color: #42b983;
  border: 1px solid black;
  padding: 2px;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 3px;
}
</style>