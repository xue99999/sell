<template>
	<div class="header">
	{{seller}}
		<!-- <div class="container-wrap">
			<img width="64" height="64" :src="{{seller.avatar}}" alt="">
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name"></span>
				</div>
				<div class="description">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>
				<div class="support">
					<span class="icon"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
		</div> -->
	</div>
</template>

<script>
	export default {
		name: 'header',
		props: ['seller'],
		created() {
			console.log(this.seller)
		}
	}
</script>

<style>
	
</style>