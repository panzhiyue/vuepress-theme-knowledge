<template>
	<main>
		<div class="loading">
			<div class="item"></div>
			<div class="item"></div>
			<div class="item"></div>
			<div class="item"></div>
			<div class="item"></div>
			<div class="item"></div>
			<div class="item"></div>
			<div class="item"></div>
		</div>
	</main>
</template>
<style scoped>
main {
	margin: 0;
	padding: 0;
	height: 200px;
	position: relative;
}
/* 设置位置 */
.loading {
	position: absolute;
	/* 居中 */
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	/* 高度 */
	height: 40px;
	/* 弹性布局 */
	display: flex;
	/* 设置子项在y轴方向居中，应该是设置起点在中间，非常有用，不然动画很怪 */
	align-items: center;
}

/* 小竖条 */
.item {
	height: 50px;
	width: 5px;
	background: red;
	/* 加margin，使竖条之间有空隙 */
	margin: 0px 3px;
	/* 圆角 */
	border-radius: 10px;
	/* 动画：名称、时间、循环 */
	animation: loading 1s infinite;
}

/* 设置动画 */
@keyframes loading {
	0% {
		height: 0px;
	}

	50% {
		height: 50px;
	}

	100% {
		height: 0px;
	}
}

/* 为每一个竖条设置延时 */
.item:nth-child(2) {
	animation-delay: 0.1s;
}

.item:nth-child(3) {
	animation-delay: 0.2s;
}

.item:nth-child(4) {
	animation-delay: 0.3s;
}

.item:nth-child(5) {
	animation-delay: 0.4s;
}

.item:nth-child(6) {
	animation-delay: 0.5s;
}

.item:nth-child(7) {
	animation-delay: 0.6s;
}

.item:nth-child(8) {
	animation-delay: 0.7s;
}
</style>
