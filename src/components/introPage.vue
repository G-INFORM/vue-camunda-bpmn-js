<template>
  <div class="message intro">
    <div class="note">
      Перетащите диаграмму BPMN со своего рабочего стола или
      <a id="js-create-diagram" @click="$emit('createNewDiagram', $event)" href>создайте новую диаграмму</a> чтобы начать работу.
    </div>
  </div>
  <div class="message error-main">
    <div class="note">
      <p>Упс, мы не смогли отобразить диаграмму BPMN 2.0.</p>
      <div class="details">
        <span>Сведения об ошибке импорта</span>
        <pre>{{ error }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "introPage",
  emits: ["createNewDiagram"],
  props: {
    error: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">

.content > .message {
  width: 100%;
  height: 100vh;
  text-align: center;
  display: table;
  font-size: 16px;
  color: #111;
}

.content > .message .note {
  //vertical-align: middle;
  padding-top: 10vh;
  text-align: center;
  display: table-cell;
}

.content .error-main .details {
  //max-width: 700px;
  width: fit-content;
  font-size: 12px;
  margin: 20px auto;
  text-align: left;
  color: #BD2828;
}

.content .error-main pre {
  border: solid 1px #BD2828;
  background: #fefafa;
  padding: 10px;
  color: #BD2828;
}

.content:not(.with-error) .error-main,
.content.with-error .intro,
.content.with-diagram .intro {
  display: none;
}


</style>