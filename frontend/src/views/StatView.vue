<template>
  <div :style="this.$store.state.theme === 'black'? 'color: white' : 'color: black'" class="wrapper">
      <div id="stat-block">
        <h1>Прогресс</h1>
        <div class="flex-wrapper">
          <div v-for="type in this.$store.state.modes" v-show="type && type.type !== 'learn'" class="stat-block">
            <h2>{{ type.name }}</h2>
            {{ fraction(type.enName) }} =
            <b>{{ percent(type.enName) }}</b>
<!--            <div>
              <button :style="this.$store.state.theme === 'black'? 'border: 1px solid #42b983; color: white; background-color: #003b3b' : 'color: black'"
                      class="tag"
                      @click="clearStat(type.enName)">Очистить статистику
              </button>
            </div>-->
          </div>
        </div>
      </div>
      <div id="hard-words">
        <h1>Проблемные слова</h1>
        <div class="problems-container">
          <div class="container-inner">
            <div v-for="word in hardWords">{{ word }}</div>
          </div>
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
        localStorage.stat = [];
        localStorage.hardWords = [];
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
  },
}
</script>

<style scoped>
.flex-wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
}
.wrapper {
  position: relative;
  top: 10px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
#stat-block {
  width: 50%;
  margin: 0 10px;
}

#hard-words {
  width: calc(50% - 40px);
  margin: 0 10px;
}

h1 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  margin-bottom: 5px;
}

h2 {
  font-weight: 500;
}

.stat-block {
  padding: 5px 8px 8px 8px;
  margin: 0px 8px 10px 0px;
  border-radius: 10px;
  border: 1px solid #42b983;
  user-select: none;
  word-break: break-all;
}

b {
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
  max-height: 200px;
  border: 1px solid #42b983;
  overflow-y: scroll;
  padding: 5px;
  margin-bottom: 10px;
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

@media screen and (max-width: 709px){
  .wrapper {
    flex-direction: column;
  }
  #stat-block {
    width: calc(100% - 20px);
  }
  #hard-words {
    width: calc(100% - 20px);
  }
}

@media screen and (min-width: 750px){
  h1 {
    font-size: 35px;
  }
  h2 {
    font-size: 20px;
  }
  button {
    font-size: 25px;
  }
  .tag {
    font-size: 14px;
  }
  .stat-block {
    font-size: 18px;
  }
  .problems-container {
    font-size: 22px;
    max-height: 600px;
  }
}

.clear-all {
  font-size: 30px;
}
</style>