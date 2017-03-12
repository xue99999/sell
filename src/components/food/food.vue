<template>
	<transition name="food-slide">
		<div v-show="showFlag" ref="food" class="food">
			<div class="food-con">
				<div class="img-header">
					<img :src="food.image" alt="">
					<div class="back" @click="back">
						<i class="icon-arrow_lift"></i>
					</div>
				</div>
				<div class="content">
					<h1 class="title">{{food.name}}</h1>
					<div class="extra">
						<span class="sell-count">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}</span>
					</div>
					<div class="price">
						<span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
					</div>
					<div class="cartControl-wrap">
						<cart-control :food="food"></cart-control>
					</div>
					<transition name="fade">
					<div class="buy" @click.stop="addFirst" v-show="!food.count || food.count===0">加入购物车</div>
					</transition>
				</div>
				<split v-show="food.info"></split>
				<div class="info" v-show="food.info">
					<h1 class="title">商品介绍</h1>
					<div class="desc">{{ food.info }}</div>
				</div>
				<split></split>
				<div class="rating">
					<h1 class="title">商品评价</h1>
					<ratingselect v-on:rating-select="select" v-on:toggle-content="toggleContent" :ratings="food.ratings" :onlyContent="onlyContent" :desc="desc" :selectType="selectType"></ratingselect>
				</div>
				<div class="ratings-wrap" v-if="food.ratings">
					<ul v-show="food.ratings.length">
						<li v-show="needShow(rating.rateType,rating.text)" class="rating-item" v-for="rating in food.ratings">
							<div class="user">
								<span class="name">{{rating.username}}</span>
								<img :src="rating.avatar" class="avatar">
							</div>
							<div class="time">{{rating.rateTime | formatDate}}</div>
							<p class="text">
								<span :class="{'icon-thumb_up': rating.rateType===0,'icon-thumb_down': rating.rateType===1}"></span>{{rating.text}}
							</p>
						</li>
					</ul>
					<div class="no-rating" v-show="!food.ratings.length">暂无评价</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import BScroll from 'better-scroll';
	import { formatDate } from 'common/js/date'
	
	import cartControl from 'components/cartControl/cartControl'
	import split from 'components/split/split'
	import ratingselect from 'components/ratingselect/ratingselect'

	export default {
		data() {
			return {
				showFlag: false,
				onlyContent: false,
				selectType: 2,
				desc: {
					'all': '全部',
					'positive': '推荐',
					'negative': '吐槽'
				}
			}
		},
		props: ['food'],
		components: {cartControl, split, ratingselect},
		methods: {
			show() {
				this.showFlag = true;
				this.$nextTick(() => {
					if (!this.scroll) {
						this.scroll = new BScroll(this.$refs.food, {
							click: true
						})
					}
				});
			},
			back() {
				this.showFlag = false;
			},
			addFirst(event) {
				if (!event._constructed) {
					return;
				}
				this.$set(this.food,'count',1);
			},
			needShow(type, text) {
				if (this.onlyContent && !text) {
					return false;
				}

				if(this.selectType == 2) {
					return true;
				} else {
					return type === this.selectType;
				}
			},
			select(type) {
				this.selectType = type;
				this.$nextTick(() => {
					this.scroll.refresh();
				});
			},
			toggleContent(flag) {
				this.onlyContent = flag;
				this.$nextTick(() => {
					this.scroll.refresh();
				});
			}
		},
		filters: {
			formatDate(time) {
				let date = new Date(time);
        		return formatDate(date, 'yyyy-MM-dd hh:mm');
			}
		}
	}
</script>

<style lang="stylus">
	.food-slide-enter-active, .food-slide-leave-active
	  transition: all .3s
	  transform: translate3d(0,0,0)
	.food-slide-enter, .food-slide-leave-active
	  opacity: 0
	  transform: translate3d(100%,0,0)
	  
	.fade-enter-active, .fade-leave-active
	  transition: all .5s
	.fade-enter, .fade-leave-active
	  opacity: 0

	.food
		position: fixed
		left: 0
		top: 0
		bottom: 48px
		width: 100%
		height: 100%
		z-index: 30
		background-color: #fff
		.img-header
			position: relative
			width: 100%
			height: 0
			padding-top: 100%
			background-color: #333
			img
				position: absolute
				left: 0
				top: 0
				width: 100%
				height: 100%
			.back
				position: absolute
				top: 10px
				left: 0
				.icon-arrow_lift
					display: block
					font-size: 20px
					color: #fff
					padding: 10px
					
		.content
			position: relative
			box-sizing: border-box
			padding: 18px
			width: 100%
			height: auto
			.title
				font-size: 14px
				line-height: 14px
				font-weight: 700
				color: rgb(7,17,27)
			.extra
				font-size: 0
				line-height: 10px
				margin: 8px 0 18px;
				height: 10px
				.sell-count, .rating
					font-size: 10px
					color: rgb(147,153,159)
				.sell-count
					margin-right: 12px
			.price
				.now
					font-size: 14px
					color: rgb(240,20,20)
					line-height: 24px
					font-weight: 700
				.old
					font-size: 10px
					font-weight: 700
					color: rgb(147,153,159)
					line-height: 24px
					text-decoration: line-through
			.cartControl-wrap
				position: absolute
				right: 12px
				bottom: 12px
			.buy
				position: absolute
				right: 18px
				bottom: 18px
				z-index: 10
				height: 24px
				line-height: 24px
				font-size: 10px
				padding: 0 12px
				color: #fff
				background-color: rgb(0,160,220)
				border-radius: 12px
		.info
			box-sizing: border-box
			padding: 18px
			.title
				font-size: 14px
				line-height: 14px
				font-weight: 700
				color: rgb(7,17,27)
				margin-bottom: 6px
			.desc
				padding: 8px
				font-size: 12px
				line-height: 24px
				color: rgb(77,85,93)
		.rating
			padding-top: 18px
			.title
				font-size: 14px
				line-height: 14px
				font-weight: 700
				color: rgb(7,17,27)
				margin-left: 18px
		.ratings-wrap
			margin: 0 18px
			.rating-item
				position: relative
				padding: 16px 0
				border-bottom: 1px solid rgba(7,17,27,0.1)
				.user
					position: absolute
					right: 0
					top: 16px
					font-size: 0
					line-height: 12px
					.name
						display: inline-block
						vertical-align: top
						font-size: 10px
						color: rgb(147,153,159)
						margin-right: 6px
					.avatar
						vertical-align: top
						border-radius: 50%
						height: 12px
				.time
					font-size: 10px
					color: rgb(147,153,159)
					line-height: 12px
					margin-bottom: 6px
				.text
					font-size: 12px
					line-height: 16px
					color: rgb(7,17,27)
					.icon-thumb_up, .icon-thumb_down
						font-size: 12px
						line-height: 16px
						color: rgb(147,153,159)
						margin-right: 4px
					.icon-thumb_up
						color: rgb(0,160,220)
			.no-rating
				padding: 16px 0
				font-size: 12px
				color: rgb(147,153,159)
					
</style>