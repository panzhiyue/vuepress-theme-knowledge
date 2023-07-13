<template>
	<div>
		<input type="file" multiple @change="handleChange" />
		<div>{{ result }}</div>
	</div>
</template>
<script>
import * as format from 'ol/format';
import * as utilsol from '@gis-js/utilsol';
import * as proj from 'ol/proj';
export default {
	data() {
		return {
			input: '',
			output: '',
			btnText: '<=',
			result: null,
		};
	},
	methods: {
		handleChange(event) {
			let files = event.target.files;
			this.readFile(files).then((result) => {
				this.result = result;
			});
		},
		/**
		 * 解析文件
		 * @param {*} files 文件列表
		 * @returns {Object} {sueecss:Boolean,msg:String}
		 */
		readFile(files) {
			let result = {
				success: false,
				msg: '',
			};
			return new Promise((resolve) => {
				if (files.length === 0) {
					result.msg = '文件数量为0';
					resolve(result);
					return;
				} else if (files.length === 1) {
					let file = files[0];
					//文件后缀
					var suffix = file.name.substring(file.name.lastIndexOf('.') + 1); //txt
					let reader = new FileReader();
					reader.onload = (evt) => {
						try {
							let text = evt.target.result;
							let f = null;
							switch (suffix) {
								case 'wkt': {
									f = new format.WKT();
									break;
								}
								case 'geojson': {
									f = new format.GeoJSON();
									break;
								}
								case 'topojson': {
									f = new format.TopoJSON();
									break;
								}
								case 'kml': {
									f = new format.KML();
									break;
								}
								default: {
									result.msg = `未知的文件后缀${suffix}`;
									resolve(result);
									return;
								}
							}

							let features = f.readFeatures(text);

							let err = this.checkFeatures(features);
							if (err) {
								result.msg = err;
								resolve(result);
								return;
							}
							let feature = features[0];
							let wkt = new format.WKT().writeGeometry(feature.getGeometry());
							result.msg = wkt;
							result.success = true;
							resolve(result);
							return;
						} catch (err) {
							result.msg = err;
							resolve(result);
						}
					};
					reader.readAsText(file);
				} else {
					//只有选择了shp文件才会加载
					let shpFileNames = [];
					let fileNames = [];
					for (let i = 0; i < files.length; i++) {
						let file = files[i];
						let name = file.name;
						let index = name.lastIndexOf('.');
						let fileName = name.substring(0, index);
						let ext = name.substring(index + 1);
						if (ext == 'shp') {
							shpFileNames.push(fileName);
						}
						fileNames.push(name);
					}
					//选择的文件中没有shp文件
					if (shpFileNames.length !== 1) {
						result.msg = `shp文件数量有且只能为1，实际为${shpFileNames.length}`;
						resolve(result);
						return;
					}
					let shpFileName = shpFileNames[0];
					if (!fileNames.includes(shpFileName + '.prj')) {
						result.msg = `缺少文件${shpFileName + '.prj'}(shp格式必须包含.shp、.prj、.dbf、.shx文件)`;
						resolve(result);
						return;
					}
					if (!fileNames.includes(shpFileName + '.dbf')) {
						result.msg = `缺少文件${shpFileName + '.dbf'}(shp格式必须包含.shp、.prj、.dbf、.shx文件)`;
						resolve(result);
						return;
					}
					if (!fileNames.includes(shpFileName + '.shx')) {
						result.msg = `缺少文件${shpFileName + '.shx'}(shp格式必须包含.shp、.prj、.dbf、.shx文件)`;
						resolve(result);
						return;
					}

					//传入多个文件，则按shp文件解析
					var eShapeFile = new utilsol.EShapeFile({
						projection: proj.get('EPSG:4326'),
					});

					eShapeFile.on('loaded', () => {
						try {
							var features = eShapeFile.getFeatures();
							let err = this.checkFeatures(features);
							if (err) {
								result.msg = err;
								resolve(result);
								return;
							}
							let feature = features[0];
							let wkt = new format.WKT().writeGeometry(feature.getGeometry());
							result.msg = wkt;
							result.success = true;
							resolve(result);
							return;
						} catch (err) {
							result.msg = err;
							resolve(result);
						}
					});
					eShapeFile.on('error', (error) => {
						result.msg = error.message;
						resolve(result);
						return;
					});
					try {
						eShapeFile.readFile(files);
					} catch (err) {
						result.msg = err;
						resolve(result);
					}
				}
			});
		},
		/**
		 * 检验解析出来的features数据是否正确
		 * @param {*} features 解析出的feature数组
		 * @returns 错误信息，为Null表示无误
		 */
		checkFeatures(features) {
			if (features.length != 1) {
				return `有且只能包含1个几何图形，实际数量为${features.length}个`;
			}
			let feature = features[0];
			let type = feature.getGeometry().getType();
			if (type != 'Polygon' && type != 'MultiPolygon') {
				return `有且只能上传面几何，实际几何类型为${type}`;
			}
			let coor = feature.getGeometry().getFirstCoordinate();
			if (coor[0] <= -180 || coor[0] >= 180 || coor[1] <= -90 || coor[1] >= 90) {
				return `坐标超出范围，必须是China Geodetic Coordinate System 2000（EPSG：4490）坐标系`;
			}
			return null;
		},
	},
};
</script>
