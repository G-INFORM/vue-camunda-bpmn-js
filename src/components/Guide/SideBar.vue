<template>
  <div class="sidenav">
    <router-link :to="{ name: 'IntroductionBP' }">
      <span>ВВЕДЕНИЕ</span>
    </router-link>
    <router-link :to="{ name: 'infoBP' }">
      <span>Что такое бизнес процесс?</span>
    </router-link>
    <router-link :to="{ name: 'descriptionBP' }">
      <span>Описание нотации BPMN</span>
    </router-link>
    <router-link :to="{ name: 'RulesDescriptionBP' }">
      <span>Правила описания БП</span>
    </router-link>
    <router-link :to="{ name: 'rulesBP' }">
      <span>Правила работы с системой</span>
    </router-link>
<!--    <div class="children" onblur="showRulesChildren = false" v-if="showRulesChildren">-->
<!--      <span><a href="#main">Главная страница сервиса</a></span>-->
<!--      <span><a href="#save">Сохранение BPMN-Схем</a></span>-->
<!--    </div>-->
  </div>
</template>

<script>
export default {
  name: "SideBar",
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/variables.scss";
.children {
  margin-left: 20px;
  background-color: #8E24AA;
}
/* The sidebar menu */
.sidenav {
  height: 100%; /* Full-height: remove this if you want "auto" height */
  width: $size-sidebar; /* Set the width of the sidebar */
  position: fixed; /* Fixed Sidebar (stay in place on scroll) */
  z-index: 1; /* Stay on top */
  top: 0; /* Stay at the top */
  left: 0;
  background-color: $main-color; /* Black */
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 20px;
}
/* The navigation menu links */
.sidenav span {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 25px;
  display: block;
  cursor: pointer;
  color: white;
  transition: margin-left 0.5s;
}

.sidenav a {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  display: block;
  cursor: pointer;
  color: white;
  transition: margin-left 0.5s;
}

/* When you mouse over the navigation links, change their color */
.sidenav span:hover {
  //color: #BFBFBF;
  margin-left: 7px;
}
ul {
  margin: 0;
  padding: 0;
}
/* On smaller screens, where height is less than 450px, change the style of the sidebar (less padding and a smaller font size) */
@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav span {font-size: 18px;}
}
</style>