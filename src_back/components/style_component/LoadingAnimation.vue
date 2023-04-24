<template>
  <div class="loading-mask" v-show="visible">
    <div class="loading-spinner"></div>
  </div>
</template>

<script>
export default {
  props: {
    visible: Boolean // 是否显示等待动画
  }
}
</script>

<style>
.loading-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #fff;
  border-top-color: #f00;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
