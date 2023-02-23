<template>
  <router-view>
  </router-view>
</template>

<script>
export default {
  methods: {
    async getTypeList() { // получаем список type
      // пока оставляем пустым
    },
    async getStat() { // получаем статистику
      // пока статистика хранится только в localstorage
      if (localStorage['stat']) {
        try {
          const stat = JSON.parse(localStorage['stat']);
          for (let type of this.$store.state.enTypes) {
            this.$store.commit('updateStat', [type, stat[type].amountAll, stat[type].amountOk]);
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
  }
}
</script>

<style>
</style>
