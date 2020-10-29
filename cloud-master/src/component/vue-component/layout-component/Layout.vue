<template>
  <div class="flex-wrap flex-column">
    <div class="tic-container__top">
      <slot name="top"></slot>
    </div>
    <div class="tic-container__main flex-wrap">
      <div class="tic-container__main-left">
        <slot name="left"></slot>
      </div>
      <div class="tic-container__main-inner">
        <slot name="center"></slot>
      </div>
      <div class="tic-container__main-right">
        <slot name="right"></slot>
      </div>
    </div>
    <div class="tedu-layout-bottom">
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<script>
import BaseComponent from "@core/BaseComponent";

export default {
  extends: BaseComponent,
  mounted() {},
};
</script>