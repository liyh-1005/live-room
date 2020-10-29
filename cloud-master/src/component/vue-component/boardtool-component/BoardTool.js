import Vue from 'vue';
import BoardTool from './BoardTool.vue';

TCIC.TBaseVue.registerComponent('board-tool-component', BoardTool)
Vue.customElement('board-tool-component', BoardTool);