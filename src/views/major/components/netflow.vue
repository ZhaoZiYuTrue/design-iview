<template>
    <div>
        <Row style="border-bottom:1px solid #fff">
            <iCol span="4" offset="20">
                <DatePicker type="daterange" placement="bottom-end" placeholder="Select date" style="width: 200px"></DatePicker>
            </iCol>
        </Row>    
        <Scroll height='650'>
            <Row >
                <Card>
                    <p slot='title'>入口流量</p>
                    <ve-line :data="netflowData1" :settings="netflowLine1"></ve-line>
                </Card>
            </Row>
            <Row>
                <Card>
                    <p slot='title'>出口流量</p>
                    <ve-line :data="netflowData2" :settings="netflowLine2"></ve-line>
                </Card>
            </Row>
        </Scroll> 
    </div>   
        
</template>

<script> 
    export default {
        name: 'netflow',
        data () {
            // 入口流量
            this.netflowLine1 = {
                stack: { '时间': ['入口流量'] },
                area: true
            }
            // 出口流量
            this.netflowLine2 = {
                stack: { '时间': ['出口流量'] },
                area: true
            }
            
            return {
                netflowData1: {
                    columns: ['时间', '入口流量'],
                    rows: [
                        { '时间': '时间8:00', '入口流量': 500 },
                        { '时间': '时间9:00', '入口流量': 530 },
                        { '时间': '时间10:00', '入口流量': 923 },
                        { '时间': '时间11:00', '入口流量': 723 },
                        { '时间': '时间12:00', '入口流量': 792 },
                        { '时间': '时间13:00', '入口流量': 593 },
                    ]
                },
                netflowData2: {
                    columns: ['时间', '出口流量'],
                    rows: [
                        { '时间': '时间8:00', '出口流量': 500 },
                        { '时间': '时间9:00', '出口流量': 530 },
                        { '时间': '时间10:00', '出口流量': 923 },
                        { '时间': '时间11:00', '出口流量': 723 },
                        { '时间': '时间12:00', '出口流量': 792 },
                        { '时间': '时间13:00', '出口流量': 593 },
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