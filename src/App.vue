<template>
  <div class="content with-diagram" ref="js-drop-zone">
    <div class="entry" style="position: absolute; left: 40%; width: fit-content; height: fit-content; z-index:100;">
      <a href ref="data-download" download="test.bpmn" @click="serialize" class="btn">Download</a>
      <label for="uploads" class="btn">
        Upload
      </label>
      <input v-on:change="upload" id="uploads" type="file" style="display: none;"/>
    </div>
    <div class="message intro">
      <div class="note">
        Drop BPMN diagram from your desktop or
        <a id="js-create-diagram" @click="fa" href>create a new diagram</a> to get started.
      </div>
    </div>
    <div class="message error">
      <div class="note">
        <p>Ooops, we could not display the BPMN 2.0 diagram.</p>
        <div class="details">
          <span>Import Error Details</span>
          <pre>{{err}}</pre>
        </div>
      </div>
    </div>
    <div id="canvas" class="canvas"></div>
    <div id="properties" class="properties"></div>
  </div>

<!--  <ul class="buttons">-->
<!--    <li>-->
<!--      download-->
<!--    </li>-->
<!--    <li>-->
<!--      <a ref="js-download-diagram" id="js-download-diagram" href title="download BPMN diagram">-->
<!--        BPMN diagram-->
<!--      </a>-->
<!--    </li>-->
<!--    <li>-->
<!--      <a ref="js-download-svg" id="js-download-svg" href title="download as SVG image">-->
<!--        SVG image-->
<!--      </a>-->
<!--    </li>-->
<!--  </ul>-->
</template>

<script>
import BpmnModeler from 'camunda-bpmn-js/lib/camunda-platform/Modeler';
import EmbeddedComments from 'bpmn-js-embedded-comments';
import 'camunda-bpmn-js/dist/assets/camunda-platform-modeler.css';
// import BpmnModeler from 'bpmn-js/lib/Modeler';
const DiagramXML = '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" id="sample-diagram" targetNamespace="http://bpmn.io/schema/bpmn" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd"><bpmn2:process id="x" isExecutable="false" /><bpmndi:BPMNDiagram id="BPMNDiagram_1"><bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="x" /></bpmndi:BPMNDiagram></bpmn2:definitions>'
    // '<?xml version="1.0" encoding="UTF-8"?>\n' +
    // '<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd" id="sample-diagram" targetNamespace="http://bpmn.io/schema/bpmn">\n' +
    // '  <bpmn2:process id="Process_1" isExecutable="false">\n' +
    // '    <bpmn2:startEvent id="StartEvent_1"/>\n' +
    // '  </bpmn2:process>\n' +
    // '  <bpmndi:BPMNDiagram id="BPMNDiagram_1">\n' +
    // '    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">\n' +
    // '      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">\n' +
    // '        <dc:Bounds height="36.0" width="36.0" x="412.0" y="240.0"/>\n' +
    // '      </bpmndi:BPMNShape>\n' +
    // '    </bpmndi:BPMNPlane>\n' +
    // '  </bpmndi:BPMNDiagram>\n' +
    // '</bpmn2:definitions>';

export default {
  name: 'App',
  data: () => ({
    modeler: null,
    container: null,
    err: null,
  }),
  components: {
  },
  methods:{
    async createNewDiagram() {
      await this.openDiagram(DiagramXML);
    },
    async openDiagram(xml) {
      try {
        await this.modeler.importXML(xml);
        this.container
            .classList.remove('with-error');
        this.container
            .classList.add('with-diagram');
      } catch (err) {

        this.container
            .classList.remove('with-diagram');
        this.container
            .classList.add('with-error');

        //this.container.find('.error pre').text(err.message);
        this.err = err.message;

        console.error(err);
      }
    },
    registerFileDrop(container, callback) {

      function handleFileSelect(e) {
        e.stopPropagation();
        e.preventDefault();

        let files = e.dataTransfer.files;

        let file = files[0];

        let reader = new FileReader();

        reader.onload = function(e) {

          let xml = e.target.result;

          callback(xml);
        };

        reader.readAsText(file);
      }

      function handleDragOver(e) {
        e.stopPropagation();
        e.preventDefault();

        e.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
      }

      container.addEventListener('dragover', handleDragOver, false);
      container.addEventListener('drop', handleFileSelect, false);
    },
    fa(e) {
      e.stopPropagation();
      e.preventDefault();

      this.createNewDiagram();
    },
    // debounce(fn, timeout) {
    //
    //   var timer;
    //
    //   return function() {
    //     if (timer) {
    //       clearTimeout(timer);
    //     }
    //
    //     timer = setTimeout(fn, timeout);
    //   };
    // },
    // setEncoded(link, name, data) {
    //   var encodedData = encodeURIComponent(data);
    //
    //   if (data) {
    //     link.classList.add('active');
    //     link.attr({
    //       'href': 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData,
    //       'download': name
    //     });
    //   } else {
    //     link.classList.remove('active');
    //   }
    // }
    async serialize() {
      try {
        const { xml } = await this.modeler.saveXML();
        console.log(xml)
        let encodedData = encodeURIComponent(xml);
        this.$refs["data-download"].href = 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData

      } catch (err) {

        console.error('failed to serialize BPMN 2.0 xml', err);
      }
    },
    upload(e) {
      let files = e.target.files;
      let file = files[0];
      let reader = new FileReader();
      let vm = this;
      reader.onload = async function(e) {
        let xml = e.target.result;
        await vm.openDiagram(xml);
      };
      reader.readAsText(file);
    }
  },
  async mounted() {
    this.modeler = new BpmnModeler({
      container: '#canvas',
      propertiesPanel: {
        parent: '#properties'
      },
      additionalModules: [
        EmbeddedComments
      ]
    });
    this.container = this.$refs["js-drop-zone"]
    //this.modeler.attachTo('#canvas');
    try {

      await this.modeler.importXML(DiagramXML);

      console.log('success!');
      //bpmnModeler.get('canvas').zoom('fit-viewport');
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
    // console.log(this.modeler.injector._instances.eventBus._listeners['comments.updated'])
    //this.modeler.on('comments.updated', this.serialize);
    //this.modeler.on('commandStack.changed', this.serialize);
    // console.log(this.modeler.injector._instances.eventBus._listeners['comments.updated'])

    this.modeler.on('canvas.click', function() {
      console.log(123)
      this.modeler.get('comments').collapseAll();
    });
//
//       var downloadLink = this.$refs['js-download-diagram'];
//       var downloadSvgLink = this.$refs['js-download-svg'];
//
//       // $('.buttons a').click(function (e) {
//       //   if (!$(this).is('.active')) {
//       //     e.preventDefault();
//       //     e.stopPropagation();
//       //   }
//       // });
//
//       var exportArtifacts = this.debounce(async function () {
//         try {
//
//           const {svg} = await this.modeler.saveSVG();
//
//           this.setEncoded(downloadSvgLink, 'diagram.svg', svg);
//         } catch (err) {
//
//           console.error('Error happened saving svg: ', err);
//           this.setEncoded(downloadSvgLink, 'diagram.svg', null);
//         }
//
//         try {
//
//           const {xml} = await this.modeler.saveXML({format: true});
//           this.setEncoded(downloadLink, 'diagram.bpmn', xml);
//         } catch (err) {
//
//           console.error('Error happened saving XML: ', err);
//           this.setEncoded(downloadLink, 'diagram.bpmn', null);
//         }
//       }, 500);
//
//       this.modeler.on('commandStack.changed', exportArtifacts);
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  /*margin-top: 60px;*/
}

* {
  box-sizing: border-box;
}

body, html {

  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;

  font-size: 12px;

  height: 100%;
  padding: 0;
  margin: 0;
}

a:link {
  text-decoration: none;
}

.content,
.content > div {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
}

.content > .message {
  width: 100%;
  height: 100%;
  text-align: center;
  display: table;

  font-size: 16px;
  color: #111;
}

.content > .message .note {
  vertical-align: middle;
  text-align: center;
  display: table-cell;
}

.content .error .details {
  max-width: 500px;
  font-size: 12px;
  margin: 20px auto;
  text-align: left;
  color: #BD2828;
}

.content .error pre {
  border: solid 1px #BD2828;
  background: #fefafa;
  padding: 10px;
  color: #BD2828;
}

.content:not(.with-error) .error,
.content.with-error .intro,
.content.with-diagram .intro {
  display: none;
}


.content .canvas,
.content.with-error .canvas {
  visibility: hidden;
  height: 100vh;
}

.content.with-diagram .canvas {
  visibility: visible;
  height: 100vh;
}

.buttons {
  position: fixed;
  bottom: 20px;
  left: 20px;

  padding: 0;
  margin: 0;
  list-style: none;
}

.buttons > li {
  display: inline-block;
  margin-right: 10px;
}
.buttons > li > a {
  background: #DDD;
  border: solid 1px #666;
  display: inline-block;
  padding: 5px;
}

.buttons a {
  opacity: 0.3;
}

.buttons a.active {
  opacity: 1.0;
}

#properties {
  width: 410px;
  height: 100vh;
}

.properties {
  border-left: 1px solid #ccc;
  overflow: auto;

}
.properties:empty {
  display: none;
  min-width: 410px;
}

.properties > .bpp-properties-panel {
  /*padding-bottom: 70px;*/
  min-height:100%;
  min-width: 100%;
}

.properties > .djs-properties-panel {
  padding-bottom: 70px;
  min-height:100%;
}


.comments-overlay {
  background: #52B415;
  font-size: 12px;

  color: white;
  display: none;
}

.selected .comments-overlay,
.comments-overlay.with-comments {
  display: block;
}

.comments-overlay .edit {
  margin: 2px 0 0 0;
  padding-top: 2px;
}

.comments-overlay .edit textarea {
  border: none;
  margin: 0;
}

.comments-overlay .icon-comment:hover {
  color: #EEE;
}

.comments-overlay .comment {
  border-top-color: white;
}

.comments-overlay > .content {
  flex-direction: column;
}
.content > .comments {
  flex-direction: column;
}

.comments-overlay .icon-comment {
  margin-right: 2px;
}

.comments-overlay .icon-delete {
  color: white;
}

.comments-overlay {
  background: #52B415;
  padding: 5px;
  border-radius: 5px;
}

.comments-overlay.expanded {
  z-index: 100;
  position: absolute; /* for z-index to work */
}

.comments-overlay .toggle {
  white-space: nowrap;
}

.comments-overlay.expanded .comment-count,
.comments-overlay .content {
  display: none;
}

.comments-overlay .comment-count {
  display: inline;
}

.comments-overlay.expanded .content {
  display: block;
}

.comments-overlay .comment {
  border-top: dotted 1px #666;
  margin-top: 4px;
  padding-top: 4px;
  white-space: pre-wrap;

  position: relative;
}

.comments-overlay .comment .delete {
  position: absolute;
  right: 3px;
  top: 3px;

  text-decoration: none;

  display: none;
}

.comments-overlay .comment:hover .delete {
  display: block;
}

.comments-overlay .edit {

}

.btn{
  text-align: center;
  width: 100px;
  white-space: nowrap;
  user-select: none;
  touch-action: manipulation;
  border: 1px solid #ccc;
  border-radius: 5px ;
  margin: 6px;
  padding: 6px 12px;
  vertical-align: middle;
  color: #2c3e50;
  display: inline-block;
  text-decoration: none;
  background-color: #f8f8f8;
  font-size: 15px;
  cursor: pointer;
}

.btn:hover{
  color: #fff;
  background-color: #4d90ff;
}

/** fonts **/

@font-face {
  font-family: 'bpmn-js-comments';
  src: url('assets/font/bpmn-js-comments.eot?23532594');
  src: url('assets/font/bpmn-js-comments.eot?23532594#iefix') format('embedded-opentype'),
  url('assets/font/bpmn-js-comments.woff?23532594') format('woff'),
  url('assets/font/bpmn-js-comments.ttf?23532594') format('truetype'),
  url('assets/font/bpmn-js-comments.svg?23532594#bpmn-js-comments') format('svg');
  font-weight: normal;
  font-style: normal;
}

[class^="icon-"]:before,
[class*=" icon-"]:before {
  font-family: "bpmn-js-comments";
  font-style: normal;
  font-weight: normal;
  speak: none;

  display: inline-block;
  text-decoration: inherit;
  width: 1em;
  text-align: center;

  font-variant: normal;
  text-transform: none;

  line-height: 1em;
}

.icon-comment:before { content: '\e800'; }
.icon-delete:before { content: '\e802'; }
</style>
