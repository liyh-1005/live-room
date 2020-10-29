<template>
  <div class="navi-container">
    <div class="board-tabs-bar flex-wrap">
      <div class="tabs-nav tabs-nav-scroll">
        <div class="file-tabs-nav">
          <template v-for="(tab, index) in tabs">
            <div class="file-tabs-tab" v-bind:class="{ 'tab-active': index === currentTab }" :key="index" @click="onSwitchBoard(index)">
              <i class="file-icon file-icon-x-close" v-bind:class="closeIconClass(index, tab)" @click.stop="onRemoveTap(index)"></i>
              <span class="menu-span">{{ tab.label }}</span>
            </div>
          </template>
        </div>
      </div>
      <!-- <div class="tabs-nav tabs-nav-right">
        <button class="tabs-nav-btn">&nbsp;&nbsp;+&nbsp;&nbsp;新增课件</button>
      </div>
      <div class="tabs-nav tabs-nav-prev"></div>
      <div class="tabs-nav tabs-nav-next"></div> -->
    </div>
  </div>
</template>

<script>
import BaseComponent from "@core/BaseComponent";

export default {
  extends: BaseComponent,
  props: {},

  data() {
    return {
      currentTab: null,
      tabs: [],
    };
  },

  methods: {
    afterJoinClassCallback() {
      this.EventBus.$on("boardDataChange", this.boardDataChange);
    },

    /**
     * 根据白板Id提取Seq
     * @param {*} boardId
     */
    _boardIdGetSeq(boardId) {
      return boardId.match(/\d+_#/)[0].replace(/\D/gi, "");
    },

    /**
     * 根据白板id获取timestamp
     */
    _boardIdGetTimestamp(boardId) {
      return boardId === "#DEFAULT" ? 0 : boardId.match(/\d+_\d+_#\w+$/)[0].split("_")[0];
    },

    boardDataChange(data) {
      let teduBoard = (this.teduBoard = data.teduBoard);
      let fid = data.currentFile;
      let file = teduBoard.getFileInfo(fid);
      this.tabs = [];

      data.files.forEach((item) => {
        let label = item.fid === "#DEFAULT" ? "白板1" : item.title;
        if (item.type === 2) {
          label = "视频播放器";
        }
        let tab = {
          fid: item.fid,
          label: label,
          title: label,
          type: item.type,
          timestamp: item.timestamp,
        };
        if (item.fid === "#DEFAULT") {
          tab.boardId = "#DEFAULT";
          tab.timestamp = 0; // 将默认的白板页的时间戳变成0
        }
        this.tabs.push(tab);
      });

      let defaultBoardList = JSON.parse(JSON.stringify(teduBoard.getFileBoardList("#DEFAULT")));

      defaultBoardList.forEach((item) => {
        if (item != "#DEFAULT") {
          this.tabs.push({
            fid: "#DEFAULT",
            label: `白板${this._boardIdGetSeq(item) * 1 + 1}`,
            title: item.title,
            type: item.type,
            timestamp: this._boardIdGetTimestamp(item),
            boardId: item,
          });
        }
      });

      this.tabs = this.tabs.sort((item1, item2) => {
        return item1.timestamp * 1 - item2.timestamp * 1;
      });

      if (file) {
        if (file.type === 2) {
          // 视频播放
          this.showBottomToolBar = false;
        } else {
          this.showBottomToolBar = true;
        }

        if (this.toolbar) {
          setTimeout(() => {
            if (file.fid === "#DEFAULT") {
              this.toolbar && this.toolbar.updateScale(teduBoard.getBoardScale());
            } else {
              this.toolbar && this.toolbar.updateScale(teduBoard.getFileScale(file.fid));
            }
          }, 0);
          this.toolbar.updatePage({
            current: file.currentPageIndex + 1,
            total: file.pageCount,
          });

          if (file.fid === "#DEFAULT") {
            this.toolbar.hidePaginage();
            this.toolbar.hideGotoPage();
          } else if (file.pageCount > 1) {
            this.toolbar.showPaginage();
            this.toolbar.showGotoPage();
          } else {
            this.toolbar.hidePaginage();
            this.toolbar.hideGotoPage();
          }
        }
      }
      this.activeCurrentTab();
    },

    closeIconClass(index, tab) {
      let className = `x-close x-close-index-${index}`;
      console.log("closeIcon:", tab);
      if (tab.fid === "#DEFAULT" && tab.boardId === "#DEFAULT") {
        className += " default-bid";
      }
      return className;
    },

    activeCurrentTab() {
      let fid = this.teduBoard.getCurrentFile();
      let boardId = this.teduBoard.getCurrentBoard();
      for (let i = 0; i < this.tabs.length; i++) {
        if (fid === "#DEFAULT") {
          if (this.tabs[i].boardId == boardId) {
            this.currentTab = i;
            break;
          }
        } else {
          if (this.tabs[i].fid == fid) {
            this.currentTab = i;
            break;
          }
        }
      }
    },

    onSwitchBoard(index) {
      let tab = this.tabs[index * 1];
      this.teduBoard.switchFile(tab.fid);
      this.currentTab = index;
      if (tab.boardId) {
        this.teduBoard.gotoBoard(tab.boardId);
      } else if (tab.fid === "#DEFAULT") {
        this.teduBoard.gotoBoard("#DEFAULT");
      }
    },

    onRemoveTap(index) {
      let tab = this.tabs[index];
      if (tab.fid === "#DEFAULT") {
        this.teduBoard.deleteBoard(tab.boardId);
      } else {
        this.teduBoard.deleteFile(tab.fid);
      }
    },
  },
  mounted() {},
};
</script>

<style lang="less">
.navi-container {
  width: 100%;
  height: 48px;
  background: #3f4146;
  .board-tabs-bar {
    width: 100%;
    height: 100%;

    .tabs-nav {
      height: 48px;
      line-height: 48px;
    }

    .tabs-nav-scroll {
      flex: 1;
    }

    .tabs-nav-right {
      right: 96px;
      border-left: 0;
      -webkit-box-shadow: -10px 0 18px #333;
      box-shadow: -10px 0 18px #333;
      margin-left: 5px;
      .tabs-nav-btn {
        border: 0;
        height: 48px;
        line-height: 32px;
        font-size: 14px;
        color: #a5aeb0 !important;
        border-radius: 0;
        padding: 0 20px;
        background-color: rgba(0, 0, 0, 0);

        &:hover {
          background-color: rgba(0, 0, 0, 0.2);
        }
      }
    }
    .tabs-nav-prev {
      width: 48px;
      background: url("@assets/images/arrow-left.png") no-repeat;
    }
    .tabs-nav-next {
      width: 48px;
      background: url("@assets/images/arrow-right.png") no-repeat;
    }
  }
  .file-tabs-nav {
    line-height: 32px;
    height: 48px;
  }

  .file-tabs-tab {
    color: #a5aeb0 !important;
    margin-right: 0;
    border-right: 2px solid #333;
    display: inline-block;
    height: 100%;
    padding: 8px 16px;
    box-sizing: border-box;
    cursor: pointer;
    text-decoration: none;
    position: relative;
    transition: color 0.3s ease-in-out;
    .menu-span {
      text-overflow: ellipsis;
      max-width: 150px;
      overflow: hidden;
      display: inline-block;
    }
    &:hover {
      .file-icon-x-close {
        display: block;
        &.default-bid {
          display: none;
        }
      }
    }
    &.tab-active {
      color: #fff !important;
      background: #34363b;
    }
  }

  .file-icon {
    &.file-icon-x-close {
      position: absolute;
      top: 2px;
      right: -6px;
      width: 14px;
      height: 16px;
      line-height: 14px;
      font-size: 16px;
      margin-right: 5px;
      cursor: pointer;
      background: url(https://res.qcloudtiw.com/saas/container/close.svg) 50% no-repeat;
      background-size: 100%;
      display: none;
    }
  }
}
</style>
