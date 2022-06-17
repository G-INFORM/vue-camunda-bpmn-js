<template>
  <SideBar @getLinkName="getLinkName"/>
  <MainContent :p_name="d_name">
    <router-view></router-view>
  </MainContent>
</template>

<script>
import SideBar from "@/components/Guide/SideBar";
import MainContent from "@/components/Guide/MainContent";
export default {
  name: "TheGuide",
  components: { MainContent, SideBar},
  data:() => ({
    d_name: ""
  }),
  methods: {
    getLinkName(name) {
      this.d_name = name;
      console.log('TheGuide', name)
    }
  }
}
</script>

<style>
</style>