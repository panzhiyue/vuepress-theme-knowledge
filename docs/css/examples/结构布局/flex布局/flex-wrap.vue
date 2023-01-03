<template>
	<main>
		<span v-for="(radio, index) in radios">
			<input type="radio" :id="'flex-wrap-'+radio" :value="radio" v-model="wrap" /><label :for="'flex-wrap-'+radio">{{
				radio
			}}</label></span
		>
		<div class="container" :style="{ flexWrap: wrap }">
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
			elements: Array.from({ length: 6 }).map((value, index) => index + 1),
			radios: ['nowrap', 'wrap', 'wrap-reverse'],
			wrap: 'nowrap',
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
	line-height: 29px;
}
</style>
