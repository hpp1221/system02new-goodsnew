<template>
	<div class="container">
		<div class="wrapper">
			<div class="error-div">
				<img src="../assets/images/error.png" alt="" />
				<p>页面出错啦！还有{{count}}秒<el-button type="text" @click="goToIndex">返回主页</el-button></p>
				
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				count:5
			}
		},
		created(){
			this.countDown()
		},
		methods:{
			countDown(){
				let self = this
				setInterval(function(){
					self.count--
					if(self.count === 0){
						self.goToIndex()
					}
				},1000)
			},
			goToIndex(){
				this.$router.push('/')
			}
		}
	}
</script>

<style>
</style>