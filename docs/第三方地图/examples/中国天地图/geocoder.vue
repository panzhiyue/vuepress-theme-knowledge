<template>
	<div>
		<div style="z-index: 9000">
			<input type="text" v-model="coorText" />
			<input type="text" v-model="address" />
			<input type="button" style="z-index: 1000" @click="geocoder" value="确定" />
		</div>
		<div id="mapContainer" ref="mapDom" style="position: relative; height: 400px; z-index: 0"></div>
	</div>
</template>

<script>
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XyzSource from 'ol/source/XYZ';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import { Point } from 'ol/geom';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';

export default {
	data() {
		return {
			address: '杭州市西湖区体育场路498号', //地址
			map: null, //地图实例
			tk: 'effe820039ecd2ea7e1e2f28f47fe29d',
			vectorLayer: null,
			coorText: '120,28',
			isCenter: false,
		};
	},
	computed: {
		coor() {
			if (this.coorText.includes(',')) {
				return [parseFloat(this.coorText.split(',')[0]), parseFloat(this.coorText.split(',')[1])];
			}
			return null;
		},
	},
	watch: {
		coor() {
			this.clearMarker();
			this.addMarker(this.coor[0], this.coor[1]);
			if (this.isCenter) {
				this.map.getView().setCenter(this.coor);
			}
		},
	},
	mounted() {
		this.map = new Map({
			target: this.$refs['mapDom'],
			controls: [],
			view: new View({
				zoom: 7, //级别
				center: [120, 28], //中心点
				projection: 'EPSG:4326', //坐标系
				maxZoom: 17,
			}),
		});

		//中国影像
		let layer1 = new TileLayer({
			source: new XyzSource({
				url: `http://t{0-3}.tianditu.gov.cn/img_c/wmts?layer=img&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk=${this.tk}`,
				projection: 'EPSG:4326',
			}),
			name: '中国影像',
		});
		//中国影像标注
		let layer2 = new TileLayer({
			source: new XyzSource({
				url: `http://t{0-3}.tianditu.gov.cn/cia_c/wmts?layer=cia&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk=${this.tk}`,
				projection: 'EPSG:4326',
			}),
			name: '中国影像标注',
		});

		this.map.addLayer(layer1);
		this.map.addLayer(layer2);

		this.vectorLayer = new VectorLayer({
			source: new VectorSource(),
		});
		this.map.addLayer(this.vectorLayer);

		this.map.on('singleclick', (evt) => {
			console.log(evt);
			let pixel = this.map.getEventPixel(evt.originalEvent);
			let coor = this.map.getCoordinateFromPixel(pixel);
			this.coorText = coor[0].toFixed(8) + ',' + coor[1].toFixed(8);
		});

		if (this.coor) {
			this.addMarker(this.coor[0], this.coor[1]);
			this.map.getView().fit(new Point(this.coor), {
				maxZoom: 12,
			});
		}
	},
	methods: {
		async geocoder() {
			const response = await fetch(
				`https://api.tianditu.gov.cn/geocoder?ds={"keyWord":"${this.address}"}&tk=${this.tk}`,
			);
			const body = await response.json();
			//查询成功
			if (body && body.msg == 'ok') {
				this.geocoder_callback(body);
			}
		},
		geocoder_callback(data) {
			//地理编码结果数组
			var geocode = data.location;
			// this.clearMarker();
			// this.addMarker(geocode.lon, geocode.lat);
			this.map.getView().fit(new Point([geocode.lon, geocode.lat]), {
				duration: 1500,
				maxZoom: 12,
			});
		},
		addMarker(lon, lat) {
			let feature = new Feature({
				geometry: new Point([lon, lat]),
			});
			feature.setStyle(
				new Style({
					image: new Icon({
						anchor: [0.5, 1], // 锚点 默认值为图片中心
						scale: 0.5,
						src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAA/CAYAAACM5Lr9AAAFkklEQVR42s3VaWxUVRjG8ddiEKPRxAQTCVSWLnZaWmjpTgulpYUBExP9Agou4IKAogUKAgItlNJCgUIXINFPfsFoDCjibkQRI0QIICAQWUpZugKtpcv0+DxyYqaTe2/vTLf58Etu7znnPf+0k44opQw5i5qsjIFs2APHoBZatFq+02vZeq94yyKs0dOjsAzOTCtuVtNKWtX0UpeaXqHU07tgt4ZnvuMa93Avz/CsniE2WIQV3iEaCDnQ8F/MTgZ4h2d4ljNgmZ4pFszDpmIRIuFP57YWDMcFu7uHMziLMyEKxJBl2MbbM6DZub2NQ3sUZ3K2vkMMGIdNKbi1ADqcZe1q2i7VKzibd8BCEE8GUQ3PQ4ez3KWcGNCbeAfv0neKm85hWRvqo+Hu1LJ2HuwTvAt3tkAciKbDIDO/7iE4l7X9rpqCA30pa3uLwt3nYRAIuIfV5mcWN6msnapf8G405IGQMGry+prB0DiloqPfwng3G3SLDltXnTt5S6PK3NnRr9jAFhDJyLsZAJcz8SGcjOr+xAa0XGGTpOfeSMrYUKcyKlx+gS1oSkbY9VXpm2+rjHKXX2ALm2TS2qq96duaVHp5u19gC5skbc3V05N23FWT8NIfsIVNkra6siGttE2llbX7h9JWhaZ6mfj+lfaJZW3Kn6DJJRNWXWqbgN+Y39jRqtDUKKkrL15PxfdjammrfyhpVmiqlNQVfx9KwX/cFJT6A7awSVLeu1CeUlinxu9o8QsphbUKTWUyfvn5Wcm511QSXvoDtrBJkpedewzaE/E58wdsYZMopSQ55+z+pKK6fo9KKqpXaDkAIgxLWnomK3H1JZVQ0tyv2ICW6XAvLHHJ6QD4K6GgRsVjQ3/g3WzQLffCKGHJqfHgisOXaNy2f/oU7+TdukGIUW5xJ0vic6+oWGzsS7yTd4NoncPiF594GC7FFlSrcVub+gTv4p36btE6h1Fc9nFn7IpzKmZrY5/gXbwTxI0O8xD77rGPYtZeVtE42Jt4B+8C8WAcNu6dPwZDzVh8PYzdcqdXcDbvgMdBPDHEOG7R0Xkxqy6oKAzpDZzNO0AMmIfFvH1kABwZk1epIotv9yjOxOyj+g4xYB4W/dbvlAAdozGsJ3Gmni0mzMPGLvyN6IMo/NojNt/qEZyFmR+CWLAIW3CYaDDUR+D/TTgGdwdncJaeKRbMw8bM/9XdosjlZ5VjU0O3cAZngXTBPCzqzV/cPQAXHeuqVBgu8IVj/TXFGXqWdME8LHLez55mRSw9qUI31fuEZzFjNogNFmFvHPQUACfC8IUbUlTvlbDcSsWzeobYYB42+vWfjDwbnn3c6zCewdnnQGwyD4t47UcjAXA2JO+qCi6ss4V7eUafFZuswn4wM8ex+LgKwqV2cC/OzAXxgnlY+KvfmxkIVaPyr6tRhbWWuId79RnxgnmYY+53VlaHLj2lRm6stRSSc0ph7xoQL1mEzfnWyhPQNrKgGgE1hrjGPTAExEvmYWGvfNOVPUErz6vhiDDCNez5GMQHVmFfd2Vq6MLD6smCGkNc4x4QH5iHPfXyV125H64NX1eFkOpO+I5reo/4wDws9KUDdhSPxFdNIGLc8R3XQHxkFfalHYnB8w6qYRuqO+E7roH4yDws5MX9dtwHlYF5lQi6qYjPfKfXxEcWYbO/sKtsBP50QxFFI/D/De8qQLrBPCwYizY9M2r+of/D+Mx3ID6zDJv1uaVwGfAIBDqGJsbhZ9eQ/BuK+OwYlhzPNe7hXh9Yhe0zwqBB4IAYouCZn1wIXH5GEZ/d1sjBMzzrBfOwoBf2GWFYBMS4C03JWRA087OaoBmf3uCz5zrP8Kx9lmF7jXiE2RbBs95ghB0MIo8/pS0OeJAzvOBLmKY//BAGURBN+jmMa3qPkLdh/wKOL8SpLbnYFgAAAABJRU5ErkJggg==',
					}),
				}),
			);
			this.vectorLayer.getSource().addFeature(feature);
		},
		clearMarker() {
			this.vectorLayer.getSource().clear();
		},
	},
};
</script>
