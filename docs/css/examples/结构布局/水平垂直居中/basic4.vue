<template>
	<main><span>Center me,please!</span></main>
</template>
<script></script>
<style scoped>
main {
	width: 100%;
	min-height: 152px;
	position: relative;
}

main > span {
	position: absolute;
	top: calc(50% - 16px);
	left: calc(50% - 72px);

	background: #b4a078;
	color: white;

	padding: 0.3em 1em 0.5em;
	border-radius: 3px;
	box-shadow: 0 0 0.5em #b4a078;
}
</style>
