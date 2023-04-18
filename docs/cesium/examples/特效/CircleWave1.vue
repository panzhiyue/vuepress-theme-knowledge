<template>
	<div id="cesiumContainers"></div>
</template>
<script>
import CircleWave from '../../customCesium/material/CircleWave';
export default {
	data() {
		return {
			viewer: null,
		};
	},
	mounted() {
		let _this = this;
		Cesium.Ion.defaultAccessToken =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlNmZlMThiNC05MjZjLTRhMzQtYjk1NC04Mzk1OWUzNGQyNDYiLCJpZCI6MTE2NjEsInNjb3BlcyI6WyJhc2wiLCJhc3IiLCJhc3ciLCJnYyJdLCJpYXQiOjE1NTk1NTEwODh9.1sP9cG15Apatkf1x1g1_P_86wc3gFNOZM66XoWLUsxc';

		_this.viewer = new Cesium.Viewer('cesiumContainers', {
			animation: false,
			homeButton: false,
			fullscreenButton: false,
			geocoder: false,
			sceneModePicker: false,
			baseLayerPicker: false,
			timeline: false,
			infoBox: false,
			navigationHelpButton: false,
			selectionIndicator: false,
		});

		// 隐藏Cesium自身的logo
		_this.viewer._cesiumWidget._creditContainer.style.display = 'none';

		// 六边形扩散
		const hexagonSpread1 = new CircleWave(_this.viewer, 'hexagonSpred1');
		hexagonSpread1.add([120,28, 0], '#ff0000', 1000000, 7500);
	},
};
</script>
