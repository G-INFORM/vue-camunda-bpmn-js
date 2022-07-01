<template>
  <div class="content">
    <a id="forms"><h1 style="text-align: center; margin-top: 50px">ФОРМЫ ПРЕДСТАВЛЕНИЯ ИНФОРМАЦИИ В КОМПАНИИ</h1></a>
    <img src="../../assets/img/guide/element37.png" alt="ФОРМЫ ПРЕДСТАВЛЕНИЯ ИНФОРМАЦИИ В КОМПАНИИ">

    <a id="rations"><h1 style="text-align: center; margin-top: 50px">СООТНОШЕНИЕ ФОРМ ПРЕДСТАВЛЕНИЯ ИНФОРМАЦИИ</h1></a>
    <img src="../../assets/img/guide/element38.png" alt="СООТНОШЕНИЕ ФОРМ ПРЕДСТАВЛЕНИЯ ИНФОРМАЦИИ">

    <a id="problems"><h1 style="text-align: center; margin-top: 50px">ПРОБЛЕМАТИКА СИМВОЛЬНОЙ ФОРМЫ</h1></a>
    <img src="../../assets/img/guide/element39.png" alt="ПРОБЛЕМАТИКА СИМВОЛЬНОЙ ФОРМЫ">

    <a id="images"><h1 style="text-align: center; margin-top: 50px">ЧЕЛОВЕК МЫСЛИТ ОБРАЗАМИ!</h1></a>
    <img src="../../assets/img/guide/element40.png" alt="ЧЕЛОВЕК МЫСЛИТ ОБРАЗАМИ!">

    <a id="notation"><h1 style="text-align: center; margin-top: 50px">ЯЗЫК ОПИСАНИЯ ПРОЦЕССОВ (НОТАЦИЯ)</h1></a>
    <img src="../../assets/img/guide/element41.png" alt="ЯЗЫК ОПИСАНИЯ ПРОЦЕССОВ (НОТАЦИЯ)">
  </div>
</template>

<script>
export default {
  name: "IntroductionBP"
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