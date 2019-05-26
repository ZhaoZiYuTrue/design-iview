<template>
    <div>
        <Row style="border-bottom:1px solid #fff">
            <iCol span="4" offset='15'>
                <DatePicker v-model="startDate" type="datetime" placeholder="选择开始日期" style="width: 200px" format='yyyy-MM-dd HH:mm:ss'>
                </DatePicker>
            </iCol>
            <iCol span="4">
                <DatePicker v-model="endDate" @on-ok="DatePicker()" type="datetime" placeholder="选择结束日期" style="width: 200px" format='yyyy-MM-dd HH:mm:ss'>
                </DatePicker>
            </iCol>
        </Row>    
        <Scroll height='650'>
            <Row >
                <iCol span="8">
                    <Card>
                        <p slot='title'>内存使用率</p>   
                        <ve-gauge :data="chartData1" :settings="chartSettings1"></ve-gauge>
                    </Card>
                </iCol>
                <iCol span="16">
                    <Card>
                        <ve-bar :data="chartData2" :settings="chartSettings2"></ve-bar> 
                    </Card>
                </iCol>
            </Row>
            <Row>
                <Card>
                    <ve-line :data="chartData3" :settings="chartSettings3"></ve-line>
                </Card>
            </Row>
        </Scroll> 
    </div>   
        
</template>

<script>
    import global_ from '../../global.vue'
    export default {
        name: 'memory',
        data () {
            // 内存仪表盘
            this.chartSettings1 = {
                dataType: {
                    '占比': 'percent'
                },
                seriesMap: {
                    '占比': {
                        min: 0,
                        max: 1
                    }
                },     
            }
            // 内存条形图
            this.chartSettings2 = {
                metrics: ['内存使用率'],
                dataOrder: {
                    label: '内存使用率',
                    order: 'desc'
                }
            }
            // 内存折线图
            this.chartSettings3 = {
                stack: { '进程': ['内存使用率'] },
                area: true
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
                loading: false,
                dataEmpty: false,
            }
        },
        mounted(){
            /* console.log('mounted'); */
        },
        methods: {
            DatePicker() {
                var timeStamp1 = new Date(this.startDate).getTime();
                var timeStamp2 = new Date(this.endDate).getTime();
                var Rows = [];
                const url = '/api/system/memory';
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
                    console.log(response.data.msg);
                    response.data.data.forEach(function(item) {
                        var timeStamp = new Date(item.timestamp);
                        var time = timeStamp.toLocaleString();
                        Rows.push({'时间': time,'内存使用率': item.system.memory.used.pct,});
                    })
                    this.chartData3.columns = ['时间','内存使用率'];
                    this.chartData3.rows = Rows;
                });
            },
            getData1 () {
                var data1;
                const url = '/api/system/memory/total';
                this.$http.get(url,
                {
                    params: {
                        /* id: global_Id,
                        token: global_Token, */
                        id: this.userId,
                        token: this.userToken,
                    } 
                },{emulateJSON: true})
                .then((response) => {
                    data1 = response.data.data.system.memory.used.pct;
                    this.chartData1.columns = ['type', 'value'];
                    this.chartData1.rows= [
                        { type: '占比', value: data1 },
                    ]   
                });
            },
            getData2 () {
                var Rows = [];
                const url = '/api/system/memory/rank';
                this.$http.get(url,
                {
                    params: {
                        /* id: global_Id,
                        token: global_Token, */
                        id: this.userId,
                        token: this.userToken,
                    } 
                },{emulateJSON: true})
                .then((response) => {
                    response.data.data.forEach(function(item) {
                        Rows.push({'进程': item.name + "(" + item.pid + ")",'内存使用率': item.memory.rss.pct});
                    })
                    this.chartData2.columns = ['进程', '内存使用率'];
                    this.chartData2.rows= Rows;
                });
            },
        },
        created () {
            this.userId = localStorage.getItem('id');
            this.userToken = localStorage.getItem('token');
            this.getData1();
            this.getData2();
            //this.DatePicker();
            /* console.log('created'); */
        },   
    }
</script>
