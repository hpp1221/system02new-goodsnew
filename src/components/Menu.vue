<template>
	<ul class="menu-item-div">
		
		<li v-for="l in list" @click="clickMenu(l)">
			<span class="left-blue"></span>
			<i class="el-icon-delete2" v-if="l.pid == 0" style="margin-left: 30px;"></i>
			<span class="menu-name">{{l.name}}</span>
			<menu-tree :list="l.children" v-if="l.children" v-show="l.show"></menu-tree>
		</li>
	</ul>
</template>

<script>
	export default{
		name:"menu-tree",
		data(){
			return {
				
			}
		},
		props:{
			list:''
		},
		methods:{
			clickMenu(item){//点击菜单
				event.stopPropagation();
				if(item.children){//外层节点显示出孩子
					item.show = !item.show
				}else{//最内节点则跳转
					this.$router.push(item.uri)
				}
			},
		}
	}
</script>