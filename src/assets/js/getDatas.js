import Vue from 'vue';
Vue.prototype.getBrandList = function(callback){//获取品牌列表
  let self = this;
  let requestData = {token: window.localStorage.getItem('token')};
  self.$http.post('/ui/brandList',self.qs.stringify(requestData)).then(function (response) {
    let data = response.data;
    console.log('brandList',response)
    if(data.code == 10000){
      return callback(data.data);
    }
  }).catch(function (error) {
    console.log(error);
  });
}
Vue.prototype.getTagList = function(callback){//获取品牌列表
  let self = this;
  let requestData = {token: window.localStorage.getItem('token')};
  self.$http.post('/ui/tagList',self.qs.stringify(requestData)).then(function (response) {
    let data = response.data;
    console.log('tagList',response)
    if(data.code == 10000){
      callback(data.data);
    }
  }).catch(function (error) {
    console.log(error);
  });
}
Vue.prototype.getAddressList = function(callback){//获取地址列表
  let self = this;
  let requestData = {token: window.localStorage.getItem('token'),type:1};//1是仓库2是门店
  self.$http.post('/ui/addressList',self.qs.stringify(requestData)).then(function (response) {
    let data = response.data;
    console.log('addressList',response)
    if(data.code == 10000){
      callback(data.data);

    }
  }).catch(function (error) {
    console.log(error);
  });
}
Vue.prototype.getImgAccess = function(callback){//获取图片token
  let self = this;
  let requestData = {
    token: window.localStorage.getItem('token'),
    bucketName: 'sass'
  };
  self.$http.post('/ui/imgSignature',self.qs.stringify(requestData)).then(function (response) {
    let data = response.data;
    console.log('imgSignature',response)
    if(data.code == 10000){
      callback(data.data);
    }
  }).catch(function (error) {
    console.log(error);
  });
}
