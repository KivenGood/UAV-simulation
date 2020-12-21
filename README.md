1 安装node.js环境。

2 下载离线地图包。

3 在\Apps\Sandcastle\plane.html中配置离线地图地址。

4 在cesium-min文件夹下进命令行使用：npm install 下载包，然后使用npm start启动。

项目支持两种模式飞行模拟：1.手动控制,使用plane.html。2.通过读取数据库经纬度自动飞行，使用plane1.html，但需要提前配置好数据库，项目数据库名为sheet2，读取sql下sheet1.sql。

状态页面除map.heml使用百度地图无法离线外，其余都可离线使用。

关于离线地图资源：

支持离线地图，但需要自行下载地图瓦片，瓦片支持精度分级。
这个资源的选择需要多考虑，百度、高德、bing、天地图和谷歌几家各有优劣，不同省份的地图支持各不相同，可能需要多下载几家试试，瓦片首先通过乐天太乐地图下载，然后通过CesiumLab切片成瓦片。

附中国地图和海南地图制作好的地图瓦片：

链接：https://pan.baidu.com/s/1WeTSd5OJbZ9Tx1BDndW-oQ 
提取码：uk50 

项目预览：

无人机飞行时动图：

![7](https://gitee.com/KivenGood/uav-simulation/raw/master/image/7.gif)

Cesium中自带飞机模型：

![9](https://gitee.com/KivenGood/uav-simulation/raw/master/image/9.gif)

![1](https://gitee.com/KivenGood/uav-simulation/raw/master/image/1.png)

![8](https://gitee.com/KivenGood/uav-simulation/raw/master/image/8.png)

主页启动图片：

![2](https://gitee.com/KivenGood/uav-simulation/raw/master/image/2.png)

![3](https://gitee.com/KivenGood/uav-simulation/raw/master/image/3.png)

无人机状态显示：

![4](https://gitee.com/KivenGood/uav-simulation/raw/master/image/4.png)

![5](https://gitee.com/KivenGood/uav-simulation/raw/master/image/5.png)

![6](https://gitee.com/KivenGood/uav-simulation/raw/master/image/6.png)

