<template>
	<main>
		<div class="loading">
			<span>Loading...</span>
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
.loading {
	width: 150px;
	height: 150px;
	/* background: red; */
	/* 并排放置两个带边框的框，令浏览器呈现出带有指定宽度和高度的框，并把边框和内边距放入框中 */
	box-sizing: border-box;
	border-radius: 50%;
	border-top: 10px solid #ff9900;
	position: relative;
	/* 动画 */
	animation: a1 2s linear infinite;
}

/* before和after在元素前面和后面添加内容 */
.loading::before,
.loading::after {
	content: '';
	width: 150px;
	height: 150px;
	/* background: red; */
	position: absolute;
	left: 0;
	top: -10px;
	/* 形成另外两个颜色弧 */
	box-sizing: border-box;
	border-radius: 50%;
}

.loading::before {
	border-top: 10px solid #ff99cc;
	transform: rotate(120deg);
}

.loading::after {
	border-top: 10px solid #ccff99;
	transform: rotate(240deg);
}

/* 文字 */
.loading span {
	position: absolute;
	height: 150px;
	width: 150px;
	/* 文字居中 */
	text-align: center;
	line-height: 150px;
	color: lightgrey;
	font-size: 15px;
	/* 动画 */
	animation: a2 2s linear infinite;
}

@keyframes a1 {
	to {
		transform: rotate(360deg);
	}
}
@keyframes a2 {
	to {
		transform: rotate(-360deg);
	}
}
</style>
