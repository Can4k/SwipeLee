<template>
  <div :style="this.$store.state.theme === 'black'? {color: 'white'} : {color: 'black'}" class="wrapper">
    <BackButton/>
    <div class="description">
      <div class="paragraph">
        <h1>О сайте</h1>
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
        <li>mitt</li>
        <li>Firebase</li>
      </div>
      <div class="paragraph">
        <h1>Мои другие проекты</h1>
        <li>is57.ru - сайт для Межпредметной Олимпиады 57 школы</li>
        <li>admin.is57.ru - сайт-админка для Межпредметной Олимпиады 57 школы (не работает, т.к. отключен сервер)</li>
        <li>tictactocbase.web.app - крестики нолики для двоих</li>
        <li>chatsprotor.web.app - мессенджер (не работает, т.к. отключен сервер)</li>
        <li>csshelper.web.app - памятка по css (не работает, т.к. отключен сервер)</li>
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
  max-width: 400px;
  position: relative;
  left: 50%;
  transform: translate(-50%);
  height: calc(100vh - 20px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.description {
  padding: 10px;
}
</style>