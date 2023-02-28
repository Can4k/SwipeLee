<template>
  <div class="wrapper">
    <BackButton/>
    <transition>
      <div v-show="this.description && this.showDescription" class="description">
        {{description}}
      </div>
    </transition>
    <div class="playground">
      <h3>
        {{ word }}
      </h3>
      <div class="buttons">
        <button :id="option" @click="choose(option)" v-for="option in this.options">{{ option }}</button>
      </div>
      <b class="stat">{{ stat }}</b>
    </div>
  </div>
</template>

<script>
import BackButton from "@/UI/BackButton.vue";

export default {
  name: "PlayView",
  components: {BackButton},
  methods: {
    next(type) {
      this.stat = this.$store.getters.percent(this.type);
      if (type === 'accent') {
        this.index = Math.floor(Math.random() * this.heap.length);
      } else if (type === 'accenttest'){
        this.index = this.$store.state.stat[type].amountAll;
      }
      this.parse(this.type);
    },
    parse() {
      this.options = [];
      if (this.type === 'accent') {
        this.word = this.heap[this.index].toLowerCase();
        let justWord = this.word.split(' ')[0];
        for (let i in justWord) {
          if (this.$store.state.vowels.indexOf(this.word[+i]) !== -1) {
            let pref = this.word.slice(0, +i);
            let letter = this.word[i].toUpperCase();
            let suf = this.word.slice(+i + 1, justWord.length);
            this.options.push(pref + letter + suf);
          }
        }
      }

      if (this.type === 'accenttest') {
        this.word = this.heap[this.index].toLowerCase();
        let justWord = this.word.split(' ')[0];
        for (let i in justWord) {
          if (this.$store.state.vowels.indexOf(this.word[+i]) !== -1) {
            let pref = this.word.slice(0, +i);
            let letter = this.word[i].toUpperCase();
            let suf = this.word.slice(+i + 1, justWord.length);
            this.options.push(pref + letter + suf);
          }
        }
      }
    },
    choose(option) {
      if (this.clicked) {
        return;
      }
      this.clicked = true;

      document.getElementById(this.heap[this.index].split(' ')[0]).style.backgroundColor = '#42b983';
      if (option === this.heap[this.index].split(' ')[0]) {
        this.$store.commit('updateStat', [this.type, 1, 1]);
      } else {
        document.getElementById(option).style.backgroundColor = 'red';
        this.$store.commit('updateStat', [this.type, 1, 0]);
        let prev = JSON.parse(localStorage['hardWords'] || '[]');
        prev.push(this.heap[this.index]);
        localStorage['hardWords'] = JSON.stringify(prev);
      }
      setTimeout(() => {
        document.getElementById(option).style.backgroundColor = '';
        document.getElementById(this.heap[this.index].split(' ')[0]).style.backgroundColor = '';
        this.next(this.type);
        this.clicked = false;
      }, 1000);
    }
  },
  data() {
    return {
      heap: {},
      index: -1,
      type: "",
      word: "",
      options: [],
      stat: "Нет данных",
      clicked: false,
      openTheory: false,
      description: "",
      showDescription: true,
    }
  },
  mounted() {
    this.type = location.pathname.split('/').slice(-1)[0];
    try {
      if (this.type === "accenttest" || this.type === "accent") {
        this.heap = require(`@/assets/accent.json`);
      }
      this.description = this.$store.state.description[this.type];
      this.next(this.type);
      setTimeout(() => this.showDescription = false, 5000);
    } catch (e) {
      console.log(`Отсутствуют данные по режиму ${this.type}`);
    }
  },
}
</script>

<style scoped>
h3 {
  font-size: 25px;
  text-align: center;
}

.wrapper {
  position: relative;
  left: 50%;
  transform: translate(-50%);
  max-width: 400px;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 20px);
}

button {
  margin: 5px;
  padding: 4px;
  font-size: 15px;
  background-color: white;
  border: 1px solid #42b983;
  color: black;
  border-radius: 5px;
  cursor: pointer;
  transition-duration: .125s;
}

.buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  width: 100%;
  padding: 4px;
  flex-wrap: wrap;
}

.playground {
  margin-top: 70px;
  position: relative;
  display: flex;
  flex-direction: column;
  height: calc(100%);
}

.stat {
  text-align: center;
  font-weight: 100;
  font-size: 12px;
  color: black;
}
.description {
  font-size: 12px;
  margin-top: 10px;
  margin-bottom: 20px;
  border: 1px solid #4ece93;
  padding: 5px;
  border-radius: 10px;
  background-color: #4ece93;
  text-align: center;
  transition-duration: 1s !important;
}
</style>