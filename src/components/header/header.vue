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
			<div v-if="seller.supports" class="support-count" @click="showDetail">
				<span class="count">{{seller.supports.length}}个</span>
				<i class="icon-keyboard_arrow_right"></i>
			</div>
		</div>
		<div class="bulletin-wrap" @click="showDetail">
			<span class="bulletin-title"></span>
			<span class="bulletin-text">{{seller.bulletin}}</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
		<div class="background">
			<img  width="100%" height="100%" :src="seller.avatar" alt="">
		</div>
		<transition name="detail">	
			<div v-show="detailShow" class="detail">
				<div class="detail-wrap clearfix">
					<div class="detail-main">
						<h1 class="name">{{ seller.name }}</h1>
						<div class="star-wrap">
							<star :size="36" :score="seller.score"></star>
						</div>
						<div class="coupon-wrap">
							<div class="line"></div>
							<div class="coupon">优惠信息</div>
							<div class="line"></div>
						</div>
						<ul class="supports" v-if="seller.supports">
							<li class="supports-item" v-for="(item, index) in seller.supports">
								<span class="icon" :class="classMap[item.type]"></span>
								<span class="text">
									{{item.description}}
								</span>
							</li>
						</ul>
						<div class="coupon-wrap">
							<div class="line"></div>
							<div class="coupon">商家公告</div>
							<div class="line"></div>
						</div>
						<div class="bulletin">
							<p>{{seller.bulletin}}</p>
						</div>
					</div>
				</div>
				<div class="detail-close" @click="close">
					<i class="icon-close"></i>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import star from 'components/star/star.vue';

	export default {
		name: 'header',
		data() {
			return {
				detailShow: false
			}
		},
		props: ['seller'],
		created() {
			this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
		},
		methods: {
			showDetail() {
				this.detailShow = true;
			},
			close() {
				this.detailShow = false;
			}
		},
		components: { star }
	}
</script>

<style lang="stylus">
	.detail-enter-active
	  transition: all .3s ease
	.detail-leave-active
	  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)
	.detail-enter, .detail-leave-active
	  opacity: 0
	
	.clearfix 
		display: inline-block
		&:after
			content: '.'
			display: block
			height: 0
			line-height: 0
			visibility: hidden
			clear: both
			
	.header
		position: relative
		color: #fff
		background-color: rgba(7,17,27,0.5)
		overflow: hidden
		.content-wrap 
			position: relative
			padding: 24px 12px 18px 24px;
			font-size: 0
			.avatar
				display: inline-block
				vertical-align: top
				img
					border-radius: 2px
			.content
				display: inline-block
				margin-left: 16px
				.title
					font-size: 16px
					color: rgb(255,255,255)
					line-height: 18px
					.brand
						display: inline-block
						vertical-align: top
						width: 30px
						height: 18px
						background: url('./imgs/brand@2x.png') no-repeat
						background-size: 30px 18px
					.name
						margin-left: 6px
						font-size: 16px
						font-weight: bold
						line-height: 18px
				.description
					font-size: 12px
					line-height: 12px
					margin: 8px 0 10px 0
				.support
					.icon
						display: inline-block
						vertical-align: top
						width: 12px
						height: 12px
						margin-right: 4px
						background-size: 12px 12px
						background-repeat: no-repeat
						&.decrease
							background-image: url('./imgs/decrease_1@2x.png')
						&.discount
							background-image: url('./imgs/discount_1@2x.png')
						&.guarantee
							background-image: url('./imgs/guarantee_1@2x.png')
						&.invoice
							background-image: url('./imgs/invoice_1@2x.png')
						&.special
							background-image: url('./imgs/special_1@2x.png')
					.text
						font-size: 10px
						line-height: 12px
			.support-count
				position: absolute
				right: 12px
				bottom: 14px
				background-color: rgba(0,0,0,0.2)
				padding: 0 8px
				border-radius: 14px
				height: 24px
				line-height: 24px
				text-align: center
				.count 
					font-size: 10px
					vertical-align: top
				.icon-keyboard_arrow_right
					&:before
						margin-left: 2px
						line-height: 24px
						font-size: 10px
		
		.bulletin-wrap
			position: relative
			background-color: rgba(7,17,27,0.2)
			height: 28px
			line-height: 28px
			padding: 0 22px 0 12px
			white-space: nowrap
			overflow: hidden
			text-overflow: ellipsis
			.bulletin-title
				display: inline-block
				width: 22px
				height: 12px
				background-image: url('./imgs/bulletin@2x.png')
				background-size: 22px 12px
				background-repeat: no-repeat
				vertical-align: top
				margin-top: 8px
			.bulletin-text
				vertical-align: top
				margin:0 4px
				font-size: 10px
				line-height: 28px
			.icon-keyboard_arrow_right
				&:before
					position: absolute
					font-size: 10px
					z-index: 9
					right: 18px
					top: 8px
					
		.background
			position: absolute
			top: 0
			left: 0
			width: 100%
			height: 100%
			z-index: -1
			filter: blur(10px)
		
		.detail
			position: fixed
			height: 100%
			width: 100%
			left: 0
			top: 0
			z-index: 100
			background-color: rgba(7,17,27,0.8)
			overflow: auto
			transition: all .5s

			.detail-wrap
				min-height: 100%
				width: 100%
				.detail-main
					margin-top: 64px
					padding-bottom: 64px
					.star-wrap
						height: 24px
						text-align: center
						margin-top: 16px
					.name
						font-size: 16px
						line-height: 16px
						font-weight: 700
						text-align: center
					.coupon-wrap
						display: flex
						width: 80%
						margin: 28px auto 24px auto
						.line
							flex: 1
							position: relative
							top: -6px
							border-bottom: 1px solid rgba(255,255,255,0.2)
						.coupon
							flex: 1
							padding: 0 12px
							font-size: 14px
							line-height: 14px
							font-weight: 700
							text-align: center
					.bulletin
						width: 80%
						margin: 0 auto
						p
							padding: 0 12px
							font-size: 12px
							line-height: 24px
					.supports
						width: 80%
						margin: 0 auto
						.supports-item
							margin-bottom: 12px
							font-size: 0
							&:last-child
								margin-bottom: 0
						.icon
							display: inline-block
							width: 16px
							height: 16px
							background-size: 16px 16px
							background-repeat: no-repeat
							margin-right: 6px
							vertical-align: top
							&.decrease
								background-image: url('./imgs/decrease_2@2x.png')
							&.discount 
								background-image: url('./imgs/discount_2@2x.png')
							&.guarantee
								background-image: url('./imgs/guarantee_2@2x.png')
							&.invoice
								background-image: url('./imgs/invoice_2@2x.png')
							&.special
								background-image: url('./imgs/special_2@2x.png')
						.text 
							line-height: 16px
							font-weight: 200
							color: #fff
							font-size: 12px
			.detail-close
				position: relative
				width: 32px
				height: 32px
				margin: -64px auto 0 auto
				font-size: 32px
				color: rgba(255,255,255,0.5)
				clear: both
</style>