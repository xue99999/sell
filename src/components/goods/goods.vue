<template>
	<div class="goods-wrap">
		<div class="goods">
			<div class="menu-wrap" ref="menu">
				<ul>
					<li class="menu-item" v-for="(item, index) in goods" :class="{ 'current': currentIndex === index }" @click="selectMenu(index, $event)">
						<span class="text">
							<span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span> {{item.name}}
						</span>
					</li>
				</ul>
			</div>
			<div class="foods-wrap" ref="foods">
				<ul>
					<li  v-for="item in goods" class="food-list food-list-hook">
						<h1 class="title">{{item.name}}</h1>
						<ul>
							<li @click="selectFood(food, $event)" v-for="food in item.foods" class="food-item">
								<div class="icon">
									<img width="57" height="57" :src="food.icon" alt="">
								</div>
								<div class="content">
									<h2 class="name">{{food.name}}</h2>
									<p class="desc">{{food.description}}</p>
									<div class="extra">
										<span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}</span>
									</div>
									<div class="price">
										<span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
									</div>
									<div class="cart-wrap">
										<cartControl :food="food"></cartControl>
									</div>
								</div>
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<shopcart :select-foods="selectFoods" :minPrice="seller.minPrice" :deliveryPrice="seller.deliveryPrice"></shopcart>
		</div>
		<food :food="selectedFood" ref="food"></food>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
	import shopcart from 'components/shopcart/shopcart'
	import cartControl from 'components/cartControl/cartControl'
	import food from 'components/food/food'

	const ERR_OK = 0;

	export default {
		name: 'goods',
		props: ['seller'],
		components: {shopcart, cartControl, food},
		data() {
			return {
				goods: [],
				listHeight: [],
				scrollY: 0,
				selectedFood: {}
			}
		},
		created() {
			this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
			this.$http.get('/api/goods').then( res => {
		      if (res.body.errno === ERR_OK) {
		        this.goods = res.body.data;
		        this.$nextTick(() => {
		        	this._initScroll();
		        	this.getHeight();
		        });
		      }
		    });
		},
		computed: {
			currentIndex() {
				for (let i = 0; i < this.listHeight.length; i++) {
					let height1 = this.listHeight[i];
					let height2 = this.listHeight[i + 1];
					
					if (!height2 || this.scrollY >= height1 && this.scrollY < height2) {
						return i;
					}
				}
				return 0;
			},
			selectFoods() {
				let foods = []
				this.goods.map(good => {
					good.foods.map(food => {
						if (food.count) {
							foods.push(food)
						}
					})
				})
				return foods;
			}
		},
		methods: {
			_initScroll() {
				this.menuScroll = new BScroll(this.$refs.menu, {
					click: true
					// 是否启用click事件
				});

				this.foodsScroll = new BScroll(this.$refs.foods, {
					click: true,
					probeType: 3
					//这个配置是为了实时得监控scroll事件
				});

				this.foodsScroll.on('scroll', (pos) => {
		        	this.scrollY = Math.abs(Math.round(pos.y));
		        });
			},
			getHeight() {
				let foodList = this.$refs.foods.getElementsByClassName('food-list-hook');
				let height = 0;
				this.listHeight.push(height)
				for (let i = 0; i < foodList.length; i++) {
					let item = foodList[i];
					height += item.clientHeight;
					this.listHeight.push(height);
				}
			},
			selectMenu(idx, event) {
				if (!event._constructed) {
					return;
				}
				let foodList = this.$refs.foods.getElementsByClassName('food-list-hook');
				let el = foodList[idx];
				this.foodsScroll.scrollToElement(el, 300);
			},
			selectFood(food, event) {
				if (!event._constructed) {
					return;
				}
				this.selectedFood = food;
				this.$refs.food.show();
			}
		}
	}
</script>

<style lang="stylus">
	.goods
		display: flex
		width: 100%
		position: absolute
		top: 174px
		bottom: 46px
		overflow: hidden
		.menu-wrap
			flex: 0 0 80px
			width: 80px
			height: 100%
			background-color: #f3f5f7
			.menu-item
				display: table
				height: 54px
				line-height: 14px
				font-size: 12px
				width: 56px
				padding: 0 12px
				.text
					display: table-cell
					vertical-align: middle
					width: 54px
					border-bottom: 1px solid rgba(7,17,27,0.1)
				&.current
					position: relative
					margin-top: -1px
					z-index: 10
					background-color: #fff
					font-weight: 700
					.text
						border-bottom: none
				.icon 
					display: inline-block
					vertical-align: top
					width: 12px
					height: 12px
					margin-right: 2px
					background-size: 12px 12px
					background-repeat: no-repeat
					&.decrease 
						background-image: url('./imgs/decrease_3@2x.png')
					&.discount 
						background-image: url('./imgs/discount_3@2x.png')
					&.guarantee 
						background-image: url('./imgs/guarantee_3@2x.png')
					&.invoice 
						background-image: url('./imgs/invoice_3@2x.png')
					&.special 
						background-image: url('./imgs/special_3@2x.png')

		.foods-wrap
			flex: 1
			.food-list
				.title
					height: 26px
					color: rgb(147,153,159)
					font-size: 12px
					line-height: 26px
					background-color: #f3f5f7
					padding-left: 12px
					border-left: 2px solid #d9dde1
				.food-item
					position: relative
					display: flex
					margin: 18px
					padding-bottom: 18px
					border-bottom: 1px solid rgba(7,17,27,0.1)
					&:last-child 
						border-bottom: none
						margin-bottom: 0
					.icon 
						flex: 0 0 57px
						margin-right: 10px
				  .content
						flex: 1
					.name 
						font-size: 14px
						line-height: 14px
						color: rgb(7,17,27)
						margin: 2px 0 8px 0
				  .desc 
						margin: 8px 0
					.extra, .desc
						font-size: 10px
						line-height: 10px
						color: rgb(147,153,159)
					.count 
						margin-right: 12px
					.price 
						line-height: 24px
						font-weight: 700
						.now
							font-size: 14px
							color: rgb(240,20,20)
							line-height: 24px
							margin-right: 8px
						.old
							text-decoration: line-through
							font-size: 10px
							line-height: 24px
							color: rgb(147,153,159)
					.cart-wrap 
						position: absolute
						right: 0
						bottom: 12px
</style>