<template>
  <div class="wrapper">
    <div class="filter-bar">
      <input :style="this.$store.state.theme === 'black' ? 'color: white' : 'color: black'" v-model="searchInp" placeholder="Поиск" @input="filterAction">
      <div id="tags">
        <tagItem @updateList="updateTags" v-for="i in this.$store.state.tagsList" :name="i"></tagItem>
      </div>
    </div>
    <section>
      <h2 :style="this.$store.state.theme === 'black' ? 'color: white' : 'color: black'">
        Тренажеры
      </h2>
      <transition-group>
        <router-link :key="type.name" style="width: 100%" v-for="type in filterList" :to="`play/${type.enName}`">
          <WideButton
              class="types"
              :tags="type.tags"
              :style="type.style"
          >{{ type.name }}
          </WideButton>
        </router-link>
      </transition-group>
    </section>
  </div>
</template>

<script>
import WideButton from "@/UI/WideButton.vue";
import TagItem from "@/UI/tagItem.vue";

export default {
  name: "TrainView",
  data() {
    return {
      showBar: true,
      filterList: [],
      searchInp: "",
      pickedTags: [],
    }
  },
  components: {TagItem, WideButton},
  methods: {
    filterAction() {
      this.filterList = this.$store.state.modes.filter(element => {

        if (this.pickedTags !== []) {
          if (Math.min(...this.pickedTags.map(el => element.tags.indexOf(el))) === -1) {
            return false;
          }
        }
        if (element.name.toLowerCase().includes(this.searchInp.toLowerCase())) {
          return true;
        }
        if (element.enName.toLowerCase().includes(this.searchInp.toLowerCase())) {
          return true;
        }
        for (let i of element.tags) {
          if (i.toLowerCase().includes(this.searchInp.toLowerCase())) {
            return true;
          }
        }
        return false;
      });
    },
    updateTags(data) {
      if (data.picked) {
        this.pickedTags.push(data.name);
      } else {
        this.pickedTags = this.pickedTags.filter(el => el !== data.name);
      }
      this.filterAction();
    }
  },
  mounted() {
    this.filterList = this.$store.state.modes;
  },
}
</script>

<style scoped>
.wrapper {
  position: relative;
  top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

section {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  user-select: none;
  border: 1px solid #42b983;
  padding: 10px;
  border-radius: 10px;
  padding-bottom: 0;
}

.types {
  margin-bottom: 10px;
  width: 100%;
  font-size: 15px !important;
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
  .types {
    font-size: 30px !important;
    height: auto;
    padding: 10px;
  }
}

.filter-bar {
  display: flex;
  justify-content: center;
  padding: 20px 10px;
  padding-bottom: 10px;
  border: 1px solid #42b983;
  margin-top: 20px;
  margin-bottom: 30px;
  border-radius: 10px;
  flex-direction: column;
}

input {
  padding: 6px;
  font-size: 14px;
  border: 1px solid #42b983;
  outline: none;
  border-radius: 5px;
  margin-bottom: 5px;
  background: none;
}

#tags {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

h2 {
  font-size: 30px;
  margin-bottom: 10px;
  text-align: left;
  width: 100%;
}
input::placeholder {
  color: #42b983;
}
</style>