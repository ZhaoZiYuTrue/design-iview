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
            <Row>
                <iCol span='12'>
                    <Card>
                        <p slot='title'>当前入口流量</p>
                        <p>当前入口流量:{{ message1 }}B/s</p>
                        <p>Total Transferred:{{ message2 }}Bytes</p>
                    </Card>
                </iCol>
                <iCol span='12'>
                    <Card>
                        <p slot='title'>当前出口流量</p>
                        <p>当前出口流量:{{ message3 }}B/s</p>
                        <p>Total Transferred:{{ message4 }}Bytes</p>
                    </Card>
                </iCol>
            </Row>
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
                userId: '',
                userToken: '',
                startDate: '',
                endDate: '',
                message1 : '',
                message2 : '',
                message3 : '',
                message4 : '',
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
            getmessage () {
                const url = '/api/system/network';
                this.$http.get(url,
                {
                    params: {
                        id: this.userId,
                        token: this.userToken,
                    } 
                },{emulateJSON: true})
                .then((response) => {
                    this.message1 = response.data.data.now.in;
                    this.message2 = response.data.data.system.network.in.bytes;
                    this.message3 = response.data.data.now.out;
                    this.message4 = response.data.data.system.network.out.bytes;   
                });
            },
        }
    }
</script>