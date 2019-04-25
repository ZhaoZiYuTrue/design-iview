<template>
    <div>
        <Row>
            <iCol>
                <Card>
                    <Circle style="margin: 10px;" :percent="CPUitem">
                        <span class="demo-Circle-inner" style="font-size:18px">
                        CPU:<i>{{CPUitem}} %</i>
                        </span>
                    </Circle>
                </Card>
            </iCol>
            <iCol>
                <Card>
                    <chart-bar/>
                </Card>
            </iCol>
        </Row>
        <Row>
            <Card>
                <example style="height: 310px;"/>
            </Card>
        </Row>   
    </div>
</template>

<script>
  /*   import echarts from 'echarts'
 */
/* var dom = document.getElementById("container");
var myChart = echarts.init(dom);
var app = {};
option = null;
option = {
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        areaStyle: {}
    }]
};
;
if (option && typeof option === "object") {
    myChart.setOption(option, true);
} */
       
    export default {
        name: 'hardware',
        data() {
            return {
                CPUitem: '50',
            }
        },
        methods: {
            getCPUitem(CPUitem){
                
            }
        },  
    }
</script>

<style scoped>

</style>