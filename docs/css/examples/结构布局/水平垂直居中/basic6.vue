<template>
	<main>
		<div><span>Center me,please!</span></div>
	</main>
</template>
<script></script>
<style scoped>
main {
	width: 100%;
	min-height: 152px;
	display: table;
}
main > div {
	display: table-cell;
	text-align: center;
	vertical-align: middle;
}
main > div > span {
	width: 50%;
	background: #b4a078;
	color: white;
	padding: 0.3em 1em 0.5em;
	border-radius: 3px;
	box-shadow: 0 0 0.5em #b4a078;
}
</style>
