<template>
  <div id="app">
    <!-- 标题栏 -->
    <el-header height="10%" class="header">
      <h1>文档自动填充工具</h1>
    </el-header>
    <el-container style="height: 90%">
      <!-- 左侧导航栏 -->
      <el-aside width="200px" class="aside">
        <el-menu :default-active="$route.path" router>
          <el-menu-item index="/data-manager">
            数据管理
          </el-menu-item>
          <el-menu-item index="/translate-excel">
            文档编辑
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-container>
        <!-- 右侧内容区域 -->
        <el-main class="main">
          <keep-alive>
            <router-view style="height: 90%"></router-view>
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fullHeight: document.documentElement.clientHeight
    }
  },
}
</script>
<style>
/* 设置 body */
html {
  height: 100%;
}

body {
  height: 100%;
  margin: 0;
}

#app {
  height: 100%;
}

.header {
  background-color: #3a8ee6;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 24px;
}

el-main{
  padding: 0;
}
.main {
  background-color: #f0f2f5;
  padding: 0;
}

.el-menu .el-menu-item.is-active {
  background-color: #f0f2f5;
  color: #001529;
}
</style>
