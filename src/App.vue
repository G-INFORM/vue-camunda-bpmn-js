<template>
  <div class="main content" ref="js-drop-zone">
    <introPage @upload="upload"
               @createNewDiagram="createNewDiagram"
               @continueLastDiagram="continueLastDiagram"
               :date="date"
               :error="error"/>

    <input-output @upload="upload"
                  @createNewDiagram="createNewDiagram"
                  :modeler="modeler"/>

    <div id="canvas" class="canvas modeler"></div>

    <aside id="properties" class="properties aside" :style="isHiddenAside? 'width: 0!important;' : ''">
      <button @click="isHiddenAside=!isHiddenAside" v-if="error === null" type="button" title="Close Details Panel"
              data-test="specification-toggle" class="btn-aside">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
          <path d="M5.5 6h9m-9 4h9m-9 4h6" stroke="currentColor" stroke-linecap="round" stroke-width="2">
          </path>
        </svg>
        Детали
      </button>
    </aside>

  </div>
</template>

<script>
/** Моделер
 комментарии
 перевод на русский
 валидатор диаграмм
 стартовая диаграмма
 выбор цвета для диаграмм
 **/

import BpmnModeler from 'camunda-bpmn-js/lib/camunda-platform/Modeler';
import 'camunda-bpmn-js/dist/assets/camunda-platform-modeler.css';
import EmbeddedComments from 'bpmn-js-embedded-comments';
import ruLang from '@/assets/lang/castomTranslate';
import lintModule from 'bpmn-js-bpmnlint';
import 'bpmn-js-bpmnlint/dist/assets/css/bpmn-js-bpmnlint.css';
import bpmnlintConfig from '../.bpmnlintrc';
import DiagramXML from '@/assets/diagram.bpmn'
import BpmnColorPickerModule from 'bpmn-js-color-picker';
import InputOutput from "@/components/Input-Output-Info/io";
import introPage from "@/components/introPage";

export default {
  name: 'App',
  data: () => ({
    modeler: null,
    container: null,
    error: null,
    date: null,
    isHiddenAside: true
  }),
  components: {InputOutput, introPage},
  methods: {
    async continueLastDiagram() {
      let xml = localStorage.getItem('xml');
      await this.openDiagram(xml);
    },
    async createNewDiagram() {
      if (localStorage.getItem('xml') === null || localStorage.getItem('xml').replace(/\s/g, '') !== DiagramXML.replace(/\s/g, '')) {
        if (confirm('Создать новую диаграмму? Старые данные будут удалены!')) {
          await this.openDiagram(DiagramXML);
        } else {
          // Do nothing!
          console.log('Thing was not saved to the database.');
        }
      } else {
        await this.openDiagram(DiagramXML);
      }
    },
    async openDiagram(xml) {
      try {
        await this.modeler.importXML(xml);
        this.container
            .classList.remove('with-error');
        this.container
            .classList.add('with-diagram');
        this.error = null;
      } catch (error) {

        this.container
            .classList.remove('with-diagram');
        this.container
            .classList.add('with-error');

        this.error = error.message;
        this.isHiddenAside = true;

        console.error(error);
      }
    },
    registerFileDrop(container, callback) {
      function handleFileSelect(e) {
        e.stopPropagation();
        e.preventDefault();

        let files = e.dataTransfer.files;
        let file = files[0];
        let reader = new FileReader();

        reader.onload = function (e) {
          let xml = e.target.result;
          callback(xml);
        };
        reader.readAsText(file);
      }

      function handleDragOver(e) {
        e.stopPropagation();
        e.preventDefault();
        // Explicitly show this is a copy.
        e.dataTransfer.dropEffect = 'copy';
      }

      container.addEventListener('dragover', handleDragOver, false);
      container.addEventListener('drop', handleFileSelect, false);
    },
    upload(e) {
      let files = e.target.files;
      let file = files[0];
      let reader = new FileReader();
      let vm = this;
      reader.onload = async function (e) {
        let xml = e.target.result;
        await vm.openDiagram(xml);
      };
      reader.readAsText(file);
    },
    // closeComments() {
    //   console.log("this")
    //   console.log(this)
    //   console.log("this")
    //
    //   this.modeler.get('comments').collapseAll();
    // },
    async initializeBPMN() {
      this.date = localStorage.getItem('date');
      let TranslateModule = {
        translate: ['value', ruLang]
      };

      this.modeler = new BpmnModeler({
        container: '#canvas',
        keyboard: {
          bindTo: document
        },
        propertiesPanel: {
          parent: '#properties'
        },
        additionalModules: [
          TranslateModule,
          EmbeddedComments,
          lintModule,
          BpmnColorPickerModule
        ],
        linting: {
          bpmnlint: bpmnlintConfig
        },
      });

      this.container = this.$refs["js-drop-zone"];

      try {
         // await this.modeler.importXML(DiagramXML);
        // this.modeler.get('canvas').zoom('fit-viewport');
      } catch (err) {
        console.error('something went wrong:', err);
      }

      // check file api availability
      if (!window.FileList || !window.FileReader) {
        window.alert(
            'Looks like you use an older browser that does not support drag and drop. ' +
            'Try using Chrome, Firefox or the Internet Explorer > 10.');
      } else {
        this.registerFileDrop(this.container, this.openDiagram);
      }

      // this.modeler.on('canvas.click', this.closeComments);

    }
  },
  async mounted() {
    // window.onbeforeunload = function () {
    //   return true;
    // };

    await this.initializeBPMN();
    // console.log(this.modeler.injector._instances.eventBus._listeners)

  }
}
</script>

<style lang="scss">


</style>
