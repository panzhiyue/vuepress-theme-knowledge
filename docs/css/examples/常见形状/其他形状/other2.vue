<template>
	<div class="pixel-spinner">
		<div class="pixel-spinner-inner"></div>
	</div>
</template>
<script>
export default {
	data() {
		return {};
	},
};
</script>
<style scoped>
.pixel-spinner,
.pixel-spinner * {
	box-sizing: border-box;
}

.pixel-spinner {
	height: 70px;
	width: 70px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}

.pixel-spinner .pixel-spinner-inner {
	width: calc(70px / 7);
	height: calc(70px / 7);
	background-color: #ff1d5e;
	color: #ff1d5e;
	box-shadow: 15px 15px  0 0,
                  -15px -15px  0 0,
                  15px -15px  0 0,
                  -15px 15px  0 0,
                  0 15px  0 0,
                  15px 0  0 0,
                  -15px 0  0 0,
                  0 -15px 0 0;
}

</style>
