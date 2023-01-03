<template>
	<main>
		<span v-for="(radio, index) in radios">
			<input type="radio" :id="'flex-directio'+radio" :value="radio" v-model="direction" /><label :for="'flex-directio'+radio">{{
				radio
			}}</label></span
		>
		<div class="container" :style="{ flexDirection: direction }">
			<div class="item" v-for="element in elements">
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
			radios: ['row', 'row-reverse', 'column', 'column-reverse'],
			direction: 'row',
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
	width: 20%;
	height: 29px;
	background: #b4a078;
	border-radius: 5px;
	margin: 12px;
	margin-left: 0;
	color: white;
	text-align: center;
    line-height:29px;
}
</style>
