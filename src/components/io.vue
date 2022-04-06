<template>
  <div class="io-import-export">
    <ul class="io-import io-control io-control-list io-horizontal">
      <li>
        <label for="uploads" class="btn" style="">
          <span class="icon-open"></span>
        </label>
        <input v-on:change="$emit('upload', $event)" id="uploads" type="file" style="display: none;"/>
      </li>
      <li class="vr"></li>
      <li>
        <button @click="$emit('createNewDiagram', $event)" title="Создать новую диаграмму BPMN">
          <span class="icon-plus-circled"></span>
        </button>
      </li>
    </ul>

    <ul class="io-export io-control io-control-list io-horizontal">
      <li>
        <a ref="data-download" download="diagram.bpmn"
           href="" class="download" title="Скачать в виде файла BPMN 2.0">
          <span class="icon-download"></span>
        </a>
      </li>
      <li class="vr"></li>
      <li>
        <a ref="download-svg" id="download-svg"
           href="" class="download" title="Скачать в виде SVG-изображения">
          <span class="icon-picture"></span>
        </a>
      </li>
    </ul>

    <ul class="io-export io-control io-control-list io-horizontal">
      <li>
        <button title="Сочетания клавиш" @click="x = true">
          <span class="icon-keyboard"> </span>
        </button>
      </li>
      <li class="vr"></li>
      <li>
        <button title="QA" @click="y = true">
          <span class="icon-info"> </span>
        </button>
      </li>
    </ul>


    <div class="io-dialog" :class="x? 'open' : ''" v-on:mousedown.self="x = false">
      <div class="content" style="display: inline; font-size: 14px">
        <h1>Сочетания клавиш</h1>
        <table>
          <tbody>
          <tr>
            <td>Отменить</td>
            <td class="binding"><code>ctrl + Z</code></td>
          </tr>
          <tr>
            <td>Повторить</td>
            <td class="binding"><code>ctrl + shift + Z</code></td>
            <!--            (⇧)-->
          </tr>
          <tr>
            <td>Выделить всё</td>
            <td class="binding"><code>ctrl + A</code></td>
          </tr>
          <tr>
            <td>Прокрутка (вертикальная)</td>
            <td class="binding"><code>ctrl + Scrolling</code></td>
          </tr>
          <tr>
            <td>Прокрутка (горизонтальная)</td>
            <td class="binding"><code>ctrl + shift + Scrolling</code></td>
          </tr>
          <tr>
            <td>Прямое Редактирование</td>
            <td class="binding"><code>E</code></td>
          </tr>
          <tr>
            <td>Инструмент "Рука"</td>
            <td class="binding"><code>H</code></td>
          </tr>
          <tr>
            <td>Инструмент "Лассо"</td>
            <td class="binding"><code>L</code></td>
          </tr>
          <tr>
            <td>Инструмент "Упр. пространством"</td>
            <td class="binding"><code>S</code></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'input-output',
  props: {
    modeler: Object
  },
  data: () => ({
    x: false,
    y: false,
  }),
  methods: {
    debounce(fn, timeout) {
      let timer;
      return function () {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(fn, timeout);
      };
    },
    setEncoded(link, name, data) {
      let encodedData = encodeURIComponent(data);
      if (data) {
        link.classList.add('active');
        link.setAttribute('href', 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData)
        link.setAttribute('download', name)
      } else {
        link.classList.remove('active');
      }
    },
    initSerializing() {
      let downloadSvgLink = this.$refs['download-svg'];
      let downloadLink = this.$refs['data-download'];
      let vm = this;
      let exportArtifacts = this.debounce(async function () {

        try {
          const {svg} = await vm.modeler.saveSVG();
          vm.setEncoded(downloadSvgLink, 'diagram.svg', svg);
        } catch (err) {
          console.error('Error happened saving svg: ', err);
          vm.setEncoded(downloadSvgLink, 'diagram.svg', null);
        }

        try {
          const {xml} = await vm.modeler.saveXML({format: true});
          vm.setEncoded(downloadLink, 'diagram.bpmn', xml);
        } catch (err) {
          console.error('Error happened saving XML: ', err);
          vm.setEncoded(downloadLink, 'diagram.bpmn', null);
        }
      }, 500);

      this.modeler.on('comments.updated', exportArtifacts);
      this.modeler.on('commandStack.changed', exportArtifacts);
      this.modeler.on('import.done', exportArtifacts);
    },
  },
  mounted() {
    this.$nextTick(function () {
      if (this.modeler) {
        this.initSerializing();
      }
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
