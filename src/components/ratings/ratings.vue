<template>
	<div class="ratings" ref="ratings">
		<div class="ratings-content">

			<div class="desc">
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

			<ratingselect v-on:rating-select="select" v-on:toggle-content="toggleContent" :ratings="ratings" :onlyContent="onlyContent" :desc="desc" :selectType="selectType"></ratingselect>

			<div class="ratings-wrap">
				<ul>
					<li v-show="needShow(rating.rateType, rating.text)" class="rating-item" v-for="rating in ratings">
						<div class="avatar">
							<img width="28" height="28" :src="rating.avatar" alt="">
						</div>
						<div class="content">
							<h1 class="name">{{rating.username}}</h1>
							<div class="star-wrap">							
								<star :size="24" :score="rating.score"></star>
								<span class="delivery">{{rating.deliveryTime}}分钟送达</span>
							</div>
							<p class="text">{{rating.text}}</p>
							<div class="recommand" v-show="rating.recommend">
								<span class="icon-thumb_up"></span>
								<span class="icon-thumb_down"></span>
								<div class="recommend-item" v-for="item in rating.recommend">
									{{item}}
								</div>
							</div>
							<div class="time">{{rating.rateTime | formatDate}}</div>
						</div>
					</li>
				</ul>
			</div>

		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
	import { formatDate } from 'common/js/date';

	import split from 'components/split/split';
	import ratingselect from 'components/ratingselect/ratingselect';
	import star from 'components/star/star.vue';

	const ERR_OK = 0;

	export default {
		data() {
			return {
				ratings: [],
				onlyContent: false,
				selectType: 2,
				desc: {
					'all': '全部',
					'positive': '满意',
					'negative': '不满意'
				}
			}
		},
		props: {
			seller: {
				type: Object
			}
		},
		created() {
			this.$http.get('/api/ratings').then(res => {
				if (res.body.errno == ERR_OK) {
					this.ratings = res.body.data;

					this.$nextTick(() => {
			            this.scroll = new BScroll(this.$refs.ratings, {
			              click: true
			            });
			        });
				}
			})
		},
		methods: {
			toggleContent(flag) {
				this.onlyContent = flag;
				this.$nextTick(() => {
					this.scroll.refresh();
				});
			},
			select(type) {
				this.selectType = type;
				this.$nextTick(() => {
					this.scroll.refresh();
				});
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
			}
		},
		filters: {
			formatDate(time) {
				let date = new Date(time);
        		return formatDate(date, 'yyyy-MM-dd hh:mm');
			}
		},
		components: { star, split, ratingselect }
	}
</script>

<style lang="stylus">
	@import '../../common/css/mixin.styl'

	.ratings
		position: absolute
		top: 174px
		left: 0
		bottom: 0
		width: 100%
		overflow: hidden
		.desc
			display: flex
			padding: 18px 0
			.desc-left
				width: 137px
				text-align: center
				border-right: 1px solid rgba(7,17,27,0.1)
				@media only screen and (max-width: 320px)
					width: 120px
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
				margin-left: 24px
				padding: 6px 0
				@media only screen and (max-width: 320px)
					margin-left: 6px
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
		.ratings-wrap
			padding: 0 18px
			.rating-item
				display: flex
				padding: 18px 0
				border-1px(rgba(7,17,27,0.1))
				.avatar
					width: 28px
					height: 28px
					border-radius: 50%
					img
						border-radius: 50%	
				.content
					position: relative
					flex: 1
					margin-left: 12px
					.name
						font-size: 10px
						line-height: 12px
						color: rgb(7,17,27)
						margin-bottom: 4px
					.star-wrap
						font-size: 0
						margin-bottom: 6px
						.star
							display: inline-block
							margin-right: 6px
							vertical-align: top
						.delivery
							display: inline-block
							font-size: 10px
							color: rgb(147,153,159)
							line-height: 12px
							vertical-align: top
					.text
						margin-bottom: 8px
						font-size: 12px
						color: rgb(7,17,27)
						line-height: 18px
						word-break: break-all
					.recommand
						line-height: 16px
						font-size: 0
						.icon-thumb_up, .recommend-item
							display: inline-block
							margin-right: 8px
							margin-bottom: 4px
						.icon-thumb_up
							color: rgb(0,160,220)
							font-size: 12px
						.recommend-item
							font-size: 9px
							color: rgb(147,153,159)
							border: 1px solid rgba(7,17,27,0.1)
							border-radius: 2px
							padding: 0 6px
					.time
						position: absolute
						right: 0
						top: 0
						font-size: 10px
						line-height: 12px
						color: rgb(147,153,159)
</style>