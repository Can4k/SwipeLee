<template>
  <header>
    <router-link to="'/'">
      <h1 :style="this.$store.state.theme === 'black'? 'color: white' : 'color: black'">Swipe<b id="lee">Lee</b>
      </h1>
    </router-link>
    <user-panel/>
  </header>
  <div id="nav">
    <nav-button link="/play">Тренажеры</nav-button>
    <nav-button link="/stat">Статистика</nav-button>
    <nav-button link="/about">О сайте</nav-button>
  </div>
  <Transition>
    <router-view>
    </router-view>
  </Transition>
</template>

<script>
import ChangeThemeButton from "@/UI/ChangeThemeButton.vue";
import NavButton from "@/UI/NavButton.vue";
import UserPanel from "@/UI/UserPanel.vue";

export default {
  components: {UserPanel, NavButton, ChangeThemeButton},
  methods: {
    async getTypeList() { // получаем список type
      let uniq = new Set();
      for (let i of this.$store.state.modes) {
        for (let j of i.tags) {
          uniq.add(j);
        }
      }
      this.$store.commit('updateTagsList', Array.from(uniq));
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
    },
  },
  async mounted() {
    await this.getTypeList();
    await this.getStat();
    if (!localStorage.theme) {
      localStorage.theme = 'white';
    }
    this.$store.commit('changeTheme', localStorage.theme);

    window.onbeforeunload = (() => {
      localStorage.stat = JSON.stringify(this.$store.state.stat)
    });
  },
}
</script>

<style scoped>
h1 {
  font-size: 48px;
  cursor: pointer;
  margin-bottom: 10px;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#nav {
  display: flex;
  justify-content: flex-start;
  border: 1px solid #42b983;
  border-radius: 8px;
  padding: 8px 10px;
  flex-wrap: wrap;
}
</style>

<style>
a {
  text-decoration: none;
  color: black;
}

#app {
  max-width: 1200px;
  margin: 0 auto;

}

.v-enter-active,
.v-leave-active {
  transition: opacity .5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

*::-webkit-scrollbar {
  width: 0;
}

.wrapper {
  top: 20px;
}

html {
  transition-duration: .1s;
}

* {
  text-decoration: none;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  -webkit-tap-highlight-color: transparent;
}

#lee {
  color: #42b983;
}

@media screen and (max-width: 500px) {
  #nav {
    justify-content: center !important;
  }
}
</style>
