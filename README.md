# ranking-forcast
slope one算法的简单实现，用于预估用户电影评分。
其中util.js是实现程序，datas中放置数据集。

新增：为了提升运行速度，我把中间结果进行了固化，也就是存入了文件。
并且为了让结果更容易展示出来，这里使用了canvas进行了简单的绘制。


# 运行

git clone git@github.com:xiaomoer/ranking-forcast.git

cnpm install 

node util.js

node server.js 打开服务器

在浏览器中打开index.html即可看到绘制的图像。

# 新增一个分类算法和聚类算法

在DM目录下：
knn.js 是KNN算法的实现，使用的数据集为knn.data.txt（数据规模150条）
kmeans.js 是K-means聚类算法的实现，使用数据集为knn算法数据集的去标签数据集为irisNoLabel.dat

## 运行

node xx.js

### 代码实现很随意，如有任何见解请指教。

