<template>
  <Layout class="tic-layout-container">
    <template v-slot:top>
      <Header></Header>
    </template>
    <template v-slot:center>
      <div class="tic-board__box flex-wrap flex-column">
        <div class="tic-board__box--component">
          <Board></Board>
          <BoardTool></BoardTool>
        </div>
        <div class="tic-board__box--bottom">
          <BoardFileList></BoardFileList>
        </div>
      </div>
    </template>
    <template v-slot:right>
      <div class="tic-trtc-im__box">
        <div class="tic-trtc__box">
          <TrtcComponent></TrtcComponent>
        </div>
        <div class="tic_im__box">
          <TIM></TIM>
        </div>
      </div>
    </template>
  </Layout>
</template>

<script>
import "@assets/css/style.less";
import "@assets/css/edu-tic.css";

import BaseComponent from "@core/BaseComponent";
import Layout from "@vueComponent/layout-component/Layout.vue";
import Board from "@vueComponent/board-component/Board.vue";
import Header from "@vueComponent/header-component/Header.vue";
import BoardTool from "@vueComponent/boardtool-component/BoardTool.vue";
import TrtcComponent from "@vueComponent/trtc-component/TrtcComponent.vue";
import BoardFileList from "@vueComponent/boardfilelist-component/BoardFileList.vue";
import TIM from "@vueComponent/im-component/TIM.vue";

export default {
  extends: BaseComponent,
  components: {
    TIM,
    Layout,
    Board: Board,
    BoardTool,
    TrtcComponent,
    Header,
    BoardFileList,
  },
};
</script>

<style lang="less">
.app-component {
  display: block;
  width: 100%;
  height: 100%;
}

.tic-layout-container {
  width: 100%;
  height: 100%;
}

.tic-board__box {
  position: relative;
  width: 100%;
  height: 100%;
  .tic-board__box--component {
    position: relative;
    flex: 1;
  }
  .tic-board__box--bottom {
    background: #212224;
    width: 100%;
    height: 48px;
  }
}

.tic-trtc-im__box {
  width:100%;
  height: 100%;
  overflow: hidden;
  .tic-trtc__box {
    height: 262.5px;
  }

  .tic_im__box {
    height: calc(100% - 262.5px);
  }
}

.tic-container__top {
  position: relative;
  z-index: 100;
  height: 56px;
  line-height: 56px;
  font-size: 0;
  background-color: #34363b;
}

.tic-container__main-right {
  width: 350px;
}

/* 小屏幕 */
@media screen and (max-height: 460px) {
  .tic-container__main-right {
    width: 180px !important;
  }

  .tic-trtc-im__box {
    .tic-trtc__box {
      height: 135px;
    }

    .tic_im__box {
      height: calc(100% - 135px);
    }
  }
}
</style>>