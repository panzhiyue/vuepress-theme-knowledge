<template>
	<main class="main">
		<header>
			<h1>Site Header</h1>
		</header>
		<section>
			<input id="con-1" type="checkbox" checked />
			<label for="con-1"><b>Toggle contents</b></label>
			<p>
				A paragraph of filler text. La la la de dah de dah de dah de la.A paragraph of filler text.
				La la la de dah de dah de dah de la.A paragraph of filler text. La la la de dah de dah de
				dah de la.A paragraph of filler text. La la la de dah de dah de dah de la.A paragraph of
				filler text. La la la de dah de dah de dah de la.A paragraph of filler text. La la la de dah
				de dah de dah de la.
			</p>
			<p>
				A paragraph of filler text. La la la de dah de dah de dah de la.A paragraph of filler text.
				La la la de dah de dah de dah de la.A paragraph of filler text. La la la de dah de dah de
				dah de la.A paragraph of filler text. La la la de dah de dah de dah de la.A paragraph of
				filler text. La la la de dah de dah de dah de la.A paragraph of filler text. La la la de dah
				de dah de dah de la.A paragraph of filler text. La la la de dah de dah de dah de la.A
				paragraph of filler text.
			</p>
			<p>
				A paragraph of filler text. La la la de dah de dah de dah de la.A paragraph of filler text.
				La la la de dah de dah de dah de la.A paragraph of filler text. La la la de dah de dah de
				dah de la.A paragraph of filler text. La la la de dah de dah de dah de la.A paragraph of
				filler text. La la la de dah de dah de dah de la.A paragraph of filler text. La la la de dah
				de dah de dah de la.
			</p>
		</section>
		<footer>
			<p>© 2018 LHammer</p>
			<p>CSS Tricks need to know for web developer.</p>
		</footer>
	</main>
</template>
<script></script>
<style scoped>
main {
	width: 100%;
	height: 392px;
}

section input:checked ~ p {
	display: none;
}

header,
section,
footer {
	padding: 5px 5px;
	text-align: justify;
	hyphens: auto;
}

header {
	text-align: center;
	height: 54px;
}
section {
	box-sizing: border-box;
	min-height: calc(100% - 64px - 110px);
}

footer {
	color: white;
	background: #747e7f;
	height: 100px;
}
</style>
