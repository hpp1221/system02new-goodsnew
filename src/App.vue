<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepalive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepalive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
<style>
	#app{
		width: 100%;
		height: 100%;
	}
</style>


