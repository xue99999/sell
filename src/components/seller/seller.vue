<template>
	<div class="seller" ref="seller">
		<div class="seller-con">

			<div class="desc">
				<h1 class="title">{{seller.name}}</h1>
				<div class="star-wrap">
					<star :size="36" :score="seller.score"></star>
					<span class="text">({{seller.ratingCount}})</span>
					<span class="text">月售{{seller.sellCount}}单</span>
				</div>
				<ul class="remark">
					<li class="block">
						<h2 class="name">起送价</h2>
						<div class="content">
							<span class="count">{{seller.minPrice}}</span>元
						</div>
					</li>
					<li class="block">
						<h2 class="name">商家配送</h2>
						<div class="content">
							<span class="count">{{seller.deliveryPrice}}</span>元
						</div>
					</li>
					<li class="block">
						<h2 class="name">平均配送时间</h2>
						<div class="content">
							<span class="count">{{seller.deliveryTime}}</span>元
						</div>
					</li>
				</ul>
				<div class="favorite" @click="toggleFavorite">
					<div class="icon-favorite" :class="{'active': favorite}"></div>
					<p class="text">{{ favoriteText }}</p>
				</div>
			</div>

			<split></split>

			<div class="bulletin">
				<h1 class="title">公告与活动</h1>
				<p class="text">{{seller.bulletin}}</p>
				<ul class="supports" v-if="seller.supports">
					<li class="supports-item" v-for="(item, index) in seller.supports">
						<span class="icon" :class="classMap[item.type]"></span>
						<span class="description">
							{{item.description}}
						</span>
					</li>
				</ul>
			</div>

			<split></split>

			<div class="pics">
				<h1 class="title">商家实景</h1>
				<div class="pics-wrap" ref="pics">
					<ul class="pics-list" id="pic-list">
						<li class="pics-item" v-for="pic in seller.pics">
							<img width="120" height="90" :src="pic" alt="">
						</li>
					</ul>
				</div>
			</div>

			<split></split>

			<div class="info">
				<h1 class="title">商家信息</h1>
				<ul>
					<li class="info-item" v-for="info in seller.infos">
						{{info}}
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
	import { saveToLocal, loadFromLocal } from 'common/js/store.js'
	import star from 'components/star/star.vue';
	import split from 'components/split/split';

	export default {
		data() {
			return {
				favorite: (() => {
		          return loadFromLocal(this.seller.id, 'favorite', false);
		        })()
			}
		},
		props: {
			seller: {
				type: Object,
				default: []
			}
		},
		computed: {
			favoriteText() {
				return this.favorite ? '已收藏': '收藏';
			}
		},
		created() {
			//DOM元素还没创建好
			console.log(this.favorite)
			console.log('created')
			this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
		},
		mounted() {
			//DOM已经创建完毕
			console.log('先走了mounted')
			this._initScroll();
			this._initPics();
		},
		watch: {
			seller: function() {
				console.log('在走了watch');
				this._initScroll();
				this._initPics();
			}
		},
		methods: {
			toggleFavorite(event) {
				if (!event._constructed) {
					return ;
				}
				this.favorite = !this.favorite;
				saveToLocal(this.seller.id, 'favorite', this.favorite);
			},
			_initScroll() {
				if (!this.scroll) {
					this.scroll = new BScroll(this.$refs.seller, {
		              click: true
		            });
		            console.log(11111)
				} else {
					console.log(22222)
					this.scroll.refresh();
					console.log(33)
				}
			},
			_initPics() {
				if (this.seller.pics) {
					let imgWidth = 120;
					let margin = 6;
					let totalWidth = (imgWidth + margin) * this.seller.pics.length - margin;
					let picList = document.getElementById('pic-list')
					picList.style.width = totalWidth + 'px';

					this.$nextTick(() => {
						if (!this.picsScroll) {
							this.picsScroll = new BScroll(this.$refs.pics, {
								scrollX: true,
				                eventPassthrough: 'vertical'
							})
						} else {
							this.picsScroll.refresh();
						}
					})
				}
			}
		},
		components: { star, split }
	}
</script>

<style lang="stylus">
	@import '../../common/css/mixin.styl'

	.seller
		position: absolute
		top: 174px
		left: 0
		bottom: 0
		width: 100%
		overflow: hidden
		.seller-con
			.desc
				position: relative
				padding: 18px
				.title
					font-size: 14px
					line-height: 14px
					color: rgb(7,17,27)
					margin-bottom: 8px
					font-weight: 700
				.star-wrap
					font-size: 0
					padding-bottom: 18px
					border-1px(rgba(7,17,27,0.1))
					.star, .text
						display: inline-block
						vertical-align: top
						line-height: 18px
						margin-right: 8px
					.text
						margin-right: 12px
						font-size: 10px
						color: rgb(77,85,93)
				.remark
					padding-top: 18px
					display: flex
					.block
						flex: 1
						text-align: center
						border-right: 1px solid rgba(7,17,27,0.1)
						&:last-child
							border: none
						.name
							font-size: 10px
							line-height: 10px
							color: rgb(147,153,159)
							margin-bottom: 8px
						.content
							font-size: 10px
							.count
								font-size: 24px
								line-height: 24px
								color: rgb(7,17,27)
								margin-right: 2px
				.favorite
					position: absolute
					width: 50px
					right: 11px
					top: 18px
					text-align: center
					.icon-favorite
						font-size: 24px
						line-height: 24px
						margin-bottom: 4px
						&.active
							color: rgb(240,20,20)
					.text
						font-size: 10px
						line-height: 10px
						color: rgb(77,85,93)		
			.bulletin
				padding: 18px 18px 0
				.title
					font-size: 14px
					line-height: 14px
					color: rgb(7,17,27)
					margin-bottom: 8px
				.text
					padding: 0 12px 16px
					font-size: 12px
					line-height: 24px
					color: rgb(240,20,20)
					border-1px(rgba(7,17,27,0.1))
				.supports
					.supports-item
						font-size: 0
						padding: 16px 0
						border-1px(rgba(7,17,27,0.1))
						.description
							color: rgb(7,17,27)
							font-size: 12px
							line-height: 16px
						.icon
							display: inline-block
							width: 16px
							height: 16px
							background-size: 16px 16px
							background-repeat: no-repeat
							margin-right: 6px
							vertical-align: top
							&:last-child
								border-none()
							&.decrease
								bg-image('./imgs/decrease_4')
							&.discount 
								bg-image('./imgs/discount_4')
							&.guarantee
								bg-image('./imgs/guarantee_4')
							&.invoice
								bg-image('./imgs/invoice_4')
							&.special
								bg-image('./imgs/special_4')
								
			.pics
				padding: 18px 0 18px 18px
				.title
					font-size: 14px
					line-height: 14px
					color: rgb(7,17,27)
					margin-bottom: 8px
				.pics-wrap
					width: 100%
					overflow: hidden
					white-space: nowrap
					.pics-list
						font-size: 0
						.pics-item
							display: inline-block
							width: 120px
							height: 90px
							margin-right: 6px
							&:last-child
								margin: 0
			
			.info
				padding: 18px
				.title
					font-size: 14px
					line-height: 14px
					color: rgb(7,17,27)
					padding-bottom: 12px
					font-weight: bold
					border-1px(rgba(7,17,27,0.1))
				.info-item
					padding: 16px 12px
					font-size: 12px
					line-height: 16px
					color: rgb(7,17,27)
					border-1px(rgba(7,17,27,0.1))
					&:last-child
						border-none()
</style>