<template>
  <div :style="style" class="WideButton">
    <div class="wrapper">
      <slot></slot>
      <div v-if="tags && tags.length" class="tag-wrapper">
        <div class="tag" v-for="tag in tags">
          {{tag}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WideButton",
  props: {
    tags: Array,
    style: Object
  },
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
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tag {
  font-size: 10px;
  background-color: #42b983;
  border-radius: 6px;
  padding: 3px;
  margin: 3px;
}
.tag-wrapper {
  display: flex;
  margin-left: 3px;
}
</style>