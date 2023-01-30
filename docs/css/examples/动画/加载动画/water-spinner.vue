<template>
	<div class="loading">
		<!-- 小球 -->
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
	</div>
	<svg>
		<filter id="gooey">
			<feGaussianBlur in="SourceGraphic" stdDeviation="10"></feGaussianBlur>
			<feColorMatrix
				values="
            1 0 0 0 0
            0 1 0 0 0
            0 0 1 0 0
            0 0 0 20 -10
            " />
		</filter>
	</svg>
</template>
<style scoped>
svg {
	width: 0;
	height: 0;
}

.loading {
	position: relative;
	width: 200px;
	height: 200px;
	filter: url(#gooey);
}

.loading span {
	position: absolute;
	height: 100%;
	width: 100%;
	top: 0;
	left: 0;
	display: block;
	animation: loading 4s ease-in-out infinite;
}

.loading span:nth-child(1) {
	animation-delay: 0.2s;
}

.loading span:nth-child(2) {
	animation-delay: 0.4s;
}

.loading span:nth-child(3) {
	animation-delay: 0.6s;
}

.loading span:nth-child(4) {
	animation-delay: 0.8s;
}

.loading span:nth-child(5) {
	animation-delay: 1s;
}

.loading span:nth-child(6) {
	animation-delay: 1.2s;
}

.loading span:nth-child(7) {
	animation-delay: 1.24s;
}

.loading span::before {
	content: '';
	position: absolute;
	width: 40px;
	height: 40px;
	top: 0;
	left: calc(50% -20px);
	box-shadow: 0 0 30px #03a9f4;
	/* 设置渐变颜色 */
	background: linear-gradient(#fce4ec, #03a9f4);
	border-radius: 50%;
}

@keyframes loading {
	0% {
		transform: rotate(0deg);
	}

	50%,
	100% {
		transform: rotate(360deg);
	}
}
</style>
