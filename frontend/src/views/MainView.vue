<template>
    <div class="wrapper">
      <header>
        <h2>SwipeLee</h2>
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
  components: {WideButton},
  methods: {
    replace(type) {
      if (type === 'stat') {
        location.replace('/stat');
        return;
      }
      let path = this.$store.state.enTypes[this.$store.state.types.indexOf(type)];
      location.replace('/play/' + path);
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
  margin: 0 10px 30px;
  font-size: 30px;
}
section {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
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
</style>