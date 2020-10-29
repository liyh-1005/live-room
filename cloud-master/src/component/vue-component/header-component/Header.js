import Vue from 'vue';
import Header from './Header.vue';

TCIC.TBaseVue.registerComponent('header-component', Header)
Vue.customElement('header-component', Header);