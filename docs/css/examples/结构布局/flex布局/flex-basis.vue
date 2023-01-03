<template>
	<main>
		<div class="container">
			<div class="item" v-for="element in elements" :style="{ flexBasis: element * 100 + 'px' }">
				index:{{ element }},flex-basis:{{ element * 100 + 'px' }}
			</div>
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
	width: 30%;
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
