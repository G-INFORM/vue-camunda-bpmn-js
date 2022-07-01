<template>
  <div class="content">
    <a id="rules"><h1 style="text-align: center; margin-top: 50px">Правила описания бизнес-процесса</h1></a>
    <img src="../../assets/img/guide/element44.png" alt="Правила описания бизнес-процесса">

    <h1 style="text-align: center">Завершенность или ответ на ключевой вопрос</h1>
    <p class="p-big">
      В описании бизнес-процесса должны быть изложены все действия, которые предстоит выполнить,
      чтобы получить нужный результат. На самом деле конечная цель может измениться, но на начальном
      этапе данный факт можно опустить.
    </p>

    <h1 style="text-align: center">Краткость и лаконичность</h1>
    <p class="p-big">
      Главная задача – предоставить специалистам всю информацию,
      необходимую для правильной, быстрой, слаженной работы. Это своего рода инструкция.
      Документ включает совокупность данных в большом объеме, но их важно изложить кратко,
      с акцентом на основные моменты. Лишние детали и отстраненные формулировки отвлекают.
    </p>

    <h1 style="text-align: center">Использование типовых нотаций</h1>
    <p class="p-big">
      Существуют общепринятые международные обозначения, которые и должны использоваться в описаниях.
      Это стандарты IDEF3, BPMN 2.0, BPMN и другие. Они позволяют читать и правильно
      трактовать бизнес-процесс любому человеку. Применение личных выдуманных обозначений недопустимо.
    </p>

    <h1 style="text-align: center">Понятность</h1>
    <p class="p-big">
      Документ должен быть составлен доступно для понимания. Если показать его любому
      сотруднику компании без знаний в области аналитики, он должен прочесть и понять, о чем идет речь.
    </p>

    <h1 style="text-align: center">Указание участников</h1>
    <p class="p-big">
      Каждый сотрудник, задействованный в бизнес-процессе, должен быть указан прямо.
      При этом не рекомендуется применять спец. сноски Swimm line и классические сноски с нумерацией.
      Это затрудняет поиск ответственных лиц и сопоставление имен с задачами.
    </p>

  </div>
</template>

<script>
export default {
  name: "RulesDescriptionBP"
}
</script>

<style scoped>
@import "../../assets/css/anchor.scss";
.img-container {
  display: flex;
  justify-content: center;
}

.content {
  display: flex;
  flex-direction: column;
  align-content: center;
  /*margin: 100px auto;*/
}

.text_bold {
  font-weight: bold;
}

.list {
  font-size: large;
  margin-top: 7px;
  margin-bottom: 7px;
  text-align: justify;
}

p {
  font-size: large;
}

.p-big {
  text-align: justify;
}

.img {
  float: left;
  margin: auto 10px;
  max-width: 500px;
}

.block-img-text {
//display: flex;
}

h2 {
  margin-bottom: 0;
  margin-top: 20px;
}
</style>