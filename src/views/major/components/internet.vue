<template>
    <div>
        <Row style="border-bottom:1px solid #fff">
            <iCol span="4" offset='15'>
                <DatePicker v-model="startDate" type="datetime" placeholder="选择开始日期" style="width: 200px" format='yyyy-MM-dd HH:mm:ss'>
                </DatePicker>
            </iCol>
            <iCol span="4">
                <DatePicker v-model="endDate" @on-ok="DatePicker(),getData1(),getData2(),getData4()" type="datetime" placeholder="选择结束日期" style="width: 200px" format='yyyy-MM-dd HH:mm:ss'>
                </DatePicker>
            </iCol>
        </Row>>
        <Scroll height='650'>
            <Row >
                <Card>
                    <p slot='title'>ngnix-请求数量矩阵图</p>   
                    <ve-histogram :data="chartData1" :settings="chartSettings1"></ve-histogram>
                </Card>
            </Row>
            <Row>
                <iCol span='12'>
                    <Card>
                        <p slot='title'>ngnix-请求URL分布</p> 
                        <ve-bar :data="chartData2" :settings="chartSettings2"></ve-bar>
                    </Card>
                </iCol>
                <iCol span='12'>
                    <Card>
                        <p slot='title'>ngnix-返回状态码饼状图</p> 
                        <ve-pie :data="chartData3" :settings="chartSettings3"></ve-pie>
                    </Card>
                </iCol>
            </Row>
            <Row>
                <Card>
                    <p slot='title'>ngnix-请求的地区分布</p>
                    <ve-pie :data="chartData4" :settings="chartSettings4"></ve-pie> 
                </Card>
            </Row>
        </Scroll>
    </div>
</template>

<script>
    export default {
        data() {
            this.chartSettings1 = {
                metrics: ['请求数量'],
                dimension: ['时间']
            }
            this.chartSettings2 = {
                metrics: ['访问次数'],
                dataOrder: {
                    label: '访问次数',
                    order: 'desc'
                }
            }
            this.chartSettings3 = {
                dimension: '状态码',
                metrics: '状态数量'
            }
            this.chartSettings4 = {
                dimension: '地区',
                metrics: '状态数量'
            }
            return {
                userId: '',
                userToken: '',
                startDate: '',
                endDate: '',
                chartData1: {
                    columns: [],
                    rows: []
                },
                chartData2: {
                    columns: [],
                    rows: [] 
                },
                chartData3: {
                    columns: [],
                    rows: []
                },
                chartData4: {
                    columns: [],
                    rows: []   
                },
            }
        },
        methods: {
            DatePicker() {
                var timeStamp1 = new Date(this.startDate).getTime();
                var timeStamp2 = new Date(this.endDate).getTime();
                var Rows1 = [];
                const url = '/api/nginx/count/time';
                this.$http.get(url,
                {
                    params: {
                        id: this.userId,
                        token: this.userToken,
                        startTime: timeStamp1,
                        endTime:   timeStamp2,
                    } 
                },{emulateJSON: true})
                .then((response) => {
                    response.data.data.forEach(function(item) {
                        var timeStamp = new Date(item.start);
                        var time = timeStamp.toLocaleString();
                        Rows1.push({'时间': time,'请求数量': item.count,});
                    })
                    this.chartData1.columns = ['时间','请求数量'];
                    this.chartData1.rows = Rows1;
                    
                });
            },
            getData1 () {
                var timeStamp1 = new Date(this.startDate).getTime();
                var timeStamp2 = new Date(this.endDate).getTime();
                var Rows2 = [];
                const url = '/api/nginx/count/url';
                this.$http.get(url,
                {
                    params: {
                        id: this.userId,
                        token: this.userToken,
                        startTime: timeStamp1,
                        endTime:   timeStamp2,
                    } 
                },{emulateJSON: true})
                .then((response) => {
                    var urlData1 = response.data.data;
                    for(var key in urlData1){
                        Rows2.push({'端口名': key,'访问次数': urlData1[key]});
                    }
                    this.chartData2.columns = ['端口名', '访问次数'];
                    this.chartData2.rows= Rows2;
                });
            },
            getData2 () {
                var timeStamp1 = new Date(this.startDate).getTime();
                var timeStamp2 = new Date(this.endDate).getTime();
                var Rows3 = [];
                const url = '/api/nginx/count/status';
                this.$http.get(url,
                {
                    params: {
                        id: this.userId,
                        token: this.userToken,
                        startTime: timeStamp1,
                        endTime:   timeStamp2,
                    } 
                },{emulateJSON: true})
                .then((response) => {
                    var urlData2 = response.data.data;
                    for(var key in urlData2){
                        Rows3.push({'状态码': key,'状态数量': urlData2[key]});
                    }
                    this.chartData3.columns = ['状态码', '状态数量'];
                    this.chartData3.rows= Rows3;
                });
            },
            getData4 () {
                var timeStamp1 = new Date(this.startDate).getTime();
                var timeStamp2 = new Date(this.endDate).getTime();
                var Rows4 = [];
                const url = '/api/nginx/count/city';
                this.$http.get(url,
                {
                    params: {
                        id: this.userId,
                        token: this.userToken,
                        startTime: timeStamp1,
                        endTime:   timeStamp2,
                    } 
                },{emulateJSON: true})
                .then((response) => {
                    var data = {
                        'Guangzhou': 3,
                        'Hangzhou': 21,
                        'Xian': 4,
                        'Shanghai': 23,
                        'Wuhan': 45,
                    }
                    var urlData3 = data;/* response.data.data */
                    for(var key in urlData3){
                        Rows4.push({'地区': key,'状态数量': urlData3[key]});
                    }
                    this.chartData4.columns = ['地区', '状态数量'];
                    this.chartData4.rows= Rows4;
                });
            },
        },
        created (){
            this.userId = localStorage.getItem('id');
            this.userToken = localStorage.getItem('token');
        }
    }
</script>
