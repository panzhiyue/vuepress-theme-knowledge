<template>
	<main><span>Center me,please!</span></main>
</template>
<script></script>
<style scoped>
main {
	width: 100%;
	height: 152px;
	text-align: center;
}
main::after {
	content: '';
	display: inline-block;
	height: 100%;
	vertical-align: middle;
}

main > span {
	background: #b4a078;
	color: white;
	padding: 0.3em 1em 0.5em;
	border-radius: 3px;
	box-shadow: 0 0 0.5em #b4a078;
}
</style>
