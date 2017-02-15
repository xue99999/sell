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
	.icon-keyboard_arrow_right:before {
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
</style>