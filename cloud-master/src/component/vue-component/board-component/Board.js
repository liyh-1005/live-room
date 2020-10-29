import Vue from 'vue';
import Board from './Board.vue';

TCIC.TBaseVue.registerComponent('board-component', Board)
Vue.customElement('board-component', Board);