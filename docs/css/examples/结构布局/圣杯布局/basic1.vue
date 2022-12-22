<template>
	<main>
		<input ref="range" type="range" value="100" @input="handleInput" />
		<section :style="{ width }">
			<div class="center">A paragraph of filler text. La la la de dah de dah de dah de la.</div>
			<div class="left">left</div>
			<div class="right">right</div>
		</section>
	</main>
</template>
<script>
export default {
	data() {
		return {
			width: '100%',
		};
	},
	methods: {
		handleInput(e) {
			this.width = `${60 + e.target.value * 0.4}%`;
		},
	},
};
</script>
<style scoped>
* {
	box-sizing: border-box;
}
main {
	width: 100%;
	padding: 39px 29px;
	font-size: 12px;
}

section {
	padding: 0 129px;
	box-shadow: 0 0 0 1px #eee;
}
section::after {
	content: '';
	display: block;
	clear: both;
}

section > div {
	height: 229px;
	line-height: 1.5em;
	padding: 29px 12px;
	text-align: center;
	float: left;
	color: white;
	background: #b4a078;
}

section .left,
section .right {
	position: relative;
	width: 119px;
}

section .left {
	left: -129px;
	margin-left: -100%;
}

section .center {
	width: 100%;
	text-align: justify;
	hyphens: auto;
}
section .right {
	left: 129px;
	margin-left: -119px;
}
input[type='range'] {
	width: 100%;
	cursor: ew-resize;
}
</style>
