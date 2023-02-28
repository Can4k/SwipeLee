<template>
  <div @click="toMain()" class="BackButton">
    <div class="flexx">
      Назад
    </div>
  </div>
</template>

<script>
export default {
  name: "BackButton",
  methods: {
    toMain() {
      location.replace('/');
    }
  }
}
</script>

<style scoped>
.BackButton {
  position: relative;
  border: 1px solid #42b983;
  left: 10px;
  padding: 5px 10px;
  font-size: 16px;
  border-radius: 8px;
  width: 80px;
  cursor: pointer;
}

.flexx {
  display: flex;
  align-items: center;
  justify-content: center;
}

img {
  margin-right: 5px;
  margin-left: 0;
  width: 22px;
}
</style>