<template>
	<div class="cartControl">
		<div class="cart-remove icon-remove_circle_outline">
		</div>
		<div class="cart-count">1</div>
		<div class="cart-add icon-add_circle">
		</div>
	</div>
</template>

<script>
	export default {
		props: ['food']
	}
</script>

<style>
	.cartControl {
		font-size: 0;
	}
	.cartControl .cart-remove, .cartControl .cart-add {
		display: inline-block;
		padding: 6px;
		font-size: 24px;
		line-height: 24px;
		color: rgb(0,160,220);
	}
	.cartControl .cart-count {
		display: inline-block;
		font-size: 10px;
		line-height: 24px;
		color: rgb(147,153,159);
	}
	.cartControl .cart-add {
		
	}
</style>