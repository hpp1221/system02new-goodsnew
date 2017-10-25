import Vue from 'vue';
Vue.prototype.getUserInfo = function () {//获取用户信息
  let self = this;
  let requestData = {token: window.localStorage.getItem('token')};
  self.httpApi.user.getMyInfo(requestData,function (data) {
    window.localStorage.setItem('userinfo', JSON.stringify(data.data));
  });
};
Vue.prototype.getBrandList = function(callback){//获取品牌列表
  let self = this;
  let requestData = {token: window.localStorage.getItem('token')};
  self.httpApi.brand.getBrandList(requestData,function (data) {
    return callback(data.data);
  })
};
Vue.prototype.getTagList = function(callback){//获取品牌列表
  let self = this;
  let requestData = {token: window.localStorage.getItem('token')};
  self.httpApi.goods.tagList(requestData,function (data) {
    return callback(data.data);
  });
};

Vue.prototype.getAddressList = function(callback){//获取地址列表
  let self = this;
  let requestData = {token: window.localStorage.getItem('token'),type:1};//1是仓库2是门店
  self.httpApi.stock.addressList(requestData,function (data) {
    return callback(data.data);
  });
};
Vue.prototype.getUnitList = function(callback){//获取单位列表
  let self = this;
  let requestData = {token: window.localStorage.getItem('token'),pageNo:1,pageSize:999};//
  self.httpApi.goodsCat.unitList(requestData,function (data) {
    return callback(data.data);
  });
};
Vue.prototype.getSupplierList = function(callback){//获取供应商列表
  let self = this;
  let requestData = {token: window.localStorage.getItem('token')};
  self.httpApi.supplier.list(requestData,function (data) {
    return callback(data.data);
  });
};
Vue.prototype.getImgAccess = function(callback){//获取图片token
  let self = this;
  let requestData = {
    token: window.localStorage.getItem('token'),
    bucketName: 'sass'
  };
  self.httpApi.aliyun.imgSignature(requestData,function (data) {
    return callback(data.data);
  });
};
