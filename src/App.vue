<template>
	<div class="stopwatch">
		<StopWatch :count="count" />
	</div>
	<div class="arrows">
		<div v-if="fl && showArrows" class="fl"></div>
		<div v-if="fr && showArrows" class="fr"></div>
		<div v-if="ml && showArrows" class="ml"></div>
		<div v-if="mr && showArrows" class="mr"></div>
		<div v-if="bl && showArrows" class="bl"></div>
		<div v-if="br && showArrows" class="br"></div>
	</div>

	<div class="play">
		<button @click="togglePlay">{{play ? 'Pause' : 'Play'}}</button>
	</div>

	<div class="range">
		<input v-model="interval" type="range" name="interval" id="interval" min="3" max="10" />
	</div>
</template>

<script>
import StopWatch from './components/StopWatch.vue'

export default {

	name: 'HomePage',
	components: {
		StopWatch
	},
	data () {
		return {
			count: 0,
			random: -1,
			play: false,
			interval: 3,
			timerInterval: '',
			ghostInterval: '',
			showArrows: false
		}
	},
	computed: {

		fl () {
			return this.random >= 0 && this.random <= 1
		},

		fr () {
			return this.random > 1 && this.random <= 2
		},

		ml () {
			return this.random > 2 && this.random <= 3
		},

		mr () {
			return this.random > 3 && this.random <= 4
		},

		bl () {
			return this.random > 4 && this.random <= 5
		},

		br () {
			return this.random > 5 && this.random <= 6
		}

	},
	methods: {

		ghost () {

			clearInterval(this.ghostInterval)

			this.showArrows = true

			this.random = Math.random() * 6

			this.ghostInterval = setInterval(() => {

				this.showArrows = true

				this.random = Math.random() * 6

				setTimeout(() => {
					this.showArrows = false
				}, (this.interval * 1000) - 500);

			}, this.interval * 1000)

		},

		togglePlay () {
			this.play = !this.play

			clearInterval(this.timerInterval)
			if(this.play) {
				this.timerInterval = setInterval(() => {
					this.count++
				}, 1000);
			}

			clearInterval(this.ghostInterval)
		}

	},
	watch: {
		play () {
			if(this.play) this.ghost()
		}
	}
}

</script>

<style lang="scss">
html,
body {
	font-family: sans-serif;
	padding: 0;
	margin: 0;

	> * {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}
}

#app {
	min-width: 320px;
}

.stopwatch {
	text-align: center;
	height: 100px;
	display: grid;
	align-items: center;
	justify-items: center;
	font-size: 3rem;
}

.arrows {
	height: calc(100vh - 140px);
	position: relative;

	> div {
		position: absolute;
		height: 30px;
		width: 30px;

		&::before,
		&::after {
			content: "";
			display: block;
			position: absolute;
			background: black;
			height: 10px;
			width: 30px;
			border-radius: 5px;
		}

		&.bl::before,
		&.br::before {
			bottom: 0;
		}

		&::after {
			width: 10px;
			height: 30px;
		}

		&.fr::after,
		&.mr::after,
		&.br::after {
			right: 0;
		}
	}

	.fl,
	.ml,
	.bl {
		left: 20px;
	}

	.fr,
	.mr,
	.br {
		right: 20px;
		text-align: right;
	}

	.fl,
	.fr {
		top: 20px;
	}

	.ml,
	.mr {
		top: 50%;
	}

	.ml {
		top: calc(55% - 22px);
		transform: rotate(-45deg);
	}

	.mr {
		transform: rotate(45deg);
	}

	.bl,
	.br {
		bottom: 20px;
	}
}

.play {
	position: fixed;
	height: 80px;
	width: 80px;
	top: calc(50vh - 40px);
	left: calc(50% - 40px);

	button {
		border: 2px solid;
		border-radius: 100%;
		display: block;
		height: 100%;
		width: 100%;
		font-size: 1.5rem;
	}
}

.range {
	height: 40px;
	padding: 0 20px;

	input {
		width: 100%;
	}
}
</style>
