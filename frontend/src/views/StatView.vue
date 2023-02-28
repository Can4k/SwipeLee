<template>
  <div class="wrapper">
    <BackButton/>
    <h1>Статистика
      <button @click="clearStat()">Отчистить статистику</button>
    </h1>
    <div v-for="type in this.$store.state.enTypes" class="stat-block">
      <h2>{{ title(type) }}</h2>
      {{ fraction(type) }} =
      <b>{{ percent(type) }}</b>
      <div>
        <button class="tag" @click="clearStat(type)">Отчистить статистику</button>
      </div>
    </div>
    <h1>Проблемные слова</h1>
    <div class="problems-container">
      <div class="container-inner">
        <div v-for="word in hardWords">{{ word }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import BackButton from "@/UI/BackButton.vue";

export default {
  name: "StatView",
  components: {BackButton},
  data() {
    return {
      hardWords: [],
    }
  },
  mounted() {
    if (localStorage['hardWords']) {
      this.hardWords = JSON.parse(localStorage['hardWords']);
    } else {
      this.hardWords = [];
    }
  },
  methods: {
    clearStat(type = null) {
      if (!type) {
        this.$store.commit('clearStat');
        localStorage.clear();
        this.hardWords = [];
      } else {
        this.$store.commit('clearTypeStat', type);
        localStorage.stat = JSON.stringify(this.$store.state.stat);
      }
    },
    percent(type) {
      return this.$store.getters.percent(type);
    },
    fraction(type) {
      return this.$store.state.stat[type].amountOk + '/' + this.$store.state.stat[type].amountAll;
    },
    title(type) {
      return this.$store.state.types[this.$store.state.enTypes.indexOf(type)];
    }
  },
}
</script>

<style scoped>
h1 {
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

h2 {
  font-weight: 500;
}

.stat-block {
  padding: 10px;
  margin: 10px;
  color: black;
  border-radius: 10px;
  border: 1px solid #42b983;
}

.wrapper {
  max-width: 400px;
  position: relative;
  left: 50%;
  transform: translate(-50%);
  height: calc(100vh - 20px);
  display: flex;
  flex-direction: column;
}

b {
  color: black;
  font-weight: 200;
}

button {
  background-color: white;
  outline: none;
  padding: 3px;
  font-size: 15px;
  border: 1px solid red;
  color: red;
  border-radius: 5px;
  position: relative;
  cursor: pointer;
  font-weight: 100;
}

.problems-container {
  position: relative;
  height: 100%;
  border: 1px solid #42b983;
  overflow-y: scroll;
  padding: 5px;
  margin: 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}

.problems-container::-webkit-scrollbar {
  width: 0
}

.tag {
  margin-top: 5px;
  font-size: 10px;
}

</style>