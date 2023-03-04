<template>
  <div class="wrapper">
    <header>
      <h2>SwipeLee</h2>
      <div class="header-2">
        <WideButton class="stat" @click="replace('stat')">
          Статистика
        </WideButton>
        <WideButton class="stat" @click="replace('about')">
          О сайте
        </WideButton>
      </div>
      <div @click="closeBar" v-show="false" id="showed">
        Если ваше устройство <b>IPhone</b>, скройте панель инструментов.
        Для этого нажмите на кнопку <b>aA</b>, которая находится левее ссылки.
        Затем нажмите <b>скрыть панель инструментов</b>. Вы сможите снова открыть ее, нажав на ссылку внизу страницы.
        <div><b>Для того, чтобы скрыть этот текст просто нажмите на него.</b></div>
      </div>
      <section>
        <WideButton
            @click="replace(type.enName)"
            v-for="type in $store.state.modes"
            class="types"
            :tags="type.tags"
            :style="type.style"
        >{{ type.name }}
        </WideButton>
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
      if (type === 'Ударение') {
        return type;
      }
      if (type === 'Ударение (тест)') {
        return type + ' ' + this.$store.state.stat[this.$store.getters.translateType(type)].amountOk + '/' + this.$store.state.stat[this.$store.getters.translateType(type)].amountAll;
      }
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
  height: calc(100vh - 20px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

h2 {
  text-align: center;
  margin: 0 10px;
  font-size: 30px;
}

section {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 20px;
}

.types {
  margin-bottom: 10px;
  width: 100%;
}

#showed {
  font-size: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
  border: 1px solid #4ece93;
  padding: 5px;
  border-radius: 10px;
  background-color: #4ece93;
  text-align: center;
}

.stat {
  margin-top: 10px;
  width: 20px;
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

</style>