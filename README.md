<p align="center">
	<strong>UAV-simulation</strong>
</p>
<p align="center">
	<strong>一个运行在游览器上的基于Cesium的飞行模拟程序。</strong>
</p>
<p align="center">
	<a target="_blank" href="http://www.gnu.org/licenses/gpl-3.0.html">
		<img src="https://img.shields.io/github/license/KivenGood/UAV-simulation" />
	</a>
	<a target="_blank" href='https://gitee.com/KivenGood/uav-simulation'>
		<img src='https://img.shields.io/badge/gitee-UVA--simulation-red' alt='star'/>
	</a>
	<a target="_blank" href='https://github.com/KivenGood/UAV-simulation'>
		<img src="https://img.shields.io/badge/github-UVA--simulation-brightgreen" alt="github star"/>
	</a>
	<a target="_blank" href='https://github.com/CesiumGS/cesium'>
		<img src="https://img.shields.io/badge/Cesium-1.6-brightgreen" alt="cesium"/>
	</a>
	<a target="_blank" href='https://github.com/nodejs/node'>
		<img src="https://img.shields.io/badge/Node.js-10.16-brightgreen" alt="node"/>
	</a>
		<a target="_blank" href='https://www.npmjs.com/'>
		<img src="https://img.shields.io/badge/npm-6.9-orange" alt="cesium"/>
	</a>
</p>

## 1.项目预览：

1.1 无人机飞行时动图：

![7](https://upload-images.jianshu.io/upload_images/20355374-2af8d969bccb07ee.gif)


1.2 Cesium中自带飞机模型：

![9](https://upload-images.jianshu.io/upload_images/20355374-b11273cb970755d6.gif)

![1](https://upload-images.jianshu.io/upload_images/20355374-9646dff88067d998.png)

![8](https://upload-images.jianshu.io/upload_images/20355374-859343c2c9b09298.png)


1.3 主页启动图片：

![2](https://upload-images.jianshu.io/upload_images/20355374-859343c2c9b09298.png)

![3](https://upload-images.jianshu.io/upload_images/20355374-6a0502527f0eb971.png)


1.4 无人机状态显示：

![4](https://upload-images.jianshu.io/upload_images/20355374-027d41c96832cad7.png)

![5](https://upload-images.jianshu.io/upload_images/20355374-b479cd46e6e64a74.png)

![6](https://upload-images.jianshu.io/upload_images/20355374-a6f35ea7d94361da.png)


## 2.安装
2.1 安装node.js环境。

2.2 下载离线地图包。

2.3 在sourceConfig.js中配置离线地图地址。

2.4 在cesium-min文件夹下进命令行使用：npm install 下载包，然后使用npm start启动。

项目支持两种模式飞行模拟：1.手动控制,使用plane.html。2.通过读取数据库经纬度自动飞行，使用plane1.html，但需要提前配置好数据库，项目数据库名为sheet2，读取sql下sheet1.sql。

状态页面除map.heml使用百度地图无法离线外，其余都可离线使用。


## 3.关于离线地图资源：

支持离线地图，但需要自行下载地图瓦片，瓦片支持精度分级。
这个资源的选择需要多考虑，百度、高德、bing、天地图和谷歌几家各有优劣，不同省份的地图支持各不相同，可能需要多下载几家试试，瓦片首先通过乐天太乐地图下载，然后通过CesiumLab切片成瓦片。

附中国地图和海南地图制作好的地图瓦片：

链接：https://pan.baidu.com/s/1WeTSd5OJbZ9Tx1BDndW-oQ 
提取码：uk50 


## 4.关于更换飞机模型：
更换模型，可以通过[sketchfab](https://sketchfab.com/)网站下载免费的gltf文件，也可以自己制作飞机模型。

