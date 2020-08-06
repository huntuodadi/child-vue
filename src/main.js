import Vue from 'vue'
import singleSpaVue from 'single-spa-vue';
import Router from 'vue-router';
import App from './App.vue'
import router from './router';


Vue.config.productionTip = false
Vue.use(Router)
const appOptions = {
  el: '#vue', //挂载到父应用id为vue的标签里
  router,
  render: h => h(App)
};

/**
 * @return {bootstrap mount unmount}
 */
const vueLiftCycle = singleSpaVue({
  Vue,
  appOptions
});
console.log('window.singleSpaNavigate:', window.singleSpaNavigate);
if(window.singleSpaNavigate) {
  window.__webpack_public_path__ = 'http://localhost:10000/'
}else {
  new Vue({
    el: '#app', //挂载到父应用id为vue的标签里
    router,
    render: h => h(App)
  });
}


//协议接入
export const bootstrap = vueLiftCycle.bootstrap;
export const mount = vueLiftCycle.mount;
export const unmount = vueLiftCycle.unmount;

// 将子应用打包成一个个lib给父应用使用
// 我们需要父应用加载子应用
// bootstrap mount unmount
// single-aps-vue