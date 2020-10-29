import Vue from 'vue';

import TIM from './TIM.vue';

TCIC.TBaseVue.registerComponent('tim-component', TIM);
Vue.customElement('tim-component', TIM);