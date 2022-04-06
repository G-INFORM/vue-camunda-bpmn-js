<template>
  <div class="io-dialog" :class="d_show? 'open' : ''" v-on:mousedown.self="onClose">
    <div class="content" style="display: inline; font-size: 14px">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalComponent",
  data: () => ({
    d_show: true,
  }),
  methods:{
    onClose(){
      this.d_show = false;
      this.$emit('close');
    }
  }
}
</script>

<style scoped>

</style>