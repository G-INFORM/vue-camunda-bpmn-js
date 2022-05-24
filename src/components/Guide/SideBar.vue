<template>
  <div class="sidenav">
    <span></span>
    <ul>
      <li v-for="component in p_components" v-bind:key="component.id">
        <span @click="getComponent(component.component)">{{component.name}}</span>
      </li>
    </ul>
<!--    <span @click="getComponentNumber(1)">Что такое бизнес процесс?</span>-->
<!--    <span @click="getComponentNumber(2)">Описание нотации BPMN</span>-->
<!--    <span @click="getComponentNumber(3)">Правила работы с системой</span>-->
  </div>
</template>

<script>
export default {
  name: "SideBar",
  props: {
    p_components: {
      type: Object,
      default: null
    }
  },
  methods: {
    getComponent(component) {
      this.$emit('getComponent', component);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/variables.scss";
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