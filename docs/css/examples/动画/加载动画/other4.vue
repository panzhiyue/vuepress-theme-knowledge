<template>
	<main>
		<div class="container">
			<!-- 圆圈 -->
			<div class="circle"></div>
			<!-- 小竖条 -->
			<div class="fence"></div>
			<div class="fence"></div>
			<div class="fence"></div>
			<div class="fence"></div>
			<div class="fence"></div>
			<div class="fence"></div>
			<div class="fence"></div>
			<div class="fence"></div>
		</div>
	</main>
</template>
<style scoped>
main {
	margin: 0;
	padding: 0;
	height: 200px;
	position: relative;
	background: #2d3c50;
}
/* 设置容器 */
.container {
	width: 300px;
	height: 200px;
	background: #2d3c50;
	position: relative;
	display: flex;
	justify-content: space-evenly;
}

/* 小竖条 */
.container .fence {
	height: 100%;
	width: 20px;
	background: #ffff00;
	border-bottom-left-radius: 10%;
	border-bottom-right-radius: 10%;
}

.container .fence:nth-child(2) {
	background-color: #0099cc;
}

.container .fence:nth-child(4) {
	background-color: #ffcccc;
}

.container .fence:nth-child(6) {
	background-color: #99c452;
}

.container .fence:nth-child(8) {
	background-color: #99cc33;
}

/* 弧形曲面，画一个大圆放到小竖条上面，形成一个曲面 */
.container .circle {
	width: 400px;
	height: 400px;
	/* 父相子绝 */
	position: absolute;
	background: #2d3c50;
	border-radius: 50%;
	top: -150%;

	overflow: hidden;

	/* 核心：不是小球动，是大圆旋转 */
	transform: rotate(45deg);
	/* 动画，效果：开始结束慢，循环，循环交替播放动画 */
	animation: move 2s ease-in-out infinite alternate;
}

@keyframes move {
	0% {
		transform: rotate(45deg);
	}

	50% {
		transform: rotate(-45deg);
	}

	100% {
		transform: rotate(45deg);
	}
}

/* 小圆球 */
.container .circle::after {
	/* 使用after在圆环里添加一个小球 */
	content: '';
	position: absolute;
	width: 30px;
	height: 30px;
	background: blue;
	bottom: 0px;
	left: 50%;
	transform: translate(-50%, 0);
	border-radius: 50%;
}
</style>
