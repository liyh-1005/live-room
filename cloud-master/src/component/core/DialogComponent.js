import Vue from 'vue'
import vueCustomElement from 'vue-custom-element'
Vue.use(vueCustomElement);

/**
 * 弹窗组件基类(需要弹窗展示的组件继承使用)
 */
export default {
  extends: TCIC.TBaseVue,
  data() {
    return {
    }
  },
  mounted() {
  },

  methods: {

    /**
     * 弹窗初始化处理
     * @param {*} params 参数
     */
    initial(params) {

    },

    /**
     * 关闭弹窗页
     */
    close() {
      TCIC.TMain.instance.closeSubWindowSelf();
    }
  }
}