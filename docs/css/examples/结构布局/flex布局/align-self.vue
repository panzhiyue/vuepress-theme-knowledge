<template>
	<main>
		<span v-for="(radio, index) in radios">
			<input type="radio" :id="'align-self-' + radio" :value="radio" v-model="alignSelf" /><label
				:for="'align-self-' + radio"
				>{{ radio }}</label
			></span
		>
		<div class="container">
			<div
				class="item"
				v-for="element in elements"
				:style="{ alignSelf: alignSelf, fontSize: 15 + 12 * element + 'px' }">
				{{ element }}
			</div>
		</div>
	</main>
</template>
<script>
export default {
	data() {
		return {
			elements: [3, 1, 5, 4, 2],
			radios: ['auto', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
			alignSelf: 'flex-start',
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
	height: 129px;
}

.item {
	width: 20%;
	min-height: 29px;
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
