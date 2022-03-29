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
		<button @click="togglePlay">{{buttonText}}</button>
	</div>

	<div class="range">
		<label>
			Interval: {{interval}}s
			<input v-model="interval" type="range" name="interval" id="interval" min="1" max="10" />
		</label>
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
			buttonText: 'Go',
			interval: 3,
			timerInterval: '',
			ghostInterval: '',
			showArrows: false,
			flickerTimeout: '',
			countdownInterval: ''
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

			this.flickerArrows()

			this.random = Math.random() * 6

			this.ghostInterval = setInterval(() => {

				this.random = Math.random() * 6

				this.flickerArrows()

			}, this.interval * 1000)

		},

		togglePlay () {
			this.play = !this.play

			// Clear previous intervals and timeout
			clearInterval(this.countdownInterval)
			clearInterval(this.timerInterval)
			clearInterval(this.ghostInterval)
			clearTimeout(this.flickerTimeout)

			if(this.play) {

				// Countdown
				let countdown = 5
				this.buttonText = countdown

				this.countdownInterval = setInterval(() => {

					if(countdown > 1) {
						countdown--
						this.buttonText = countdown
					}

					else {

						// Clear this interval
						clearInterval(this.countdownInterval)

						this.buttonText = 'Stop'

						// Start timer
						this.timerInterval = setInterval(() => {
							this.count++
						}, 1000);

						// Start ghosting
						this.ghost()
					}

				}, 1000);


			}

			else {
				this.buttonText = 'Go'
			}

		},

		flickerArrows () {

			this.showArrows = true

			this.flickerTimeout = setTimeout(() => {
				this.showArrows = false
			},
				(this.interval * 1000) - 500
			)

		}

	},
	watch: {

		interval () {
			// If interval changes while playing reset things
			if(this.play) this.togglePlay()
		}

	}
}

</script>

<style lang="scss">
@use "sass:math";
html,
body {
	font-family: sans-serif;
	padding: 0;
	margin: 0;
	background: rgb(61, 61, 61);

	> * {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
		color: white;
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
	font-size: 4rem;
}

$size: 50px;
$thickness: 12px;

.arrows {
	height: calc(100vh - 160px);
	position: relative;

	> div {
		position: absolute;
		height: $size;
		width: $size;

		&::before,
		&::after {
			content: "";
			display: block;
			position: absolute;
			background: white;
			height: $thickness;
			width: $size;
			border-radius: math.div($thickness, 2);
		}

		&.bl::before,
		&.br::before {
			bottom: 0;
		}

		&::after {
			width: $thickness;
			height: $size;
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
		top: calc(50vh - 125px);
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

$play-size: 120px;

.play {
	position: fixed;
	height: $play-size;
	width: $play-size;
	top: calc(50vh - #{math.div($play-size, 2)});
	left: calc(50% - #{math.div($play-size, 2)});

	button {
		border: 2px solid;
		border-radius: 100%;
		display: block;
		height: 100%;
		width: 100%;
		font-size: 2rem;
	}
}

.range {
	height: 60px;
	padding: 0 20px;
	text-align: center;

	input {
		width: 100%;
	}
}
</style>
