<template>
  <div class="WideButton">
    <div class="wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "WideButton"
}
</script>

<style scoped>
.WideButton {
  min-width: 100px;
  height: 50px;
  padding: 5px;
  border: 1px solid #42b983;
  color: black;
  cursor: pointer;
  transition-duration: .125s;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  border-radius: 10px;
}
.WideButton:hover {
  background-color: #4ece93;
}
.wrapper {
  word-break: break-all;
}
</style>