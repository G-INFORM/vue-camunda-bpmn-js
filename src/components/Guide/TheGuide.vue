<template>
  <SideBar @getComponent="getComponent" :p_components="d_components"/>
  <MainContent>
    <InfoBP v-if="d_component === 'InfoBP'"/>
    <DescriptionBP v-if="d_component === 'Description'"/>
    <RulesBP v-if="d_component === 'Rules'"/>
  </MainContent>
</template>

<script>
import SideBar from "@/components/Guide/SideBar";
import MainContent from "@/components/Guide/MainContent";
import InfoBP from "@/components/Guide/InfoBP";
import DescriptionBP from "@/components/Guide/DescriptionBP";
import RulesBP from "@/components/Guide/RulesBP";
export default {
  name: "TheGuide",
  components: {RulesBP, DescriptionBP, InfoBP, MainContent, SideBar},
  data: () => ({
    d_components: [
      {
        name: "Что такое бизнес процесс?",
        id: 1,
        component: "InfoBP",
        children: [{}]
      },
      {
        name: "Описание нотации BPMN",
        id: 2,
        component: "Description",
        children: [{}]
      },
      {
        name: "Правила работы с системой",
        id: 3,
        component: "Rules",
        children: [{}]
      }
    ],
    d_component: ""
  }),
  methods: {
    getComponent(component) {
      console.log(component)
      this.d_component = component;
    }
  }
}
</script>

<style scoped>

</style>