<template>
  <!-- Page content -->
  <div class="main-content-guide">
    <slot/>
  </div>
</template>

<script>
// import WhatIsBPMN from "@/components/Guide/WhatIsBPMN";
export default {
  name: "MainContent",
  components: { }
}
</script>

<style lang="scss" scoped>
/* Style page content */
@import "../../assets/css/variables.scss";
.main-content-guide {
  margin-left: $size-sidebar; /* Same as the width of the sidebar */
  padding: 0px 20px;
}
</style>