<template>
  <div class="flex-wrap flex-column" :class="['tic-player__chatroom', { 'live-board-mode': boardliveMode }]">
    <ul ref="msg-scroll" class="tic-player__chatroom-bd chatroom-msg-list roll-scroll">
      <template v-for="(msg, index) in msgs">
        <MsgComponent :key="index" :msg="msg" :index="index"></MsgComponent>
      </template>
    </ul>
    <div v-if="showInput" id="id-tic-player__chatroom-ft" class="tic-player__chatroom-ft">
      <input
        ref="input"
        type="text"
        class="tic-input"
        placeholder="输入你想说的话"
        v-model.trim="msgText"
        :readonly="showMode === 'fullsize' && platform !== 'web' ? true : false"
        @click.stop="inputTrigger('click')"
        @focus.stop="inputTrigger('focus')"
        @blur="inputBlur()"
        @keyup.enter="msgInputEnterKeyup"
      />
      <button class="tic-btn sendmsg" @click="sendMsg" :disabled="!msgText">发送</button>
      <!-- <button class="tic-btn sendmsg" @click="Global.showJoinExit = !Global.showJoinExit">{{Global.showJoinExit ? '显示':'不显示'}}</button> -->
    </div>
  </div>
</template>

<script>
import Constant from "@config/Constant";
import BaseComponent from "@core/BaseComponent";
import Util from "@util/Util";
import MsgComponent from "./Msg";

export default {
  extends: BaseComponent,

  components: {
    MsgComponent,
  },

  props: {
    showInput: {
      type: Boolean,
      default: true,
    },
    platform: {
      type: String,
      default: "web",
    },
    showMode: {
      type: String,
      default: "default",
    },
    role: {
      type: String,
      default: "",
    },
    isMaster: {
      type: Boolean,
      default: false,
    },
    showJoinExit: {
      type: Boolean,
      default: false,
    },
    isteacher: {
      type: Boolean,
      default: false,
    },
    boardliveMode: {
      type: Boolean,
      default: false,
    },
    enableKickOff: {
      type: Boolean,
      default: false,
    },
    miniprogram: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      sdkAppId: null,
      userId: null,
      userSig: null,
      groupId: null,
      msgs: [],
      msgText: null,
      groupMapId: {},
      dialogHasDispalyed: false,
    };
  },

  watch: {
    msgs() {
      this.$nextTick(() => {
        var msgScroll = this.$refs["msg-scroll"];
        msgScroll.scrollTop = msgScroll.scrollHeight;
      });
    },
  },

  mounted() {},

  methods: {
    afterJoinClassCallback() {
      TCIC.TIM.instance.on(TCIC.TIM.EVENT.MESSAGE_RECEIVED, (event) => {
        event.data &&
          event.data.forEach((msg) => {
            if (msg.conversationType == TCIC.TIM.TYPES.CONV_GROUP && msg.to == TCIC.TSession.instance.getClassInfo().chatGroupId) {
              let elements = msg.getElements();
              if (elements.length) {
                elements.forEach((element) => {
                  if (element.type === TCIC.TIM.TYPES.MSG_TEXT) {
                    TCIC.TMain.instance.getUserInfo(msg.from).then((result) => {
                      this.msgs.push({
                        send: msg.from,
                        sendNick: result.nickname,
                        content: element.content.text,
                        time: msg.time,
                        isSend: false,
                        iconUrl: result.avatar || "https://main.qcloudimg.com/raw/45e1cd2f9378299a093a6ffa3bb8b9fb.svg",
                      });
                    });
                  } else if (element.type === "TIMCustomElem") {
                  }
                });
              }
            }
          });
      });
    },

    inputTrigger() {
      this.$emit("inputTrigger");
    },

    inputBlur() {
      setTimeout(() => {
        var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
        window.scrollTo(0, Math.max(scrollHeight, 0));
        console.log("dddd inputBlur chatroom", scrollHeight);
      }, 100);
    },

    msgInputEnterKeyup() {
      this.sendMsg();
    },

    sendMsg() {
      TCIC.TIM.instance
        .sendGroupTextMessage(TCIC.TSession.instance.getClassInfo().chatGroupId, this.msgText)
        .then(() => {
          TCIC.TMain.instance.getUserInfo(TCIC.TSession.instance.getUserId()).then((result) => {
            this.msgs.push({
              send: TCIC.TSession.instance.getUserId(),
              sendNick: result.nickname,
              content: this.msgText,
              time: Date.now(),
              isSend: true,
              iconUrl: result.avatar || "https://main.qcloudimg.com/raw/45e1cd2f9378299a093a6ffa3bb8b9fb.svg",
            });
            this.msgText = "";
          });
        })
        .catch((error) => {});
    },
  },
};
</script>