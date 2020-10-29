import Vue from 'vue';

import BoardFileList from './BoardFileList.vue';

TCIC.TBaseVue.registerComponent('board-filelist-component', BoardFileList)
Vue.customElement('board-filelist-component', BoardFileList);