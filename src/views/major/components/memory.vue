<template>
    <div>
        <Row style="border-bottom:1px solid #fff">
            <iCol span="4" offset="20">
                <DatePicker type="daterange" placement="bottom-end" placeholder="Select date" style="width: 200px"></DatePicker>
            </iCol>
        </Row>    
        <Scroll height='650'>
            <Row >
                <iCol span="8">
                    <Card>
                        <p slot='title'>内存使用率</p>   
                        <ve-gauge :data="memoryData1" :settings="memoryGauge"></ve-gauge>
                    </Card>
                </iCol>
                <iCol span="16">
                    <Card>
                        <ve-bar :data="memoryData2" :settings="memoryBar"></ve-bar> 
                    </Card>
                </iCol>
            </Row>
            <Row>
                <Card>
                    <ve-line :data="memoryData3" :settings="memoryLine"></ve-line>
                </Card>
            </Row>
        </Scroll> 
    </div>   
        
</template>

<script> 
    export default {
        name: 'memory',
        data () {
            // 内存仪表盘
            this.memoryGauge = {

                dataType: {
                    '占比': 'percent'
                },
                seriesMap: {
                    '占比': {
                        min: 0,
                        max: 1
                    }
                }
            }
            // 内存条形图
            this.memoryBar = {
                metrics: ['内存使用率'],
                dataOrder: {
                    label: '内存使用率',
                    order: 'desc'
                }
            }
            // 内存折线图
            this.memoryLine = {
                stack: { '进程': ['内存使用率'] },
                area: true
            }
            return {
                memoryData1: {
                    columns: ['type', 'value'],
                    rows: [
                        { type: '占比', value: 0.5 }
                    ]
                },
                memoryData2: {
                    columns: ['进程', '内存使用率'],
                    rows: [
                        { '进程': '进程1', '内存使用率': 500 },
                        { '进程': '进程2', '内存使用率': 530 },
                        { '进程': '进程3', '内存使用率': 823 },
                        { '进程': '进程4', '内存使用率': 723 },
                        { '进程': '进程5', '内存使用率': 792 },
                        { '进程': '进程6', '内存使用率': 593 },
                    ]
                },
                memoryData3: {
                    columns: ['时间', '内存使用率'],
                    rows: [
                        { '时间': '时间8:00', '内存使用率': 500 },
                        { '时间': '时间9:00', '内存使用率': 530 },
                        { '时间': '时间10:00', '内存使用率': 923 },
                        { '时间': '时间11:00', '内存使用率': 723 },
                        { '时间': '时间12:00', '内存使用率': 792 },
                        { '时间': '时间13:00', '内存使用率': 593 },
                    ]
                },
            }
        },
        methods: {
            /* handleReachEdge (dir) {
                return new Promise(resolve => {
                    setTimeout(() => {
                        resolve();
                    }, 2000);
                });
            } */
        }
    }
</script>
