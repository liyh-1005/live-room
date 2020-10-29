import Vue from 'vue';
import TrtcComponent from './TrtcComponent.vue';

TCIC.TBaseVue.registerComponent('trtc-component', TrtcComponent)
Vue.customElement('trtc-component', TrtcComponent);