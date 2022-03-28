<template>{{hours}}:{{minutes}}:{{seconds}}</template>

<script>
export default {
	name: 'StopWatch',
	props: {
		count: {
			type: Number,
			required: true
		}
	},
	computed: {

		hours () {

			const hours = Math.floor(
				this.count / (60 * 60)
			)

			return hours < 10
				? `0${ hours }`
				: hours

		},

		minutes () {

			const minutes = Math.floor(
				(this.count / 60) - (this.hours * 60)
			)

			return minutes < 10
				? `0${ minutes }`
				: minutes

		},

		seconds () {

			const seconds = this.count - (this.hours * 60 * 60) - (this.minutes * 60)

			return seconds < 10
				? `0${ seconds }`
				: seconds


		}

	}
}
</script>