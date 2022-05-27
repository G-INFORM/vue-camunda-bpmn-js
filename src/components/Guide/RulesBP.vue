<template>
  <div class="content">
    <h1 style="text-align: center">Главная страница серсиса</h1>
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
        В случае выбора <span class="text_bold">«Создать новую диаграмму»</span> откроется новый проект, при этом очиститься авто сохраненная диаграмма.
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

    <h1 style="text-align: center; margin-top: 50px">СОХРАНЕНИЕ BPMN-СХЕМ</h1>
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
  name: "RulesBP"
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