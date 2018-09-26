var myChart = echarts.init(document.getElementById('main'), 'vintage');
//var data_original = document.getElementById('data').value;
// var data_array_x = new Array();
// var data_array_y = new Array();
//var data_modify = data_original.split(" ")

// console.log(data_original);
var mapData = `{ "type": "FeatureCollection", "features": [ { "type": "Feature", "properties": {}, "geometry": { "type": "Polygon", "coordinates": [ [ [ 0, -0 ], [ 9, -0 ], [ 9, -20 ], [ 0, -20 ], [ 0, -0 ], [ 0, -0 ] ] ] } }, { "type": "Feature", "properties": {}, "geometry": { "type": "Polygon", "coordinates": [[ [ 9, -9 ], [ 7.4, -9 ], [ 7.4, -9.35 ], [ 9, -9.35 ], [ 9, -9 ] ]] } },  { "type": "Feature", "properties": {}, "geometry": { "type": "Polygon", "coordinates": [[ [ 0, -8.2 ], [ 1.3, -8.2 ], [ 1.3, -10.7 ], [ 2.7, -10.7 ], [ 2.7, -9 ], [ 6.2, -9 ], [ 6.2, -9.35 ], [ 2.8, -9.35 ], [ 2.8, -12.35 ], [ 0, -12.35 ], [ 0, -8.2 ] ]] } }, { "type": "Feature", "properties": {}, "geometry": { "type": "Polygon", "coordinates": [[ [ 0, -2.85 ], [ -0.1, -2.85 ], [ -0.1, -4.83 ], [ 0, -4.83 ], [ 0, -2.85 ] ]] } }, { "type": "Feature", "properties": {}, "geometry": { "type": "Polygon", "coordinates": [[ [ -0.1, -4.83 ], [ -0.1, -7.84 ], [ 0, -7.84 ], [ -0.1, -4.83 ] ]] } }, { "type": "Feature", "properties": {}, "geometry": { "type": "Polygon", "coordinates": [[ [ 1.5, 0 ], [ 1.5, -0.1 ], [ 4.5, -0.1 ], [ 4.5, 0 ], [ 1.5, 0 ] ]] } }, { "type": "Feature", "properties": {}, "geometry": { "type": "Polygon", "coordinates": [[ [ 9, -2.9 ], [ 9.1, -2.9 ], [ 9.1, -5.47 ], [ 9, -5.47 ], [ 9, -2.9 ] ]] } }, { "type": "Feature", "properties": {}, "geometry": { "type": "Polygon", "coordinates": [[ [ 7, -2.5 ], [ 7, -2.8 ], [ 7, -2.65 ], [ 6.7, -2.65 ], [ 6.7, -2.5 ], [ 6.7, -2.8 ], [ 7, -2.5 ] ]] } }, { "type": "Feature", "properties": {}, "geometry": { "type": "Polygon", "coordinates": [[ [ 7, -8 ], [ 7, -8.3 ], [ 7, -8.15 ], [ 6.7, -8.15 ], [ 6.7, -8 ], [ 6.7, -8.3 ], [ 7, -8 ] ]] } }, { "type": "Feature", "properties": {}, "geometry": { "type": "Polygon", "coordinates": [[ [ 0.3, -2.5 ], [ 0.3, -2.8 ], [ 0.3, -2.65 ], [ 0, -2.65 ], [ 0, -2.5 ], [ 0, -2.8 ], [ 0.3, -2.5 ] ]] } }, { "type": "Feature", "properties": {}, "geometry": { "type": "Polygon", "coordinates": [[ [ 0.3, -8 ], [ 0.3, -8.3 ], [ 0.3, -8.15 ], [ 0, -8.15 ], [ 0, -8 ], [ 0, -8.3 ], [ 0.3, -8 ] ]] } } ] } `
// var jsonData = JSON.parse(data_original.replace(/ObjectId\(/g, '').replace(/\)/g, '').replace(/'/g, '"'))

echarts.registerMap('indoor', mapData);
myChart.setOption({
  backgroundColor: '#fff',
  geo: [{
    center: [4.5, -4.5],
    zoom: 2,
    roam: true,
    itemStyle: {
      normal: {
        color: 'transparent',
        //borderColor: 'rgba(255,255,255,255)',
        borderWidth: 1
      }
    },
    map: 'indoor',
    silent: true
  }]
})

console.log("ECHARTS");
var updateChart = function () {
  console.log("DATA");
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/path.json', true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) {


      // 从服务器获得数据 
      //fn.call(this, xhr.responseText);
      console.log(this.responseText);
      var pathData = JSON.parse(xhr.responseText.replace(/'/g, '"'));

      var pathList = []
      for (let i = 0; i < pathData.length; i++) {
        let path = pathData[i];
        var coords = []
        for (let j = 0; j < path.length; j++) {
          coords.push([path[j].x, path[j].y]);
        }
        pathList.push({ coords: coords });
      }


      if(window.content){
        window.content._data.path=pathData.length;
        window.content._data.count=pathData.length;
        // window.content._data.history=pathData.length*999*Math.ceil(Math.random()*10);
        window.content._data.alarm=Math.floor(Math.random()*10);
      }

      // console.log(pathList);

      myChart.setOption({
        // backgroundColor: '#fff',
        // geo: [{
        //   center: [4.5, -4.5],
        //   zoom: 2,
        //   roam: true,
        //   itemStyle: {
        //     normal: {
        //       color: 'transparent',
        //       //borderColor: 'rgba(255,255,255,255)',
        //       borderWidth: 1
        //     }
        //   },
        //   map: 'indoor',
        //   silent: true
        // }],


        series: [{
          type: 'lines',
          coordinateSystem: 'geo',
          //data: lines,
          data: pathList,
          polyline: true,
          lineStyle: {
            normal: {
              color: 'purple',
              opacity: 1,
              width: 1
            }
          }
        }]
      });

    }

  }
  xhr.send();
}

//window.addEventListener('onload', function (event) {
updateChart();
//})

// var xhr = new XMLHttpRequest();
// xhr.open('GET', '/data.json', true);
// xhr.onreadystatechange = function () {
//     // readyState == 4说明请求已完成
//     if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) {
//         // 从服务器获得数据 
//         //fn.call(this, xhr.responseText);
//         console.log(this.responseText);
//         var jsonData = JSON.parse(xhr.responseText.replace(/'/g, '"'));


//         // for (var i = 3, j = 0; i < data_modify.length; i += 9, j++) {
//         //     data_array_x[j] = Number(data_modify[i].slice(0, data_modify[i].length - 1))
//         //     data_array_y[j] = Number(data_modify[i + 2].slice(0, data_modify[i + 2].length - 1))

//         // }

//         for (let i = 0; i < jsonData.length; i++) {
//             data_array_x[i] = jsonData[i].x;
//             data_array_y[i] = jsonData[i].y;
//         }

//         var option = {
//             xAxis: {
//                 // splitLine: {
//                 //     show: false
//                 // },
//                 axisLine: {
//                     lineStyle: {
//                         type: 'solid',
//                         color: '#fff', //左边线的颜色
//                         width: '2' //坐标线的宽度
//                     }
//                 },
//                 data: data_array_x
//             },
//             yAxis: {
//                 // splitLine: {
//                 //     show: false
//                 // },
//                 axisLine: {
//                     lineStyle: {
//                         type: 'solid',
//                         color: '#fff', //左边线的颜色
//                         width: '2' //坐标线的宽度
//                     }
//                 },

//             },
//             series: [{
//                 type: 'line',
//                 data: data_array_y
//             }],
//             dataZoom: [{
//                     type: 'slider',
//                     xAxisIndex: 0,
//                     start: 10,
//                     end: 60
//                 },
//                 {
//                     type: 'inside',
//                     xAxisIndex: 0,
//                     start: 10,
//                     end: 60
//                 },
//                 {
//                     type: 'slider',
//                     yAxisIndex: 0,
//                     start: 30,
//                     end: 80
//                 },
//                 {
//                     type: 'inside',
//                     yAxisIndex: 0,
//                     start: 30,
//                     end: 80
//                 }
//             ],
//             //backgroundColor: 'rgba(255, 128, 128, 64)'
//         };
//         myChart.setOption(option);


//     }
// };
// xhr.send();
//var bg=document.getElementById('background');

//bg.setAttribute('style','background: url(\'image/path.png\');width: 600px;height:400px');
