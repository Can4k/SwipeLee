import { createStore } from 'vuex'
export default createStore({
  state: {
    types: ["Ударение"], // , "Правописание", "Кек-Слова"], // должны получатся с сервера,
    enTypes: ["accent"], //, "spelling", "kek-words"],
    vowels: 'аяуюоеёэиы',
    stats: {
      "accent": {
        amountAll: 0,
        amountOk: 0
      },
      "spelling": {
        amountAll: 0,
        amountOk: 0,
      },
      "kek-words": {
        amountAll: 0,
        amountOk: 0
      }
    },
  },
  getters: {
    percent: (state) => (title) => {
      if (state.stats[title].amountAll) {
        return Math.round(state.stats[title].amountOk / state.stats[title].amountAll * 100) + '%';
      } else {
        return "Нет данных";
      }
    }
  },
  mutations: {
    updateStat(state, data) {
      let type = data[0], addAll = data[1], addOk = data[2];
      state.stats[type].amountAll += addAll;
      state.stats[type].amountOk += addOk;
      localStorage['stat'] = JSON.stringify(state.stats);
    },
    clearStat(state) {
      for (let type of state.enTypes) {
        for (let amount in state.stats[type]) {
          state.stats[type][amount] = 0;
        }
      }
    },
  },
  actions: {
  },
  modules: {
  }
})
