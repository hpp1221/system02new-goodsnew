import Vue from 'vue'
import '../js'
//添加客户
Vue.prototype.httpApi.company.addCompany = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/company/addCompany', params,
    function (data) {
      successCallback(data);
    })
};
//查询公司详情
Vue.prototype.httpApi.company.selectCompanyById = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/company/selectCompanyById', params,
    function (data) {
      successCallback(data);
    })
};
//查公司列表
Vue.prototype.httpApi.company.selectCompanyListPage = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/company/selectCompanyListPage', params,
    function (data) {
      successCallback(data);
    })
};




