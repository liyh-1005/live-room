import Vue from 'vue';
import Dialog from './Dialog.vue';

TCIC.TBaseVue.registerComponent('dialog-component', Dialog);
Vue.customElement('dialog-component', Dialog);