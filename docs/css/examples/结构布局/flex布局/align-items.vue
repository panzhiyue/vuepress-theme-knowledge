<template>
	<main>
		<span v-for="(radio, index) in radios">
			<input type="radio" :id="'align-items-' + radio" :value="radio" v-model="alignItems" /><label
				:for="'align-items-' + radio"
				>{{ radio }}</label
			></span
		>
		<div class="container" :style="{ alignItems: alignItems }">
			<div class="item" v-for="element in elements" :style="{ height: 16 * element + 'px' }">
				{{ element }}
			</div>
		</div>
	</main>
</template>
<script>
export default {
	data() {
		return {
			elements: Array.from({ length: 5 }).map((value, index) => index + 1),
			radios: ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
			alignItems: 'flex-start',
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
	flex-direction: row;
}

.item {
	width: 20%;
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
