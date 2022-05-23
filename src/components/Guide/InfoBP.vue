<template>
<!--  <h1>Бизнес процессы</h1>-->
  <ol class="rounded">
    <li >
      Бизнес процессы - набор функций, выполняемых в определённой
      последовательности для создания ценности для бизнеса (организации).
    </li>
    <li >
      Бизнес процессы - поледовательность работ. Как правило повторяющихся во времени.
    </li>
    <li >
      Не процесс, если нет ценности для бизнеса (организации) или последовательность не определена.
    </li>
    <li >
      Процесс начинается с чётко определённых внешних событий (процессы не начинаются случайно).
    </li>
    <li >
      Процесс - сочетание всех действий, требуемых для достижения цели, получения результата, продукции или услуги,
      вне зависимости от того, где они выполняются. Другими словами, процесс включает всё необходимое для получения
      результата. Процесс не может окончиться безрезультатно.
    </li>
    <li >
      Обычно в процессе задействовано несколько отделов или организаций. Другими словами, если участвует один
      человек или один отдел, то это не является бизнес-процессом, а является процедурой/функцией из ДИ.
    </li>
    <li >
      В БП могут участвовать и люди, и программы.
    </li>
    <li >
      Результатом работы процесса является его завершение или запуск/изменение другого процесса.
    </li>
  </ol>
</template>

<script>
export default {
  name: "InfoBP"
}
</script>


<style lang="scss">
.rounded {
  counter-reset: li;
  list-style: none;
  font: 14px "Trebuchet MS", "Lucida Sans";
  padding: 0;
  text-shadow: 0 1px 0 rgba(255, 255, 255, .5);
}

.rounded li {
  position: relative;
  display: block;
  padding: .4em .4em .4em 2em;
  margin: .75em 0;
  background: #DAD2CA;
  color: #444;
  text-decoration: none;
  border-radius: .3em;
  text-align: justify;
  font-size: 14px;
  /*transition: .3s ease-out;*/
}

.rounded li:hover {
  background: #E9E4E0;
}

/*.rounded li:hover:before {transform: rotate(360deg);}*/
.rounded li:before {
  content: counter(li);
  counter-increment: li;
  position: absolute;
  left: -1.3em;
  top: 50%;
  margin-top: -1.3em;
  background: #8FD4C1;
  height: 2em;
  width: 2em;
  line-height: 2em;
  border: .3em solid white;
  text-align: center;
  font-weight: bold;
  border-radius: 2em;
  //transition: all .3s ease-out;
}

</style>