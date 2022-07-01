<template>
  <div class="content">
    <a href="#" class="ontop">
      <div class="arrow">
        <svg style="enable-background:new 0 0 32 32;" version="1.1" viewBox="0 0 32 32" xml:space="preserve"
             xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <g class="st0" id="grid"/>
          <g id="icon"><g><g><path class="st2" d="M21,16c-0.26,0-0.51-0.1-0.71-0.29L16,11.41l-4.29,4.29c-0.39,0.39-1.02,0.39-1.41,0s-0.39-1.02,0-1.41l5-5     c0.39-0.39,1.02-0.39,1.41,0l5,5c0.39,0.39,0.39,1.02,0,1.41C21.51,15.9,21.26,16,21,16z"/></g></g>
            <g><g><path class="st2" d="M21,22c-0.26,0-0.51-0.1-0.71-0.29L16,17.41l-4.29,4.29c-0.39,0.39-1.02,0.39-1.41,0s-0.39-1.02,0-1.41l5-5     c0.39-0.39,1.02-0.39,1.41,0l5,5c0.39,0.39,0.39,1.02,0,1.41C21.51,21.9,21.26,22,21,22z"/></g></g></g>
        </svg>
      </div>
    </a>
    <div>
      <h1 class="structure">Содержание страницы</h1>
      <span><a href="#main" class="link">Главная страница сервиса</a></span>
      <span><a href="#save" class="link">Сохранение BPMN-Схем</a></span>
    </div>
    <a id="main"><h1 class="link-header">Главная страница серсиса</h1></a>
    <img src="../../assets/img/guide/element31.png" alt="Главная страница сервиса">
    <ol class="list">
      <li>
        Для открытия BPMN-схемы имеется возможно перетащить файл с расширением bpmn в окно браузера (Drug & drop).
        В случае выбора <span class="text_bold">«создать новую диаграмму»</span> откроется новый проект,
        при этом очиститься авто-сохраненная диаграмма.
      </li>
      <li>
        В случае выбора <span class="text_bold">«Загрузить диаграмму»</span> откроется стандартное окно проводника,
        посредством которого можно выбрать и открыть любую диаграмму с расширением «bpmn».
      </li>
      <li>
        В случае выбора <span class="text_bold">«Создать новую диаграмму»</span> откроется новый проект, при этом
        очиститься авто сохраненная диаграмма.
      </li>
      <li>
        При работе с BPMN-схемами выполняется авто-сохранение, поэтому в случае если страница или браузер
        по каким—то причинам был закрыт, то наработки не потеряются. Работу можно будет продолжить нажав
        <span class="text_bold">«Продолжить работу от…»</span>
      </li>
      <li>
        Информационная поддержка содержит описание нотации BPMN, теоретическую информацию по БП,
        а также правила работы с данным сервисом.
      </li>
    </ol>

    <a id="save"><h1 class="link-header">СОХРАНЕНИЕ BPMN-СХЕМ</h1></a>
    <p>Чтобы сохранить спроектированную диаграмму, необходимо в нижнем левом углу нажать иконку сохранения:</p>

    <div class="img-container">
      <img src="../../assets/img/guide/element32.png" alt="Сохранение схем" style="">
    </div>
    <div class="img-container">
      <img src="../../assets/img/guide/element33.png" alt="Схема">
    </div>
    <p>Сервис предложит ввести наименование диаграммы:</p>
    <div class="img-container">
      <img src="../../assets/img/guide/element34.png" alt="Наименование диаграммы">
    </div>
    <p>При наименовании BPMN-схемы необходимо придерживаться следующих правил:</p>
    <div class="img-container">
      <img src="../../assets/img/guide/element35.png" alt="Правила наименования">
    </div>
    <p>После нажатия на кнопку «Сохранить», диаграмма будет сохранена в стандартный каталог ОС «Загрузки». </p>
    <p>Необходимо самостоятельно перенести BPMN-схему в хранилище в корпоративной сети филиала по следующему пути:</p>
    <h2>P:\002 Бизнес-процессы филиала</h2>
    <p>Выбрать каталог для сохранения BPMN-схемы в зависимости от типа БП:</p>
    <div class="img-container">
      <img src="../../assets/img/guide/element36.png" alt="Путь к сохранениям">
    </div>
  </div>
</template>

<script>
export default {
  name: "RulesBP",
}
</script>

<style lang="scss" scoped>
.img-container {
  display: flex;
  justify-content: center;
}

.content {
  display: flex;
  flex-direction: column;
  align-content: center;
  //margin: 100px auto;
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