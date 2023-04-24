import * as GlobalUtils from './global_utils';

export default {
    install(Vue) {
        Vue.prototype.$utils = GlobalUtils;
    }
};
