var myChart = echarts.init(document.getElementById('main'),'light');
var data={
    person: ["杨炜","陈惟高","姜研",'何琛','王旭'],
    data: [8.7,9.2,10.8,11.3,12.9]
};
// 指定图表的配置项和数据
var option = {
    title: {
        text: '工作时长'
    },
    tooltip: {},
    legend: {
        show:true,
        data:['工作时长']
    },
    xAxis: {
        data:data.person,

    },
    yAxis: {
        //data:data.y
    },
    series: [{
        name: '工作时长',
        type: 'bar',
        data: data.data
    }],
    dataZoom:[
        {
            type: 'inside',
            start: 20,
            end: 100
        }
    ],
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);