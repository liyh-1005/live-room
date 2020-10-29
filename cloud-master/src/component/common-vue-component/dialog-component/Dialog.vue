<template>
  <div class="dialog-box">
    <div class="dialog-wrap">
      <div class="dialog-head">
        <div class="dialog-icon"></div>
        <div class="dialog-title">{{ title }}</div>
      </div>
      <div class="dialog-body">
        <div class="dialog-content">{{ content }}</div>
      </div>
      <div class="dialog-foot">
        <div class="dialog-button exit" v-if="cancelText" @click="hide">{{ cancelText }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import DialogComponent from "@core/DialogComponent";

export default {
  extends: DialogComponent,

  data() {
    return {
      title: "",
      content: "",
      cancelText: "",
    };
  },

  mounted() {},

  methods: {
    initial({ title, content, cancelText }) {
      this.title = title;
      this.content = content;
      this.cancelText = cancelText;

      // 事件监听测试
      TCIC.TMain.instance.on("ack", (message)=>{
        console.log("===initial recv ack");
      })
      // 发送事件测试
      TCIC.TMain.instance.emit("sub-init", {
        title: title,
        content: content
      })      
    },

    hide() {
      this.close();
    },
  },
};
</script>

<style scope>
.dialog-box {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.dialog-wrap {
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 10px 10px 0;
  min-width: 320px;
  transform: translateX(-50%) translateY(-50%);
  background-color: #fff;
  border-radius: 8px;
  text-align: center;
  color: #fff;
  font-size: 12px;
}

.dialog-head {
  display: flex;
  text-align: left;
}

.dialog-head .dialog-icon {
  width: 30px;
  height: 30px;
  background: url(https://main.qcloudimg.com/raw/be5d8bc407204d0e1dea30bacd6d006b.png) no-repeat;
  background-size: cover;
}

.dialog-head .dialog-title {
  flex: 1;
  height: 30px;
  line-height: 30px;
  margin-left: 10px;
  font-size: 14px;
  color: #17233d;
}

.dialog-body {
  margin: 10px;
}

.dialog-body .dialog-content {
  font-size: 12px;
  color: #515a6e;
}

.dialog-foot {
  display: flex;
  justify-content: flex-end;
}

.dialog-button {
  display: inline-block;
  padding: 10px 20px;
  font-size: 12px;
  color: #515a6e;
  background: transparent;
  cursor: pointer;
}

.dialog-button.sure {
  color: #2d8cf0;
}

.dialog-button.exit {
  display: inline;
  line-height: 1;
  color: #086770;
}

button::after {
  border: none;
}

/* 横屏 */
/* @media (orientation: landscape) {
  .dialog-wrap {
    max-width: 60vw;
    padding: 10px 10px 10px;
  }

  .dialog-head .dialog-icon {
    width: 20px;
    height: 20px;
  }

  .dialog-head .dialog-title {
    flex: 1;
    height: 20px;
    line-height: 20px;
    margin-left: 10px;
    font-size: 16px;
    color: #17233d;
  }

  .dialog-body {
    margin: 10px;
  }

  .dialog-body .dialog-content {
    font-size: 14px;
    color: #515a6e;
  }

  .dialog-button {
    padding: 5px 10px;
    font-size: 14px;
    line-height: 1;
  }
} */
</style>