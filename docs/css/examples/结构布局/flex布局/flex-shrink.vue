<template>
	<main>
		800px
		<div class="container" style="width: 800px">
			<div style="width: 100px; height: 30px; background: gray">100</div>
			<div style="width: 100px; height: 30px; background: pink">100</div>
			<div style="width: 300px; height: 30px; background: rgb(182, 182, 78)">300</div>
			<div style="width: 300px; height: 30px; background: rgb(165, 96, 165)">300</div>
		</div>
		560px,压缩比为(1:1:3:3) x (1:1:1:1) = 1:1:3:3，每个子元素相应被压缩掉 30px、30px、90px、90px。
		<div class="container" style="width: 560px">
			<div style="width: 100px; height: 30px; background: gray">70</div>
			<div style="width: 100px; height: 30px; background: pink">70</div>
			<div style="width: 300px; height: 30px; background: rgb(182, 182, 78)">210</div>
			<div style="width: 300px; height: 30px; background: rgb(165, 96, 165)">210</div>
		</div>
	</main>
</template>
<script>
export default {
	data() {
		return {
			elements: Array.from({ length: 3 }).map((value, index) => index + 1),
		};
	},
};
</script>
<style scoped>
main {
	width: 100%;
	padding: 52px 17px 52px 29px;
}
.container {
	display: flex;
}

.item {
	width: 50%;
	height: 29px;
	background: #b4a078;
	border-radius: 5px;
	margin: 12px;
	margin-left: 0;
	color: white;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
