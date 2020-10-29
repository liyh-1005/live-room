import Vue from 'vue'
import EventBus from './EventBus'
import vueCustomElement from 'vue-custom-element'
Vue.use(vueCustomElement);

export default {
  extends: TCIC.TBaseVue,
  data() {
    return {
      EventBus: null
    }
  },
  mounted() {
    this.EventBus = EventBus;
    this._onEnterClass();
  },

  methods: {

    _onEnterClass() {
      TCIC.TMain.instance.on(TCIC.TMain.EVENT_AFTER_ENTER, this.afterJoinClassCallback)
    },

    afterJoinClassCallback() {

    },

    /**
     * 在弹窗中展示组件
     * @param {string} name  组件名称
     * @param {*} params 参数
     */
    showSubComponent(name, params) {
      const url = `${document.location.protocol}//${document.location.host}${document.location.pathname.replace("index.html", "")}webview.html`
      TCIC.TMain.instance.showSubWindow(url, name, params);
    }
  }
}