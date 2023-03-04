import {createStore} from 'vuex'

export default createStore({
    state: {
        modes: [
            {
                name: "Ударение",
                enName: "accent",
                nextMode: "random",
                tags: ['ЕГЭ 2023'],
                style: {},
                description: "",
                filename: "accent2.json",
            },
            {
                name: "Ударение-2",
                enName: "accenttest",
                nextMode: "order",
                tags: ['ЕГЭ 2023', 'Тест'],
                style: {'border': '1px solid blue'},
                description: "В этом режиме все слова идут в том порядке, в котором они даны в исходном файле",
                filename: "accent2.json",
            }
        ],

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
            for (let mode of state.modes) {
                for (let amount in state.stat[mode.enName]) {
                    state.stat[mode.enName][amount] = 0;
                }
            }
        },
        clearTypeStat(state, type) {
            state.stat[type].amountAll = 0;
            state.stat[type].amountOk = 0;
        }
    },
    actions: {},
    modules: {}
})
