<template>
	<div class="header">
		<div class="content-wrap">
			<div class="avatar">
				<img  width="64" height="64" :src="seller.avatar" alt="">
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{ seller.name }}</span>
				</div>
				<div class="description">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>
				<div v-if="seller.supports" class="support">
					<span class="icon"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'header',
		props: ['seller']
	}
</script>

<style>
	.header {
		color: #fff;
		background-color: #000;
	}
	.content-wrap {
		padding: 24px 12px 18px 24px; 
		font-size: 0;
	}
	.avatar {
		display: inline-block;
		vertical-align: top;
	}
	.content {
		display: inline-block;
		margin-left: 16px;
	}
	.title {
		font-size: 16px;
		color: rgb(255,255,255);
		line-height: 18px;
	}
	.brand {
		display: inline-block;
		vertical-align: top;
		width: 30px;
		height: 18px;
		background:url('brand@2x.png') no-repeat;
		background-size: 30px 18px;
	}
	.name {
		margin-left: 6px;
		font-size: 16px;
		font-weight: bold;
		line-height: 18px;
	}
	.description {
		font-size: 12px;
		line-height: 12px;
		margin: 8px 0 10px 0;
	}
	.support {
		font-size: 10px;
		line-height: 12px;
	}
</style>