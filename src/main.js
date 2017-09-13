// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import VueEditor from 'vue-ueditor'
import 'element-ui/lib/theme-default/index.css?12'
import './assets/css/total.css'
import Vuex from 'vuex'
import {Loading,Message} from 'element-ui';
import './assets/js/commonFunctions'
import store from './vuex/store';
Vue.config.productionTip = false

Vue.component('VueEditor',VueEditor)

var qs = require('qs')
Vue.prototype.qs = qs

var axios = require('axios')
Vue.prototype.$http = axios

var moment = require('moment')
Vue.prototype.moment = moment
Vue.use(ElementUI)
Vue.use(Vuex);
var loadingInstance;
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    //loadingInstance = Loading.service({ fullscreen: true });
      return config;
    
  }, function (error) {
    // 对请求错误做些什么
    
     Message.error('出错啦');
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    //loadingInstance.close();
    if(response.data.code && response.data.code != 10000){
       Message.error(response.data.message);
    }
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
  
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
