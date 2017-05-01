// 实现k-means算法

var fileReader = require('line-by-line');
// 第一步，读取数据集
var rl = new fileReader('./irisNoLabel.data');
var lists = [];
rl.on('line', (line) => {
  var item = line.split(',');
  lists.push(item);
})
rl.on('end', ()=>{
  // do something
  var points = getRandonClusterPoint();
  var c, new_c;
  var n = 0;
  while(true){
    [points,c] = cluster(points);
    [points, new_c] = cluster(points);
    if(measureStopCondition(c, new_c)){
      console.log(new_c);
      break;
    }
    console.log(`已经进行了${++n}迭代！`);
  }


})
// 第二步，随机选取中心点,这里选择K=3，即聚成三类
// 由于有150条数据，我们可以每50条选择一个作为中心点
function getRandonClusterPoint(){
  var cluster_point = [];
  for(var i = 0; i < 3; i++){
    var index = Math.round(Math.random()*50);
    cluster_point.push(lists[index]);
  }
  return cluster_point;
}

// 第三步，计算与到中心点的距离，并且进行聚类
function cluster(points){
  var C = [];
  var c1 = [];
  var c2 = [];
  var c3 = [];
  for(var i = 0; i < lists.length; i++){
    var distances = [];
    for(var j = 0; j < points.length; j++){
      var a = Number.parseFloat(points[j][0]) - Number.parseFloat(lists[i][0]);
      var b = Number.parseFloat(points[j][1]) - Number.parseFloat(lists[i][1]);
      var c = Number.parseFloat(points[j][2]) - Number.parseFloat(lists[i][2]);
      var d = Number.parseFloat(points[j][3]) - Number.parseFloat(lists[i][3]);
      distances.push([j, Math.sqrt(a*a + b*b + c*c + d*d)]);
      // 进行逆序排序
    }
    distances.sort(function(a1, a2){
      return a1[1] > a2[1];
    })
    if(distances[0][0] === 0){
      c1.push(lists[i]);
    }else if(distances[0][0] === 1){
      c2.push(lists[i]);
    }else{
      c3.push(lists[i]);
    }
  }
  C.push(c1, c2, c3);
  var points = measureClusterPoint(C);
  return [points, C];
}

// 重新计算中心点
function measureClusterPoint(c_cluster){
  var points = [];
  for(var class_ of c_cluster){
    var a_ = 0;
    var b_ = 0;
    var c_ = 0;
    var d_ = 0;
    var length_ = class_.length;
    for(var item of class_){
      a_ += Number.parseFloat(item[0]);
      b_ += Number.parseFloat(item[1]);
      c_ += Number.parseFloat(item[2]);
      d_ += Number.parseFloat(item[3]);
    }
    points.push([(a_/length_).toFixed(2), (b_/length_).toFixed(2), (c_/length_).toFixed(2), (d_/length_).toFixed(2)]);
  }
  return points;
}

// 设置迭代终止条件, 当前后两次聚类后结果没有变化即可

function measureStopCondition(c, new_c){
  if(c[0].length !== new_c[0].length || c[1].length !== new_c[1].length ||c[2].length !== new_c[2].length){
    return false;
  }else{
    for(var item of c[0]){
      if(new_c[0].indexOf(item) === -1){
        return false;
      }
    }
    for(var item of c[1]){
      if(new_c[1].indexOf(item) === -1){
        return false;
      }
    }
    for(var item of c[2]){
      if(new_c[2].indexOf(item) === -1){
        return false;
      }
    }
  }
  return true;
}







