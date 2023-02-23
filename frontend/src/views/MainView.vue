<template>
    <div class="wrapper">
      <header>
        <h2>SwipeLee</h2>
        <div @click="closeBar" v-show="showBar" id="showed">
          Если ваше устройство <b>IPhone</b>, скройте панель инструментов.
          Для этого нажмите на кнопку <b>aA</b>, которая находится левее ссылки.
          Затем нажмите <b>скрыть панель инструментов</b>. Вы сможите снова открыть ее, нажав на ссылку внизу страницы.
          <div><b>Для того, чтобы скрыть этот текст просто нажмите на него.</b></div>
        </div>
        <section>
          <WideButton
              @click="replace(type)"
              v-for="type in $store.state.types"
              class="types">{{ type }}
          </WideButton>
        </section>
      </header>
      <footer>
        <WideButton @click="replace('stat')">
          Статистика
        </WideButton>
      </footer>
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
      let path = this.$store.state.enTypes[this.$store.state.types.indexOf(type)];
      location.replace('/play/' + path);
    },
    closeBar() {
      localStorage.showBar = "false";
      this.showBar = false;
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

footer {
  position: absolute;
  width: 100%;
  bottom: 0;
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
</style>