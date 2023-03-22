<template>
  <router-link to="'/'">
    <div
        :style="this.$store.state.theme === 'black'?
      {color: 'white', backgroundColor: '#003b3b'}
      :
      {color: '#003b3b', backgroundColor: 'white'}"
        class="BackButton">
      <div class="flexx">
        Назад
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "BackButton",
}
</script>

<style scoped>
.BackButton {
  z-index: 5;
  position: fixed;
  border: 1px solid #42b983;
  left: 10px;
  top: 10px;
  padding: 5px 10px;
  font-size: 16px;
  border-radius: 8px;
  width: 80px;
  cursor: pointer;
  user-select: none;
  background: white;

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