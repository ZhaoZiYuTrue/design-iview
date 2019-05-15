<template>
    <div>
        <Row style="border-bottom:1px solid #fff">
            <iCol span="4" offset='15'>
                <DatePicker v-model="startDate" @on-ok="DatePicker()" type="datetime" placeholder="选择开始日期" style="width: 200px" format='yyyy-MM-dd HH:mm:ss'>
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
                        <p slot='title'>CPU使用率</p>   
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
    const DATA1_FROM_BACKEND = {
    columns: ['type', 'value'],
    rows: [
        { type: '占比', value: 0.5 },
    ]
    }
    const EMPTY_DATA1 = {
        columns: [],
        rows: []         
    }

    const DATA2_FROM_BACKEND = {
    columns: ['进程', 'CPU使用率'],
    rows: [
        { '进程': '进程1', 'CPU使用率': 500 },
        { '进程': '进程2', 'CPU使用率': 530 },
        { '进程': '进程3', 'CPU使用率': 823 },
        { '进程': '进程4', 'CPU使用率': 723 },
        { '进程': '进程5', 'CPU使用率': 792 },
        { '进程': '进程6', 'CPU使用率': 593 },
    ]
    }
    const EMPTY_DATA2 = {
        columns: [],
        rows: []         
    }

    const DATA3_FROM_BACKEND = {
    columns: ['时间', 'CPU使用率'],
    rows: [
        { '时间': '时间8:00', 'CPU使用率': 500 },
        { '时间': '时间9:00', 'CPU使用率': 530 },
        { '时间': '时间10:00', 'CPU使用率': 923 },
        { '时间': '时间11:00', 'CPU使用率': 723 },
        { '时间': '时间12:00', 'CPU使用率': 792 },
        { '时间': '时间13:00', 'CPU使用率': 593 },   
    ]
    }
    const EMPTY_DATA3 = {
        columns: [],
        rows: []         
    }

    export default {
        name: 'cpu',
        data () {
            // CPU仪表盘
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
            // cpu条形图
            this.chartSettings2 = {
                metrics: ['CPU使用率'],
                dataOrder: {
                    label: 'CPU使用率',
                    order: 'desc'
                }
            }
            // cpu折线图
            this.chartSettings3 = {
                stack: { '进程': ['CPU使用率'] },
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
                var startTime = new Date(this.startDate).getTime();
                var endTime = new Date(this.endDate).getTime();
                const url = '';
                this.$http.get(url,
                {
                    params: {
                        id: this.userId,
                        token: this.userToken,
                        startTime: this.startTime,
                        endTime: this.endTime,
                    } 
                },{emulateJSON: true})
                .then((response) => {
                    
                });
            },
            getData1 () {
                var data1;
                const url = '/api/system/cpu/total';
                this.$http.get(url,
                {
                    params: {
                        id: this.userId,
                        token: this.userToken,
                    } 
                },{emulateJSON: true})
                .then((response) => {
                    data1 = response.data.data.system.cpu.total.pct;
                    this.chartData1.columns = ['type', 'value'];
                    this.chartData1.rows= [
                        { type: '占比', value: data1 },
                    ]   
                });
            },
            getData2 () {
                var Rows = [];
                const url = '/api/system/cpu/rank';
                this.$http.get(url,
                {
                    params: {
                        id: this.userId,
                        token: this.userToken,
                    } 
                },{emulateJSON: true})
                .then((response) => {
                    response.data.data.forEach(function(item) {
                        Rows.push({'进程': item.name,'CPU使用率': item.cpu.total.pct});
                    })
                    this.chartData2.columns = ['进程', 'CPU使用率'];
                    this.chartData2.rows= Rows;
                });
            },
        },
        created () {
            this.userId = localStorage.getItem('id');
            this.userToken = localStorage.getItem('token');
            this.getData1();
            this.getData2();
            /* console.log('created'); */
        },   
    }
</script>
