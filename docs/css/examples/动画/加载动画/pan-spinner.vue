<template>
	<!-- 容器 -->
	<div class="pan-spinner">
		<!-- 食物，加载圈 -->
		<div class="pan-spinner-inner"></div>
		<!-- 平底锅 -->
		<div class="pan-container">
			<!-- 锅面 -->
			<div class="pan"></div>
			<!-- 锅把 -->
			<div class="handle"></div>
		</div>
		<!-- 炉子 -->
		<div class="shadow"></div>
	</div>
</template>
<style scoped>
.pan-spinner {
	width: 180px;
	height: 180px;
	margin: 100px;
}
/* 食物 */
.pan-spinner-inner {
	position: relative;
	top: 10%;
	left: 0;
	z-index: 1;
	width: 60%;
	height: 45%;
	/* 设置透明边框 */
	/* 边框的设置，会去掉三条边框，最终显示一个梯形（上短下长） */
	border: 10px solid transparent;
	border-bottom: 10px solid #fdd835;
	/* 梯形会变成弧形，效果就是一块肉饼 */
	border-radius: 50%;
	/* 设置动画，名称、时间、循环 */
	animation: loading 2s infinite;
	/* 设置从开头到结尾以相同的速度来播放动画 */
	animation-timing-function: linear;
}

/* 食物转圈 */
@keyframes loading {
	0% {
		width: 10%;
		transform: rotate(0deg);
	}

	20% {
		width: 10%;
		left: 20%;
	}

	30% {
		width: 25%;
	}

	50% {
		width: 35%;
		left: 15%;
	}

	70% {
		width: 30%;
		left: 18%;
		transform: rotate(240deg);
	}

	90% {
		width: 30%;
		left: 10%;
	}

	100% {
		width: 3%;
		left: 25%;
		transform: rotate(360deg);
	}
}

/*锅 */
.pan-spinner .pan-container {
	display: flex;
	width: 100%;
	/*设置动画 */
	animation: pan 2s infinite;
}

/* 颠锅 */
@keyframes pan {
	0% {
		transform: rotate(0deg);
		/* 设置旋转的中心点 */
		transform-origin: top right;
	}

	10% {
		transform: rotate(-2deg);
		/* 设置旋转的中心点 */
		transform-origin: top right;
	}

	50% {
		transform: rotate(15deg);
	}

	100% {
		transform: rotate(0deg);
	}
}
/* 锅面 */
.pan-spinner .pan {
	width: 60%;
	height: 20px;
	/* 背景色，线性渐变 */
	background: linear-gradient(#3949ab, #5c6bc0);
	/* 设置锅左右两侧弧度 */
	border-bottom-left-radius: 20px;
	border-bottom-right-radius: 20px;
}

/* 锅把 */
.pan-spinner .handle {
	width: 40%;
	height: 10px;
	/* 背景颜色，线性渐变 */
	background: linear-gradient(#3949ab, #5c6bc0);
	/* 设置锅把两侧的弧度 */
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
	border-bottom-left-radius: 20px;
	border-bottom-right-radius: 20px;
}
/* 炉子 */
.pan-spinner .shadow {
	position: relative;
	top: 15%;
	left: 15%;
	width: 30%;
	height: 8px;
	background: lightgreen;
	border-radius: 20px;
	animation: shadow 2s infinite;
}

/* 炉子收缩、放大 */
@keyframes shadow {
	0% {
		width: 30%;
	}

	50% {
		width: 40%;
		left: 20px;
	}

	100% {
		width: 30%;
	}
}
</style>
