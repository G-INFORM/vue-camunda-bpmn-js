<template>
  <div class="form-group">
    <label class="label-set-name" for="setName">Введите название файла</label>
    <input id="setName" class="form-field" type="email" placeholder="Введите название файла" v-model="name">
    <button @click="setName">Сохранить</button>
  </div>
</template>

<script>
export default {
  name: "setName",
  emits: ["close"],
  props:{
    link: HTMLAnchorElement,
    p_name: {
      type: String,
      default: ""
    }
  },
  data: () => ({
    name: ""
  }),
  methods: {
    setName() {
      let ext = this.link.getAttribute("id");
      if (!this.name) {
        this.name = "diagram";
      }
      this.link.setAttribute('download', this.name + '.' + ext);
      this.link.click();
      this.$emit("close");
    }
  },
  mounted() {
    this.name = this.p_name;
  }
}
</script>

<style lang="scss">
:root {

  --input-color: #99A3BA;
  --input-border: #CDD9ED;
  --input-background: #fff;
  --input-placeholder: #CBD1DC;

  --input-border-focus: #275EFE;

  --group-color: var(--input-color);
  --group-border: var(--input-border);
  --group-background: #EEF4FF;

  --group-color-focus: #fff;
  --group-border-focus: var(--input-border-focus);
  --group-background-focus: #678EFE;

}

.label-set-name {
  margin: auto 10px;
  font-size: large;
}

.form-field {
  display: block;
  width: 100%;
  padding: 8px 26px;
  line-height: 25px;
  font-size: 14px;
  font-weight: 500;
  font-family: inherit;
  border-radius: 6px;
  -webkit-appearance: none;
  color: var(--input-color);
  border: 1px solid var(--input-border);
  background: var(--input-background);
  transition: border .3s ease;
  &::placeholder {
    color: var(--input-placeholder);
  }
  &:focus {
    outline: none;
    border-color: var(--input-border-focus);
  }
}

.form-group {
  position: relative;
  display: flex;
  width: 100%;
  margin-top: 10px;
  & > button,
  .form-field {
    white-space: nowrap;
    display: block;
    &:not(:first-child):not(:last-child) {
      border-radius: 0;
    }
    &:first-child {
      border-radius: 6px 0 0 6px;
    }
    &:last-child {
      border-radius: 0 6px 6px 0;
    }
    &:not(:first-child) {
      margin-left: -1px;
    }
  }
  .form-field {
    position: relative;
    z-index: 1;
    flex: 1 1 auto;
    width: 1%;
    margin-top: 0;
    margin-bottom: 0;
  }
  & > button {
    text-align: center;
    padding: 8px 12px;
    font-size: 14px;
    line-height: 25px;
    color: var(--group-color);
    background: var(--group-background);
    border: 1px solid var(--group-border);
    transition: background .3s ease, border .3s ease, color .3s ease;
  }
  &:focus-within {
    & > button {
      color: var(--group-color-focus);
      background: var(--group-background-focus);
      border-color: var(--group-border-focus);
    }
  }
}
</style>