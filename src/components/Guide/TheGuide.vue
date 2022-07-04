<template>
  <SideBar/>
  <MainContent>
    <router-view></router-view>
  </MainContent>
</template>

<script>
import SideBar from "@/components/Guide/SideBar";
import MainContent from "@/components/Guide/MainContent";
export default {
  name: "TheGuide",
  components: { MainContent, SideBar},
  mounted() {
    this.$router.push({name: 'IntroductionBP'});
  }
}
</script>

<style>
</style>