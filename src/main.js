import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import GlobalUtils from './util_js/utils-plugin'

Vue.use(GlobalUtils);
Vue.use(ElementUI);
Vue.config.productionTip = false
import router from './router';


new Vue({
    el: "#app",
    router,
    render: h => h(App),
})
