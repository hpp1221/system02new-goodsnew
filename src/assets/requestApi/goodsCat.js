import Vue from 'vue'
import '../js'
//新增类目
Vue.prototype.httpApi.goodsCat.createCategory = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/goodsCat/createCategory', params,
    function (data) {
      successCallback(data);
    })
};

//获取类目树
Vue.prototype.httpApi.goodsCat.getGoodsCatTree = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/goodsCat/getGoodsCatTree', params,
    function (data) {
      successCallback(data);
    })
};

//获取所有类目 不分页 map 类型
Vue.prototype.httpApi.goodsCat.selectGoodsCatMap = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/goodsCat/selectGoodsCatMap', params,
    function (data) {
      successCallback(data);
    })
};


//单位列表
Vue.prototype.httpApi.goodsCat.selectUnitList = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/goods-v1/selectUnitList', params,
    function (data) {
      successCallback(data);
    })
};
//添加单位
Vue.prototype.httpApi.goodsCat.addUnit = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/goods-v1/addUnit', params,
    function (data) {
      successCallback(data);
    })
};
//删除单位
Vue.prototype.httpApi.goodsCat.deleteUnit = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/goods-v1/deleteUnit', params,
    function (data) {
      successCallback(data);
    })
};
//修改单位
Vue.prototype.httpApi.goodsCat.updateUnit = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/goods-v1/updateUnit', params,
    function (data) {
      successCallback(data);
    })
};
//标签列表
Vue.prototype.httpApi.goodsCat.selectTagList = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/goods-v1/selectTagList', params,
    function (data) {
      successCallback(data);
    })
};
//添加标签
Vue.prototype.httpApi.goodsCat.addTag = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/goods-v1/addTag', params,
    function (data) {
      successCallback(data);
    })
};
//删除标签
Vue.prototype.httpApi.goodsCat.deleteTag = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/goods-v1/deleteTag', params,
    function (data) {
      successCallback(data);
    })
};
//修改标签
Vue.prototype.httpApi.goodsCat.updateTag = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/goods-v1/updateTag', params,
    function (data) {
      successCallback(data);
    })
};

//删除类目
Vue.prototype.httpApi.goodsCat.deleteCategory = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/goodsCat/deleteCategory', params,
    function (data) {
      successCallback(data);
    })
};
//修改类目
Vue.prototype.httpApi.goodsCat.editCategory = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/goodsCat/editCategory', params,
    function (data) {
      successCallback(data);
    })
};
//导出文件记录
Vue.prototype.httpApi.goodsCat.exportRecord = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/goodsCat/exportRecord', params,
    function (data) {
      successCallback(data);
    })
};
//导出文件记录列表
Vue.prototype.httpApi.goodsCat.exportRecordList = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/goodsCat/exportRecordList', params,
    function (data) {
      successCallback(data);
    })
};

//为你推荐新增
Vue.prototype.httpApi.goodsCat.addRecommendedForYouGoods = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/goods/addRecommendedForYouGoods', params,
    function (data) {
      successCallback(data);
    })
};
//为你推荐列表
Vue.prototype.httpApi.goodsCat.recommendedForYou = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/goods/recommendedForYou', params,
    function (data) {
      successCallback(data);
    })
};


// ---------新版分类

//添加分类
Vue.prototype.httpApi.goodsCat.AddCategory = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/category/AddCategory', params,
    function (data) {
      successCallback(data);
    })
};
//根据id删除分类
Vue.prototype.httpApi.goodsCat.deleteCategoryById = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/category/deleteCategoryById', params,
    function (data) {
      successCallback(data);
    })
};
//根据类目id查询类目子节点列表
Vue.prototype.httpApi.goodsCat.selectCategoryListNodeById = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/category/selectCategoryListNodeById', params,
    function (data) {
      successCallback(data);
    })
};
//查询类目树结构列表
Vue.prototype.httpApi.goodsCat.selectCategoryTreeList = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/category/selectCategoryTreeList', params,
    function (data) {
      successCallback(data);
    })
};
//查询类目树结构列表(label value)
Vue.prototype.httpApi.goodsCat.selectCategoryTreeNode = function (params, successCallback) {
  Vue.prototype.httpGet('/admin/category/selectCategoryTreeNode', params,
    function (data) {
      successCallback(data);
    })
};
//根据id修改分类
Vue.prototype.httpApi.goodsCat.updateCategory = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/category/updateCategory', params,
    function (data) {
      successCallback(data);
    })
};
//根据id修改类目状态
Vue.prototype.httpApi.goodsCat.updateCategoryStatusById = function (params, successCallback) {
  Vue.prototype.httpPost('/admin/category/updateCategoryStatusById', params,
    function (data) {
      successCallback(data);
    })
};
