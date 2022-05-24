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
		<div
			ref="dot"
			:class="{ active: dotActive }"
		></div>
	</div>

	<div class="range">
		<label>
			Interval: {{interval}}s
			<input v-model="interval" type="range" name="interval" id="interval" min="1" max="10" />
		</label>
	</div>
</template>

<script>

import NoSleep from 'nosleep.js'
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
			countdownInterval: '',
			dotActive: false
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

			this.dotActive = true

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

				// Flicker the arrow
				setTimeout(() => {
					this.showArrows = false
				}, 4500)

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
				this.dotActive = false
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

			// Update .dot animation-duration
			document.getElementById("Mercury-orbit");
    		this.$refs.dot.style['animation-duration'] = `${ this.interval }s`
		}

	},
	mounted () {

		// Wake lock
		const noSleep = new NoSleep()

		const enableNoSleep = () => {
			noSleep.enable()
			document.removeEventListener('touchstart', enableNoSleep, false)
		}

		document.addEventListener('touchstart', enableNoSleep, false)

	}
}

</script>

<style lang="scss">
@import "sass/ghosting";
</style>
