<template>
	<div class="cartControl">
	<transition name="move">
		<div v-show="food.count > 0" class="cart-remove" @click.stop="remove">
		<span class="inner icon-remove_circle_outline"></span>
		</div>
	</transition>
		<div v-show="food.count > 0" class="cart-count">{{food.count}}</div>
	
		<div class="cart-add icon-add_circle" @click.stop="add">
		</div>
	</div>
</template>

<script>
	export default {
		props: ['food'],
		methods: {
			add(e) {
				if (!e._constructed) return;
				if (!this.food.count) {
					this.$set(this.food, 'count', 1)
				} else {
					this.food.count++;
				}
			},
			remove(e) {
				if (!e._constructed) return;
				if (this.food.count) {
					this.food.count--;
				}
			}
		}
	}
</script>

<style>
	.cartControl {
		font-size: 0;
	}
	.cartControl .cart-remove{
		display: inline-block;
		padding: 6px;
	}
	
	.cartControl .cart-count {
		display: inline-block;
		width: 12px;
		padding-top: 6px;
		text-align: center;
		font-size: 10px;
		line-height: 24px;
		color: rgb(147,153,159);
		vertical-align: top;
	}
	.cartControl .cart-add {
		display: inline-block;
		padding: 6px;
		font-size: 24px;
		line-height: 24px;
		color: rgb(0,160,220);
	}
	.cartControl .inner {
		display: inline-block;
		font-size: 24px;
		line-height: 24px;
		color: rgb(0,160,220);
		transition: all .3s;
	}
	.move-enter-active, .move-leave-active {
	  transition: all .3s;
	  transform: translate3d(0,0,0) rotate(0);
	}
	.move-enter, .move-leave-active {
	  opacity: 0;
	  transform: translate3d(24px,0,0) rotate(180deg);
	}
</style>