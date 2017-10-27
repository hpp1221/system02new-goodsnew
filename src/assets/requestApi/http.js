import axios from 'axios';
import qs from 'qs';


/*axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;*/
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//配置请求头
//axios.defaults.baseURL = 'http://192.168.41.78:8083';   //配置接口地址
// 请求时的拦截
axios.interceptors.request.use(function (config) {
  // 发送请求之前做一些处理
  // 在发送请求之前做某件事
  if (
    config.method === "post" ||
    config.method === "put" ||
    config.method === "delete"
  ) {
    // 序列化
    // config.data = qs.stringify(config.data);
    console.log("json===>",config.data);
  }
  console.log("json===>",config.data);
  return config;
}, function (error) {
  // 当请求异常时做一些处理
  return Promise.reject(error);
});

// 响应时拦截
axios.interceptors.response.use(function (response) {
  // 返回响应时做一些处理
  return response;
}, function (error) {
  // 当响应异常时做一些处理
  return Promise.reject(error);
});

var apis = require('./apis');
var dataSource = {
  get:function (key){
    var url = apis.get(key) ;
    if (url !== undefined && url !=''){
      this.url = url;
      return this;
    } else {
      console.log("url没有找到");
      return ;
    }
  },
  post:function (params) {
    return new Promise((resolve, reject) => {
      axios.post(this.url, params)
        .then(response => {
          resolve(response.data);
        }, err => {
          reject(err);
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
export {dataSource};
