import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
<<<<<<< HEAD
  routes: [
    {
      path: '/login',
      component: require('@/pages/user/Login')
    },
    {
      path: '/',
      component: require('@/pages/Index'),
      redirect: '/index',
      children:[
      	{
	        path: '/index',
	        component: require('@/pages/IndexPage'),
        },
        {
      		path: '/error',//错误页面
		      component: require('@/pages/Error')
		    },
        {
	        path: '/stock/goodsin/list',//商品入库
	        component: require('@/pages/stock/goodsin/List'),
        },
        {
	        path: '/stock/goodsin/add',//添加入库
	        component: require('@/pages/stock/goodsin/Add'),
        },
        {
	        path: '/stock/goodsin/detail',//入库明细
	        component: require('@/pages/stock/goodsin/Detail'),
        },
        {
	        path: '/stock/goodsout/list',//商品出库
	        component: require('@/pages/stock/goodsout/List'),
        },
        {
	        path: '/stock/goodsout/add',//添加出库
	        component: require('@/pages/stock/goodsout/Add'),
        },
        {
	        path: '/stock/goodsout/detail',//入库明细
	        component: require('@/pages/stock/goodsout/Detail'),
        },
        {
	        path: '/stock/goodsstore/list',//商品库存
	        component: require('@/pages/stock/goodsstore/List'),
        },
        {
	        path: '/stock/stockallocation/list',//库存调拨
	        component: require('@/pages/stock/stockallocation/List'),
        },
        {
	        path: '/stock/stockallocation/add',//添加库存调拨
	        component: require('@/pages/stock/stockallocation/Add'),
        },
        {
	        path: '/stock/stockallocation/detail',//添加库存调拨
	        component: require('@/pages/stock/stockallocation/Detail'),
        },
        {
	        path: '/stock/stocking/stocking',//库存盘点
	        component: require('@/pages/stock/stocking/stocking'),
        },
        {
	        path: '/stock/inoutdetail/list',//出入库明细
	        component: require('@/pages/stock/inoutdetail/List'),
        },
        {
	        path: '/stock/goodssummary/list',//商品收发汇总
	        component: require('@/pages/stock/goodssummary/List'),
        },
        
        
        {
	        path: '/order/createorder',//创建订单
	        component: require('@/pages/order/CreateOrder'),
        },
        {
	        path: '/order/orderlist',//订单列表
	        component: require('@/pages/order/OrderList'),
        },
        {
	        path: '/order/personalorder',//个人订单
	        component: require('@/pages/order/PersonalOrder'),
        },
        {
	        path: '/order/orderdetail',//订单详情
	        component: require('@/pages/order/OrderDetail'),
        },
        {
	        path: '/order/ordersummary',//订单
	        component: require('@/pages/order/OrderSummary'),
        },
        
        {
	        path: '/goods/goodslist',//商品列表
	        component: require('@/pages/goods/GoodsList'),
        },
        {
	        path: '/goods/creategoods',//新增商品
	        component: require('@/pages/goods/CreateGoods'),
        },
        {
	        path: '/goods/updategoods',//修改商品详情
	        component: require('@/pages/goods/UpdateGoods'),
        },
        {
	        path: '/goods/multipleInputGoods',//批量导入商品
	        component: require('@/pages/goods/MultipleInputGoods'),
        },
        {
	        path: '/goods/multipleInputImgs',//批量导入图片
	        component: require('@/pages/goods/MultipleInputImgs'),
        },
        
        {
	        path: '/user/personcenter',//修改商品详情
	        component: require('@/pages/user/PersonCenter'),
        },
        
        {
	        path: '/personal/security/authority',//用户权限
	        component: require('@/pages/personal/security/Authority'),
        },
        {
	        path: '/personal/security/security',//账户安全
	        component: require('@/pages/personal/security/Security'),
        },
        {
	        path: '/personal/company/basicinfo',//基础信息
	        component: require('@/pages/personal/company/BasicInfo'),
        },
        {
	        path: '/personal/company/department',//员工部门信息
	        component: require('@/pages/personal/company/Department'),
        },
        
        {
	        path: '/supplier/suppliers/leadin',//供应商导入
	        component: require('@/pages/supplier/suppliers/Leadin'),
        },
        {
	        path: '/supplier/suppliers/createsupplier',//供应商新增
	        component: require('@/pages/supplier/suppliers/CreateSupplier'),
        },
        {
	        path: '/supplier/suppliers/supplierlist',//供应商管理
	        component: require('@/pages/supplier/suppliers/SupplierList'),
        },
         {
	        path: '/supplier/suppliers/updatesupplier',//修改供应商详情
	        component: require('@/pages/supplier/suppliers/UpdateSupplier'),
        },
         {
	        path: '/personal/client/clientmanagement',//客户管理
	        component: require('@/pages/personal/client/ClientManagement'),
        },
        {
	        path: '/personal/client/inputclient',//客户导入
	        component: require('@/pages/personal/client/InputClient'),
        },
        {
	        path: '/personal/client/updateclient',//修改客户详情
	        component: require('@/pages/personal/client/UpdateClient'),
        },
        {
	        path: '/personal/client/createclient',//新增客户
	        component: require('@/pages/personal/client/CreateClient'),
        },
        
        {
	        path: '/personal/role/list',//角色列表
	        component: require('@/pages/personal/role/list'),
        },
        {
	        path: '/personal/role/add',//新建角色
	        component: require('@/pages/personal/role/add'),
        },
        {
	        path: '/personal/role/update',//修改角色
	        component: require('@/pages/personal/role/update'),
        },
        
        {
	        path: '/personal/user/add',//添加用户
	        component: require('@/pages/personal/user/add'),
        },
        {
	        path: '/personal/user/list',//子用户列表
	        component: require('@/pages/personal/user/list'),
        },
        {
	        path: '/personal/user/update',//修改用户
	        component: require('@/pages/personal/user/update'),
        },
        {
	        path: '/personal/user/myinfo',//用户信息
	        component: require('@/pages/personal/user/myinfo'),
        },
      ]
    },
  ]
})
=======
	routes: [{
			path: '/login',
			component: require('@/pages/user/Login')
		},
		{
			path: '/',
			component: require('@/pages/Index'),
			redirect: '/index',
			children: [{
					path: '/index',
					component: require('@/pages/IndexPage'),
				},
				{
					path: '/error', //错误页面
					component: require('@/pages/Error')
				},
				{
					path: '/stock/goodsin/list', //商品入库
					component: require('@/pages/stock/goodsin/List'),
				},
				{
					path: '/stock/goodsin/add', //添加入库
					component: require('@/pages/stock/goodsin/Add'),
				},
				{
					path: '/stock/goodsin/detail', //入库明细
					component: require('@/pages/stock/goodsin/Detail'),
				},
				{
					path: '/stock/goodsout/list', //商品出库
					component: require('@/pages/stock/goodsout/List'),
				},
				{
					path: '/stock/goodsout/add', //添加出库
					component: require('@/pages/stock/goodsout/Add'),
				},
				{
					path: '/stock/goodsout/detail', //入库明细
					component: require('@/pages/stock/goodsout/Detail'),
				},
				{
					path: '/stock/goodsstore/list', //商品库存
					component: require('@/pages/stock/goodsstore/List'),
				},
				{
					path: '/stock/stockallocation/list', //库存调拨
					component: require('@/pages/stock/stockallocation/List'),
				},
				{
					path: '/stock/stockallocation/add', //添加库存调拨
					component: require('@/pages/stock/stockallocation/Add'),
				},
				{
					path: '/stock/stockallocation/detail', //添加库存调拨
					component: require('@/pages/stock/stockallocation/Detail'),
				},
				{
					path: '/stock/stocking/stocking', //库存盘点
					component: require('@/pages/stock/stocking/stocking'),
				},
				{
					path: '/stock/inoutdetail/list', //出入库明细
					component: require('@/pages/stock/inoutdetail/List'),
				},
				{
					path: '/stock/goodssummary/list', //商品收发汇总
					component: require('@/pages/stock/goodssummary/List'),
				},

				{
					path: '/order/createorder', //创建订单
					component: require('@/pages/order/CreateOrder'),
				},
				{
					path: '/order/orderlist', //订单列表
					component: require('@/pages/order/OrderList'),
				},
				{
					path: '/order/personalorder', //个人订单
					component: require('@/pages/order/PersonalOrder'),
				},
				{
					path: '/order/orderdetail', //订单详情
					component: require('@/pages/order/OrderDetail'),
				},
				{
					path: '/order/ordersummary', //订单
					component: require('@/pages/order/OrderSummary'),
				},

				{
					path: '/goods/goodslist', //商品列表
					component: require('@/pages/goods/GoodsList'),
				},
				{
					path: '/goods/creategoods', //新增商品
					component: require('@/pages/goods/CreateGoods'),
				},
				{
					path: '/goods/updategoods', //修改商品详情
					component: require('@/pages/goods/UpdateGoods'),
				},
				{
					path: '/goods/multipleInputGoods', //批量导入商品
					component: require('@/pages/goods/MultipleInputGoods'),
				},
				{
					path: '/goods/multipleInputImgs', //批量导入图片
					component: require('@/pages/goods/MultipleInputImgs'),
				},

				{
					path: '/user/personcenter', //修改商品详情
					component: require('@/pages/user/PersonCenter'),
				},

				{
					path: '/personal/security/authority', //用户权限
					component: require('@/pages/personal/security/Authority'),
				},
				{
					path: '/personal/security/security', //账户安全
					component: require('@/pages/personal/security/Security'),
				},
				{
					path: '/personal/company/basicinfo', //基础信息
					component: require('@/pages/personal/company/BasicInfo'),
				},
				{
					path: '/personal/company/department', //员工部门信息
					component: require('@/pages/personal/company/Department'),
				},

				{
					path: '/supplier/suppliers/leadin', //供应商导入
					component: require('@/pages/supplier/suppliers/Leadin'),
				},
				{
					path: '/supplier/suppliers/exportout', //供应商导出
					component: require('@/pages/supplier/suppliers/ExportOut'),
				},
				{
					path: '/supplier/suppliers/createsupplier', //供应商新增
					component: require('@/pages/supplier/suppliers/CreateSupplier'),
				},
				{
					path: '/supplier/suppliers/supplierlist', //供应商管理
					component: require('@/pages/supplier/suppliers/SupplierList'),
				},
				{
					path: '/supplier/suppliers/updatesupplier', //修改供应商详情
					component: require('@/pages/supplier/suppliers/UpdateSupplier'),
				},
				{
					path: '/supplier/suppliergoods/suppliergoodslist', //供应商商品管理列表
					component: require('@/pages/supplier/supplierGoods/supplierGoodsList'),
				},
				{
					path: '/personal/client/clientmanagement', //客户管理
					component: require('@/pages/personal/client/ClientManagement'),
				},
				{
					path: '/personal/client/inputclient', //客户导入
					component: require('@/pages/personal/client/InputClient'),
				},
				{
					path: '/personal/client/updateclient', //修改客户详情
					component: require('@/pages/personal/client/UpdateClient'),
				},
				{
					path: '/personal/client/createclient', //新增客户
					component: require('@/pages/personal/client/CreateClient'),
				},

				{
					path: '/personal/role/list', //角色列表
					component: require('@/pages/personal/role/list'),
				},
			]
		},
	]
})
>>>>>>> 9af3cb20fe9a9170b82584f75aed4790579002ce
