(() => {
  let tmain = TCIC.TMain.instance;
  
  // 初始化SDK
  tmain.initialize()
    .then((data) => {

    })
    .catch(err => {
      tmain.showErrorMsg(err.toString());
    });

  // 加载页面入口
  TCIC.TMain.instance.loadComponent("app-component");
})();