<template>
  <div class="main-content-guide">
    <div class="wrapper-content">
      <div class="content">
<!--        <slot :p_name="'save'"/>-->
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainContent",
}
</script>

<style lang="scss" scoped>
/* Style page content */
@import "../../assets/css/variables.scss";
.main-content-guide {
  margin-left: $size-sidebar; /* Same as the width of the sidebar */
  padding: 0px 20px;
}
.wrapper-content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  margin: 50px auto;
}
.content {
  display: flex;
  flex-direction: column;
  width: fit-content;
  max-width: 50vw;
  min-width: 50vw;
  font-family: GraphikCy,'Helvetica CY',Arial,sans-serif!important;
  //font-size: large;
  //font-family: cursive;
}
</style>