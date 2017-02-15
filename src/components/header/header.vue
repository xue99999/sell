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
					<span class="icon" :class="classMap[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div v-if="seller.supports" class="support-count">
				<span class="count">{{seller.supports.length}}个</span>
				<i class="icon-keyboard_arrow_right"></i>
			</div>
		</div>
		<div class="bulletin-wrap">
			<span class="bulletin-title"></span>
			<span class="bulletin-text">{{seller.bulletin}}</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
		<div class="background">
			<img  width="100%" height="100%" :src="seller.avatar" alt="">
		</div>
	</div>
</template>

<script>
	export default {
		name: 'header',
		props: ['seller'],
		created() {
			this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
		}
	}
</script>

<style>
	.header {
		position: relative;
		color: #fff;
		background-color: rgba(7,17,27,0.5);
	}
	.content-wrap {
		position: relative;
		padding: 24px 12px 18px 24px; 
		font-size: 0;
	}
	.support-count {
		position: absolute;
		right: 12px;
		bottom: 14px;
		background-color: rgba(0,0,0,0.2);
		padding: 0 8px;
		border-radius: 7px;
		height: 24px;
		line-height: 24px;
		text-align: center;
	}
	.count {
		font-size: 10px;
		vertical-align: top;
	}
	.support-count .icon-keyboard_arrow_right:before {
		margin-left: 2px;
		line-height: 24px;
		font-size: 10px;
	}
	.avatar {
		display: inline-block;
		vertical-align: top;
	}
	.avatar img {
		border-radius: 2px;
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
	.icon {
		display: inline-block;
		vertical-align: top;
		width: 12px;
		height: 12px;
		margin-right: 4px;
		background-size: 12px 12px;
		background-repeat: no-repeat; 
	}
	.icon.decrease {
		background-image: url('decrease_1@2x.png');
	}
	.icon.discount {
		background-image: url('discount_1@2x.png');
	}
	.icon.guarantee {
		background-image: url('guarantee_1@2x.png');
	}
	.icon.invoice {
		background-image: url('invoice_1@2x.png');
	}
	.icon.special {
		background-image: url('special_1@2x.png');
	}
	.text {
		font-size: 10px;
		line-height: 12px;
	}
	.bulletin-wrap {
		position: relative;
		background-color: rgba(7,17,27,0.2);
		height: 28px;
		line-height: 28px;
		padding: 0 22px 0 12px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: 0;
	}
	.bulletin-title {
		display: inline-block;
		width: 22px;
		height: 12px;
		background-image: url('bulletin@2x.png');
		background-size: 22px 12px;
		background-repeat: no-repeat;
		vertical-align: top;
		margin-top: 8px; 
	}
	.bulletin-text {
		vertical-align: top;
    	margin:0 4px;
		display: inline-block;
		font-size: 10px;
		line-height: 28px;
	}
	.bulletin-wrap .icon-keyboard_arrow_right:before {
		position: absolute;
		font-size: 10px;
		z-index: 9;
		right: 18px;
		top: 8px;
		background-color: red;
	}
	.background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		filter: blur(10px);
	}
</style>