```javascript
       var Fabric = {
                //类型
                type: 'OurMappedPlastic',
                //用于合并的材质
                materials: {
                    diffuseMaterial: {
                        type: 'DiffuseMap'
                    },
                    specularMaterial: {
                        type: 'SpecularMap'
                    }
                },
                //是一种输入参数变量,在这里定义的变量可以早GLSL中访问，也可以在后期修改
                uniform:{
                    arg1:null,
                    arg2:null
                },
                components: {
                    diffuse: "diffuseMaterial.diffuse", //材质的散射光通道
                    specular: "specularMaterial.specular", //材质的高光属性
                    shininess: 1.0,  //高光反射的锐度
                    //normal         //材质的法向属性
                    emission: 'vec3(0.0)',  //材质的自发光属性
                    alpha: 1.0  //材质的透明度。
                },
                source: "czm_material czm_getMaterial(czm_materialInput materialInput)\n\
                                {\n\
                                    czm_material material = czm_getDefaultMaterial(materialInput);\n\
                                    material.diffuse = color.rgb; \n\
                                    material.alpha = color.a; \n\
                                    return material;\n\
                                }"
            };

```