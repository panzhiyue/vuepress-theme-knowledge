<template>
	<main>
		<div class="container">
			<div class="loading">
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</div>
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
.container {
	width: 400px;
	height: 300px;
	/* 居中 */
	position: absolute;
	display: flex;
	justify-content: center;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}

.container .loading {
	position: relative;
	width: 100px;
	height: 100px;
	margin: 10px;
	background: #2d3c50;
}

/* 6个正方形 */
.loading span {
	height: 100%;
	width: 100%;
	position: absolute;
	animation: move 3.5s linear infinite;
}

@keyframes move {
	74% {
		transform: rotate(600deg);
	}

	79% {
		transform: rotate(720deg);
		opacity: 1;
	}

	80% {
		transform: rotate(720deg);
		opacity: 0;
	}

	100% {
		transform: rotate(810deg);
		opacity: 0;
	}
}

.loading span:nth-child(2) {
	animation-delay: 0.1s;
}

.loading span:nth-child(3) {
	animation-delay: 0.2s;
}

.loading span:nth-child(4) {
	animation-delay: 0.3s;
}

.loading span:nth-child(5) {
	animation-delay: 0.4s;
}

.loading span:nth-child(6) {
	animation-delay: 0.5s;
}

.loading span::before {
	content: '';
	position: absolute;
	height: 10px;
	width: 10px;
	background-color: #fff;
	border-radius: 50%;
	bottom: 0px;
	left: calc(50% - 5px);
}
</style>
