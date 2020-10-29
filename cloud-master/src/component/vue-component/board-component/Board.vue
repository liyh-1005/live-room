<template>
  <div class="tedu-component-board-wrap">
    <div id="white-board" class="tedu-component-board-content"></div>
  </div>
</template>

<script>
import BaseComponent from "@core/BaseComponent";

export default {
  extends: BaseComponent,

  props: {
    muteVideo: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      teduBoard: null,
      sdkAppId: null,
      userId: null,
      userSig: null,
      roomId: null,
      eventList: [],
      loadingTimeOut: null, // 缓冲定时器
    };
  },

  mounted() {
    this.bindEvent();
    window.addBoardData = (data) => {
      this.teduBoard && this.teduBoard.addSyncData(data);
    };

    window.addFile = (data) => {
      this.addFile(data);
    };
  },

  beforeDestroy() {
    this.unbindEvent();
  },

  methods: {
    afterJoinClassCallback() {
      this.launch();
    },

    bindEvent() {
      this.on("setting_board_draw_type", (type, data) => {
        console.debug(`setting_board_draw_type  type =>${type} , data => ${JSON.stringify(data)}`);
        switch (type) {
          case "toolchoose":
            this.teduBoard.setToolType(TEduBoard.TOOL_TYPE.TEDU_BOARD_TOOL_TYPE_MOUSE);
            break;
          case "tooltext":
            this.teduBoard.setToolType(TEduBoard.TOOL_TYPE.TEDU_BOARD_TOOL_TYPE_TEXT);
            break;
          case "toollaser":
            this.teduBoard.setToolType(TEduBoard.TOOL_TYPE.TEDU_BOARD_TOOL_TYPE_LASER);
            break;
          case "toolrubber":
            this.teduBoard.setToolType(TEduBoard.TOOL_TYPE.TEDU_BOARD_TOOL_TYPE_ERASER);
            break;

          case "toolrevoke":
            this.teduBoard.undo();
            break;

          case "toolrecovery":
            this.teduBoard.redo();
            break;

          case "tooldel":
            // MessageBridge.showMessageBox({
            //   title: "清空白板数据将不能恢复，您确定要清空白板数据吗？",
            //   options: ["清空", "取消"],
            //   callback: (index) => {
            //     if (index === 0) {
            //       this.teduBoard.clear();
            //     }
            //   },
            // });
            this.teduBoard.clear();
            break;
          case "tooldrag":
            this.teduBoard.setToolType(TEduBoard.TOOL_TYPE.TEDU_BOARD_TOOL_TYPE_ZOOM_DRAG);
            break;
          case "tooladd":
            this.teduBoard.addBoard();
            break;
        }
      });

      this.on("setting_board_color_type", (color) => {
        console.debug(`setting_board_color_type => ${color}`);
        if (color.rgba) {
          var rgba = color.rgba;
          this.teduBoard.setBrushColor(`rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`);
        } else {
          this.teduBoard.setBrushColor(color);
        }
      });

      this.on("setting_board_text_size", (size) => {
        console.debug(`setting_board_text_size => ${size}`);
        this.teduBoard.setTextSize(size);
      });

      this.on("setting_board_text_color", (color) => {
        console.debug(`setting_board_text_color => ${color}`);
        this.teduBoard.setTextColor(color);
      });

      this.on("setting_board_brush_type", (brush) => {
        console.debug(`setting_board_brush_type => ${brush}`);
        this.teduBoard.setToolType(brush);
      });

      this.on("setting_board_brush_thin", (thin) => {
        console.debug(`setting_board_brush_thin => ${thin}`);
        this.teduBoard.setBrushThin(thin);
      });

      this.on("setting_board_select_type", (select) => {
        console.debug(`setting_board_select_type => ${select}`);
        this.teduBoard.setToolType(select);
      });

      // 接收到白板消息
      this.on("im_receive_board_msg", (msg) => {
        // var elems = msg.elems;
        // elems.forEach((elem) => {
        //   // 自定义消息 && 是白板的自定义消息
        //   // elkLog.report(elkLog.events.on_im_receive_board_msg) // 与白板SDK上报重复
        //   console.debug(
        //     "msg.getFromAccount() != this.userId",
        //     msg.getFromAccount(),
        //     this
        //   );
        //   if (
        //     elem.type === "TIMCustomElem" &&
        //     elem.content.ext === "TXWhiteBoardExt" &&
        //     msg.getFromAccount() != this.userId
        //   ) {
        //     try {
        //       this.teduBoard.addSyncData(JSON.parse(elem.content.data));
        //     } catch (error) {
        //       // event.fire(this, Constant.EVENT.BOARD.ADD_DATA_ERROR, error);
        //     }
        //   }
        // });
      });
    },

    on(tag, callback) {
      this.eventList.push(tag);
      this.EventBus.$on(tag, callback);
    },

    unbindEvent() {
      // this.eventList.forEach((item) => {
      //   this.EventBus.$off(item);
      // });
    },

    launch() {
      let global = TCIC.TSession.instance;
      this.sdkAppId = global.getSchoolInfo().sdkAppId;
      this.userId = global.getUserId();
      this.userSig = global.getParams("usersig");
      this.classId = global.getClassInfo().classId;
      this.platform = global.getPlatform();

      let boardInstance = TCIC.TBoard.instance;
      boardInstance.init({
        id: "white-board",
        classId: this.classId,
        sdkAppId: this.sdkAppId,
        userId: this.userId,
        userSig: this.userSig,
        globalBackgroundColor: "#1a1b1d",
        boardContentFitMode: TEduBoard.TEduBoardContentFitMode.TEDU_BOARD_FILE_FIT_MODE_CENTER_INSIDE,
      });
      this.teduBoard = window.teduBoard = boardInstance.getBoard();
      this.teduBoard.on(TEduBoard.EVENT.TEB_ERROR, (code, msg) => {
        alert("创建白板错误");
        console.log("====TEB_ERROR: " + code + ", " + msg);
      });
      this.teduBoard.on(TEduBoard.EVENT.TEB_WARNING, (code, msg) => {
        console.log("====TEB_WARNING: " + code + ", " + msg);
      });

      this.initBoardEvent();
      return this.teduBoard;
    },

    initBoardEvent() {
      this.teduBoard.on(TEduBoard.EVENT.TEB_SYNCDATA, (data) => {});

      this.teduBoard.on(TEduBoard.EVENT.TEB_ADDBOARD, (data) => {
        this.fireBoardDataChangeEvent(data);
      });

      this.teduBoard.on(TEduBoard.EVENT.TEB_DELETEBOARD, (data) => {
        this.fireBoardDataChangeEvent(data);
      });

      this.teduBoard.on(TEduBoard.EVENT.TEB_GOTOBOARD, (data) => {
        this.fireBoardDataChangeEvent(data);
      });

      this.teduBoard.on(TEduBoard.EVENT.TEB_SWITCHFILE, (data) => {
        this.fireBoardDataChangeEvent(data);
      });

      this.teduBoard.on(TEduBoard.EVENT.TEB_DELETEFILE, (data) => {
        // 以下为了解决删除文件时候，没有回调播放事件，只能在删除文件时候判断是否还有vodFile
        let files = this.teduBoard.getFileInfoList() || [];
        let hasVodFile = false;
        for (let i = 0, len = files.length; i < len; i++) {
          const file = files[i];
          if (file.type === 2) {
            // 点播文件，则表示还有点播文件
            hasVodFile = true;
          }
        }
        if (!hasVodFile) {
          // 如果没有点播文件了，则触发一次事件，并表示播放停止
          this.$emit("teduBoardVideoPlayed", false);
        }
      });

      // 增加H5动画PPT文件回调
      this.teduBoard.on(TEduBoard.EVENT.TEB_ADDH5PPTFILE, (data) => {
        this.fireBoardDataChangeEvent(data);
      });

      // 增加文件回调
      this.teduBoard.on(TEduBoard.EVENT.TEB_ADDFILE, (data) => {
        this.fireBoardDataChangeEvent(data);
      });

      // 增加转码文件回调
      this.teduBoard.on(TEduBoard.EVENT.TEB_ADDTRANSCODEFILE, (data) => {
        this.fireBoardDataChangeEvent(data);
      });
      // 增加Images文件回调
      this.teduBoard.on(TEduBoard.EVENT.TEB_ADDIMAGESFILE, (data) => {
        this.fireBoardDataChangeEvent(data);
      });

      this.teduBoard.on(TEduBoard.EVENT.TEB_VIDEO_STATUS_CHANGED, (data) => {
        if (data) {
          if (data.status === TEduBoard.VIDEO_STATUS.TEDU_BOARD_VIDEO_STATUS_PLAYED) {
            if (self.muteVideo) {
              self.tboard.muteVideo(data.fileId, true);
            }
            this.$emit("teduBoardVideoPlayed", true);
          } else if (data.status === TEduBoard.VIDEO_STATUS.TEDU_BOARD_VIDEO_STATUS_ERROR || data.status === TEduBoard.VIDEO_STATUS.TEDU_BOARD_VIDEO_STATUS_PAUSED || data.status === TEduBoard.VIDEO_STATUS.TEDU_BOARD_VIDEO_STATUS_ENDED) {
            this.$emit("teduBoardVideoPlayed", false);
          } else if (data.status === TEduBoard.VIDEO_STATUS.TEDU_BOARD_VIDEO_STATUS_WAITING) {
            // 视频缓冲中
            if (Global.schoolCustomInfo.loading_tips) {
              this.loadingTimeOut = setTimeout(() => {
                var exceptionId = localStorage.getItem("globalrandom") + "_" + Math.floor(Math.random() * 1024);
                var title = "视频课件加载缓慢，建议切换稳定网络环境使用 异常ID: " + exceptionId;
                elkLog.report(elkLog.events.exception, {
                  exception_id: exceptionId,
                  extra_info: title,
                });
                MessageBridge.showMessageBox({
                  title: "视频课件加载缓慢，建议切换稳定网络环境使用",
                  options: ["确定"],
                  callback: (index) => {},
                });
              }, 5000);
            }
          } else if (data.status === TEduBoard.VIDEO_STATUS.TEDU_BOARD_VIDEO_STATUS_PLAYING) {
            // 视频缓冲完成
            if (Global.schoolCustomInfo.loading_tips) {
              clearTimeout(this.loadingTimeOut);
            }
          }
        }
      });

      // -------------------------------  监听白板异常情况的提示 start --------------------------------------

      // 图片状态加载回调
      this.teduBoard.on(TEduBoard.EVENT.TEB_IMAGE_STATUS_CHANGED, (status, data) => {
        switch (status) {
          case TEduBoard.TEduBoardImageStatus.TEDU_BOARD_IMAGE_STATUS_LOAD_ERROR: //背景图片加载错误        CONSTANT.EVENT.IMG_ERROR
          case TEduBoard.TEduBoardImageStatus.TEDU_BOARD_IMAGE_STATUS_LOAD_TIMEOUT: //背景图片加载超时        CONSTANT.EVENT.IMG_TIMEOUT
            this.notifyBoardException();
            break;
        }
      });

      // h5ppt加载状态
      this.teduBoard.on(TEduBoard.EVENT.TEB_H5PPT_STATUS_CHANGED, (status, data) => {
        switch (status) {
          case TEduBoard.TEduBoardH5PPTStatus.TEDU_BOARD_H5_PPT_STATUS_TIMEOUT:
          case TEduBoard.TEduBoardH5PPTStatus.TEDU_BOARD_H5_PPT_STATUS_RESOURCES_LOADING_ERROR:
          case TEduBoard.TEduBoardH5PPTStatus.TEDU_BOARD_H5_PPT_STATUS_RUNTIME_ERROR:
            this.notifyBoardException();
            break;
        }
      });

      // h5ppt加载状态
      this.teduBoard.on(TEduBoard.EVENT.TEB_VIDEO_STATUS_CHANGED, (data) => {
        let status = data.status;
        switch (status) {
          case TEduBoard.VIDEO_STATUS.TEDU_BOARD_VIDEO_STATUS_ERROR:
            this.notifyBoardException();
            break;
        }
      });
      // -------------------------------  监听白板异常情况的提示 end --------------------------------------
    },

    notifyBoardException() {
      var exceptionId = localStorage.getItem("globalrandom") + "_" + Math.floor(Math.random() * 1024);
      var title = "检测到白板页面异常，请刷新后继续使用 异常ID: " + exceptionId;
      elkLog.report(elkLog.events.exception, {
        exception_id: exceptionId,
        extra_info: title,
      });
      MessageBridge.showMessageBox({
        title: title,
        options: ["刷新", "取消"],
        callback: (index) => {
          if (index === 0) {
            this.teduBoard.refresh();
          }
        },
      });
    },

    fireBoardDataChangeEvent(data) {
      var boardData = {
        teduBoard: this.teduBoard,
        currentBoard: this.teduBoard.getCurrentBoard(),
        currentFile: this.teduBoard.getCurrentFile(),
        files: this.teduBoard.getFileInfoList(),
      };
      if (!boardData.currentFile) {
        // 有时候addFile协议还没有下来， 获取当前文件信息会获取不到
        return;
      }
      this.EventBus.$emit("boardDataChange", boardData);
    },

    switchFile(fid) {
      this.teduBoard.switchFile(fid);
    },

    deleteFile(fid) {
      this.teduBoard.deleteFile(fid);
    },

    nextPage() {
      this.teduBoard.nextBoard();
    },

    prevPage() {
      this.teduBoard.prevBoard();
    },

    resize() {
      this.teduBoard && this.teduBoard.resize();
    },

    addFile(data) {
      if (!this.teduBoard) {
        console.error("tboard undefined");
        return;
      }

      if (data) {
        // 如果其他端传递进来的是字符串
        if (util.isString(data)) {
          try {
            data = JSON.parse(data);
          } catch (error) {
            data = {};
          }
        }

        if (/\.(bmp|jpg|jpeg|png|gif|webp|svg)/i.test(data.doc_url)) {
          // 如果是图片
          let defaultFileInfo = this.teduBoard.getFileInfo("#DEFAULT");
          let boardInfo = defaultFileInfo.boardInfoList.find((item) => {
            return item.backgroundUrl === data.doc_url;
          });
          console.error("boardInfo", boardInfo);
          if (boardInfo) {
            if (this.teduBoard.getCurrentBoard() != boardInfo.boardId) {
              this.teduBoard.switchFile("#DEFAULT");
              this.teduBoard.gotoBoard(boardInfo.boardId);
            }
          } else {
            // 直接设置背景
            this.teduBoard.addBoard(data.doc_url);
          }
        } else if (/\.(mp3|mp4|avi|mpeg|mpg)/i.test(data.doc_url)) {
          // 是视频文件
          let fileInfoList = this.teduBoard.getFileInfoList();
          if (data.is_transcode && data.transcode_result) data.doc_url = data.transcode_result;
          let hasSameVodFile = fileInfoList.find((item) => {
            return item.downloadURL === data.doc_url;
          });
          let hasVodFile = fileInfoList.find((item) => {
            return /\.(mp3|mp4|avi|mpeg|mpg)/i.test(item.downloadURL);
          });
          // 同一个文件，切换
          if (hasSameVodFile) {
            this.teduBoard.switchFile(hasSameVodFile.fid);
            // 其他视频文件
          } else if (hasVodFile && util.getDomainEnv() !== "ra") {
            //关掉视频文件
            MessageBridge.showMessageBox({
              title: "当前课程仅支持单个视频播放，使用新视频课件替换原有课件",
              options: ["确认", "取消"],
              callback: (index) => {
                if (index === 0) {
                  //关掉视频文件
                  this.teduBoard.deleteFile(hasVodFile.fid);
                  //关掉视频文件，重新打开一个视频文件
                  this.teduBoard.addVideoFile(data.doc_url, data.doc_name);
                }
              },
            });
          } else {
            this.teduBoard.addVideoFile(data.doc_url, data.doc_name);
          }
        } else if (data.is_transcode) {
          // 转码文件
          this.teduBoard.addTranscodeFile({
            title: data.doc_name,
            pages: data.pages,
            resolution: `${data.doc_width}x${data.doc_height}`,
            url: data.transcode_result,
          });
        }
        return;
      }
    },
  },
};
</script>

<style scoped>
.tedu-component-board-wrap {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}

.tedu-component-board-content {
  width: 100%;
  height: 100%;
}
</style>