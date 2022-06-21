1.使用`export default class className`会导致命名空间说明被覆盖,出现2个类说明,需要改为`class className;export default className;`

2.使用`export const fun=function(){}`的方式生成`api`时作为属性,改为`export function fun`