<template>
	<div class="index-container">
		<div class="index-header">
			<div class="header-one">
				<img src="../assets/images/pull.png" alt="" />
			</div>
			<div class="header-two">
				<img src="../assets/images/glass.png" alt="" />
				<el-input placeholder="输入订单号" v-model="itemNumber"></el-input>
			</div>
			<!--<div class="header-three">
				<img src="../assets/images/nine.png" alt="" />
			</div>-->
			<div class="header-four">
				<img src="../assets/images/question.png" alt="" id="question"/>
				<img src="../assets/images/bell.png" alt="" id="bell" />
				<img src="../assets/images/person.png" alt="" id="person" />
			</div>
		</div>
		<div class="index-left-menu">
			<div class="index-logo">
				<img src="../assets/images/logo.png" alt="" />
			</div>
			<menu-tree :list="menuList"></menu-tree>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				menuList:[],
				itemNumber:''
			}
		},
		created(){
			this.getMenu();
			this.getMyInfo();
		},
		components:{
			'menu-tree':require('../components/Menu')
		},
		methods:{
			getMyInfo(){
				let self = this
				let requestData = {params:{token: window.localStorage.getItem('token')}};
				self.$http.get('/ui/user/getMyInfo',requestData).then(function (response) {
				    let data = response.data;
				    console.log(response);
				    
					if(data.code == 10000){
						
					}
			    }).catch(function (error) {
			    	console.log(error);
			    });
			},
			getMenu(){//获取菜单
				let self = this;
				let requestData = {params:{token: window.localStorage.getItem('token')}};
				self.$http.get('/ui/user/menu',requestData).then(function (response) {
				    let data = response.data;
				    console.log(response);
				    
					if(data.code == 10000){
						self.menuList = self.setMenuStatus(data.data);
					}
			    }).catch(function (error) {
			    	console.log(error);
			    });
			},
			setMenuStatus(data){
				for(let i = 0;i < data.length;i++){
					data[i].show = false;
				}
				return data;
			},
			handleIconClick(){//头部搜索
				
			}
		}
	}
</script>

<style>
</style>