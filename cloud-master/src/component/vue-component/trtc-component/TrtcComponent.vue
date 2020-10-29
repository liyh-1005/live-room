<template>
  <div class="tedu-component-trtc">
    <div v-for="(info, userId) in userMap" :key="userId" :id="'video-' + userId" class="video"></div>
  </div>
</template>

<script>
import BaseComponent from "@core/BaseComponent";

export default {
  extends: BaseComponent,

  props: {},

  data() {
    return {
      userMap: {},
    };
  },

  mounted() {
    // 监听音视频事件
    TCIC.TTrtc.instance.on("new-stream", (event) => {
      this._log(`new-stream->${JSON.stringify(event)}`);
      this.$set(this.userMap, event.userId, event);
      this.$nextTick(() => {
        TCIC.TTrtc.instance.renderUserVideo(event.userId, "camera", document.getElementById(`video-${event.userId}`));
      });
    });

    TCIC.TTrtc.instance.on("del-stream", (event) => {
      this._log(`del-stream->${JSON.stringify(event)}`);
      this.$delete(this.userMap, event.userId);
    });
  },

  beforeDestroy() {
    this.unbindEvent();
  },

  methods: {
    afterJoinClassCallback() {
      this.launch();
    },

    _log(message) {
      console.log(`TRTC-COM::${message}`);
    },

    launch() {
      this._log("launch->enter");
      let classInfo = TCIC.TSession.instance.getClassInfo();
      let userId = TCIC.TSession.instance.getUserId();
      this.$set(this.userMap, userId, { userId: userId, audio: true, camera: true });
      this.$nextTick(() => {
        TCIC.TTrtc.instance.pushTrtcStream(true, true, document.getElementById(`video-${userId}`));
      });
    },
  },
};
</script>

<style scoped>
.tedu-component-trtc {
  width: 100%;
  height: 100%;
}

.tedu-component-trtc .video {
  display: inline-block;
  width: 50%;
  height: 50%;
}

.tedu-component-trtc .video:only-child {
  width: 100%;
  height: 100%;
}
</style>