<template>
	<ul class="menu-item-div">

		<li v-for="l in list" @click="clickMenu(l)"
        :id="l.permissionId"
        @mouseenter="mousein(l.permissionId)"
        @mouseleave="mouseout(l.permissionId)">
			<!--<span class="left-blue"></span>-->
			<i :class="l.icon" v-if="l.pid == 0"></i>
			<span class="menu-name">{{l.name}}</span>
			<!--<menu-tree :list="l.children" v-if="l.children" v-show="l.show"></menu-tree>-->
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
					this.$router.push(item.url)
				}
			},
      mousein(id){
			    event.stopPropagation()
			    document.getElementById(id).style.backgroundColor="#00c1e1";
      },
      mouseout(id){
        event.stopPropagation()
        document.getElementById(id).style.backgroundColor="#333745";
      }
		}
	}
</script>
