<template>
	<main>
		<span v-for="(radio, index) in radios">
			<input type="radio" :id="'align-content-' + radio" :value="radio" v-model="alignContent" /><label
				:for="'align-content-' + radio"
				>{{ radio }}</label
			></span
		>
		<div class="container" :style="{ alignContent: alignContent }">
			<div class="item" v-for="element in elements" >
				{{ element }}
			</div>
		</div>
	</main>
</template>
<script>
export default {
	data() {
		return {
			elements: Array.from({ length: 21 }).map((value, index) => index + 1),
			radios: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around'],
			alignContent: 'flex-start',
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
    height: 399px;
	display: flex;
	flex-direction: row;
    flex-wrap: wrap;
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
