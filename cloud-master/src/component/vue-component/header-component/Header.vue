<template>
  <div class="tic-container__menu-inner">
    <div class="menu-float-left header-left">
      <div class="menu-logo">
        <img :src="this.logo" />
      </div>
      <span class="menu-line"></span>
    </div>

    <div class="menu-operation" ref="menuRef">
      <span class="menu-line header-right"></span>
      <ul class="menu-operation__list header-right">
        <li class="icon-operation">
          <a href="javascript:;" class="btn-navi-down tic-btn" @click="onExit()">
            <i class="tic-icon icon-exit"></i>
          </a>
        </li>
        <li class="icon-operation">
          <a href="javascript:;" class="btn-navi-down tic-btn" @click="showVersion">
            <i class="tic-icon icon-setting"></i>
          </a>
        </li>
      </ul>

      <div class="menu-user header-right" tabindex="-1">
        <div v-if="this.userInfo" class="menu-user__img" :style="{ 'background-image': 'url(' + this.userInfo.avatar + ')' }"></div>
        <div v-if="this.userInfo" class="menu-user__text" v-text="this.userInfo.nickname"></div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseComponent from "@core/BaseComponent";
import Dialog from "@commonVueComponent/dialog-component/Dialog.vue";

export default {
  extends: BaseComponent,

  components: {
    Dialog,
  },

  data() {
    return {
      logo: "https://main.qcloudimg.com/raw/77fe1a555c64762691cb83ef20fe2a1e.png",
      schoolInfo: null,
      classInfo: null,
      userInfo: null,
    };
  },

  mounted() {},

  methods: {
    afterJoinClassCallback() {
      this.launch();
    },

    launch() {
      this.classInfo = TCIC.TSession.instance.getClassInfo();
      let userId = TCIC.TSession.instance.getUserId();
      TCIC.TMain.instance.getUserInfo(userId).then((result) => {
        this.userInfo = result;
      });
    },

    onExit() {
      TCIC.TMain.instance.finish();
      // open(location, "_self").close();
      // window.location.href = "about:blank";
      // window.close();
      // let userId = TCIC.TSession.instance.getUserId();
      // let token =  TCIC.TSession.instance.getParams("token");
      // TCIC.TAccount.instance.logout(this.schoolInfo.sdkAppId,
      //                             this.schoolInfo.schoolId,
      //                             token,
      //                             userId,
      //                             (code, msg) => {
      //     window.location.href = "login.html";
      // });
    },

    showVersion() {
      this.showSubComponent("Dialog", {
        title: "腾云课堂",
        content: "当前版本",
        cancelText: "取消",
      });

      // 事件监听测试
      TCIC.TMain.instance.one("sub-init", (message)=>{
        console.log("===showVersion recv message: "+JSON.stringify(message));
        // 发送事件测试
        TCIC.TMain.instance.emit("ack", {title: message.title})
      })
    },
  },
};
</script>

<style scoped>
.left-title {
  max-width: 210px !important;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  text-align: left;
}
.icon-screenshare {
  color: #e85c5c;
  background-image: url("@assets/css/img/slice/svg/header/icon-screeshare.svg");
  width: 20px;
  margin-right: 8px;
}
.icon-courseware {
  background-image: url("@assets/css/img/slice/svg/header/icon-courseware.svg");
  width: 20px;
  margin-right: 8px;
}
.icon-videosource {
  background-image: url("@assets/css/img/slice/svg/header/icon-videosource.svg");
  width: 20px;
  margin-right: 8px;
}
.icon-people {
  background-image: url("@assets/css/img/slice/svg/header/icon-people.svg");
  width: 20px;
  margin-right: 8px;
}
.icon-toolbox {
  background-image: url("@assets/css/img/slice/svg/header/icon-toolbox.svg");
  width: 20px;
  margin-right: 8px;
}
.icon-people-handup {
  background-image: url("@assets/css/img/slice/svg/header/icon-hand.svg");
  width: 20px;
  margin-right: 8px;
}

.icon-hand {
  background-image: url("@assets/css/img/slice/svg/header/icon-hand.svg");
  width: 20px;
  margin-right: 8px;
}
.icon-info {
  background-image: url("@assets/css/img/slice/svg/header/icon-info.svg");
  width: 32px;
  height: 32px;
}
.icon-exit {
  background-image: url("@assets/css/img/slice/svg/header/icon-exit.svg");
  width: 32px;
  height: 32px;
}
.icon-setting {
  background-image: url("@assets/css/img/slice/svg/header/icon-setting.svg");
  width: 32px;
  height: 32px;
}
.icon-info:hover {
  background-image: url("@assets/css/img/slice/svg/header/icon-info-hover.svg");
  width: 32px;
  height: 32px;
  opacity: 1;
}
.icon-exit:hover {
  background-image: url("@assets/css/img/slice/svg/header/icon-exit-hover.svg");
  width: 32px;
  height: 32px;
  opacity: 1;
}
.icon-setting:hover {
  background-image: url("@assets/css/img/slice/svg/header/icon-setting-hover.svg");
  width: 32px;
  height: 32px;
  opacity: 1;
}

/* todo */
.menu-operation__list > li.icon-operation {
  /* height: 56px; */
  padding: 0 4px 0 0;
  font-size: 8px;
}
.icon-operation .tic-btn {
  display: inline-block;
  width: 32px;
  height: 32px;
  vertical-align: middle;
}

.share-class-url {
  /* background-image: url('@assets/css/img/slice/svg/share-class-url.svg'); */
  width: 86px;
  margin-right: 10px;
  font-size: 12px;
  color: #fff;
  line-height: 20px;
  background: #0a818c;
  font-family: PingFangSC-Medium, PingFang SC;
}
.start-class {
  background-image: url("@assets/css/img/slice/svg/start_class.svg");
  width: 40px;
  margin-right: 10px;
}
.end-class {
  background-image: url("@assets/css/img/slice/svg/stop_class.svg");
  width: 40px;
  margin-right: 10px;
}
.hand-up {
  background-image: url("@assets/css/img/slice/svg/hand_up.svg");
  width: 40px;
  margin-right: 10px;
}
.tic-btn:hover .hand-up {
  background-image: url("@assets/css/img/slice/svg/hand_up_hover.svg");
  width: 40px;
  margin-right: 10px;
}
.hand-down {
  background-image: url("@assets/css/img/slice/svg/hand_down.svg");
  width: 70px;
  margin-right: 10px;
  margin-left: -30px;
}
.tic-btn:hover .hand-down {
  background-image: url("@assets/css/img/slice/svg/hand_down_hover.svg");
  width: 70px;
  margin-right: 10px;
  margin-left: -30px;
}
.menu-course__title {
  padding: 0;
}

.menu-course__time {
  position: inherit;
  left: none;
  top: none;
  width: auto;
}
.headerbtn.red {
  background-color: #ff6863;
  border: 1px solid #ff6863;
}
.headerbtn.red:hover {
  -webkit-transition: 0.5s all;
  -o-transition: 0.5s all;
  transition: 0.5s all;
  background-color: #ff8985;
  border: 1px solid #ff8985;
}
.headerbtn {
  height: 32px;
  line-height: 20px;
  font-size: 11px;
  color: #ffffff;
  letter-spacing: 0;
  padding-left: 5px;
  padding-right: 5px;
}
.headerbtn.small {
  background: #5f5f5f;
  border: 1px solid #5f5f5f;
  padding-left: 5px;
  padding-right: 5px;
  font-size: 11px;
  color: #ffffff;
  letter-spacing: 0;
  line-height: 20px;
}
.headerbtn:hover,
.headerbtn.start:hover {
  -webkit-transition: 0.5s all;
  -o-transition: 0.5s all;
  transition: 0.5s all;
  background-color: #489ba3;
  border: 1px solid #489ba3;
}
.headerbtn.small:hover {
  background-color: #7a7a7a;
  border: 1px solid #7a7a7a;
}
.headerbtn.start {
  background-color: #0ebeba;
  border: 1px solid #0ebeba;
}
.tic-icon {
  vertical-align: top;
}
.tic-btn.headerbtn.rollname {
  -webkit-animation-timing-function: ease-in-out;
  -webkit-animation-name: breathe;
  -webkit-animation-duration: 1500ms;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-direction: alternate;
}
@-webkit-keyframes breathe {
  0% {
    background-color: rgb(129, 129, 129);
  }

  100% {
    background-color: #5f5f5f;
  }
}
.hand-up-tip {
  font-size: 14px;
  color: #444444;
  letter-spacing: 0;
  line-height: 22px;
}
.hand-up-tip img {
  width: 18px;
  height: 18px;
  margin-right: 5px;
  vertical-align: middle;
}
.bubble::before {
  content: "";
  width: 0;
  height: 0;
  border: 8px solid;
  position: absolute;
  /* bottom: 70px; */
  top: -16px;
  left: 24px;
  border-color: transparent transparent #fff;
}
.bubble {
  position: absolute;
  top: 100%;
  background: white;
  width: 186px;
  border-radius: 5px;
  padding: 10px;
}
.bubble .text {
  color: #444;
  font-size: 14px;
  white-space: pre-wrap;
  line-height: 20px;
  /* float: left; */
  text-align: left;
}
.bubble a {
  font-size: 14px;
  float: left;
  line-height: 30px;
  /* margin-left: 10px; */
  color: #0a818c;
  margin-bottom: -5px;
}

.menu-float-left .menu-title .left-title {
  font-size: 16px;
  color: #ffffff;
  letter-spacing: 0;
  line-height: 20px;
  max-width: 210px;
  text-align: left;
  font-weight: 400;
  /* margin-left: 10px; */
}

.menu-float-left .menu-title .left-time {
  font-size: 14px;
  color: #9ea9a9;
  letter-spacing: 0;
  line-height: 20px;
  font-weight: 400;
  margin-left: 0px;
  text-align: left;
  float: left;
}
.menu-float-left .menu-title .left-time .green {
  color: #0a818c;
}
.menu-user__text {
  max-width: 120px;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  text-align: left;
}
.menu-user__text a {
  color: #999;
}
@media (max-width: 1280px) {
  .menu-operation__list > li {
    padding: 0 4px;
  }
  .menu-user__text {
    max-width: 78px;
  }
  .menu-line {
    margin-left: 12px;
    margin-right: 12px;
  }
}
@media (max-width: 1270px) {
  .teacher-header .header-right {
    display: none;
  }
}
@media (max-width: 1060px) {
  .teacher-header .header-left {
    display: none;
  }
}

.toolbox-hide {
  display: none;
}

.tic-btn.btn-shark {
  background: #f8ac00;
}

.tic-btn.btn-shark.btn-movie {
  -webkit-animation: hue 2s infinite linear;
}

@-webkit-keyframes hue {
  0% {
    background: #f8ac00;
  }
  60% {
    background: #5f5f5f;
  }
}
</style>
