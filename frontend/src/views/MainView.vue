<template>
  <div class="wrapper">
    <header>
      <h2 :style="this.$store.state.theme === 'black'? 'color: white' : 'color: black'">SwipeLee</h2>
      <div class="header-2">
        <router-link to="stat">
          <WideButton class="stat">
            Статистика
          </WideButton>
        </router-link>
        <router-link to="/about">
          <WideButton class="stat">
            О сайте
          </WideButton>
        </router-link>
      </div>
      <div @click="closeBar" v-show="false" id="showed">
        Если ваше устройство <b>IPhone</b>, скройте панель инструментов.
        Для этого нажмите на кнопку <b>aA</b>, которая находится левее ссылки.
        Затем нажмите <b>скрыть панель инструментов</b>. Вы сможите снова открыть ее, нажав на ссылку внизу страницы.
        <div><b>Для того, чтобы скрыть этот текст просто нажмите на него.</b></div>
      </div>
      <section>
        <router-link style="width: 100%" v-for="type in $store.state.modes" :to="`play/${type.enName}`">
          <WideButton
              class="types"
              :tags="type.tags"
              :style="type.style"
          >{{ type.name}}
          </WideButton>
        </router-link>
      </section>
    </header>
  </div>
</template>

<script>
import WideButton from "@/UI/WideButton.vue";

export default {
  name: "MainView",
  data() {
    return {
      showBar: true,
    }
  },
  components: {WideButton},
  methods: {
    replace(type) {
      if (type === 'stat') {
        location.replace('/stat');
        return;
      }
      if (type === 'about') {
        location.replace('/about');
        return;
      }
      location.replace('/play/' + type);
    },
    closeBar() {
      localStorage.showBar = "false";
      this.showBar = false;
    },
    innerData(type) {
      return type;
      // пока обойдемся просто подписию
    }
  },
  mounted() {
    if (localStorage.showBar === "false") {
      this.showBar = false;
    }
  }
}
</script>

<style scoped>
.wrapper {
  max-width: 400px;
  position: relative;
  left: 50%;
  transform: translate(-50%);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

h2 {
  text-align: center;
  margin: 0 10px;
  font-size: 30px;
  margin-bottom: 5px;
}

section {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 20px;
  user-select: none;
}

.types {
  margin-bottom: 10px;
  width: 100%;
}

#showed {
  font-size: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
  border: 1px solid #42b983;
  padding: 5px;
  border-radius: 10px;
  background-color: #42b983;
  text-align: center;
}

.stat {
  margin-top: 10px;
  user-select: none;
  min-width: 120px;
}

.header-2 {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

h3 {
  width: 100%;
  text-align: center;
  font-size: 25px;
  font-weight: 500;
  color: #4ece93;
}

@media screen and (min-width: 750px) {
  h2 {
    font-size: 50px;
  }

  .wrapper {
    max-width: 600px;
  }

  .stat {
    font-size: 25px;
    width: auto;
    height: auto;
    padding: 10px;
  }

  .types {
    font-size: 30px;
    height: auto;
    padding: 10px;
  }
}
</style>