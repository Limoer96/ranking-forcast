// 实现最简单的KNN算法
// 采用的是经典的iris数据集，对鸢尾花进行分类 数据集大小为50条，特征数为4

// 第一步，从文件中读取数据
var lineReader = require('line-by-line');
var fs = require('fs');
var rl = new lineReader('./knn.data.txt');
// 构造样本集

// 参数k 代表KNN中的参数k
var SimpleList = function(k){
  this.simples = [];
  this.k = k;
  this.distances = new Map();
}
SimpleList.prototype.add = function(simple){
  this.simples.push(simple);
}

SimpleList.prototype.measureDistences = function(testSimple){
  for(simple of this.simples){
    var a = Number.parseFloat(testSimple[0]) - Number.parseFloat(simple[0]);
    var b = Number.parseFloat(testSimple[1]) - Number.parseFloat(simple[1]);
    var c = Number.parseFloat(testSimple[2]) - Number.parseFloat(simple[2]);
    var d = Number.parseFloat(testSimple[3]) - Number.parseFloat(simple[3]);
    var distance = Math.sqrt(a*a + b*b + c*c + d*d);
    this.distances.set(distance, simple[4]);
  }
}

SimpleList.prototype.measureClass = function(){
  var scores = [];
  for(var score of this.distances.keys()){
    scores.push(score);
  }
  scores.sort();
  var m = 0;
  var n = 0;
  var p = 0;
  for(var i = 0; i < this.k; i ++){
    switch (this.distances.get(scores[i])) {
      case 'Iris-setosa':
        m++;
        break;
      case 'Iris-versicolor':
        n++;
        break;
      case 'Iris-virginica':
        p++;
        break;
      default:
        break;
    }
  }
  if(m > n && m >p){
    console.log('Iris-setosa');
  }else if(n > m && n > p){
    console.log('Iris-versicolor');
  }else if(p > m && p > n){
    console.log('Iris-virginica');
  }else{
    console.log('other situation');
  }
}

var lists = [];
console.log('start');
rl.on('line', (line) => {
  var list = line.split(',');
  lists.push(list);
})
console.log('compute');
var testSimple = [5.9, 3.0, 5.1, 1.8];
var testSimple2 = [6.1, 2.8, 4.1, 7.2];
var testSimple3 = [4.6, 3.4, 1.4, 0.3];
rl.on('end', ()=>{
  var set = new SimpleList(5);
  for(var item of lists){
    set.add(item);
  }
  set.measureDistences(testSimple3);
  set.measureClass();

})
// 5.9,3.0,5.1,1.8,Iris-virginica
// 6.7,3.0,5.0,1.7,Iris-versicolor

  


