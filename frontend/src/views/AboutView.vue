<template>
  <div :style="this.$store.state.theme === 'black'? {color: 'white'} : {color: 'black'}" class="wrapper">
    <div class="description">
      <div class="paragraph">
        <h1>Что я?</h1>
        SwipeLee - это простой тренажер для заучивания и запоминания. Пока в нем доступен лишь offline режим, т.е. все данные
        будут сохраняться на вашем устройстве, точнее в браузере.
      </div>
      <div class="paragraph">
        <h1>Цель</h1>
        <div>Я хотел сделать сайт, на котором буду заучивать ударения в словах для ЕГЭ2023 по русскому.</div>
        <div>Во время разработки стало очевидно, что технологию можно применить и для словарных слов, и для правил и т.д. </div>
        <div>Со временем я буду добавлять новые тренажеры, однако если у вас есть желания поучавствовать в разработке, пишите. Telegram - @Can4k.</div>
      </div>
      <div class="paragraph">
        <h1>Стек</h1>
        <li>Vue.js 3</li>
        <li>Vuex</li>
        <li>Vue Router</li>
        <li>Express?</li>
        <li>MongoDB?</li>
      </div>
      <div class="paragraph">
        <h1>Мои другие проекты</h1>
        <li><a target="_blank" href="http://is57.ru">is57.ru</a> - сайт для Межпредметной Олимпиады 57 школы</li>
        <li><a target="_blank" href="http://admin.is57.ru">admin.is57.ru</a> - сайт-админка для Межпредметной Олимпиады 57 школы (не работает, т.к. отключен сервер)</li>
        <li><a target="_blank" href="http://tictactocbase.web.app">tictactocbase.web.app</a> - крестики нолики для двоих</li>
        <li><a target="_blank" href="http://chatprotor.web.app">chatprotor.web.app</a> - мессенджер (не работает, т.к. отключен сервер)</li>
        <li><a target="_blank" href="http://csshelp.web.app">csshelp.web.app</a> - памятка по css (не работает, т.к. отключен сервер)</li>
      </div>
    </div>
  </div>
</template>

<script>
import BackButton from "@/UI/BackButton.vue";

export default {
  name: "AboutView",
  components: {BackButton}
}
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.description {
  margin-top: 10px;
}
a {
  color: #42b983;
}
</style>