<template>
  <div class="split-lines">{{value}}</div>
</template>

<script>
export default {
  name: "SplitLines",
  props:{
    value: String
  }
}
</script>

<style scoped>

.split-lines{
  margin-top: 20px;
  position: relative;
  text-align: center;
  overflow: hidden;
  font-size: 14px;
  color: #999;
}
.split-lines::before,.split-lines::after{
  content: '';
  display: inline-block;
  width: 100%;
  height: 1px;
  position: absolute;
  background: #ccc;
  top: 50%;
}
.split-lines::before{
  margin-left: -10px;
  transform: translateX(-100%);
}
.split-lines::after{
  margin-left: 10px;
}
</style>