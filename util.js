// 用到的数据集[userid, movieid, ranking]
var LineReader = require('line-by-line');
var fs = require('fs');
var rl = new LineReader('datas/ratings_test.dat');
rl.on('error', function(err){
  throw err
})
var lists = [];  // 用于存储初次处理数据
rl.on('line', function(line){
  rl.pause();
  var list = line.split('::');
  // 直接删除index的部分
  list.splice(3, 1);  // 去除timestamp项
  lists.push(list);
  if(list.length === 3){
    rl.resume();  // 是否继续的判断条件
  }
})
// 在onend中写处理逻辑
rl.on('end', function(){
  console.log('@ok!');
  // //console.log(lists);
  var m = get_data_key_item(lists);
  console.log(m.size);
  // console.log('end format data by item!');
  var n = get_data_key_user(lists);
  console.log(n.size);
  // console.log('end format data by user_id');
  // var averages = [];
  // console.log('begin compute');
  //buildAverageDiff(m, n, averages);
  //console.log('begin write in file');
  //fs.writeFileSync('average_get_rank.dat', JSON.stringify(averages));
  var averages = fs.readFileSync('average_get_rank.dat'); // buffer
  averages = JSON.parse(averages.toString());
  console.log(averages.length);
  averages = new Map(averages);
  // console.log(averages);
  var score = estimateRanking(n, m, averages, '2', '1687');
  console.log(score);
  console.log('@OK！end!');
})

// 现在我们获取到的数据都是以二维数组，元素为字符串，每一行为[user_id, film_id, rank]
// 现在需要做的是分别创建以item和user为key的数组保存每个用户的评分
/**
{
  item1: [[userid, rank], [userid, rank]]
  item2: [[userid, rank], [userid, rank]]
}
{
  userid_1: [[item1, rank],[ item2, rank]],
  userid_2: [[item2, rank],[ item2, rank]]
}
[userid, item_id, rank];
*/
// 构建以item为id的数据结构
function get_data_key_item(lists){
  var item_map = new Map();
  for(index in lists){
    if(!item_map.has(lists[index][1])){
      item_map.set(lists[index][1], [])
    }
  }
  for(list of lists){
    var data = item_map.get(list[1]);
    data.push([list[0], list[2]]);
    item_map.set(list[1], data)
  }
  return item_map;
}
// 第一步，通过读入数据得到的数据是[[user_id, movie_id, rank]]

// ratings.dat数据格式：UserID::MovieID::Rating::Timestamp，评分为0~5的整数



// 构建以user为key的数据结构
function get_data_key_user(lists){
  var user_map = new Map();
  for(index in lists){
    if(!user_map.has(lists[index][0])){
      user_map.set(lists[index][0], [])
    }
  }
  for(list of lists){
    var data = user_map.get(list[0]);
    data.push([list[1], list[2]]);
    user_map.set(list[0], data);
  }
  return user_map;
}
// 开始构建slope-one算法
// 1、计算两个物品之间的平均差
// {
//   item1: [[userid, rank], [userid, rank]]
//   item2: [[userid, rank], [userid, rank]]
// }
// {
//   userid_1: [[item1, rank],[ item2, rank]],
//   userid_2: [[item2, rank],[ item2, rank]]
// }
// averages 是一个字典
function buildAverageDiff(items, users, averages){
  for(var item1 of items.keys()){
    for(var item2 of items.keys()){
      var average = 0;
      var user_rank_all = 0; // 对两件商品都评过分的用户
      if(item1 !== item2){
        for(var user_id of users.keys()){
          var item_ranks = users.get(user_id); // 返回的是一个数组，每一个项的格式为['item','rank']
          var m = new Map(item_ranks); // 构建数据结构的时候本应该转成字典，这里才转
          if(m.has(item1) && m.has(item2)){ // 一个用户同时对这两电影评分
            user_rank_all++;
            average += (Number.parseInt(m.get(item1), 10)-Number.parseInt(m.get(item2, 10)));
          }
        }
        // 如果没有被两件商品都保存的话
        if(user_rank_all !==0){
        var key = item1+item2; // 字符串拼接用作字典的key
        averages.push([key, average/user_rank_all]);
        }
      }
    }
  }
}
// 传id的时候需要使用字符串
function numbers_who_rank_both(users, item1, item2){
  var count = 0;
  for(var [key,list] of users){
    var m = new Map(list);
    if(m.has(item1) && m.has(item2)){
      count ++;
    }
  }
  return count
}
// 预估某个用户对某个item的评分
function estimateRanking(users, items, averages, user_id, item_id){
  var rankingCount = 0;
  var total = 0;
  var averages_map = new Map(averages);
  for(var list of users.get(user_id)){
    var count = numbers_who_rank_both(users, list[0], item_id);
    var pab = averages_map.get(list[0]+item_id) || 0;
    if(pab == 0 ){
      continue;
    }
    total += (Number.parseInt(list[1]) - pab) * count;
    rankingCount += count;
  }
  if(rankingCount == 0){
    return 10;
  }
  return total / rankingCount;
}











