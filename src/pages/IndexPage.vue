<template>
	<div class="container">
		<div class="wrapper">
			<div class="indexpage-docket-div">
				<div class="indexpage-docket-header">
					<p>记事表</p>
					<div>
						<img src="" alt="" />
						<img src="" alt="" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				shortCut:[]
			}
		},
		created(){
			this.getShortCut()
		},
		methods:{
			getShortCut(){//获取快捷菜单
//				let self = this
//				let requestData = {
//					token: window.localStorage.getItem('token')
//				}
//				self.$http.get('/ui/user/shortcut',requestData).then(function (response) {
//				    let data = response.data;
//				    console.log('shortcut',response)
//					if(data.code == 10000){
//						self.shortCut = data.data
//					}
//			    }).catch(function (error) {
//			    	console.log(error);
//			    });
			}
		}
	}
</script>

<style>
</style>