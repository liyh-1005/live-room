import Vue from 'vue';

import Layout from './Layout.vue';

TCIC.TBaseVue.registerComponent('layout-component', Layout)
Vue.customElement('layout-component', Layout);