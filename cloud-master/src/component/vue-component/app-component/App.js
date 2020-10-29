import Vue from 'vue';
import App from './App.vue';

TCIC.TBaseVue.registerComponent('app-component', App)
Vue.customElement('app-component', App);