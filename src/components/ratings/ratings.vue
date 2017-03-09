<template>
	<div class="ratings">
		<div class="ratings-con">
			<div class="desc-left">
				<h1 class="score">{{seller.score}}</h1>
				<div class="title">综合评分</div>
				<div class="rank">高于周边商家{{seller.rankRate}}</div>
			</div>
			<div class="desc-right">
				<div class="score-wrap">
					<span class="name">服务态度</span>
					<star :size="36" :score="seller.score"></star>
					<span class="score">{{seller.serviceScore}}</span>
				</div>
				<div class="score-wrap">
					<span class="name">商品评分</span>
					<star :size="36" :score="seller.score"></star>
					<span class="score">{{seller.foodScore}}</span>
				</div>
				<div class="score-wrap">
					<span class="name">送达时间</span>
					<span class="time">{{seller.deliveryTime}}分钟</span>
				</div>
			</div>
		</div>
		<split></split>
	</div>
</template>

<script>
	import split from 'components/split/split'
	import star from 'components/star/star.vue';
	export default {
		props: {
			seller: {
				type: Object
			}
		},
		components: { star, split }
	}
</script>

<style lang="stylus">
	.ratings
		position: absolute
		top: 174px
		left: 0
		width: 100%
		overflow: hidden
		.ratings-con
			display: flex
			padding: 18px 0
			.desc-left
				width: 137px
				text-align: center
				border-right: 1px solid rgba(7,17,27,0.1)
				.score
					font-size: 24px
					line-height: 28px
					color: rgb(255,153,0)
					margin-bottom: 6px
				.title
					font-size: 12px
					line-height: 12px
					color: rgb(7,17,27)
					margin-bottom: 8px
				.rank
					font-size: 10px
					line-height: 10px
					color: rgb(147,153,159)
					margin-bottom: 6px
			.desc-right
				flex: 1
				margin-left: 12px
				.score-wrap
					margin-bottom: 8px
					font-size: 0
					.name
						display: inline-block
						font-size: 12px
						color: rgb(7,17,27)
						line-height: 18px
						vertical-align: top
					.star
						display: inline-block
						margin: 0 12px
						vertical-align: top
					.score
						display: inline-block
						vertical-align: top
						font-size: 12px
						color: rgb(255,153,0)
						line-height: 18px
					.time
						display: inline-block
						font-size: 12px
						line-height: 18px
						color: rgb(147,153,159)
						margin-left: 12px
					
</style>