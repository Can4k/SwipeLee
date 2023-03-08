<template>
  <div :style="style" class="WideButton">
    <div :style="this.$store.state.theme === 'black'? 'color: white' : 'color: black'" class="wrapper2">
      <slot></slot>
      <div v-if="tags && tags.length" class="tag-wrapper2">
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
  background-color: #42b983;
}
.wrapper2 {
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
.tag-wrapper2 {
  display: flex;
  margin-left: 3px;
}
</style>