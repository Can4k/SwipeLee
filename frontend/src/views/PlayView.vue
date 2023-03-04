<template>
  <div class="wrapper">
    <BackButton/>
    <transition>
      <div v-show="this.example.description && this.showDescription" class="description">
        {{ this.example.description }}
      </div>
    </transition>
    <div class="playground">
      <h3>
        {{ this.example.word }}
      </h3>
      <div class="buttons">
        <button :id="option" @click="choose(option)" v-for="option in this.example.options">{{ option }}</button>
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
    next() {
      this.example = this.$store.state.modes.find(element => {
        return element.enName === this.name;
      });
      this.stat = this.$store.getters.percent(this.name);
      if (this.example.nextMode === 'random') {
        this.index = Math.floor(Math.random() * this.heap.length);
      } else if (this.example.nextMode === "order") {
        this.index = this.$store.state.stat[this.name].amountAll;
      }
      this.parse(this.type);
    },
    parse() {
      this.example = this.heap[this.index];
    },
    choose(option) {
      if (this.clicked) {
        return;
      }
      this.clicked = true;

      let correct_option = document.getElementById(this.example.correctVariant);
      let chose_option = document.getElementById(option);

      correct_option.style.backgroundColor = '#42b983';
      if (option === this.example.correctVariant) {
        this.$store.commit('updateStat', [this.name, 1, 1]);
      } else {
        chose_option.style.backgroundColor = 'red';
        this.$store.commit('updateStat', [this.name, 1, 0]);
        let prev = JSON.parse(localStorage['hardWords'] || '[]');
        prev.push(this.example.correctVariant);
        localStorage['hardWords'] = JSON.stringify(prev);
      }
      setTimeout(() => {
        chose_option.style.backgroundColor = '';
        correct_option.style.backgroundColor = '';
        this.next();
        this.clicked = false;
      }, 1000);
    }
  },
  data() {
    return {
      index: -1,
      name: "",
      stat: "Нет данных",
      clicked: false,
      openTheory: false,
      showDescription: true,
      example: {},
      heap: []
    }
  },
  mounted() {
    this.name = location.pathname.split('/').slice(-1)[0];
    this.example = this.$store.state.modes.find(element => {
      return element.enName === this.name;
    });
    try {
      this.heap = require(`@/assets/${this.example.filename}`);
      this.next();
    } catch (e) {
      console.log(e)
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