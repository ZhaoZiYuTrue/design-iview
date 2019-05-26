<template>
    <div>
        <Row style="border-bottom:1px solid #fff">
            <iCol span="4" offset='15'>
                <DatePicker v-model="startDate"  type="datetime" placeholder="选择开始日期" style="width: 200px" format='yyyy-MM-dd HH:mm:ss'>
                </DatePicker>
            </iCol>
            <iCol span="4">
                <DatePicker v-model="endDate"  type="datetime" @on-ok="DatePicker()" placeholder="选择结束日期" style="width: 200px" format='yyyy-MM-dd HH:mm:ss'>
                </DatePicker>
            </iCol>
        </Row>  
        <Scroll height='650'>
            <Row>
                <iCol span='12'>
                    <Card>
                        <p slot='title'>当前入口流量</p>
                        <p>当前入口流量:{{ message1 }}</p>
                        <!-- <p>Total Transferred:{{ message2 }}Bytes</p> -->
                    </Card>
                </iCol>
                <iCol span='12'>
                    <Card>
                        <p slot='title'>当前出口流量</p>
                        <p>当前出口流量:{{ message3 }}</p>
                        <!-- <p>Total Transferred:{{ message4 }}Bytes</p> -->
                    </Card>
                </iCol>
            </Row>
            <Row >
                <Card>
                    <p slot='title'>入口流量</p>
                    <ve-line :data="chartData1" :settings="chartSettings1"></ve-line>
                </Card>
            </Row>
            <Row>
                <Card>
                    <p slot='title'>出口流量</p>
                    <ve-line :data="chartData2" :settings="chartSettings2"></ve-line>
                </Card>
            </Row>
        </Scroll> 
    </div>   
        
</template>

<script> 
    const EMPTY_DATA1 = {
        columns: [],
        rows: []         
    }
    const DATA1_FROM_BACKEND = {
        columns: ['时间', '出口流量'],
        rows: [
            { '时间': '时间8:00', '出口流量': 500 },
            { '时间': '时间9:00', '出口流量': 530 },
            { '时间': '时间10:00', '出口流量': 923 },
            { '时间': '时间11:00', '出口流量': 723 },
            { '时间': '时间12:00', '出口流量': 792 },
            { '时间': '时间13:00', '出口流量': 593 },   
        ]
    }
    const EMPTY_DATA2 = {
        columns: [],
        rows: []         
    }
    const DATA2_FROM_BACKEND = {
        columns: ['时间', '入口流量'],
        rows: [
            { '时间': '时间8:00', '入口流量': 500 },
            { '时间': '时间9:00', '入口流量': 530 },
            { '时间': '时间10:00', '入口流量': 923 },
            { '时间': '时间11:00', '入口流量': 723 },
            { '时间': '时间12:00', '入口流量': 792 },
            { '时间': '时间13:00', '入口流量': 593 },   
        ]
    }
    export default {
        name: 'netflow',
        data () {
            // 入口流量
            this.chartSettings1 = {
                stack: { '网络流量': ['入口流量'] },
                area: true
            }
            // 出口流量
            this.chartSettings2 = {
                stack: { '网络流量': ['出口流量'] },
                area: true
            }
            return {
                userId: '',
                userToken: '',
                startDate: '',
                endDate: '',
                message1 : '',
                /* message2 : '', */
                message3 : '',
                /* message4 : '', */
                chartData1: {
                    columns: [],
                    rows: []   
                },
                chartData2: {
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
                var Rows2 = [];
                const url = '/api/system/network';
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
                        Rows1.push({'时间': time,'入口流量': item.in,});
                        Rows2.push({'时间': time,'出口流量': item.out,});
                    })
                    this.chartData1.columns = ['时间','入口流量'];
                    this.chartData2.columns = ['时间','出口流量'];
                    this.chartData1.rows = Rows1;
                    this.chartData2.rows = Rows2;
                });
            },
            getmessage () {
                const url = '/api/system/network/now';
                this.$http.get(url,
                {
                    params: {
                        id: this.userId,
                        token: this.userToken,
                    } 
                },{emulateJSON: true})
                .then((response) => {
                    var In = response.data.data.in;
                    var Out = response.data.data.out;
                    this.message1 = In + 'B/s';
                    this.message3 = Out + 'B/s';
                    if(In>=1024){
                        In = In/1024;
                        In = In.toFixed(2);
                        this.message1 = In + 'KB/s';
                    }
                    if(Out>=1024){
                        Out = Out/1024;
                        Out = Out.toFixed(2);
                        this.message3 = Out + 'KB/s';
                    }
                    
                    /* this.message2 = response.data.data.system.network.in.bytes; */
                    
                    /* this.message4 = response.data.data.system.network.out.bytes;  */  
                });
            },
            
        },
        created () {
            this.userId = localStorage.getItem('id');
            this.userToken = localStorage.getItem('token');
            this.getmessage();
            //this.DatePicker();
            /* console.log('created'); */
        }, 
    }
</script>