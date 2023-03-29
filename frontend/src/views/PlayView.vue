<template>
  <div
      :style="this.$store.state.theme === 'black'? {color: 'white'} : {color: 'black'}"
      class="wrapper">
    <transition>
      <div v-show="this.example.description && this.showDescription" class="description">
        {{ this.example.description }}
      </div>
    </transition>
    <div class="title">
      <router-link to="/play">
         <img id="back" style="margin-right: 10px" src="@/pictures/arrow-left.svg">
      </router-link>
      {{ruName}}{{ruType}}
    </div>
    <FinishPanel v-if="showFinishPanel" :en-name="this.name"/>
    <b v-show="!showFinishPanel" :style="this.$store.state.theme === 'black'? 'color: white' : 'color: black'"
       class="stat">{{ stat }}</b>
    <div class="playground">
      <div id="title">
        <h3 id="start">{{ prefix }}<b id="bold">{{ bold }}</b>{{ suffix }}</h3>
      </div>
      <div class="buttons">
        <button
            :style="[this.$store.state.theme === 'black'? {color: 'white', backgroundColor: '#003b3b'} : {color: 'black', backgroundColor: 'white'},
            optionClasses[option]]
"
            :id="option" @click="choose(option)" v-for="option in this.example.options"
            :class="optionClasses[option]"
        >
          {{ option }}
        </button>
      </div>
      <b :style="this.$store.state.theme === 'black'? 'color: white' : 'color: black'" class="stat"
         v-show="isTest && !showFinishPanel"
      >
        Прогресс:
        {{ getTemp }}
      </b>
    </div>
  </div>
</template>

<script>
import BackButton from "@/UI/BackButton.vue";
import FinishPanel from "@/UI/FinishPanel.vue";

export default {
  name: "PlayView",
  components: {FinishPanel, BackButton},
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
    shuffle(arr) {
      for (let i = arr.length - 1; i >= 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    },
    parse() {
      if (this.index >= this.heap.length) {
        if (this.example.nextMode === "order") {
          this.showFinishPanel = true;
        } else {
          location.reload();
        }
      } else {
        this.example = this.heap[this.index];
        this.shuffle(this.example.options);
      }
    },
    choose(option) {
      if (this.clicked) {
        return;
      }
      this.clicked = true;
      this.optionClasses[this.example.correctVariant] = {};
      this.optionClasses[this.example.correctVariant].backgroundColor = (this.$store.state.theme === 'white' ? '#42b983' : '#256C4CFF');
      if (option === this.example.correctVariant) {
        this.$store.commit('updateStat', [this.name, 1, 1]);
      } else {
        this.optionClasses[option] = {};
        this.optionClasses[option].backgroundColor = (this.$store.state.theme === 'white' ? 'red' : 'darkred');
        this.$store.commit('updateStat', [this.name, 1, 0]);
        let prev = JSON.parse(localStorage['hardWords'] || '[]');
        prev.push(this.example.correctVariant);
        localStorage['hardWords'] = JSON.stringify(prev);
      }

      setTimeout(() => {
        this.optionClasses = {};
        this.next();
        this.clicked = false;
      }, 1000);
    },
  },
  data() {
    return {
      index: -1,
      name: "",
      stat: "Нет данных",
      clicked: false,
      openTheory: false,
      showDescription: false,
      example: {},
      heap: [],
      showFinishPanel: false,
      optionClasses: {}
    }
  },
  mounted() {
    this.name = location.pathname.split('/').slice(-1)[0];
    this.example = this.$store.state.modes.find(element => {
      return element.enName === this.name;
    });

    if (!this.example) {
      location.replace('/play');
    }

    try {
      this.heap = require(`@/assets/${this.example.filename}`);
      this.next();
    } catch (e) {
      console.log("NO", e);
    }
  },
  computed: {
    prefix() {
      if (this.example.boldPosition) {
        return this.example.word.slice(0, this.example.boldPosition);
      }
      return this.example.word;
    },
    bold() {
      if (this.example.boldPosition) {
        return this.example.word[this.example.boldPosition];
      }
      return "";
    },
    suffix() {
      if (this.example.boldPosition) {
        return this.example.word.slice(this.example.boldPosition + 1);
      }
      return "";
    },
    getTemp() {
      return "" + this.$store.state.stat[this.name]?.amountAll + '/' + this.heap.length;
    },
    ruName() {
      return "Режим: " + this?.$store?.state?.modes.find((el, ind, arr) => {
        return el.enName === this.$route.path.split('/').pop()
      })?.name;
    },
    ruType() {
      return this?.$store?.state?.modes.find((el, ind, arr) => {
        return el.enName === this.$route.path.split('/').pop()
      })?.nextMode === 'random' ? ', очередность: рандом.' : ', очередность: тест.';
    },
    isTest() {
      return this?.$store?.state?.modes.find((el, ind, arr) => {
        return el.enName === this.$route.path.split('/').pop()
      })?.nextMode === 'order';
    },
  }
}
</script>

<style scoped>
h3 {
  font-size: 35px;
  text-align: center;
  user-select: none;
  margin: 0;
  padding: 0;
}

#title {
  display: flex;
  align-items: center;
  justify-content: center;
}

#bold {
  color: red;
  margin: 0;
  padding: 0;
}

.wrapper {
  position: relative;
  left: 50%;
  transform: translate(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}

button {
  user-select: none;
  margin: 5px;
  padding: 4px;
  font-size: 18px;
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
  flex-wrap: wrap;
}

.playground {
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 40px;
}

.stat {
  text-align: center;
  font-weight: 100;
  font-size: 12px;
  color: black;
  user-select: none;
}

.description {
  font-size: 12px;
  margin-top: 10px;
  margin-bottom: 20px;
  border: 1px solid #42b983;
  padding: 5px;
  border-radius: 10px;
  background-color: #42b983;
  text-align: center;
  transition-duration: 1s !important;
}

.title {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

@media screen and (min-width: 750px) {
  h3 {
    font-size: 50px;
  }

  .buttons button {
    font-size: 34px;
    padding: 5px;
  }

  .stat {
    font-size: 15px;
  }

  .title {
    font-size: 20px;
  }
}

#back {
  height: 30px;
}

a {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>