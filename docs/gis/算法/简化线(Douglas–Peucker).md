

# GIS算法-简化线(Douglas–Peucker)

https://www.cnblogs.com/pygisxss/p/13440426.html

## 简介

道格拉斯-普克算法(Douglas–Peucker algorithm，亦称为拉默-道格拉斯-普克算法、迭代适应点算法、分裂与合并算法)是将曲线近似表示为一系列点，并减少点的数量的一种[算法](https://baike.baidu.com/item/算法)。该算法的原始类型分别由乌尔斯·拉默（Urs Ramer）于1972年以及大卫·道格拉斯（David Douglas）和托马斯·普克（Thomas Peucker）于1973年提出，并在之后的数十年中由其他学者予以完善。

算法的基本思路是:对每一条曲线的首末点虚连一条直线,求所有点与直线的距离,并找出最大距离值*d*max ,用*d*max与限差*D*相比:若*d*max <*D*,这条曲线上的中间点全部舍去;若*d*max ≥*D*,保留*d*max 对应的坐标点,并以该点为界,把曲线分为两部分,对这两部分重复使用该方法。

![img](https://pzy-images.oss-cn-hangzhou.aliyuncs.com/img/202205261338599.png)

 

 

简单来讲，其实就是一种压缩算法，对线要素进行压缩，是一个重复的以直代曲的过程。

## 算法代码

```javascript
        /**
         * Douglas-Peucker简化算法
         * @see http://en.wikipedia.org/wiki/Douglas-Peucker_algorithm
         * @param {Array.<L/Point>} points 点集合
         * @param {boolean} sqTolerance 容差的平方
         * @return {Array.<L/Point>} 简化后点集
         */
        function _simplifyDP(points, sqTolerance) {

            //创建与原始数组等长的新数组
            var len = points.length,
                ArrayConstructor = typeof Uint8Array !== undefined + '' ? Uint8Array : Array,
                markers = new ArrayConstructor(len);
            //设置第一个点为true
            markers[0] = markers[len - 1] = 1;
            //简化
            _simplifyDPStep(points, markers, sqTolerance, 0, len - 1);

            var i,
                newPoints = [];
            //把简化结果转为点集
            for (i = 0; i < len; i++) {
                if (markers[i]) {
                    newPoints.push(points[i]);
                }
            }

            return newPoints;
        }


        /**
         * 实际Douglas-Peucker简化代码
         * @param {Array.<Point>} points 点集
         * @param {Array.<0|1>|Uint8Array.<0|1>} markers 简化结果数组,0表示舍弃,1表示保留
         * @param {Number} sqTolerance 容差的平方
         * @param {Number} first 起始索引
         * @param {Number} last 终止索引
         */
        function _simplifyDPStep(points, markers, sqTolerance, first, last) {

            //最大距离平方
            var maxSqDist = 0,
                index, i, sqDist;

            for (i = first + 1; i <= last - 1; i++) {
                //点与首位点线段的距离平方
                sqDist = _sqClosestPointOnSegment(points[i], points[first], points[last], true);

                //设置与首位点线段距离平方最大的值与索引号
                if (sqDist > maxSqDist) {
                    index = i;
                    maxSqDist = sqDist;
                }
            }
            //大于指定容差,则设置该点保留
            if (maxSqDist > sqTolerance) {
                markers[index] = 1;
                //继续求算其他点
                _simplifyDPStep(points, markers, sqTolerance, first, index);
                //重新求算其他点与当前点与最后点组成线段的距离容差是否大于容差平方
                _simplifyDPStep(points, markers, sqTolerance, index, last);
            }
        }


        /**
         * @private
         * 返回点p到线段p1,p2的最近距离
         * @param {Point} p  求算点
         * @param {Point} p1 求算线段点1
         * @param {Point} p2 求算线段点2
         * @param {boolean} sqDist true表示求算距离,false表示求算点
         * @return {Number} 线段p1,p2上距离p最近距离
         */
        function _sqClosestPointOnSegment(p, p1, p2, sqDist) {
            var x = p1[0],
                y = p1[1],
                dx = p2[0] - x,
                dy = p2[1] - y,
                dot = dx * dx + dy * dy,
                t;

            if (dot > 0) {
                t = ((p[0] - x) * dx + (p[1] - y) * dy) / dot;

                if (t > 1) {
                    x = p2[0];
                    y = p2[1];
                } else if (t > 0) {
                    x += dx * t;
                    y += dy * t;
                }
            }

            dx = p[0] - x;
            dy = p[1] - y;

            return dx * dx + dy * dy;
        }
```

## 示例代码

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GIS算法-简化线(Douglas–Peucker)</title>
    <style>
        html,
        body,
        #main {
            width: 100%;
            height: 100%;
            padding: 0px;
            margin: 0px;
        }
    </style>
</head>

<body>
    <div id="main">
        <div style="width:200px;height:400px;float:right;background:#ddd;">
            容差:<input id="txtSeq" type="text" value="6">
            <input id="btnReDraw" type="button" value="重新计算" onclick="redraw()">
            <br>
            原有点数:
            <label id="originPointCount"></label>
            <br>
            现有点数:
            <label id="destPointCount"></label>
        </div>
        <div style="float:left;">


            <canvas id="canvas1" width="500" height="300">

            </canvas>
            <br>
            <div>道格拉斯算法结果:</div>
            <canvas id="canvas2" width="500" height="300">

            </canvas>
        </div>

    </div>
    <script>
        var str = "103 23,104 54,127 59,149 58,154 48,154 30,165 22,187 27,174 51,177 60,195 58,198 47,209 30,217 28,254 25,262 46,254 54,269 57,310 56,317 44,318 28,340 25,359 40,359 55,385 64,404 51,404 34,439 33,430 76";
        var points = str.split(",");
        for (var i = 0; i < points.length; i++) {
            points[i] = [parseFloat(points[i].split(" ")[0]), parseFloat(points[i].split(" ")[1])];
        }

        var canvas1 = document.getElementById("canvas1");
        var ctx1 = canvas1.getContext("2d");

        var canvas2 = document.getElementById("canvas2");
        var ctx2 = canvas2.getContext("2d");

        drawLine(ctx1, points, false);
        drawPoints(ctx1, points);

        redraw();

        function redraw() {
            var seq = parseFloat(document.getElementById("txtSeq").value);
            var points2 = _simplifyDP(points, seq * seq);

            ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

            drawLine(ctx2, points2, false);
            drawPoints(ctx2, points2);

            document.getElementById("originPointCount").innerHTML = points.length;
            document.getElementById("destPointCount").innerHTML = points2.length;

            //显示被简化的点
            var simplePoints = [];
            var isHave;
            for (var i = 0; i < points.length; i++) {
                isHave = false;
                for (var j = 0; j < points2.length; j++) {
                    if (points[i][0] == points2[j][0] && points[i][1] == points2[j][1]) {
                        isHave = true;
                        break;
                    }
                }
                if (!isHave) {
                    simplePoints.push(points[i]);
                }
            }
            drawPoints(ctx2, simplePoints,"#ff0000");
        }


        /**
         * 绘制线
         * @param {HTMLElement} ctx canvas的二维对象
         * @param {Array.<Array.<number>>} points 点集
         * @param {boolean} close 是否闭合
         */
        function drawLine(ctx, points, close) {
            for (var i = 0; i < points.length; i++) {
                ctx[i ? "lineTo" : "moveTo"](points[i][0], points[i][1]);
            }
            if (close) {
                ctx.closePath();
            }
            ctx.stroke();
        }

        function drawPoints(ctx, points, color = "#000") {
            for (var i = 0; i < points.length; i++) {
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(points[i][0], points[i][1], 3, 0, 2 * Math.PI);
                ctx.closePath();

                ctx.fill();
            }
        }



        /**
         * Douglas-Peucker简化算法
         * @see http://en.wikipedia.org/wiki/Douglas-Peucker_algorithm
         * @param {Array.<L/Point>} points 点集合
         * @param {boolean} sqTolerance 容差的平方
         * @return {Array.<L/Point>} 简化后点集
         */
        function _simplifyDP(points, sqTolerance) {

            //创建与原始数组等长的新数组
            var len = points.length,
                ArrayConstructor = typeof Uint8Array !== undefined + '' ? Uint8Array : Array,
                markers = new ArrayConstructor(len);
            //设置第一个点为true
            markers[0] = markers[len - 1] = 1;
            //简化
            _simplifyDPStep(points, markers, sqTolerance, 0, len - 1);

            var i,
                newPoints = [];
            //把简化结果转为点集
            for (i = 0; i < len; i++) {
                if (markers[i]) {
                    newPoints.push(points[i]);
                }
            }

            return newPoints;
        }


        /**
         * 实际Douglas-Peucker简化代码
         * @param {Array.<Point>} points 点集
         * @param {Array.<0|1>|Uint8Array.<0|1>} markers 简化结果数组,0表示舍弃,1表示保留
         * @param {Number} sqTolerance 容差的平方
         * @param {Number} first 起始索引
         * @param {Number} last 终止索引
         */
        function _simplifyDPStep(points, markers, sqTolerance, first, last) {

            //最大距离平方
            var maxSqDist = 0,
                index, i, sqDist;

            for (i = first + 1; i <= last - 1; i++) {
                //点与首位点线段的距离平方
                sqDist = _sqClosestPointOnSegment(points[i], points[first], points[last], true);

                //设置与首位点线段距离平方最大的值与索引号
                if (sqDist > maxSqDist) {
                    index = i;
                    maxSqDist = sqDist;
                }
            }
            //大于指定容差,则设置该点保留
            if (maxSqDist > sqTolerance) {
                markers[index] = 1;
                //继续求算其他点
                _simplifyDPStep(points, markers, sqTolerance, first, index);
                //重新求算其他点与当前点与最后点组成线段的距离容差是否大于容差平方
                _simplifyDPStep(points, markers, sqTolerance, index, last);
            }
        }


        /**
         * @private
         * 返回点p到线段p1,p2的最近距离
         * @param {Point} p  求算点
         * @param {Point} p1 求算线段点1
         * @param {Point} p2 求算线段点2
         * @param {boolean} sqDist true表示求算距离,false表示求算点
         * @return {Number} 线段p1,p2上距离p最近距离
         */
        function _sqClosestPointOnSegment(p, p1, p2, sqDist) {
            var x = p1[0],
                y = p1[1],
                dx = p2[0] - x,
                dy = p2[1] - y,
                dot = dx * dx + dy * dy,
                t;

            if (dot > 0) {
                t = ((p[0] - x) * dx + (p[1] - y) * dy) / dot;

                if (t > 1) {
                    x = p2[0];
                    y = p2[1];
                } else if (t > 0) {
                    x += dx * t;
                    y += dy * t;
                }
            }

            dx = p[0] - x;
            dy = p[1] - y;

            return dx * dx + dy * dy;
        }
    </script>
</body>

</html>
```

## 源码地址

链接：https://pan.baidu.com/s/1JeV0uZQa6buKBBxyktDKAQ 
提取码：13gh