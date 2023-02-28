import { createStore } from 'vuex'
export default createStore({
  state: {
    types: ["Ударение", "Ударение-2"], // , "Правописание", "Кек-Слова"], // должны получатся с сервера,
    enTypes: ["accent", "accenttest"], //, "spelling", "kek-words"],
    vowels: 'аяуюоеёэиы',
    stat: {
      "accent": {
        amountAll: 0,
        amountOk: 0
      },
      "accenttest": {
        amountAll: 0,
        amountOk: 0,
      },
    },
    tags: {
      "accent": ['ЕГЭ 2023'],
      "accenttest": ['ЕГЭ 2023', 'Тест']
    },
    style: {
      "accent": {},
      "accenttest": {'border' : '1px solid blue'},
    },
    description: {
      "accent": "",
      "accenttest": "В этом режиме все слова идут в том порядке, в котором они даны в исходном файле.",
    }
  },
  getters: {
    percent: (state) => (title) => {
      if (state.stat[title].amountAll) {
        return Math.round(state.stat[title].amountOk / state.stat[title].amountAll * 100) + '%';
      } else {
        return "Нет данных";
      }
    },
    translateType: (state) => (type) => {
      let index1 = state.types.indexOf(type);
      let index2 = state.enTypes.indexOf(type);
      if (index1 !== -1) {
        return state.enTypes[index1];
      }
      if (index2 !== -1) {
        return state.types[index2];
      }
      throw new Error("Неверный тип");
    }
  },
  mutations: {
    updateStat(state, data) {
      let type = data[0], addAll = data[1], addOk = data[2];
      state.stat[type].amountAll += addAll;
      state.stat[type].amountOk += addOk;
      localStorage['stat'] = JSON.stringify(state.stat);
    },
    clearStat(state) {
      for (let type of state.enTypes) {
        for (let amount in state.stat[type]) {
          state.stat[type][amount] = 0;
        }
      }
    },
    clearTypeStat(state, type) {
      state.stat[type].amountAll = 0;
      state.stat[type].amountOk = 0;
    }
  },
  actions: {

  },
  modules: {
  }
})
