import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import GlobalUtils from './util_js/utils-plugin'

Vue.use(GlobalUtils);
Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
    el: "#app",
    render: h => h(App),
})
