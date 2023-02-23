<template>
  <div class="wrapper">
    <BackButton @click="replace('/')"/>
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
    replace(text) {
      location.replace(text);
    },
    next() {
      this.stat = this.$store.getters.percent(this.type);
      this.index = Math.floor(Math.random() * this.heap.length);
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
    },
    choose(option) {
      document.getElementById(this.heap[this.index]).style.backgroundColor = '#42b983';
      if (option === this.heap[this.index]) {
        this.$store.commit('updateStat', [this.type, 1, 1]);
      } else {
        this.$store.commit('updateStat', [this.type, 1, 0]);
        let prev = JSON.parse(localStorage['hardWords'] || '[]');
        prev.push(this.heap[this.index]);
        localStorage['hardWords'] = JSON.stringify(prev);
      }
      setTimeout(() => {
            document.getElementById(this.heap[this.index]).style.backgroundColor = 'white';
            this.next();
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
      stat: "Нет данных"
    }
  },
  mounted() {
    this.type = location.pathname.split('/').slice(-1)[0];
    try {
      this.heap = require(`@/assets/${this.type}.json`);
      this.next(this.type);
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
}

button {
  margin: 5px;
  padding: 4px;
  font-size: 15px;
  background-color: white;
  border: 1px solid #42b983;
  border-radius: 5px;
  cursor: pointer;
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
  margin-top: 200px;
  display: flex;
  flex-direction: column;
}

.stat {
  text-align: center;
  font-weight: 100;
  font-size: 12px;
  color: black;
}
</style>