<template>
  <div :style="this.$store.state.theme === 'black' ? 'color: white' : 'color: black'" @click="calculateClick" :class="{'picked' : picked}" class="tag">
    {{name}}
  </div>
</template>

<script>
export default {
  name: "tagItem",
  props: {
    name: String
  },
  data() {
    return {
      picked: false
    }
  },
  methods: {
    calculateClick() {
      this.picked ^= 1;
      this.$emit("updateList", {
        picked: this.picked,
        name: this.name
      });
    }
  }
}
</script>

<style scoped>
.tag {
  user-select: none;
  border: 1px solid #42b983;
  border-radius: 10px;
  padding: 2px 4px;
  font-size: 12px;
  margin-right: 10px;
  margin-top: 6px;
  cursor: pointer;
}
.picked {
  background-color: #42b983;
  color: white;
}
</style>