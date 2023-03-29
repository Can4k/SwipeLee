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
                filename: "accent.json",
                type: "test"
            },
            {
                name: "Ударение (2)",
                enName: "accent-test",
                nextMode: "order",
                tags: ['ЕГЭ 2023', 'Тест'],
                style: {},
                description: "В этом режиме все слова идут в том порядке, в котором они даны в исходном файле",
                filename: "accent.json",
                type: "test"
            },
            {
                name: "Инфинитивы на -ять-",
                enName: "infinitive-yat",
                nextMode: "random",
                tags: ['ЕГЭ 2023', 'Заучивалка'],
                style: {},
                filename: "infinitive-yat.json",
                type: "learn"
            },
            {
                name: "Пре/При",
                enName: "pre-pri",
                nextMode: "random",
                tags: ['ЕГЭ 2023', 'Исключения', 'Сложные случаи'],
                style: {},
                filename: "pre-pri.json",
                type: "test"
            },
            {
                name: "Пре/При (2)",
                enName: "pre-pri-test",
                nextMode: "order",
                tags: ['ЕГЭ 2023', 'Тест', 'Исключения', 'Сложные случаи'],
                style: {},
                filename: "pre-pri.json",
                type: "test"
            }
        ],
        theme: "",
        vowels: 'аяуюоеёэиы',
        stat: {
            "accent": {
                amountAll: 0,
                amountOk: 0
            },
            "accent-test": {
                amountAll: 0,
                amountOk: 0,
            },
            "infinitive-yat": {
                amountAll: 0,
                amountOk: 0
            },
            "pre-pri": {
                amountAll: 0,
                amountOk: 0
            },
            "pre-pri-test": {
                amountAll: 0,
                amountOk: 0,
            }
        },
        tagsList: [],
    },
    getters: {
        percent: (state) => (title) => {
            if (state.stat[title].amountAll) {
                return "Ваша точность: " + Math.round(state.stat[title].amountOk / state.stat[title].amountAll * 100) + '%';
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
            const [type, addAll, addOk] = data;
            state.stat[type].amountAll += addAll;
            state.stat[type].amountOk += addOk;
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
        },
        changeTheme(state, theme) {
            if (!theme) {
                if (state.theme === 'white') {
                    state.theme = 'black';
                } else {
                    state.theme = 'white';
                }
            } else {
                state.theme = theme;
            }
            document.querySelector('html').style.backgroundColor = (state.theme === 'black' ? "#003b3b" : "white");
            localStorage['theme'] = state.theme;
        },
        updateTagsList(state, value) {
            state.tagsList = value;
        }
    },
    actions: {},
    modules: {}
})
