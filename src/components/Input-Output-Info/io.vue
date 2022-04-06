<template>
  <div class="io-import-export">
    <ul class="io-import io-control io-control-list io-horizontal">
      <li>
        <label for="uploads" class="btn" style="" title="Загрузить диаграмму BPMN">
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
        <button title="Скачать в виде файла BPMN 2.0" @click="d_showSetName = true; link = $refs['data-download']">
          <span class="icon-download"></span>
        </button>
        <a ref="data-download" style="display: none" id="bpmn"
           href="" class="download" title="Скачать в виде файла BPMN 2.0">
          <span class="icon-download"></span>
        </a>
      </li>
      <li class="vr"></li>
      <li>
        <button title="Скачать в виде SVG-изображения" @click="d_showSetName = true; link = $refs['download-svg']">
          <span class="icon-picture"></span>
        </button>
        <a ref="download-svg" style="display: none" id="svg"
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

    <ModalComponent v-if="d_showSetName===true" @close="d_showSetName=false">
      <SetName :link="link"
                @close="d_showSetName=false"
                :p_name="diagramName"/>
    </ModalComponent>

  </div>
</template>

<script>
import ModalComponent from "@/components/ModalComponent";
import KeyboardInfo from "@/components/Input-Output-Info/keyboardInfo";
import BPInfo from "@/components/Input-Output-Info/BPInfo";
import SetName from "@/components/Input-Output-Info/SetName";

export default {
  name: 'input-output',
  components: {SetName, BPInfo, KeyboardInfo, ModalComponent},
  props: {
    modeler: Object,
    diagramName: {
      type: String,
      default: ""
    },
  },
  data: () => ({
    d_showKeyInfo: false,
    d_showBPInfo: false,
    d_showSetName: false,
    link: null,
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
          vm.setEncoded(downloadSvgLink, this.diagramName + '.svg', svg);
        } catch (err) {
          console.error('Error happened saving svg: ', err);
          vm.setEncoded(downloadSvgLink, this.diagramName + '.svg', null);
        }

        try {
          const {xml} = await vm.modeler.saveXML({format: true});
          vm.setEncoded(downloadLink, this.diagramName + '.bpmn', xml);
          localStorage.setItem('xml', xml);
          localStorage.setItem('date', new Date(Date.now()).toLocaleDateString());
        } catch (err) {
          console.error('Error happened saving XML: ', err);
          vm.setEncoded(downloadLink, this.diagramName + '.bpmn', null);
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
