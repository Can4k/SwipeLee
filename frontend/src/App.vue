<template>
  <ChangeThemeButton/>
  <router-view>
  </router-view>
</template>

<script>
import ChangeThemeButton from "@/UI/ChangeThemeButton.vue";

export default {
  components: {ChangeThemeButton},
  methods: {
    async getTypeList() { // получаем список type
      // пока оставляем пустым
    },
    async getStat() { // получаем статистику
      // пока статистика хранится только в localstorage
      if (localStorage['stat']) {
        try {
          const stat = JSON.parse(localStorage['stat']);
          for (let mode of this.$store.state.modes) {
            this.$store.commit('updateStat', [mode.enName, stat[mode.enName].amountAll, stat[mode.enName].amountOk]);
          }
        } catch (e) {
          localStorage.clear();
        }
      }
    }
  },
  mounted() {
    this.getTypeList();
    this.getStat();
    if (!localStorage.theme) {
      localStorage.theme = 'white';
    }
    this.$store.commit('changeTheme', localStorage.theme);
  }
}
</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
*::-webkit-scrollbar {
  width: 0;
}
.wrapper {
  top: 40px;
}
html {
  transition-duration: .1s;
}
</style>
