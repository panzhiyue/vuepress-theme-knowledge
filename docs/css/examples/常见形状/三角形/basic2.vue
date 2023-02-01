<template>
	<main>
		<div class="triangle1"></div>
	</main>
</template>
<script></script>
<style scoped>
main {
}
.triangle1 {
	width: 0;
	height: 0;
	border-style: solid;
	border-top-width: 0;
	border-bottom-width: 50px;
	border-left-width: 50px;
	border-right-width: 50px;
	border-bottom-color: #d9534f;
	border-left-color: transparent;
	border-right-color: transparent;
	/* border-width: 0 50px 50px; */
	/* border-color: transparent transparent #d9534f; */
	position: relative;
}

.triangle1::after {
	content: '';
	border-style: solid;
	border-top-width: 0;
	border-bottom-width: 40px;
	border-left-width: 40px;
	border-right-width: 40px;
	border-bottom-color: white;
	border-left-color: transparent;
	border-right-color: transparent;
	position: absolute;
	left: -40px;
	top:6px;
}
</style>
