<template>
	<main>
		<span v-for="(radio, index) in radios">
			<input type="radio" :id="'justify-content-'+radio" :value="radio" v-model="justifyContent" /><label :for="'justify-content-'+radio">{{
				radio
			}}</label></span
		>
		<div class="container" :style="{ justifyContent: justifyContent }">
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
			elements: Array.from({ length: 3 }).map((value, index) => index + 1),
			radios: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
			justifyContent: 'flex-start',
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
