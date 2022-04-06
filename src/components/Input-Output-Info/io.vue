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
        <button title="Сочетания клавиш" @click="d_showKeyInfo = true">
          <span class="icon-keyboard"> </span>
        </button>
      </li>
      <li class="vr"></li>
      <li>
        <button title="QA" @click="d_showBPInfo = true">
          <span class="icon-info"> </span>
        </button>
      </li>
    </ul>

    <ModalComponent v-if="d_showKeyInfo===true" @close="d_showKeyInfo=false">
      <KeyboardInfo/>
    </ModalComponent>

    <ModalComponent v-if="d_showBPInfo===true" @close="d_showBPInfo=false">
      <BPInfo/>
    </ModalComponent>

  </div>
</template>

<script>
import ModalComponent from "@/components/ModalComponent";
import KeyboardInfo from "@/components/Input-Output-Info/keyboardInfo";
import BPInfo from "@/components/Input-Output-Info/BPInfo";

export default {
  name: 'input-output',
  components: {BPInfo, KeyboardInfo, ModalComponent},
  props: {
    modeler: Object
  },
  data: () => ({
    d_showKeyInfo: false,
    d_showBPInfo: false,
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
