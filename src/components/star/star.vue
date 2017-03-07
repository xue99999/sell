<template>
	<div class="star star-48" >
		<span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
	</div>
</template>

<script>
	const LENGTH = 5;
	const CLS_HALF = 'half';
	const CLS_ON = 'on';
	const CLS_OFF = 'off';

	export default {
		props: {
			size: {
				type: Number
			},
			score: {
				type: Number
			}
		},
		computed: {
			startType() {
				return 'star-' + this.size;
			},
			itemClasses() {
				let res = [];
				let val = Math.floor(this.score * 2) / 2;
				let hasHalf = val % 1 !== 0;
				let int = Math.floor(this.score);

				for (let i = 0; i < int; i++) {
					res.push(CLS_ON);
				}

				if (hasHalf) {
					res.push(CLS_HALF);
				}

				while (res.length < LENGTH) {
					res.push(CLS_OFF);
				}

				return res;
			}
		}
	}
</script>

<style lang="stylus">
	.star
		font-size: 0
		.star-item
			display: inline-block
			background-repeat: no-repeat
		&.star-48
			.star-item
				width: 20px
				height: 20px
				margin-right: 22px
				background-size: 20px 20px
				&:last-child
					margin-right: 0
				&.on
					background-image: url('./imgs/star48_on@2x.png')
				&.half
					background-image: url('./imgs/star48_half@2x.png')
				&.off
					background-image: url('./imgs/star48_off@2x.png')
		&.star-36
			.star-item
				width: 15px
				height: 15px
				margin-right: 16px
				background-size: 15px 15px
				&:last-child
					margin-right: 0
				&.on
					background-image: url('./imgs/star36_on@2x.png')
				&.half
					background-image: url('./imgs/star36_half@2x.png')
				&.off
					background-image: url('./imgs/star36_off@2x.png')
		&.star-24
			.star-item
				width: 10px
				height: 10px
				margin-right: 3px
				background-size: 10px 10px
				&:last-child
					margin-right: 0
				&.on
					background-image: url('./imgs/star24_on@2x.png')
				&.half
					background-image: url('./imgs/star24_half@2x.png')
				&.off
					background-image: url('./imgs/star24_off@2x.png')
</style>