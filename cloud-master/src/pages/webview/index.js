import Vue from '@vue';
import queryString from 'query-string';
import Dialog from "@commonVueComponent/dialog-component/Dialog.vue";

window.app = new Vue({
  el: '#app',
  components: {
    Dialog
  },

  mounted() {
    const parsed = queryString.parse(location.search);
    const componentName = parsed.componentName;
    const methodName = parsed.methodName;
    const params = parsed.params;
    const platform = parsed.platform;

    if (platform){
      TCIC.TSession.instance.setParams("platform", platform);
    }
    // 初始化弹窗模块
    TCIC.TMain.instance.initSubWindow();
    
    if(componentName) {
      try {
        this.callComponent(componentName, methodName, JSON.parse(params));
      } catch (error) {
        this.callComponent(componentName, methodName, params);
      }
    }
  },

  data() {
    return {
      useComponent: null,
    }
  },

  methods: {
    callComponent(componentName, methodName, params) {
      this.setCurrentComponent(componentName).then(() => {
        let currentComponent = this.getCurrentComponent();
        if(currentComponent[methodName]) {
          currentComponent[methodName].apply(currentComponent, [params])
        }
      });
    },

    setCurrentComponent(componentName) {
      this.useComponent = componentName;
      return this.$nextTick();
    },

    getCurrentComponent() {
      return this.$refs['component-ref'];
    }
  }
})