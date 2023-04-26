// src/router.js
import Vue from 'vue';
import VueRouter from 'vue-router';
import DataManager from "@/components/DataManager";
import TranslateExcel from "@/components/TranslateExcel";

Vue.use(VueRouter);

const routes = [
    { path: '/data-manager', component: DataManager },
    { path: '/translate-excel', component: TranslateExcel },
];

const router = new VueRouter({
    mode: 'history',
    routes,
});

export default router;
