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
        <Row >
            <iCol span="12">
                <Card>
                    <p slot='title'>mysql慢查询-次数分布</p>   
                    <ve-histogram :data="chartData1" :settings="chartSettings1"></ve-histogram>
                </Card>
            </iCol>
            <iCol span="12">
                <Card>
                    <p slot='title'>mysql慢查询-查询类型比例</p>   
                    <ve-ring :data="chartData2" :settings="chartSettings2"></ve-ring>
                </Card>
            </iCol>
        </Row>
    </div>
</template>

<script>
    export default {
        data () {
            this.chartSettings1 = {
                metrics: ['次数'],
                dimension: ['时间'],
            },
            this.chartSettings2 = {
                dimension: '类型名',
                metrics: '次数'
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
            } 
        },
        methods: {
            DatePicker() {
                var timeStamp1 = new Date(this.startDate).getTime();
                var timeStamp2 = new Date(this.endDate).getTime();
                var Rows1 = [];
                var Rows2 = [];
                const url = '/api/mysql/count/timeAndType';
                this.$http.get(url,
                {
                    params: {
                        id: this.userId,
                        token: this.userToken,
                        startTime: timeStamp1,
                        endTime: timeStamp2,
                    } 
                },{emulateJSON: true})
                .then((response) => {
                    var data = {
                        "total":3,
                        "time":
                        {
                            "2019-05-22 07:00":11,
                            "2019-05-22 08:00":13,
                            "2019-05-22 09:00":9,
                            "2019-05-22 10:00":20,
                            "2019-05-22 11:00":12,
                            "2019-05-23 06:00":9,
                            "2019-05-23 07:00":6,
                            "2019-05-23 08:00":11,
                            "2019-05-23 09:00":17,
                            "2019-05-23 10:00":9,
                            "2019-05-23 11:00":7,
                        },
                        "type":
                        {
                            "UPDATE":9,
                            "SELECT":32,
                            "DELETE":4,
                            "INSERT":3,
                        }
                    }
                    var urlData1 = data.time;/* response.data.data.time */
                    
                    for(var key in urlData1){
                        Rows1.push({'时间': key,'次数': urlData1[key]});
                    }
                    this.chartData1.columns = ['时间', '次数'];
                    this.chartData1.rows= Rows1;
                    var urlData2 = data.type;/* response.data.data.type */
                    for(var key in urlData2){
                        Rows2.push({'类型名': key,'次数': urlData2[key]});
                    }
                    this.chartData2.columns = ['类型名', '次数'];
                    this.chartData2.rows= Rows2;
                });
            },
        },
        created (){
            this.userId = localStorage.getItem('id');
            this.userToken = localStorage.getItem('token');
            //this.DatePicker();
        }
    }
</script>