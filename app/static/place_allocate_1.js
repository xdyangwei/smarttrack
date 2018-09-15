var myChart = echarts.init(document.getElementById('main'),'vintage');
option = {
    legend: {
        data:['地点占比']
    },
    title:{
        text:'工作地点分配情况'
    },
    series : [
        {
            name: '地点占比',
            type: 'pie',
            radius: '55%',
            roseType: 'angle',
            data:[
                {value:235, name:'墙角'},
                {value:274, name:'阳台'},
                {value:310, name:'客厅'},
                {value:335, name:'卫生间'},
                {value:400, name:'餐厅'}
            ]
        }
    ]
};
myChart.setOption(option);