<template>
  <div class="finishPanel">
    <h2>Результат</h2>
    {{this.result}}
    <button @click="again()" id="again" :style="[$store.state.theme==='black' ? 'color: white' : 'color: black']">Еще раз</button>
  </div>
</template>

<script>
import WideButton from "@/UI/WideButton.vue";

export default {
  name: "FinishPanel",
  components: {WideButton},
  props: {
    enName: String
  },
  data() {
    return {
      result: "",
    }
  },
  mounted() {
    this.result = this.$store.getters.percent(this.enName);
  },
  methods: {
    again() {
      this.$store.commit('clearTypeStat', this.enName);
      const stat = JSON.parse(localStorage.stat);
      stat[this.enName].amountAll = 0;
      stat[this.enName].amountOk = 0;
      localStorage.stat = JSON.stringify(stat);
      location.reload();
    }
  }
}
</script>

<style scoped>
.finishPanel {
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  padding: 20px;
  font-size: 28px;
}
#again {
  background: none;
  border: 1px solid #42b983;
  padding: 3px;
  margin-top: 5px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 17px;
}
@media screen and (max-width: 500px) {
  .finishPanel {
    font-size: 20px;
  }
  #again {
    font-size: 14px;
  }
}
</style>