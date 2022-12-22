<template>
	<main>
		<section>
			<span class="left">
				<div v-for="(ele, index) in elements" @click="handleClick" class="item">{{ symbol }}</div>
			</span>
			<span class="center"> 垂直居中<br />垂直居中 垂直居中 </span>
			<span class="right"> 垂直居中 </span>
		</section>
	</main>
</template>
<script>
export default {
	data() {
		return {
			elements: Array(2).fill(1),
			symbol: '➕',
		};
	},
	methods: {
		handleClick() {
			this.elements.length == 2
				? ((_) => {
						this.elements.push(1);
						this.symbol = '➖';
				  })()
				: ((_) => {
						this.elements.pop();
						this.symbol = '➕';
				  })();
		},
	},
};
</script>
<style scoped>
* {
	box-sizing: border-box;
}
main {
	width: 100%;
	padding: 39px 29px;
	font-size: 12px;
}
section {
	width: 100%;
	box-shadow: 0 0 0 1px #eee;
	overflow: hidden;
}
section > span {
	width: 20%;
	display: inline-block;
	vertical-align: middle;
	margin-left: -3px;
	padding-left: 12px;
}

section::after {
	content: '';
	display: inline-block;
	height: 100%;
	vertical-align: middle;
}
.left {
	width: 45%;
	margin-left: 0;
	padding: 12px;
}
.center {
	width: 35%;
	border: 1px solid #eee;
	padding-top: 999px;
	padding-bottom: 999px;
	margin-top: -999px;
	margin-bottom: -999px;
	position: relative;
}
.left .item {
	width: 100%;
	height: 85px;
	text-align: center;
	line-height: 85px;
	background: rgba(180, 160, 120, 0.1);
	position: relative;
}

.left .item:not(:first-child) {
	margin-top: 24px;
}
.left .item:not(:first-child)::before {
	content: '';
	position: absolute;
	top: -12px;
	right: -12px;
	left: -12px;
	border-top: 1px solid #eee;
}
</style>
